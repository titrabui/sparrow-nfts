import React from 'react';
import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import { Spaces } from 'utils/spaces';

const LargestSales: React.FC = () => {
  return (
    <Box w='1050px' m='auto'>
      <Row justify='center' gutter={[0, 24]}>
        <StyledSpace>
          <Title>
            Largest Sales
            <LinkText>
              <a href='/'>See all top sales</a>
            </LinkText>
          </Title>
        </StyledSpace>
      </Row>
      <ItemsContainer justify='center' gutter={[0, 24]}>
        <ItemsLargestSales />
      </ItemsContainer>
    </Box>
  );
};

const Title = styled(Text)`
  font-size: 36px;
  font-weight: bold;
`;

const LinkText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${(p) => p.theme.primary};
  margin-left: 15px;
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

const StyledSpace = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  margin-top: 60px;
`;

const ItemsContainer = styled(Row)`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export default LargestSales;

const ItemsLargestSales = () => {
  return (
    <>
      {Spaces.map((item) => (
        <Col span={4}>
          <ImageContainer>
            <ImageNumber $size='30px' $color='white' strong>
              {item.id.length > 1 ? item.id : `0${item.id}`}
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
