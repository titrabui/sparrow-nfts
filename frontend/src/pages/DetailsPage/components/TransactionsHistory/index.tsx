/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styled from 'styled-components';
import useWallet from 'hooks/useWallet';
import { Text } from 'ui/Typography';
import StyledTable from 'ui/Table';
import Box from 'ui/Box';
import { ISpaceProps } from 'types/SpaceProps';
import { useSocket, useEmit } from 'socketio-hooks';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const TransactionsHistory: React.FC<ISpaceProps> = (props) => {
  const { account, library } = useWallet();
  const { data } = props;

  const [tableData, setTableData] = useState([]);
  useEmit(
    'sync_client_info',
    ''
  )({
    walletAddress: account,
    isWatchingSpaceDetail: true,
    spaceId: data ? data.id : null
  });

  useSocket('transaction_history', '', async (socketData) => {
    const sortData = socketData
      ? socketData.sort((a: any, b: any) => b.createdAt - a.createdAt)
      : [];
    if (JSON.stringify(sortData) !== JSON.stringify(tableData)) setTableData(sortData);
  });
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
      render(from: string, record: any) {
        return (
          <Link to='/'>
            <LinkText>
              {from && record.type !== 'Offered' && record.type !== 'Claimed' && from.slice(0, 10)}
            </LinkText>
          </Link>
        );
      }
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render(to: string, record: any) {
        return (
          <Link to='/'>
            <LinkText>{to && record.type !== 'Offered' && to.slice(0, 10)}</LinkText>
          </Link>
        );
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render(amount: string) {
        return (
          <Text $size='18px'>
            {amount && library
              ? `${library?.utils?.fromWei(amount.toString(), 'ether')}Ξ ($${
                  library?.utils?.fromWei(amount.toString(), 'ether') * 3000
                })`
              : ''}
          </Text>
        );
      }
    },

    {
      title: 'Txn',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render(createdAt: string, record: any) {
        return (
          <LinkText $size='18px'>
            <a href={`https://etherscan.io/tx/${record.txn}`}>
              {dayjs(createdAt).format('MMM DD, YYYY')}
            </a>
          </LinkText>
        );
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
      case 'Transfer':
        return 'transfer-row';
      default:
        return '';
    }
  };
  return (
    <Box w='900px' m='auto'>
      <OwnersTable
        columns={columns}
        dataSource={tableData}
        rowKey='createdAt'
        pagination={false}
        rowClassName={getRowClassName}
      />
    </Box>
  );
};

const OwnersTable = styled(StyledTable)`
  .ant-table {
    margin-top: 0;
  }
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
  .transfer-row {
    background-color: #add6b8;
  }
`;

const LinkText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${(p) => p.theme.primary};
`;

export default TransactionsHistory;
