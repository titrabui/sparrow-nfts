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

const RecentTransactions: React.FC = () => {
  return (
    <Box w='1200px' m='auto'>
      <Row justify='center' gutter={[0, 24]}>
        <Box w='100%' mt='50px'>
          <Title>Recent Transactions</Title>
          <UpdateTime>Updated 32 seconds ago</UpdateTime>
        </Box>
      </Row>
      <Box w='100%' mt='30px'>
        <Row justify='center' gutter={[0, 24]}>
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
              <Text $size='20px' $color='#8D8D8D' block>
                Offered for
              </Text>
              <Text $size='20px' $color='#4B4B4B' block>
                4.2KΞ ($7.57M)
              </Text>
            </Col>
          ))}
        </Row>
      </Box>
    </Box>
  );
};

const Title = styled(Text)`
  font-size: 36px;
  font-weight: bold;
  display: block;
`;

const UpdateTime = styled(Text)`
  font-size: 18px;
  margin-bottom: 20px;
`;

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

export default RecentTransactions;
