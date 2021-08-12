// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.4;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * onlyOwner functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (newOwner).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract NapaCryptoSpaceMarket is Ownable {
    string public name;
    string public symbol;

    uint256 private _totalSupply = 10000;
    uint256 public spacesRemainingToAssign;

    struct Offer {
        bool isForSale;
        uint256 spaceIndex;
        address seller;
        uint256 minValue;       // In ether
        address onlySellTo;     // specify to sell only to a specific person
    }

    struct Bid {
        bool hasBid;
        uint256 spaceIndex;
        address bidder;
        uint256 value;
    }

    mapping (uint256 => address) public spaceIndexToAddress;

    // This creates an array with all balances
    mapping (address => uint256) public balanceOf;

    // A record of spaces that are offered for sale at a specific minimum value, and perhaps to a specific person
    mapping (uint256 => Offer) public spacesOfferedForSale;

    // A record of the highest space bid
    mapping (uint256 => Bid) public  spaceBids;

    mapping (address => uint256) public pendingWithdrawals;

    event Assign(address indexed to, uint256 spaceIndex);
    event SpaceTransfer(address indexed from, address indexed to, uint256 spaceIndex);
    event SpaceOffered(uint256 indexed spaceIndex, uint256 minValue, address indexed toAddress);
    event SpaceBidEntered(uint256 indexed spaceIndex, uint256 value);
    event SpaceBidWithdrawn(uint256 indexed spaceIndex, uint256 value);
    event SpaceBought(uint256 indexed spaceIndex, uint256 value, address indexed fromAddress, address indexed toAddress);
    event SpaceNoLongerForSale(uint256 indexed spaceIndex);
    event ETHTransfer(address indexed from, address indexed to, uint256 value);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor() {
        spacesRemainingToAssign = _totalSupply;

        // Display purposes
        name = "CRYPTOSPACE";
        symbol = "NCS";
    }

    modifier onlySpaceOwner(uint256 spaceIndex) {
        require(spaceIndexToAddress[spaceIndex] == _msgSender(), 'You are not owner');
        _;
    }

    modifier onlyBuyer(uint256 spaceIndex) {
        require(spaceIndexToAddress[spaceIndex] != address(0), 'Space must have owner');
        require(spaceIndexToAddress[spaceIndex] != _msgSender(), 'Owner can not bid');
        _;
    }

    modifier validSpace(uint256 spaceIndex) {
        require(spaceIndex < _totalSupply, 'Invalid space index');
        _;
    }

    modifier freeSpace(uint256 spaceIndex) {
        require(spacesRemainingToAssign != 0, 'No space left');
        require(spaceIndexToAddress[spaceIndex] == address(0), 'Space must be long to empty address');
        _;
    }

    function setInitialOwner(address to, uint256 spaceIndex)
        public
        onlyOwner
        validSpace(spaceIndex)
    {
        require(spaceIndexToAddress[spaceIndex] != to, 'Must be different address');
             
        if (spaceIndexToAddress[spaceIndex] != address(0)) {
            balanceOf[spaceIndexToAddress[spaceIndex]]--;
        }
        spaceIndexToAddress[spaceIndex] = to;
        balanceOf[to]++;
        emit Assign(to, spaceIndex);
    }

    function setInitialOwners(address[] memory addresses, uint256[] memory indices)
        public
        onlyOwner
    {
        uint256 n = addresses.length;
        for (uint256 i = 0; i < n; i++) {
            setInitialOwner(addresses[i], indices[i]);
        }
    }

    function getSpace(uint256 spaceIndex)
        external
        validSpace(spaceIndex)
        freeSpace(spaceIndex)
    {
        spaceIndexToAddress[spaceIndex] = _msgSender();
        balanceOf[_msgSender()]++;
        spacesRemainingToAssign--;
        emit Assign(_msgSender(), spaceIndex);
    }

    // Transfer ownership of a space to another user without requiring payment
    function transferSpace(address to, uint256 spaceIndex)
        external
        validSpace(spaceIndex)
        onlySpaceOwner(spaceIndex)
    {
        if (spacesOfferedForSale[spaceIndex].isForSale) {
            spaceNoLongerForSale(spaceIndex);
        }
        spaceIndexToAddress[spaceIndex] = to;
        balanceOf[_msgSender()]--;
        balanceOf[to]++;
        emit SpaceTransfer(_msgSender(), to, spaceIndex);
        // Check for the case where there is a bid from the new owner and refund it.
        // Any other bid can stay in place.
        Bid memory bid = spaceBids[spaceIndex];
        if (bid.bidder == to) {
            // Kill bid and refund value
            pendingWithdrawals[to] += bid.value;
            spaceBids[spaceIndex] = Bid(false, spaceIndex, address(0), 0);
        }
    }

    function spaceNoLongerForSale(uint256 spaceIndex)
        private
        validSpace(spaceIndex)
        onlySpaceOwner(spaceIndex)
    {
        spacesOfferedForSale[spaceIndex] = Offer(false, spaceIndex, _msgSender(), 0, address(0));
        emit SpaceNoLongerForSale(spaceIndex);
    }

    function offerSpaceForSale(uint256 spaceIndex, uint256 minSalePriceInWei)
        external
        validSpace(spaceIndex)
        onlySpaceOwner(spaceIndex)
    {
        spacesOfferedForSale[spaceIndex] = Offer(true, spaceIndex, _msgSender(), minSalePriceInWei, address(0));
        emit SpaceOffered(spaceIndex, minSalePriceInWei, address(0));
    }

    function offerSpaceForSaleToAddress(uint256 spaceIndex, uint256 minSalePriceInWei, address toAddress)
        external
        validSpace(spaceIndex)
        onlySpaceOwner(spaceIndex)
    {
        spacesOfferedForSale[spaceIndex] = Offer(true, spaceIndex, _msgSender(), minSalePriceInWei, toAddress);
        emit SpaceOffered(spaceIndex, minSalePriceInWei, toAddress);
    }

    function buySpace(uint256 spaceIndex)
        external
        payable
        validSpace(spaceIndex)
    {
        Offer memory offer = spacesOfferedForSale[spaceIndex];
        require(offer.isForSale, 'Space is not for sale');
        require(offer.onlySellTo == address(0) || offer.onlySellTo == _msgSender(), 'This space can not be sold to you');
        require(msg.value >= offer.minValue, 'You must buy more than min value');
        require(offer.seller == spaceIndexToAddress[spaceIndex], 'Seller no longer owner of space');

        address seller = offer.seller;

        spaceIndexToAddress[spaceIndex] = _msgSender();
        balanceOf[seller]--;
        balanceOf[_msgSender()]++;

        spaceNoLongerForSale(spaceIndex);
        pendingWithdrawals[seller] += msg.value;
        emit SpaceBought(spaceIndex, msg.value, seller, _msgSender());

        // Check for the case where there is a bid from the new owner and refund it.
        // Any other bid can stay in place.
        Bid memory bid = spaceBids[spaceIndex];
        if (bid.bidder == _msgSender()) {
            // Kill bid and refund value
            pendingWithdrawals[_msgSender()] += bid.value;
            spaceBids[spaceIndex] = Bid(false, spaceIndex, address(0), 0);
        }
    }

    function withdraw() external {
        uint256 amount = pendingWithdrawals[_msgSender()];
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        pendingWithdrawals[_msgSender()] = 0;
        payable(_msgSender()).transfer(amount);
        emit ETHTransfer(address(this), _msgSender(), amount);
    }

    function enterBidForSpace(uint256 spaceIndex)
        external
        payable
        validSpace(spaceIndex)
        onlyBuyer(spaceIndex)
    {
        require(msg.value != 0, 'Value can not be 0');
        Bid memory existing = spaceBids[spaceIndex];
        require(msg.value > existing.value, 'Value must be greater than the highest bid');
        if (existing.value > 0) {
            // Refund the failing bid
            pendingWithdrawals[existing.bidder] += existing.value;
        }
        spaceBids[spaceIndex] = Bid(true, spaceIndex, _msgSender(), msg.value);
        emit SpaceBidEntered(spaceIndex, msg.value);
    }

    function acceptBidForSpace(uint256 spaceIndex, uint256 minPrice)
        external
        validSpace(spaceIndex)
        onlySpaceOwner(spaceIndex)
    {
        address seller = _msgSender();
        Bid memory bid = spaceBids[spaceIndex];
        require(bid.value != 0, 'Bid value must not be 0');
        require(bid.value >= minPrice, 'Bid value must be greater or equal min price');

        spaceIndexToAddress[spaceIndex] = bid.bidder;
        balanceOf[seller]--;
        balanceOf[bid.bidder]++;

        spacesOfferedForSale[spaceIndex] = Offer(false, spaceIndex, bid.bidder, 0, address(0));
        uint256 amount = bid.value;
        spaceBids[spaceIndex] = Bid(false, spaceIndex, address(0), 0);
        pendingWithdrawals[seller] += amount;
        emit SpaceBought(spaceIndex, bid.value, seller, bid.bidder);
    }

    function withdrawBidForSpace(uint256 spaceIndex)
        external
        validSpace(spaceIndex)
        onlyBuyer(spaceIndex)
    {
        Bid memory bid = spaceBids[spaceIndex];
        require(bid.bidder == _msgSender(), 'You are not the bidder');
        emit SpaceBidWithdrawn(spaceIndex, bid.value);
        uint256 amount = bid.value;
        spaceBids[spaceIndex] = Bid(false, spaceIndex, address(0), 0);
        // Refund the bid money
        payable(_msgSender()).transfer(amount);
        emit ETHTransfer(address(this), _msgSender(), amount);
    }

}
