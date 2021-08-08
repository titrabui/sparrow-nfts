import React from 'react';
import styled from 'styled-components';
import logo from 'assets/images/Logo.svg';

const RightHeader: React.FC = () => (
  <RightContainer>
    <div>
      <img src={logo} alt='logo' width='100px' height='32px' />
    </div>
  </RightContainer>
);

export default RightHeader;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
`;
