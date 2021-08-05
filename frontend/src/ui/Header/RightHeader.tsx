import React, { useEffect } from 'react';

import { Avatar } from 'antd';
import DropdownMenu from './DropdownMenu';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Button from 'ui/Button';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import Web3 from 'web3';
import { Text } from 'ui/Typography';
import logo from 'assets/images/Logo.svg';

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
      {/* {!active && <Button onClick={handleConnectWallet}>Connect Wallet</Button>}
      {active && <Button onClick={callSC}>Call SC</Button>} */}
      <div>
        <img src={logo} alt='logo' width='100px' height='32px' />
      </div>
    </RightContainer>
  );
};

export default RightHeader;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
`;
