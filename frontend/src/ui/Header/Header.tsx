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
          <RightHeader />
        </Col>
        <Col span={12}>
          <TabContainer>
            <Tab data-active={location.pathname === routesEnum.basic} to={routesEnum.home}>
              Project
            </Tab>
            <Tab data-active={location.pathname === routesEnum.home} to={routesEnum.home}>
              Writing
            </Tab>
            <Tab data-active={location.pathname === routesEnum.login} to={routesEnum.home}>
              About
            </Tab>
          </TabContainer>
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
  width:100%;
  top:0;
  z-index:100;
  color: white;
  .ant-row {
    height: 100%;
    width:1200px;
    margin:0 auto;
  }
`;

const TabContainer = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  margin-bottom: 0 !important;
  justify-content:flex-end;
`;

const Tab = styled(NavLink)<any>`
  list-style-type: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  height: 100%;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${(p) => (p['data-active'] ? p.theme.mediumBlue : p.theme.darkBlue)};
  font-weight:bold;
  &:hover {
    background-color: ${(p) => p.theme.mediumBlue};
    font-weight: bold;
  }
`;

export default CommonHeader;
