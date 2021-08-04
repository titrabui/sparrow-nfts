import React from 'react';
import { Col, Row } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import RightHeader from './RightHeader';
import { routesEnum } from 'routes/routesData';
import styled from 'styled-components';

const CommonHeader: React.FC = () => {
  const location = useLocation();
  return (
    <Container>
      <Row>
        <Col span={12}>
          <TabContainer>
            <Tab data-active={location.pathname === routesEnum.basic} to={routesEnum.basic}>
              Project
            </Tab>
            <Tab data-active={location.pathname === routesEnum.home} to={routesEnum.home}>
              Writing
            </Tab>
            <Tab data-active={location.pathname === routesEnum.login} to={routesEnum.basic}>
              About
            </Tab>
          </TabContainer>
        </Col>
        <Col span={12}>
          <RightHeader />
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  height: 64px;
  width: 100vw;
  background-color: ${(p) => p.theme.darkBlue};
  position: relative;
  color: white;
  .ant-row {
    height: 100%;
  }
`;

const TabContainer = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  margin-bottom: 0 !important;
`;

const Tab = styled(NavLink)<any>`
  list-style-type: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  height: 100%;
  width: 98px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${(p) => {
    return p['data-active']
      ? `4px solid ${p.theme.lightBlueBorder}`
      : `4px solid ${p.theme.darkBlue}`;
  }};
  background-color: ${(p) => (p['data-active'] ? p.theme.mediumBlue : p.theme.darkBlue)};
  font-weight: ${(p) => {
    return p['data-active'] ? 'bold' : 300;
  }};
  &:hover {
    background-color: ${(p) => p.theme.mediumBlue};
    border-bottom: 4px solid ${(p) => p.theme.lightBlueBorder};
    font-weight: bold;
  }
`;

export default CommonHeader;
