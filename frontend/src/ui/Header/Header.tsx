import React from 'react';
import { Col, Row } from 'antd';
import RightHeader from './RightHeader';
import styled from 'styled-components';

const CommonHeader: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col span={12}>
          <RightHeader />
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  height: 64px;
  max-width: 100vw;
  background-color: ${(p) => p.theme.darkBlue};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  color: white;
  .ant-row {
    height: 100%;
    width: 1200px;
    margin: 0 auto;
  }
`;

export default CommonHeader;
