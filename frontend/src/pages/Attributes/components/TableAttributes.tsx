import { InfoCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import StyledTable from 'ui/Table';
import { Link, Text } from 'ui/Typography';
import Spaces from 'utils/spaces';

const TableAttributes: React.FC = () => {
  const tooltipContentAvgSale = 'Average sale price over past 90 days with this attributes';
  const tooltipContentCheapest = 'Cheapest punk currently for sale with this attribute';

  const renderCheapest = (id: number, img: any, number: any) => (
    <div>
      <Link $color='#0080FF' $size='18px' href={`/detail/${id}`}>
        <img src={img} alt='' width={42} height={42} />
      </Link>
      <Text $size='18px' ml='10px'>
        {number}KΞ
      </Text>
    </div>
  );

  const renderMoreExamples = (moreExample: Array<any>) =>
    moreExample.map((image) => (
      <SpaceContainer>
        <Link $color='#0080FF' $size='18px' href={`/detail/${image.id}`}>
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
          <Link $color='#0080FF' $size='18px' href='/detail/accountinfo'>
            {attribute}
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
      render(avail: string) {
        return <Text $size='18px'>{avail}KΞ</Text>;
      }
    },

    {
      title: renderTitleTooltip('Avg Sale', tooltipContentAvgSale),
      dataIndex: 'avgSale',
      key: 'avgSale',
      render(avgSale: string) {
        return <Text $size='18px'>{avgSale}KΞ</Text>;
      }
    },
    {
      title: renderTitleTooltip('Cheapest', tooltipContentCheapest),
      dataIndex: 'cheapest',
      key: 'cheapest',
      render(cheapest: any) {
        return renderCheapest(cheapest.id, cheapest.img, cheapest.number);
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

  return <StyledTable columns={columns} dataSource={dataSource} rowKey='id' pagination={false} />;
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
