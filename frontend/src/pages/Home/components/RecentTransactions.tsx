import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';
import request from 'utils/request';
import { useSocket} from 'socketio-hooks';


const RecentTransactions: React.FC = () => {
  const [data, setData] = useState([] as any);

  useSocket('transactions', '', async (socketData) => {
    if(socketData) {
      setData([socketData,...data.slice(0,11)])
    }
  });

  useEffect(() => {
    const getData = async () => {
      const result = await request.getData('/transactions/stats/overall', {});
      if (result && result.status === 200) setData(result.data.recentTransactions);
    };
    getData();
  }, []);

  const mappedTransactions =
    data &&
    data.map((item: any) => {
      const spacesData: any = Spaces.find((space: any) => space.id === Number(item.spaceIndex));
      return { ...item, img: spacesData.img };
    });

  return (
    <Box w='1050px' m='auto'>
      <Row justify='center' gutter={[0, 24]}>
        <Box w='100%' mt='50px'>
          <Title>Recent Transactions</Title>
          <UpdateTime>
            32 seconds ago
          </UpdateTime>
        </Box>
      </Row>
      <Box w='100%' mt='30px'>
        <Row justify='center' gutter={[0, 24]}>
          {mappedTransactions &&
            mappedTransactions.length > 0 &&
            mappedTransactions.map((transaction: any, index: any) => (
              <Col span={4} key={transaction.createdAt}>
                <ImageContainer>
                  <ImageNumber $size='30px' $color='white' strong>
                    0{index}
                  </ImageNumber>
                  <ImageWrapper>
                    <Link to={`/detail/${transaction.spaceIndex}`}>
                      <img src={transaction.img} alt={`img${transaction.spaceIndex}`} />
                    </Link>
                  </ImageWrapper>
                </ImageContainer>
                <StyledText $size='24px' strong $color='#0C264D'>
                  #{transaction.spaceIndex}
                </StyledText>
                <StyledText $size='20px' $color='#8D8D8D'>
                  {transaction.type}
                </StyledText>
                {transaction.amount && (
                  <StyledText $size='20px' $color='#4B4B4B'>
                    {transaction.amount}Ξ ${transaction.amount * 3000}
                  </StyledText>
                )}
              </Col>
            ))}
        </Row>
      </Box>
    </Box>
  );
};

const StyledText = styled(Text)`
  display: block;
`;

const Title = styled(Text)`
  font-size: 36px;
  font-weight: bold;
  display: block;
`;

const UpdateTime = styled(Text)`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  width: 90%;
  height: 180px;
  background-color: #dfdbe8;
  position: relative;
  margin-bottom: 20px;
`;
const ImageNumber = styled(Text)`
  position: absolute;
  left: 8px;
  top: 2px;
`;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  text-align: center;
  bottom: 3px;
  img {
    width: 140px;
    height: 130px;
  }
`;

export default RecentTransactions;
