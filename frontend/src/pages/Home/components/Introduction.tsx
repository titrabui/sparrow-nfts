import React from 'react';
import { Row, Space } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import Box from 'ui/Box';
import banner1 from 'assets/images/banner1.svg';
import Banner from './Banner';

const Introduction: React.FC = () => {
  return (
    <>
      <Box w='1200px' m='180px auto 0'>
        <Row justify='center' gutter={[0, 24]}>
          <StyledSpace>
            <StyledButton $bgType='highlight'>Blockchain</StyledButton>
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
          <FirstParagraph>
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
          </FirstParagraph>
          <SecondParagraph>
            <Text $size='16px'>
              {`See the marketplace instructions below to acquire your very own punk. You should also join the
              Discord Chat, which includes a bot that announces all bids, offers and sales in
              realtime.`}
            </Text>
          </SecondParagraph>
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

const StyledButton = styled(Button)`
  color: ${(p) => p.theme.surface};
  border-radius: 17px;
  width: 180px;
  height: 35px;
  font-size: 18px;
  font-weight: bold;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: #dfdbe8;
  padding: 50px;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
`;

const StyledSpace = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
`;

const FirstParagraph = styled(StyledSpace)`
  margin-top: 10px;
`;

const SecondParagraph = styled(StyledSpace)`
  margin-bottom: 80px;
`;

const TextSpace = styled(Space)`
  width: 100%;
  > * {
    width: 690px;
    height: 100%;
    vertical-align: middle;
  }
`;

export default Introduction;
