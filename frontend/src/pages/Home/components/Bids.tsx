import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';

const Bids: React.FC = () => (
  <Box w='1050px' m='auto'>
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
            <Link to='/bids'>click here to see all 736</Link>
          </LinkText>
        </StyledText>
      </Box>
    </Row>
    <ItemsContainer>
      <Items />
    </ItemsContainer>
  </Box>
);

const ItemsContainer = styled.div`
  width: 100%;
  height: 360px;
  background-color: #8e6fb6;
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
  font-weight: bold;
`;

export default Bids;

const Items = () => (
  <>
    {[0, 1, 2, 3].map((item) => (
      <ItemsRow gutter={[0, 10]} key={item}>
        {Spaces.map((space) => (
          <Col span={2} key={space.id}>
            <Link to={`/detail/${space.id}`}>
              <img src={space.img} alt={space.name} width='60px' height='60px' />
            </Link>
          </Col>
        ))}
      </ItemsRow>
    ))}
  </>
);
