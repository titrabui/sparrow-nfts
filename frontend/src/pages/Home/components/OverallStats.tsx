import React from 'react';
import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import Box from 'ui/Box';

const OverallStats: React.FC = () => {
  return (
    <Box w='1050px' m='auto'>
      <Row justify='center' gutter={[0, 24]}>
        <TitleContainer>
          <Title>Overall Stats</Title>
        </TitleContainer>
      </Row>
      <Row justify='center' gutter={[0, 24]}>
        <Col span={8}>
          <StatsNameText>Current Lowest Price Available</StatsNameText>
          <StatsValueText>19.75 ETH ($35,183.64 USD)</StatsValueText>
        </Col>
        <Col span={8}>
          <StatsNameText>Number of Sales (Last 12 Months)</StatsNameText>
          <StatsValueText>10,088</StatsValueText>
        </Col>
        <Col span={8}>
          <StatsNameText>Total Value of All Sales (Lifetime)</StatsNameText>
          <StatsValueText>210.9KΞ ($375.7M)</StatsValueText>
        </Col>
        <ButtonContainer>
          <StyledButton $bgType='accent' onClick={() => window.open("/topOwners", "_blank")}>Top Owners</StyledButton>
          <StyledButton $bgType='accent'>All Types and Attributes</StyledButton>
        </ButtonContainer>
      </Row>
    </Box>
  );
};

const Title = styled(Text)`
  font-size: 36px;
  font-weight: bold;
`;

const StatsNameText = styled(Text)`
  font-size: 20px;
  display: block;
`;

const StatsValueText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  display: block;
  color: ${(p) => p.theme.surface};
  font-weight: bold;
  height: 48px;
  font-size: 18px;
  width: 100%;
`;

const ButtonContainer = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  margin: 30px 0 50px 0;
`;

const TitleContainer = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  margin: 60px 0 15px 0;
`;
export default OverallStats;
