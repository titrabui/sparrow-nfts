import React from 'react';

import { Avatar } from 'antd';
import DropdownMenu from './DropdownMenu';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useWallet from 'hooks/useWallet';
import Button from 'ui/Button';

interface RightHeaderProps {}

const RightHeader: React.FC<RightHeaderProps> = () => {
  const { connect, active } = useWallet();

  const handleConnectWallet = async (): Promise<any> => {
    console.log('cpp');
    
    await connect();
  };
  return (
    <RightContainer>
      <Button onClick={handleConnectWallet}>
          Connect Wallet
        </Button>
      <DropdownMenu>
        <AvatarContainer icon={<UserOutlined />} />
      </DropdownMenu>
    </RightContainer>
  );
};

export default RightHeader;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  margin-right: 80px;
`;

const AvatarContainer = styled(Avatar)`
  margin-left: 30px;
  background-color: #fff;
  color: black;
`;
