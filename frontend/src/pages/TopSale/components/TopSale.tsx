import React from 'react';
import MainContainer from 'ui/MainContainer';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import BreadCrumb from 'ui/Breadcrumb';

const TopSale: React.FC = () => (
  <MainContainer>
    <BreadCrumb crumbs={['Top Sales by ETH']} />
    <Box w='1050px' m='35px auto 0'>
      <BigTitle>Top Sales by Ether Value</BigTitle>
      <ItemsContainer justify='center' gutter={[0, 24]}>
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
  width: 85%;
  height: 150px;
  background-color: #dfdbe8;
  position: relative;
  margin-bottom: 20px;
`;

const ImageNumber = styled(Text)`
  position: absolute;
  left: 8px;
  top: 2px;
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
    width: 105px;
    height: 105px;
  }
`;

const StyledText = styled(Text)`
  display: block;
`;

export default TopSale;

const ItemsLargestSales = () => (
  <>
    {Spaces.map((space) => (
      <Col span={4} key={space.id}>
        <ImageContainer>
          <ImageNumber $size='30px' $color='white' strong>
            {space.id > 9 ? space.id : `0${space.id}`}
          </ImageNumber>
          <ImageWrapper>
            <Link to={`/detail/${space.id}`}>
              <img src={space.img} alt={`img${space.id}`} />
            </Link>
          </ImageWrapper>
        </ImageContainer>
        <StyledText $size='20px' strong $color='#0C264D'>
          #028
        </StyledText>
        <StyledText $size='18px' $color='#4B4B4B'>
          4.2KΞ ($7.57M)
        </StyledText>
        <StyledText $size='18px ' $color='#8D8D8D'>
          Mar 11, 2021
        </StyledText>
      </Col>
    ))}
  </>
);
