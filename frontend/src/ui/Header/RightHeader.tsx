import React, { useEffect } from 'react';

import { Avatar } from 'antd';
import DropdownMenu from './DropdownMenu';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Button from 'ui/Button';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import Web3 from 'web3';

interface RightHeaderProps {}

const RightHeader: React.FC<RightHeaderProps> = () => {
  const { connect, active, connector, account } = useWallet();

  const handleConnectWallet = async (): Promise<any> => {
    await connect();
  };

  const callSC = async (): Promise<any> => {
    const contract = await getContract(connector);
    const txHash = await contract.methods.allInitialOwnersAssigned().send({ from: account });
  };

  return (
    <RightContainer>
      {!active && <Button onClick={handleConnectWallet}>Connect Wallet</Button>}
      {active && <Button onClick={callSC}>Call SC</Button>}

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
