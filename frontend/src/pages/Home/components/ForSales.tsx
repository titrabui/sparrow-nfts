import React from 'react';
import { Col, Row, Select as AntdSelect } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import img1 from 'assets/images/028-astronaut.svg';
import img2 from 'assets/images/055-asteroid.svg';
import img3 from 'assets/images/035-meteor.svg';
import img4 from 'assets/images/068-solar-system-2.svg';
import img5 from 'assets/images/032-alien.svg';
import img6 from 'assets/images/029-dog.svg';

const ForSales: React.FC = () => {
  return (
    <Box w='1200px' m='auto'>
      <Row justify='center' gutter={[0, 24]}>
        <Box w='100%' mt='100px' mb='40px'>
          <Text $size='36px' strong block>
            For Sales
          </Text>
          <Text $size='18px' block>
            The lowest price punk currently for sale is
            <Text $size='18px' strong style={{ marginLeft: 10 }}>
              19.9 ETH ($37,303.75 USD).
            </Text>
          </Text>
          <Text $size='18px' block>
            Showing most recent offers
            <Text $size='18px' style={{ marginLeft: 10 }} $color='#0080FF'>
              <a href='/'>click here to see all 1,510</a>
            </Text>
          </Text>
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

export default ForSales;

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
