/* eslint-disable no-unused-vars */
import { InfoCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import StyledTable from 'ui/Table';
import { Text } from 'ui/Typography';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';

const TableAttributes: React.FC = (props: any) => {
  const { data } = props;
  const tooltipContentAvgSale = 'Average sale price over past 90 days with this attributes';
  const tooltipContentCheapest = 'Cheapest punk currently for sale with this attribute';

  const renderCheapest = (space, price) => (
    <div>
      <Link to={`/detail/${space.id}`}>
        <img src={space.img} alt='' width={42} height={42} />
      </Link>
      <Text $size='18px' ml='10px'>
        {price}Ξ
      </Text>
    </div>
  );

  const renderMoreExamples = (moreExample: Array<any>) =>
    moreExample.map((image) => (
      <SpaceContainer key={Math.random()}>
        <Link to={`/detail/${image.id}`}>
          <img src={image.img} alt='' width={42} height={42} />
        </Link>
      </SpaceContainer>
    ));

  const renderTitleTooltip = (title: string, text: string) => (
    <AvgSaleWrapper>
      <span>{title}</span>
      <Tooltip placement='top' title={text}>
        <InfoCircleFilled />
      </Tooltip>
    </AvgSaleWrapper>
  );

  const attributes = Spaces.reduce(
    (groups: any, item: any) => ({
      ...groups,
      [item.type]: [...(groups[item.type] || []), item]
    }),
    []
  );

  const dataSource = Object.keys(attributes).map((attribute: string) => ({
    attribute,
    number: attributes[attribute][0].id,
    avail: attributes[attribute][0].price,
    avgSale: 20,
    cheapest: { id: attributes[attribute][0].id, img: attributes[attribute][0].img, number: '25' },
    moreExamples: attributes[attribute].map((example: any) => ({
      id: example.id,
      img: example.img
    }))
  }));
  const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
      render(attribute: string) {
        return (
          <Link to='/'>
            <Text $color='#0080FF' $size='18px'>
              {attribute}
            </Text>
          </Link>
        );
      }
    },
    {
      title: '#',
      dataIndex: 'number',
      key: 'number',
      render(number: string) {
        return <Text $size='18px'>{number}</Text>;
      }
    },
    {
      title: 'Avail',
      dataIndex: 'avail',
      key: 'avail',
      render(avail: string, record: any) {
        return (
          <Text $size='18px'>
            {record.attribute === 'Device' ? data.deviceAvail : data.natureAvail}
          </Text>
        );
      }
    },

    {
      title: renderTitleTooltip('Avg Sale', tooltipContentAvgSale),
      dataIndex: 'avgSale',
      key: 'avgSale',
      render(avgSale: string, record: any) {
        return (
          <Text $size='18px'>
            {' '}
            {record.attribute === 'Device' ? data.avgDeviceEther : data.avgNatureEther}Ξ
          </Text>
        );
      }
    },
    {
      title: renderTitleTooltip('Cheapest', tooltipContentCheapest),
      dataIndex: 'cheapest',
      key: 'cheapest',
      render(cheapest: any, record: any) {
        return record.attribute === 'Device'
          ? renderCheapest(data.cheapestDevice, data.cheapestDeviceEther)
          : renderCheapest(data.cheapestNature, data.cheapestNatureEther);
      }
    },
    {
      title: 'More Examples',
      dataIndex: 'moreExamples',
      key: 'moreExamples',
      render(moreExamples: Array<any>) {
        return renderMoreExamples(moreExamples);
      }
    }
  ];

  return <StyledTable columns={columns} dataSource={dataSource} rowKey='number' pagination={false} />;
};

const SpaceContainer = styled.div`
  display: inline-block;
  background-color: #dfdbe8;
  padding: 4px;
`;

const AvgSaleWrapper = styled.div`
  position: relative;
  .anticon {
    position: absolute;
    font-size: 14px;
    right: -4px;
    text-align: center;
  }
`;
export default TableAttributes;
