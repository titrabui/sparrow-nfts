import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';

const ForSales: React.FC = () => (
  <Box w='1050px' m='auto'>
    <Row justify='center' gutter={[0, 24]}>
      <Box w='100%' mt='100px' mb='40px'>
        <Title>For Sales</Title>
        <StyledText>
          The lowest price space currently for sale is
          <HightlightText>19.9 ETH ($37,303.75 USD).</HightlightText>
        </StyledText>
        <StyledText>
          Showing most recent offers
          <LinkText>
            <a href='/'>click here to see all 1,510</a>
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
  font-weight: bold;
`;

export default ForSales;

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
