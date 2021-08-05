import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { routesEnum } from 'routes/routesData';

const Footer: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <Row>
        <Col span={24}>
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
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 417px;
  background-color: #d7dee9;
  margin-top: 120px;
  .ant-row {
    width: 1200px;
    margin: 0 auto;
  }
`;

const TabContainer = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  margin-bottom: 0 !important;
  justify-content: flex-end;
  margin-top: 50px;
`;

const Tab = styled(NavLink)<any>`
  list-style-type: none;
  color: #3e5b87;
  font-size: 18px;
  cursor: pointer;
  height: 100%;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  &:hover {
    font-weight: bold;
  }
`;

export default Footer;
