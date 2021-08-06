import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import img1 from 'assets/images/039-cloud.svg';
import img2 from 'assets/images/008-satellite-dish.svg';
import img3 from 'assets/images/037-galaxy.svg';
import img4 from 'assets/images/028-astronaut.svg';
import img5 from 'assets/images/054-stars.svg';
import img6 from 'assets/images/056-comet-1.svg';
import img7 from 'assets/images/038-gamma-ray.svg';
import img8 from 'assets/images/023-space-shuttle.svg';
import img9 from 'assets/images/044-supernova.svg';
import img10 from 'assets/images/046-comet-2.svg';
import img11 from 'assets/images/003-earth-globe.svg';
import img12 from 'assets/images/013-space-capsule-3.svg';

const imageList = [
  {
    img: img1,
    id: 'img1'
  },
  {
    img: img2,
    id: 'img2'
  },
  {
    img: img3,
    id: 'img3'
  },
  {
    img: img4,
    id: 'img4'
  },
  {
    img: img5,
    id: 'img5'
  },
  {
    img: img6,
    id: 'img6'
  },
  {
    img: img7,
    id: 'img7'
  },
  {
    img: img8,
    id: 'img8'
  },
  {
    img: img9,
    id: 'img9'
  },
  {
    img: img10,
    id: 'img10'
  },
  {
    img: img11,
    id: 'img11'
  },
  {
    img: img12,
    id: 'img12'
  }
];
const Banner: React.FC = () => {
  return (
    <ItemsRow gutter={[0, 120]}>
      {imageList.map((item) => (
        <Col span={4}>
          <img src={item.img} alt={item.id  } width='140px' height='140px' />
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
