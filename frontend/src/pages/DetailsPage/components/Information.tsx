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
import SaleModal from '../SaleModal';
import BidModal from '../BidModal';

const Information: React.FC<ISpaceProps> = (props: any) => {
  const { active, connector, account, library } = useWallet();
  const { data } = props;
  const emptyAddress = '0x0000000000000000000000000000000000000000';
  const [spaceInfo, setSpaceInfo] = useState({
    owner: emptyAddress
  });
  const [isSale, setIsSale] = useState(false);
  const [isBid, setIsBid] = useState(false);

  useEffect(() => {
    getOwner();
  }, [connector, data.id]);

  const getOwner = async () => {
    if (connector) {
      const contract = await getContract(connector);
      const owner = await contract.methods.spaceIndexToAddress(data.id).call();
      setSpaceInfo({ owner });
    }
  };
  const handleClaim = async () => {
    const contract = await getContract(connector);
    await contract.methods
      .setInitialOwner(account, data.id)
      .send({ from: account })
      .on('receipt', async () => {
        alert('Claim success');
        getOwner();
      });
  };

  const handleOfferForSale = async (value: any) => {
    const contract = await getContract(connector);
    await contract.methods
      .offerSpaceForSale(data.id, library.utils.toWei(value, 'ether'))
      .send({ from: account })
      .on('receipt', async () => {
        alert('Offer success');
      });
  };

  // const handleBid = async (value: any) => {
  //   const contract = await getContract(connector);
  //   await contract.methods
  //     .offerSpaceForSale(data.id, library.utils.toWei(value, 'ether'))
  //     .send({ from: account })
  //     .on('receipt', async () => {
  //       alert('Offer success');
  //     });
  // };

  const handleBuySpace = async () => {
    const contract = await getContract(connector);
    await contract.methods
      .buySpace(data.id)
      .send({ from: account })
      .on('receipt', async () => {
        alert('Buy success');
      });
  };
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
        {spaceInfo.owner !== emptyAddress ? (
          <>
            address{' '}
            <Link href='/'>
              <LinkText>{spaceInfo.owner.slice(0, 8)}</LinkText>
            </Link>
          </>
        ) : (
          ' no one'
        )}
        .
      </StyledText>
      <StyledText>
        This space is currently for sale by owner for {data.price} ETH ($
        {data.price * 2500} USD).
      </StyledText>
      {data.bid !== '0' && (
        <StyledText>
          There is a bid of {data.bid} ETH (${data.bid * 2500} USD) for this space from{' '}
          <Link href='/'>
            <LinkText>0x72fae9</LinkText>
          </Link>
          .
        </StyledText>
      )}
      {isSale && (
        <SaleModal
          setOpenModal={setIsSale}
          visible={isSale}
          handleOfferForSale={handleOfferForSale}
        />
      )}
      {isBid && <BidModal setOpenModal={setIsBid} visible={isBid} />}

      {active && (
        <>
          <StyledButton $bgType='primary' onClick={handleClaim}>
            <PlusSquareOutlined /> Claim
          </StyledButton>
          <StyledButton $bgType='primary'>
            <RetweetOutlined /> Transfer
          </StyledButton>
          <StyledButton
            $bgType='primary'
            onClick={() => {
              setIsSale(true);
            }}
          >
            <EditOutlined /> Offer for Sale
          </StyledButton>
          <StyledButton $bgType='primary' onClick={handleBuySpace}>
            <ShoppingCartOutlined /> Buy
          </StyledButton>
          <StyledButton $bgType='primary' onClick={() => setIsBid(true)}>
            <TagOutlined /> Bid
          </StyledButton>
          <StyledButton $bgType='primary'>
            <CreditCardOutlined /> Withdraw Bid
          </StyledButton>
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
