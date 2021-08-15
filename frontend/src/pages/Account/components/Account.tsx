import React from 'react';
import MainContainer from 'ui/MainContainer';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import BreadCrumb from 'ui/Breadcrumb';

const Account: React.FC = (props: any) => {
  const id = (props as any)?.match?.params?.id;
  return (
    <MainContainer>
      <BreadCrumb crumbs={['Accounts', id.slice(0, 10)]} />
      <Box w='1050px' m='40px auto 0'>
        <BigTitle>Account Details</BigTitle>
        <SmallTitle>{id}</SmallTitle>
        <Row justify='center' gutter={[0, 15]}>
          <Col span={8}>
            <Title>Etherscan</Title>
            <a href={`https://etherscan.io/tx/${id}`} target='blank'>
              <LinkText>{id.slice(0, 20)}</LinkText>
            </a>
          </Col>
          <Col span={8}>
            <Title>Total Punks Owned</Title>
            <Value>0</Value>
          </Col>
          <Col span={8}>
            <Title>Last Active</Title>
            <Value>3 days ago</Value>
          </Col>
          <Col span={8}>
            <Title>Total Amount Spent Buying Punks</Title>
            <Value>0.00Ξ ($0.00)</Value>
          </Col>
          <Col span={8}>
            <Title>Bids On Owned Punks</Title>
            <Value>0</Value>
          </Col>
          <Col span={8}>
            <Title>Value of Bids On Owned Punks</Title>
            <Value>0.00Ξ ($0.00)</Value>
          </Col>
          <Col span={8}>
            <Title>Total Amount Earned Selling Punks</Title>
            <Value>0.00Ξ ($0.00)</Value>
          </Col>
          <Col span={8}>
            <Title>Current Bids Placed By This Account</Title>
            <Value>1</Value>
          </Col>
          <Col span={8}>
            <Title>Value of Current Bids Placed</Title>
            <Value>0.11Ξ ($360)</Value>
          </Col>
        </Row>

        <StyledSpace style={{ marginTop: 60 }}>
          <SpaceTitle>0 Punks Owned</SpaceTitle>
          <Content />
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>0 Punks for Sale by this Account</SpaceTitle>
          <Content />
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>0 in 0 Bids For Punks Owned by this Account</SpaceTitle>
          <Content />
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>0.11 ETH ($359.97 USD) in 1 Bid Placed by This Account</SpaceTitle>
          <Content>
            <ItemsContainer justify='start' gutter={[0, 10]}>
              <ItemsLargestSales />
            </ItemsContainer>
          </Content>
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>0 in 0 Punk Bought by This Account</SpaceTitle>
          <Content />
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>0 in 0 Punk Sold by This Account</SpaceTitle>
          <Content />
        </StyledSpace>
      </Box>
    </MainContainer>
  );
};

const Content = styled.div`
  min-height: 70px;
`;

const StyledSpace = styled.div`
  width: 100%;
`;

const SpaceTitle = styled(Text)`
  font-size: 22px;
  display: block;
  font-weight: bold;
  border-bottom: 1px solid #bbb;
  width: 100%;
`;

const ItemsContainer = styled(Row)`
  margin: 30px 0;
`;

const BigTitle = styled(Text)`
  font-size: 45px;
  font-weight: bold;
  display: block;
`;

const Title = styled(Text)`
  font-size: 18px;
  display: block;
`;

const Value = styled(Text)`
  font-size: 18px;
  display: block;
  font-weight: bold;
`;

const SmallTitle = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  display: block;
  margin-bottom: 30px;
`;

const LinkText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${(p) => p.theme.primary};
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 90px;
  background-color: #8e6fb6;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  text-align: center;
  bottom: 3px;
  img {
    width: 70px;
    height: 70px;
  }
`;

const StyledText = styled(Text)`
  display: block;
  text-align: center;
`;

export default Account;

const ItemsLargestSales = () => (
  <>
    {Spaces.slice(0, 1).map((space) => (
      <Col span={2} key={space.id}>
        <ImageContainer>
          <ImageWrapper>
            <Link to={`/detail/${space.id}`}>
              <img src={space.img} alt={`img${space.id}`} />
            </Link>
          </ImageWrapper>
        </ImageContainer>
        <StyledText $size='14px' $color='#4B4B4B'>
          4.2KΞ
        </StyledText>
        <StyledText $size='14px' $color='#4B4B4B'>
          ($7.57M)
        </StyledText>
      </Col>
    ))}
  </>
);
