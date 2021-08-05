import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import img1 from 'assets/images/028-astronaut.svg';
import img2 from 'assets/images/055-asteroid.svg';
import img3 from 'assets/images/035-meteor.svg';
import img4 from 'assets/images/068-solar-system-2.svg';
import img5 from 'assets/images/032-alien.svg';
import img6 from 'assets/images/029-dog.svg';

const Bids: React.FC = () => {
  return (
    <Box w='1200px' m='auto'>
      <Row justify='center' gutter={[0, 24]}>
        <Box w='100%' mt='100px' mb='40px'>
          <Title>Bids</Title>
          <StyledText>
            The average bid over the last year was
            <HightlightText>26.25 ETH ($49,214.19 USD).</HightlightText>
          </StyledText>
          <StyledText>
            The average currently open bid is
            <HightlightText>4.24 ETH ($7,948.00 USD).</HightlightText>
          </StyledText>
          <StyledText>
            Total value of all current bids is
            <HightlightText>3,120.59 ETH ($5,849,726.91 USD).</HightlightText>
          </StyledText>
          <StyledText>
            Showing most recent bids
            <LinkText>
              <a href='/'>click here to see all 736</a>
            </LinkText>
          </StyledText>
        </Box>
      </Row>
      <ItemsContainer>
        <Items />
      </ItemsContainer>
    </Box>
  );
};

const ItemsContainer = styled.div`
  width: 100%;
  height: 360px;
  background-color: #dfdbe8;
  padding: 30px 50px;
`;

const ItemsRow = styled(Row)`
  margin: 15px 0;
  text-align: center;
  .ant-col {
    width: 100px;
    img {
      margin: 0 auto;
      cursor: pointer;
    }
  }
`;

const Title = styled(Text)`
  font-size: 36px;
  font-weight: bold;
  display: block;
`;

const StyledText = styled(Text)`
  font-size: 18px;
  display: block;
`;

const HightlightText = styled(Text)`
  font-size: 18px;
  margin-left: 10px;
  font-weight: bold;
`;

const LinkText = styled(Text)`
  font-size: 18px;
  margin-left: 10px;
  color: ${(p) => p.theme.primary};
`;

export default Bids;

const Items = () => {
  return (
    <>
      {[0, 1, 2, 3].map((item) => (
        <ItemsRow gutter={[0, 10]}>
          <Col span={2}>
            <img src={img1} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img2} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img3} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img4} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img5} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img6} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img4} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img2} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img1} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img5} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img6} alt='x' width='60px' height='60px' />
          </Col>
          <Col span={2}>
            <img src={img3} alt='x' width='60px' height='60px' />
          </Col>
        </ItemsRow>
      ))}
    </>
  );
};