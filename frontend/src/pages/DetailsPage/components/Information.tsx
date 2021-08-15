/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import Box from 'ui/Box';
import Button from 'ui/Button';
import { Link, Text } from 'ui/Typography';
import styled from 'styled-components';
import {
  ShoppingCartOutlined,
  PlusSquareOutlined,
  RetweetOutlined,
  TagOutlined,
  EditOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import useWallet from 'hooks/useWallet';
import { ISpaceProps } from 'types/SpaceProps';
import { getContract } from 'utils/getContract';
import { notification } from 'antd';
import SaleModal from '../SaleModal';
import BidModal from '../BidModal';
import AcceptBidModal from '../AcceptBidModal';
import TransferModal from '../TransferModal';

const Information: React.FC<ISpaceProps> = (props: any) => {
  const { active, connector, account, library } = useWallet();
  const { data } = props;
  const emptyAddress = '0x0000000000000000000000000000000000000000';
  const [spaceInfo, setSpaceInfo] = useState({
    owner: emptyAddress,
    isForSale: false,
    price: 0,
    onlySellTo: emptyAddress,
    hasBid: false,
    bidder: emptyAddress,
    bidValue: 0
  });
  const [isSale, setIsSale] = useState(false);
  const [isBid, setIsBid] = useState(false);
  const [isAcceptBid, setIsAcceptBid] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const handleError = (err: any) => {
    const ERROR_REGEX = /reason string \'(.+?)\'\",\"data/g;
    const results = ERROR_REGEX.exec(err.message);
    if (results && results.length >= 2) {
      const errorMessage = results[1];
      notification.error({
        message: 'Error',
        description: errorMessage
      });
    } else
      notification.error({
        message: 'Error',
        description: 'Transaction faileds'
      });
  };

  useEffect(() => {
    let mounted = true;
    const getBlockchainData = async () => {
      if (connector) {
        const contract = await getContract(connector);
        const owner = await contract.methods.spaceIndexToAddress(data.id).call();
        const spacesOfferedForSale = await contract.methods.spacesOfferedForSale(data.id).call();
        const spaceBids = await contract.methods.spaceBids(data.id).call();
        const { isForSale, minValue, onlySellTo } = spacesOfferedForSale;
        const { hasBid, bidder, value } = spaceBids;
        if (mounted)
          setSpaceInfo({
            owner,
            isForSale,
            price: minValue,
            onlySellTo,
            hasBid,
            bidder,
            bidValue: value
          });
      }
    };
    getBlockchainData();
    return () => {
      mounted = false;
    };
  });

  const handleClaim = async () => {
    const contract = await getContract(connector);
    try {
      await contract.methods
        .getSpace(data.id)
        .send({ from: account })
        .on('receipt', async () => {
          notification.success({
            message: 'Claim Space',
            description: 'Claim Space Success'
          });
        });
    } catch (e) {
      handleError(e);
    }
  };

  const handleOfferForSale = async (value: any) => {
    const contract = await getContract(connector);
    try {
      await contract.methods
        .offerSpaceForSale(data.id, library.utils.toWei(value, 'ether'))
        .send({ from: account })
        .on('receipt', async () => {
          notification.success({
            message: 'Offer For Sale',
            description: 'Offer For Sale Success'
          });
        });
    } catch (e) {
      handleError(e);
    }
  };

  const handleOfferForSaleToAddress = async (value: string, toAddress: string) => {
    const contract = await getContract(connector);
    try {
      await contract.methods
        .offerSpaceForSaleToAddress(data.id, library.utils.toWei(value, 'ether'), toAddress)
        .send({ from: account })
        .on('receipt', async () => {
          notification.success({
            message: 'Offer For Sale',
            description: 'Offer For Sale Success'
          });
        });
    } catch (e) {
      handleError(e);
    }
  };

  const handleBid = async (value: any) => {
    const contract = await getContract(connector);
    try {
      await contract.methods
        .enterBidForSpace(data.id)
        .send({ from: account, value: library.utils.toWei(value, 'ether') })
        .on('receipt', async () => {
          notification.success({
            message: 'Bid Space',
            description: 'Bid Space Success'
          });
        });
    } catch (e) {
      handleError(e);
    }
  };

  const handleAcceptBid = async (value: any) => {
    const contract = await getContract(connector);
    try {
      await contract.methods
        .acceptBidForSpace(data.id, library.utils.toWei(value, 'ether'))
        .send({ from: account })
        .on('receipt', async () => {
          notification.success({
            message: 'Accept Bid',
            description: 'Accept Bid Success'
          });
        });
    } catch (e) {
      handleError(e);
    }
  };

  const handleWithdrawBid = async () => {
    const contract = await getContract(connector);
    try {
      await contract.methods
        .withdrawBidForSpace(data.id)
        .send({ from: account })
        .on('receipt', async () => {
          notification.success({
            message: 'Withdraw Bid',
            description: 'Withdraw Bid Success'
          });
        });
    } catch (e) {
      handleError(e);
    }
  };

  const handleBuySpace = async () => {
    const contract = await getContract(connector);
    try {
      await contract.methods
        .buySpace(data.id)
        .send({ from: account, value: price })
        .on('receipt', async () => {
          notification.success({
            message: 'Buy Space',
            description: 'Buy Space Success'
          });
        });
    } catch (e) {
      handleError(e);
    }
  };

  const handleTransferSpace = async (to: string) => {
    const contract = await getContract(connector);
    try {
      await contract.methods
        .transferSpace(to, data.id)
        .send({ from: account })
        .on('receipt', async () => {
          notification.success({
            message: 'Transfer Space',
            description: 'Transfer Space Success'
          });
        });
    } catch (e) {
      handleError(e);
    }
  };

  const { owner, isForSale, price, hasBid, bidValue, bidder } = spaceInfo;

  return (
    <Box w='900px' m='40px auto 0'>
      <BigTitle>{data.name}</BigTitle>
      <Type>
        One of {data.type === 'Device' ? 5 : 7}
        <Link href='/'>
          <LinkText> {data.type} </LinkText>
        </Link>
        space.
      </Type>
      <SmallTitle>Current Market Status</SmallTitle>
      <StyledText>
        This space is currently owned by{' '}
        {owner !== emptyAddress ? (
          <>
            address{' '}
            <Link href='/'>
              <LinkText>{owner.slice(0, 8)}</LinkText>
            </Link>
          </>
        ) : (
          ' no one'
        )}
        .
      </StyledText>
      {isForSale ? (
        <StyledText>
          This space is currently for sale by owner for{' '}
          {library && library.utils.fromWei(price.toString(), 'ether')} ETH ($
          {library && library.utils.fromWei(price.toString(), 'ether') * 3000}).
        </StyledText>
      ) : (
        <StyledText>This space has not been listed for sale by its owner.</StyledText>
      )}
      {hasBid ? (
        <StyledText>
          There is a bid of {library && library.utils.fromWei(bidValue.toString(), 'ether')} ETH ($
          {library && library.utils.fromWei(bidValue.toString(), 'ether') * 3000}) for this space
          from{' '}
          <Link href='/'>
            <LinkText>{bidder && bidder.slice(0, 8)}</LinkText>
          </Link>
          .
        </StyledText>
      ) : (
        <StyledText>There are currently no bids on this space.</StyledText>
      )}

      {isSale && (
        <SaleModal
          setOpenModal={setIsSale}
          visible={isSale}
          handleOfferForSale={handleOfferForSale}
          handleOfferForSaleToAddress={handleOfferForSaleToAddress}
        />
      )}
      {isAcceptBid && (
        <AcceptBidModal
          setOpenModal={setIsAcceptBid}
          visible={isAcceptBid}
          handleAcceptBid={handleAcceptBid}
        />
      )}
      {isTransfer && (
        <TransferModal
          setOpenModal={setIsTransfer}
          visible={isTransfer}
          handleTransferSpace={handleTransferSpace}
        />
      )}
      {isBid && <BidModal setOpenModal={setIsBid} visible={isBid} handleBid={handleBid} />}

      {active && (
        <>
          {owner === emptyAddress && (
            <StyledButton $bgType='primary' onClick={handleClaim}>
              <PlusSquareOutlined /> Claim
            </StyledButton>
          )}

          {account === owner && (
            <StyledButton $bgType='primary' onClick={() => setIsTransfer(true)}>
              <RetweetOutlined /> Transfer
            </StyledButton>
          )}

          {account === owner && (
            <StyledButton
              $bgType='primary'
              onClick={() => {
                setIsSale(true);
              }}
            >
              <EditOutlined /> Offer for Sale
            </StyledButton>
          )}

          {account !== owner && isForSale && (
            <StyledButton $bgType='primary' onClick={handleBuySpace}>
              <ShoppingCartOutlined /> Buy
            </StyledButton>
          )}

          {account !== owner && owner !== emptyAddress && (
            <StyledButton $bgType='primary' onClick={() => setIsBid(true)}>
              <TagOutlined /> Bid
            </StyledButton>
          )}

          {account === owner && hasBid && (
            <StyledButton $bgType='primary' onClick={() => setIsAcceptBid(true)}>
              <TagOutlined /> Accept Bid
            </StyledButton>
          )}

          {account === bidder && (
            <StyledButton
              $bgType='primary'
              onClick={() => {
                handleWithdrawBid();
              }}
            >
              <CreditCardOutlined /> Withdraw Bid
            </StyledButton>
          )}
        </>
      )}
      <SmallTitle>Transaction History</SmallTitle>
    </Box>
  );
};

const StyledButton = styled(Button)`
  color: ${(p) => p.theme.surface};
  width: 500px;
  height: 40px;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  margin-top: 15px;
  .anticon {
    font-size: 18px;
    margin-right: 5px;
  }
`;

const StyledText = styled(Text)`
  font-size: 18px;
  display: block;
  margin: 5px 0;
`;

const BigTitle = styled(Text)`
  font-size: 45px;
  font-weight: bold;
  display: block;
`;

const SmallTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  display: block;
  margin: 30px 0 15px;
`;

const Type = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  display: block;
`;

const LinkText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${(p) => p.theme.primary};
`;

export default Information;
