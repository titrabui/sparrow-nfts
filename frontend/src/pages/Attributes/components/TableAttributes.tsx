import React from "react";
import { Link, Text } from 'ui/Typography';
import {Tooltip} from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import StyledTable from 'ui/Table';
import img1 from 'assets/images/028-astronaut.svg';
import img2 from 'assets/images/055-asteroid.svg';
import img3 from 'assets/images/035-meteor.svg';
import img4 from 'assets/images/068-solar-system-2.svg';
import img5 from 'assets/images/032-alien.svg';
import img6 from 'assets/images/029-dog.svg';
import styled from 'styled-components';

const TableAttributes : React.FC = () => {
  const tootipContentAvgSale = "Average sale price over past 90 days with this attributes";
  const tootipContentCheapset= "Cheapest punk currently for sale with this attribute";

  const renderCheapest = (number: any) => (
    <div>
      <Link $color='#0080FF' $size='18px' href='/cryptospace/accountinfo'>
        <img src={img1} alt='' width={42} height={42}/>
      </Link>
      <Text $size='18px' ml='10px'>{number}KΞ</Text>
    </div>
  )

  const renderMoreExamples = (moreExample: Array<any>) => (
    moreExample.map((image) => (
      <SpaceContainer>
        <Link $color='#0080FF' $size='18px' href='/cryptospace/accountinfo'>
          <img src={image.img} alt='' width={42} height={42}/>
        </Link>
      </SpaceContainer>
    ))
  )

  const renderTitleTootip = (title: string, text: string) => (
    <AvgSaleWrapper >
      <span>{title}</span>
      <Tooltip placement='top' title={text}>
          <InfoCircleFilled />
      </Tooltip>
    </AvgSaleWrapper>
  );

  const dataSource = [...Array(5).keys()].map(() => ({
    attribute: 'Alien',
    number: 9,
    avail: 3,
    avgSale: 20,
    cheapest: '25',
    moreExamples:  [
      { id: 1, img: img1 },
      { id: 2, img: img2 },
      { id: 3, img: img3 },
      { id: 4, img: img4 },
      { id: 5, img: img5 },
      { id: 6, img: img6 },
      { id: 7, img: img1 },
      { id: 8, img: img2 },
    ]
  }));

  const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
      render(attribute: string) {
        return <Link $color='#0080FF' $size='18px' href='/cryptospace/accountinfo'>{attribute}</Link>
      }
    },
    {
      title: '#',
      dataIndex: 'number',
      key: 'number',
      render(number: string) {
        return <Text $size='18px'>{number}KΞ</Text>
      }
    },
    {
      title: 'Avail',
      dataIndex: 'avail',
      key: 'avail',
      render(avail: string) {
        return <Text $size='18px'>{avail}KΞ</Text>
      }
    },

    {
      title: renderTitleTootip('Avg Sale', tootipContentAvgSale),
      dataIndex: 'avgSale',
      key: 'avgSale',
      render(avgSale: string) {
        return <Text $size='18px'>{avgSale}KΞ</Text>
      }
    },
    {
      title: renderTitleTootip('Cheapset', tootipContentCheapset),
      dataIndex: 'cheapest',
      key: 'cheapest',
      render(cheapest: string) {
        return renderCheapest(cheapest);
      }
    },
    {
      title: 'More Examples',
      dataIndex: 'moreExamples',
      key: 'moreExamples',
      render(moreExamples: Array<any>) {
        return renderMoreExamples(moreExamples);
      }
    },
  ];

  return <StyledTable
            columns={columns}
            dataSource={dataSource}
            rowKey='id'
            pagination={false}
          />
}

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
