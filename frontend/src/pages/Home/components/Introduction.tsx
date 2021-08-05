import React from 'react';
import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import Box from 'ui/Box';
import banner1 from 'assets/images/banner1.svg';
import img1 from 'assets/images/028-astronaut.svg';
import img2 from 'assets/images/055-asteroid.svg';
import img3 from 'assets/images/035-meteor.svg';
import img4 from 'assets/images/068-solar-system-2.svg';
import img5 from 'assets/images/032-alien.svg';
import img6 from 'assets/images/029-dog.svg';

const Introduction: React.FC = () => {
  return (
    <>
      <Box w='1200px' m='auto'>
        <Row justify='center' gutter={[0, 24]}>
          <StyledSpace>
            <Button
              $bgType='highlight'
              $color='white'
              style={{ borderRadius: 17 }}
              $w='180px'
              $h='35px'
              $fontSize='18px'
              $fontWeight='bold'
            >
              Blockchain
            </Button>
          </StyledSpace>
          <StyledSpace>
            <Text $size='48px' strong>
              CryptoSpace
            </Text>
          </StyledSpace>
          <TextSpace>
            <Text $size='16px'>
              {`10,000 unique collectible characters with proof of ownership stored on the Ethereum
              blockchain. The project that inspired the modern CryptoArt movement. Selected press
              and appearances include Mashable, CNBC, The Financial Times, Bloomberg, MarketWatch,
              The Paris Review, Salon, The Outline, BreakerMag, Christie's of London, Art|Basel, The
              PBS NewsHour, The New York Times in 2018 and again in 2021. The Cryptopunks are the
              first "Non-Fungible Token" on Ethereum and inspiration for the ERC-721 standard that
              powers most digital art and collectibles.`}
            </Text>
          </TextSpace>
        </Row>
      </Box>
      <Box w='100%'>
        <BannerContainer>
          <Banner />
        </BannerContainer>
      </Box>
      <Box w='1200px' m='auto'>
        <Row justify='center' gutter={[0, 24]}>
          <StyledSpace style={{ marginTop: 10 }}>
            <Text $size='16px'>
              {`The CryptoSpace are 10,000 uniquely generated characters. No two are exactly alike,
              and each one of them can be officially owned by a single person on the Ethereum
              blockchain. Originally, they could be claimed for free by anybody with an Ethereum
              wallet, but all 10,000 were quickly claimed. Now they must be purchased from someone
              via the marketplace that's also embedded in the blockchain. Via this market you can
              buy, bid on, and offer punks for sale. Below, you'll find information about the status
              of each Punk in the market. Punks with a blue background are not for sale and have no
              current bids. Punks with a red background are available for sale by their owner.
              Finally, punks with a purple background have an active bid on them.`}
            </Text>
          </StyledSpace>
          <StyledSpace style={{ marginBottom: 80 }}>
            <Text $size='16px'>
              {`See the marketplace instructions below to acquire your very own punk. You should also join the
              Discord Chat, which includes a bot that announces all bids, offers and sales in
              realtime.`}
            </Text>
          </StyledSpace>
        </Row>
      </Box>
      <Box w='100%' m='auto'>
        <StyledSpace>
          <img src={banner1} alt='banner1' width='100%' />
        </StyledSpace>
      </Box>
    </>
  );
};

const BannerContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: #dfdbe8;
  padding: 50px 100px;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
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

const StyledSpace = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
`;

const TextSpace = styled(Space)`
  width: 100%;
  > * {
    width: 690px;
    height: 100%;
    vertical-align: middle;
  }
  margin-top: 30px;
`;

export default Introduction;

const Banner = () => {
  return (
    <>
      {[0, 1].map((item) => (
        <ItemsRow gutter={[0, 120]} style={{ marginTop: 25, marginBottom: 25 }}>
          <Col span={4}>
            <img src={img1} alt='x' width='160px' height='160px' />
          </Col>
          <Col span={4}>
            <img src={img2} alt='x' width='160px' height='160px' />
          </Col>
          <Col span={4}>
            <img src={img3} alt='x' width='160px' height='160px' />
          </Col>
          <Col span={4}>
            <img src={img4} alt='x' width='160px' height='160px' />
          </Col>
          <Col span={4}>
            <img src={img5} alt='x' width='160px' height='160px' />
          </Col>
          <Col span={4}>
            <img src={img6} alt='x' width='160px' height='160px' />
          </Col>
        </ItemsRow>
      ))}
    </>
  );
};
