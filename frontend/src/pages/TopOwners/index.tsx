import React from 'react';
import styled from 'styled-components';
import MainContainer from 'ui/MainContainer';
import { Title, Link, Text } from 'ui/Typography';
import StyledTable from 'ui/Table';
import Box from 'ui/Box';

const TopOwners: React.FC = () => {
  const dataSource = [...Array(10).keys()].map(() => ({
    number: '1',
    account: 32,
    numberOwned: 20,
    last: '1 month ago'
  }));

  const columns = [
    {
      title: '#',
      dataIndex: 'number',
      key: 'name',
      render(last: string) {
        return <Text $size='18px'>{last}</Text>;
      }
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      render(accountInfo: string) {
        return (
          <Link $color='#0080FF' $size='18px' href='/cryptospace/accountinfo'>
            {accountInfo}
          </Link>
        );
      }
    },
    {
      title: 'Number Owned',
      dataIndex: 'numberOwned',
      key: 'numberOwned',
      render(numberOwner: string) {
        return <Text $size='18px'>{numberOwner}</Text>;
      }
    },
    {
      title: 'Last',
      dataIndex: 'last',
      key: 'last',
      render(last: string) {
        return <Text $size='18px'>{last}</Text>;
      }
    }
  ];
  return (
    <MainContainer mt='100px'>
      <Box m='100px'>
        <Title $size='48px'>All CryptoSpace Owners</Title>
        <OwnersTable columns={columns} dataSource={dataSource} rowKey='id' pagination={false} />
      </Box>
    </MainContainer>
  );
};

const OwnersTable = styled(StyledTable)`
  margin-top: 20px;
`;

export default TopOwners;
