import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return <Container />;
};

const Container = styled.div`
  width: 100%;
  height: 150px;
  background-color: #d7dee9;
  margin-top: 120px;
  .ant-row {
    width: 1200px;
    margin: 0 auto;
  }
`;

export default Footer;
