import React from 'react';
import MainContainer from 'ui/MainContainer';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import BreadCrumb from 'ui/Breadcrumb';

const Bids: React.FC = () => (
  <MainContainer>
    <BreadCrumb crumbs={['Current Bids']} />
    <Box w='1050px' m='40px auto 0'>
      <BigTitle>Current Bids</BigTitle>
      <ItemsContainer justify='center' gutter={[0, 10]}>
        <ItemsLargestSales />
        <ItemsLargestSales />
        <ItemsLargestSales />
      </ItemsContainer>
    </Box>
  </MainContainer>
);

const ItemsContainer = styled(Row)`
  margin-top: 30px;
  margin-bottom: 50px;
`;

const BigTitle = styled(Text)`
  font-size: 45px;
  font-weight: bold;
  display: block;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 90px;
  background-color: #8e6fb6;
  position: relative;
  margin-bottom: 5px;
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

export default Bids;

const ItemsLargestSales = () => (
  <>
    {Spaces.map((space) => (
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
