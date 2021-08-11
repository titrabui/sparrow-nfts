/**
 *Submitted for verification at Etherscan.io on 2017-07-19
*/
// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.4;

import "hardhat/console.sol";

contract NapaCryptoSpaceMarket {

    // You can use this hash to verify the image file containing all the spaces
    string public imageHash = "ac39af4793119ee46bbff351d8cb6b5f23da60222126add4268e261199a2921b";

    address owner;

    string public standard = 'CryptoSpace';
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    uint public nextSpaceIndexToAssign = 0;

    bool public allSpacesAssigned = false;
    uint public spacesRemainingToAssign = 0;

    //mapping (address => uint) public addressToSpaceIndex;
    mapping (uint => address) public spaceIndexToAddress;

    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    struct Offer {
        bool isForSale;
        uint spaceIndex;
        address seller;
        uint minValue;          // in ether
        address onlySellTo;     // specify to sell only to a specific person
    }

    struct Bid {
        bool hasBid;
        uint spaceIndex;
        address bidder;
        uint value;
    }

    // A record of spaces that are offered for sale at a specific minimum value, and perhaps to a specific person
    mapping (uint => Offer) public spacesOfferedForSale;

    // A record of the highest space bid
    mapping (uint => Bid) public  spaceBids;

    mapping (address => uint) public pendingWithdrawals;

    event Assign(address indexed to, uint256 spaceIndex);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event SpaceTransfer(address indexed from, address indexed to, uint256 spaceIndex);
    event SpaceOffered(uint indexed spaceIndex, uint minValue, address indexed toAddress);
    event SpaceBidEntered(uint indexed spaceIndex, uint value, address indexed fromAddress);
    event SpaceBidWithdrawn(uint indexed spaceIndex, uint value, address indexed fromAddress);
    event SpaceBought(uint indexed spaceIndex, uint value, address indexed fromAddress, address indexed toAddress);
    event SpaceNoLongerForSale(uint indexed spaceIndex);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor() payable {
        // balanceOf[msg.sender] = initialSupply;   // Give the creator all initial tokens
        owner = msg.sender;
        totalSupply = 10000;                        // Update total supply
        spacesRemainingToAssign = totalSupply;
        name = "CRYPTOSPACE";                       // Set the name for display purposes
        symbol = "C";                               // Set the symbol for display purposes
        decimals = 0;                               // Amount of decimals for display purposes
        allInitialOwnersAssigned();
    }

    function setInitialOwner(address to, uint spaceIndex) public {
        if (msg.sender != owner) revert('Error');
        if (allSpacesAssigned) revert('Error');
        if (spaceIndex >= 10000) revert('Error');
        if (spaceIndexToAddress[spaceIndex] != to) {
            if (spaceIndexToAddress[spaceIndex] != address(0)) {
                balanceOf[spaceIndexToAddress[spaceIndex]]--;
            } else {
                spacesRemainingToAssign--;
            }
            spaceIndexToAddress[spaceIndex] = to;
            balanceOf[to]++;
            emit Assign(to, spaceIndex);
        }
    }

    function setInitialOwners(address[] memory addresses, uint[] memory indices) public {
        if (msg.sender != owner) revert('Error');
        uint n = addresses.length;
        for (uint i = 0; i < n; i++) {
            setInitialOwner(addresses[i], indices[i]);
        }
    }

    function allInitialOwnersAssigned() public {
        if (msg.sender != owner) revert('Error');
        allSpacesAssigned = true;
    }

    function getSpace(uint spaceIndex) public {
        if (!allSpacesAssigned) revert('Error');
        if (spacesRemainingToAssign == 0) revert('Error');
        if (spaceIndexToAddress[spaceIndex] != address(0)) revert('Error');
        if (spaceIndex >= 10000) revert('Error');
        spaceIndexToAddress[spaceIndex] = msg.sender;
        balanceOf[msg.sender]++;
        spacesRemainingToAssign--;
        emit Assign(msg.sender, spaceIndex);
    }

    // Transfer ownership of a space to another user without requiring payment
    function transferSpace(address to, uint spaceIndex) public {
        if (!allSpacesAssigned) revert('Error');
        if (spaceIndexToAddress[spaceIndex] != msg.sender) revert('Error');
        if (spaceIndex >= 10000) revert('Error');
        if (spacesOfferedForSale[spaceIndex].isForSale) {
            spaceNoLongerForSale(spaceIndex);
        }
        spaceIndexToAddress[spaceIndex] = to;
        balanceOf[msg.sender]--;
        balanceOf[to]++;
        emit Transfer(msg.sender, to, 1);
        emit SpaceTransfer(msg.sender, to, spaceIndex);
        // Check for the case where there is a bid from the new owner and refund it.
        // Any other bid can stay in place.
        Bid memory bid = spaceBids[spaceIndex];
        if (bid.bidder == to) {
            // Kill bid and refund value
            pendingWithdrawals[to] += bid.value;
            spaceBids[spaceIndex] = Bid(false, spaceIndex, address(0), 0);
        }
    }

    function spaceNoLongerForSale(uint spaceIndex) public {
        if (!allSpacesAssigned) revert('Error');
        if (spaceIndexToAddress[spaceIndex] != msg.sender) revert('Error');
        if (spaceIndex >= 10000) revert('Error');
        spacesOfferedForSale[spaceIndex] = Offer(false, spaceIndex, msg.sender, 0, address(0));
        emit SpaceNoLongerForSale(spaceIndex);
    }

    function offerSpaceForSale(uint spaceIndex, uint minSalePriceInWei) public {
        if (!allSpacesAssigned) revert('Error');
        if (spaceIndexToAddress[spaceIndex] != msg.sender) revert('Error');
        if (spaceIndex >= 10000) revert('Error');
        spacesOfferedForSale[spaceIndex] = Offer(true, spaceIndex, msg.sender, minSalePriceInWei, address(0));
        emit SpaceOffered(spaceIndex, minSalePriceInWei, address(0));
    }

    function offerSpaceForSaleToAddress(uint spaceIndex, uint minSalePriceInWei, address toAddress) public {
        if (!allSpacesAssigned) revert('Error');
        if (spaceIndexToAddress[spaceIndex] != msg.sender) revert('Error');
        if (spaceIndex >= 10000) revert('Error');
        spacesOfferedForSale[spaceIndex] = Offer(true, spaceIndex, msg.sender, minSalePriceInWei, toAddress);
        emit SpaceOffered(spaceIndex, minSalePriceInWei, toAddress);
    }

    function buySpace(uint spaceIndex) public payable {
        if (!allSpacesAssigned) revert('Error');
        Offer memory offer = spacesOfferedForSale[spaceIndex];
        if (spaceIndex >= 10000) revert('Error');
        if (!offer.isForSale) revert('Error');                // space not actually for sale
        if (offer.onlySellTo != address(0) && offer.onlySellTo != msg.sender) revert('Error');  // space not supposed to be sold to this user
        if (msg.value < offer.minValue) revert('Error');      // Didn't send enough ETH
        if (offer.seller != spaceIndexToAddress[spaceIndex]) revert('Error'); // Seller no longer owner of space

        address seller = offer.seller;

        spaceIndexToAddress[spaceIndex] = msg.sender;
        balanceOf[seller]--;
        balanceOf[msg.sender]++;
        emit Transfer(seller, msg.sender, 1);

        spaceNoLongerForSale(spaceIndex);
        pendingWithdrawals[seller] += msg.value;
        emit SpaceBought(spaceIndex, msg.value, seller, msg.sender);

        // Check for the case where there is a bid from the new owner and refund it.
        // Any other bid can stay in place.
        Bid memory bid = spaceBids[spaceIndex];
        if (bid.bidder == msg.sender) {
            // Kill bid and refund value
            pendingWithdrawals[msg.sender] += bid.value;
            spaceBids[spaceIndex] = Bid(false, spaceIndex, address(0), 0);
        }
    }

    function withdraw() public {
        if (!allSpacesAssigned) revert('Error');
        uint amount = pendingWithdrawals[msg.sender];
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function enterBidForSpace(uint spaceIndex) public payable {
        if (spaceIndex >= 10000) revert('Error');
        if (!allSpacesAssigned) revert('Error');
        if (spaceIndexToAddress[spaceIndex] == address(0)) revert('Error');
        if (spaceIndexToAddress[spaceIndex] == msg.sender) revert('Error');
        if (msg.value == 0) revert('Error');
        Bid memory existing = spaceBids[spaceIndex];
        if (msg.value <= existing.value) revert('Error');
        if (existing.value > 0) {
            // Refund the failing bid
            pendingWithdrawals[existing.bidder] += existing.value;
        }
        spaceBids[spaceIndex] = Bid(true, spaceIndex, msg.sender, msg.value);
        emit SpaceBidEntered(spaceIndex, msg.value, msg.sender);
    }

    function acceptBidForSpace(uint spaceIndex, uint minPrice) public {
        if (spaceIndex >= 10000) revert('Error');
        if (!allSpacesAssigned) revert('Error');
        if (spaceIndexToAddress[spaceIndex] != msg.sender) revert('Error');
        address seller = msg.sender;
        Bid memory bid = spaceBids[spaceIndex];
        if (bid.value == 0) revert('Error');
        if (bid.value < minPrice) revert('Error');

        spaceIndexToAddress[spaceIndex] = bid.bidder;
        balanceOf[seller]--;
        balanceOf[bid.bidder]++;
        emit Transfer(seller, bid.bidder, 1);

        spacesOfferedForSale[spaceIndex] = Offer(false, spaceIndex, bid.bidder, 0, address(0));
        uint amount = bid.value;
        spaceBids[spaceIndex] = Bid(false, spaceIndex, address(0), 0);
        pendingWithdrawals[seller] += amount;
        emit SpaceBought(spaceIndex, bid.value, seller, bid.bidder);
    }

    function withdrawBidForSpace(uint spaceIndex) public {
        if (spaceIndex >= 10000) revert('Error');
        if (!allSpacesAssigned) revert('Error');
        if (spaceIndexToAddress[spaceIndex] == address(0)) revert('Error');
        if (spaceIndexToAddress[spaceIndex] == msg.sender) revert('Error');
        Bid memory bid = spaceBids[spaceIndex];
        if (bid.bidder != msg.sender) revert('Error');
        emit SpaceBidWithdrawn(spaceIndex, bid.value, msg.sender);
        uint amount = bid.value;
        spaceBids[spaceIndex] = Bid(false, spaceIndex, address(0), 0);
        // Refund the bid money
        payable(msg.sender).transfer(amount);
    }

}
