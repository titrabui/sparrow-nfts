import React from 'react';
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

const Information: React.FC<ISpaceProps> = (props: any) => {
  const { active } = useWallet();
  return (
    <Box w='900px' m='40px auto 0'>
      <BigTitle>{props.data.name}</BigTitle>
      <Type>
        One of {props.data.type === 'Device' ? 5 : 7}
        <Link href='/'>
          <LinkText> {props.data.type} </LinkText>
        </Link>
        space.
      </Type>
      <SmallTitle>Current Market Status</SmallTitle>
      <StyledText>
        This space is currently owned by address{' '}
        <Link href='/'>
          <LinkText>{props.data.owner}</LinkText>
        </Link>
        .
      </StyledText>
      <StyledText>
        This space is currently for sale by owner for {props.data.price} ETH ($
        {props.data.price * 2500} USD).
      </StyledText>
      {props.data.bid !== '0' && (
        <StyledText>
          There is a bid of {props.data.bid} ETH (${props.data.bid * 2500} USD) for this space from{' '}
          <Link href='/'>
            <LinkText>0x72fae9</LinkText>
          </Link>
          .
        </StyledText>
      )}
      {active && (
        <>
          <StyledButton $bgType='highlight'>
            <PlusSquareOutlined /> Claim
          </StyledButton>
          <StyledButton $bgType='highlight'>
            <RetweetOutlined /> Transfer
          </StyledButton>
          <StyledButton $bgType='highlight'>
            <EditOutlined /> Offer for Sale
          </StyledButton>
          <StyledButton $bgType='highlight'>
            <ShoppingCartOutlined /> Buy
          </StyledButton>
          <StyledButton $bgType='highlight'>
            <TagOutlined /> Bid
          </StyledButton>
          <StyledButton $bgType='highlight'>
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
  color: ${(p) => p.theme.highlight};
`;

export default Information;
