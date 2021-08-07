import React from 'react';
import styled from 'styled-components';
import { Title, Link, Text } from 'ui/Typography';
import StyledTable from 'ui/Table';
import Box from 'ui/Box';
import { ISpaceProps } from 'types/SpaceProps';

const TransactionsHistory:React.FC<ISpaceProps> = (props: any) => {
  const dataSource = [
    {
      type: 'Offered',
      from: '0x6611fe',
      to: '0x7b8961',
      amount: '4.2KΞ ($7.58M)',
      txn: 'Mar 11, 2021'
    },

    {
      type: 'Bid',
      from: '0x6611fe',
      to: '0x7b8961',
      amount: '4.2KΞ ($7.58M)',
      txn: 'Mar 11, 2021'
    },
    {
      type: 'Bid Withdrawn',
      from: '0x6611fe',
      to: '0x7b8961',
      amount: '4.2KΞ ($7.58M)',
      txn: 'Mar 11, 2021'
    },
    {
      type: 'Sold',
      from: '0x6611fe',
      to: '0x7b8961',
      amount: '4.2KΞ ($7.58M)',
      txn: 'Mar 11, 2021'
    },
    {
      type: 'Claimed',
      from: '0x6611fe',
      to: '0x7b8961',
      amount: '4.2KΞ ($7.58M)',
      txn: 'Mar 11, 2021'
    }
  ];

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render(type: string) {
        return <Text $size='18px'>{type}</Text>;
      }
    },
    {
      title: 'From  ',
      dataIndex: 'from',
      key: 'from',
      render(from: string) {
        return (
          <Link href='/'>
            <LinkText>{from}</LinkText>
          </Link>
        );
      }
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render(to: string) {
        return (
          <Link href='/'>
            <LinkText>{to}</LinkText>
          </Link>
        );
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render(amount: string) {
        return <Text $size='18px'>{amount}</Text>;
      }
    },

    {
      title: 'Txn',
      dataIndex: 'txn',
      key: 'txn',
      render(txn: string) {
        return <Text $size='18px'>{txn}</Text>;
      }
    }
  ];
  const getRowClassName = (record: any) => {
    switch (record.type) {
      case 'Offered':
        return 'offer-row';
      case 'Bid':
        return 'bid-row';
      case 'Sold':
        return 'sold-row';
      case 'Bid Withdrawn':
        return 'withdrawn-row';
      case 'Claimed':
        return 'claimed-row';
      default:
        return '';
    }
  };
  return (
    <Box w='900px' m='auto'>
      <OwnersTable
        columns={columns}
        dataSource={dataSource}
        rowKey='id'
        pagination={false}
        rowClassName={getRowClassName}
      />
    </Box>
  );
};

const OwnersTable = styled(StyledTable)`
  margin-top: 20px;
  td,
  th {
    text-align: left !important ;
  }
  table > tbody > tr > td {
    border-color: white !important;
  }
  .offer-row {
    background-color: #d6adad;
  }
  .bid-row {
    background-color: #b8a7ce;
  }
  .sold-row {
    background-color: #adc9d6;
  }
  .withdrawn-row {
    background-color: #b8a7ce;
  }
  .claimed-row {
    background-color: #add6b8;
  }
`;

const LinkText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${(p) => p.theme.highlight};
`;

export default TransactionsHistory;
