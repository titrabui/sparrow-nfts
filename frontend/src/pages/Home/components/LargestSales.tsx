import React from 'react';
import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';

const LargestSales: React.FC = () => (
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

const StyledText = styled(Text)`
  display:block;
`

export default LargestSales;

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
        <StyledText $size='24px' strong $color='#0C264D' >
          #028
        </StyledText>
        <StyledText $size='20px' $color='#4B4B4B' >
          4.2KΞ ($7.57M)
        </StyledText>
        <StyledText $size='20px' $color='#8D8D8D' >
          Mar 11, 2021
        </StyledText>
      </Col>
    ))}
  </>
);
