import React from 'react';
import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import img1 from 'assets/images/028-astronaut.svg';
import img2 from 'assets/images/055-asteroid.svg';
import img3 from 'assets/images/035-meteor.svg';
import img4 from 'assets/images/068-solar-system-2.svg';
import img5 from 'assets/images/032-alien.svg';
import img6 from 'assets/images/029-dog.svg';

const LargestSales: React.FC = () => {
  return (
    <Box w='1200px' m='auto'>
      <Row justify='center' gutter={[0, 24]}>
        <StyledSpace style={{ marginTop: 60 }}>
          <Text $size='36px' strong>
            Largest Sales
            <Text $size='20px' strong $color='#0080FF' style={{ marginLeft: 15 }}>
              <a href='/'>See all top sales</a>
            </Text>
          </Text>
        </StyledSpace>
      </Row>
      <Row justify='center' gutter={[0, 24]} style={{ marginTop: 20 }}>
        <ItemsLargestSales />
      </Row>
      <Row justify='center' gutter={[0, 24]} style={{ marginTop: 50 }}>
        <ItemsLargestSales />
      </Row>
    </Box>
  );
};

const ImageContainer = styled.div`
  width: 90%;
  height: 180px;
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
    width: 140px;
    height: 140px;
  }
`;

const StyledSpace = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
`;

export default LargestSales;

const ItemsLargestSales = () => {
  return (
    <>
      {[
        { id: 1, img: img1 },
        { id: 2, img: img2 },
        { id: 3, img: img3 },
        { id: 4, img: img4 },
        { id: 5, img: img5 },
        { id: 6, img: img6 }
      ].map((item) => (
        <Col span={4}>
          <ImageContainer>
            <ImageNumber $size='32px' $color='white' strong>
              0{item.id}
            </ImageNumber>
            <ImageWrapper>
              <img src={item.img} alt={`img${item.id}`} />
            </ImageWrapper>
          </ImageContainer>
          <Text $size='24px' strong $color='#0C264D' block>
            #028
          </Text>
          <Text $size='20px' $color='#4B4B4B' block>
            4.2KΞ ($7.57M)
          </Text>
          <Text $size='20px' $color='#8D8D8D' block>
            Mar 11, 2021
          </Text>
        </Col>
      ))}
    </>
  );
};
