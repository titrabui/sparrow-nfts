import React from 'react';
import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import Box from 'ui/Box';

const OverallStats: React.FC = () => {
  return (
    <Box w='1200px' m='auto'>
      <Row justify='center' gutter={[0, 24]}>
        <StyledSpace style={{ marginTop: 60, marginBottom: 15 }}>
          <Text $size='36px' strong>
            Overall Stats
          </Text>
        </StyledSpace>
      </Row>
      <Row justify='center' gutter={[0, 24]}>
        <Col span={8}>
          <Text $size='20px' block>
            Current Lowest Price Available
          </Text>
          <Text $size='20px' strong>
            19.75 ETH ($35,183.64 USD)
          </Text>
        </Col>
        <Col span={8}>
          <Text $size='20px' block>
            Number of Sales (Last 12 Months)
          </Text>
          <Text $size='20px' strong>
            10,088
          </Text>
        </Col>
        <Col span={8}>
          <Text $size='20px' block>
            Total Value of All Sales (Lifetime)
          </Text>
          <Text $size='20px' strong>
            210.9KΞ ($375.7M)
          </Text>
        </Col>
        <StyledSpace style={{ marginTop: 30, marginBottom: 50 }}>
          <Button
            $bgType='accent'
            block
            $color='white'
            $fontWeight='bold'
            $h='48px'
            $fontSize='18px'
          >
            Top Owners
          </Button>
          <Button
            $bgType='accent'
            block
            $color='white'
            $fontWeight='bold'
            $h='48px'
            $fontSize='18px'
          >
            All Types and Attributes
          </Button>
        </StyledSpace>
      </Row>
    </Box>
  );
};

const StyledSpace = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
`;

export default OverallStats;
