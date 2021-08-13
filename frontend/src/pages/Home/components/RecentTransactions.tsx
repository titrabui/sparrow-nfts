import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';

const RecentTransactions: React.FC = () => (
  <Box w='1050px' m='auto'>
    <Row justify='center' gutter={[0, 24]}>
      <Box w='100%' mt='50px'>
        <Title>Recent Transactions</Title>
        <UpdateTime>Updated 32 seconds ago</UpdateTime>
      </Box>
    </Row>
    <Box w='100%' mt='30px'>
      <Row justify='center' gutter={[0, 24]}>
        {Spaces.slice(0, 6).map((space) => (
          <Col span={4} key={space.id}>
            <ImageContainer>
              <ImageNumber $size='30px' $color='white' strong>
                0{space.id}
              </ImageNumber>
              <ImageWrapper>
                <Link to={`/detail/${space.id}`}>
                  <img src={space.img} alt={`img${space.id}`} />
                </Link>
              </ImageWrapper>
            </ImageContainer>
            <StyledText $size='24px' strong $color='#0C264D' >
              #028
            </StyledText>
            <StyledText $size='20px' $color='#8D8D8D' >
              Offered for
            </StyledText>
            <StyledText $size='20px' $color='#4B4B4B' >
              4.2KΞ ($7.57M)
            </StyledText>
          </Col>
        ))}
      </Row>
    </Box>
  </Box>
);

const StyledText = styled(Text)`
  display:block;
`

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
    height: 130px;
  }
`;

export default RecentTransactions;
