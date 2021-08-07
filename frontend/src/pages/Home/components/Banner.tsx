import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Spaces } from 'utils/spaces';
import { Link } from 'react-router-dom';

const Banner: React.FC = () => {
  return (
    <ItemsRow gutter={[0, 120]}>
      {Spaces.map((space: any) => (
        <Col span={4}>
          <Link to={`/detail/${space.id}`}>
            <img src={space.img} alt={space.id} width='140px' height='140px' />
          </Link>
        </Col>
      ))}
    </ItemsRow>
  );
};

const ItemsRow = styled(Row)`
  text-align: center;
  .ant-col {
    width: 100px;
    img {
      margin: 0 auto;
      cursor: pointer;
    }
  }
`;

export default Banner;
