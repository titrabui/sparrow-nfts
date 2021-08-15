import React, { useEffect, useState } from 'react';
import MainContainer from 'ui/MainContainer';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Spaces from 'utils/spaces';
import { Link } from 'react-router-dom';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import BreadCrumb from 'ui/Breadcrumb';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import request from 'utils/request';

const Account: React.FC = (props: any) => {
  const { connector, library } = useWallet();
  const [bidData, setBidData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [spacesOwned, setSpacesOwned] = useState([]);
  const [data, setData] = useState([] as any);
  const [allBids, setAllBids] = useState([]);

  const id = (props as any)?.match?.params?.id;
  useEffect(() => {
    const getData = async () => {
      const result = await request.getData(`/transactions/stats/account/${id}`, {});
      if (result && result.status === 200) setData(result.data);
    };
    getData();
  }, []);
  useEffect(() => {
    let mounted = true;
    const getBlockchainBidData = async () => {
      if (connector) {
        const contract = await getContract(connector);
        const spacesOfferedBids = await contract.methods.returnSpacesBidsArray().call();
        if (mounted) {
          const filteredBidData =
            spacesOfferedBids &&
            spacesOfferedBids.length > 0 &&
            spacesOfferedBids
              .filter((item: any) => item && item[0])
              .map((item: any) => ({
                index: Number(item.spaceIndex),
                price: item.value,
                bidder: item.bidder
              }));
          setAllBids(spacesOfferedBids);
          setBidData(filteredBidData);
        }
      }
    };
    const getBlockchainSaleData = async () => {
      if (connector) {
        const contract = await getContract(connector);
        const spacesOffereds = await contract.methods.returnSpacesOfferedForSaleArray().call();
        if (mounted) {
          const filteredData =
            spacesOffereds &&
            spacesOffereds.length > 0 &&
            spacesOffereds
              .filter((item: any) => item && item[0])
              .map((item: any) => ({
                index: Number(item.spaceIndex),
                price: item.minValue,
                owner: item[2]
              }));
          setSaleData(filteredData);
        }
      }
    };
    const getBlockchainOwnedData = async () => {
      if (connector) {
        const contract = await getContract(connector);
        const spaceIndexToAddress = await contract.methods.returnSpaceIndexToAddressArray().call();
        if (mounted) {
          let spacesOwnedArray = [] as any;
          spaceIndexToAddress.forEach((item: any, index: any) => {
            if (item === id) spacesOwnedArray = [...spacesOwnedArray, index];
          });
          setSpacesOwned(spacesOwnedArray);
        }
      }
    };
    getBlockchainOwnedData();

    getBlockchainBidData();
    getBlockchainSaleData();
    return () => {
      mounted = false;
    };
  }, [connector]);
  const spacesBids = Spaces.filter((space: any) =>
    bidData.some((item: any) => item.index === space.id)
  );
  const spacesBidsWithPriceAndOwner = spacesBids.map((space: any) => {
    const blockchainBidData: any = bidData.find((item: any) => item.index === space.id);
    return { ...space, price: blockchainBidData.price, bidder: blockchainBidData.bidder };
  });

  const accountBids =
    spacesBidsWithPriceAndOwner && spacesBidsWithPriceAndOwner.filter((item) => item.bidder === id);
  const totalBidValue =
    (accountBids.length > 0 &&
      accountBids.reduce((prev: any, curr: any) => prev + Number(curr.price), 0)) ||
    0;

  const spacesForSales = Spaces.filter((space: any) =>
    saleData.some((item: any) => item.index === space.id)
  );
  const spacesForSalesWithPrice = spacesForSales.map((space: any) => {
    const blockchainData: any = saleData.find((item: any) => item.index === space.id);
    return { ...space, price: blockchainData.price, owner: blockchainData.owner };
  });

  const accountOffers = spacesForSalesWithPrice.filter((item: any) => item.owner === id);

  const spacesOwnedDetail = Spaces.filter((space: any) =>
    spacesOwned.some((item: any) => item === space.id)
  );

  const spacesBoughtDetail =
    data &&
    data.bought &&
    data.bought.map((item: any) => {
      const spacesData: any = Spaces.find((space: any) => space.id === Number(item.spaceIndex));
      return { ...item, img: spacesData.img };
    });

  const spacesSoldDetail =
    data &&
    data.sold &&
    data.sold.map((item: any) => {
      const spacesData: any = Spaces.find((space: any) => space.id === Number(item.spaceIndex));
      return { ...item, img: spacesData.img };
    });

  const bidsOnOwnedSpace =
    allBids &&
    allBids.filter((item: any) =>
      spacesOwned.some((space: any) => space === Number(item.spaceIndex) && item[0])
    );

  const totalBidOwnedSpaceValue =
    (bidsOnOwnedSpace.length > 0 &&
      bidsOnOwnedSpace.reduce((prev: any, curr: any) => prev + Number(curr.value), 0)) ||
    0;

  const spacesBidsOwnedSpaceDetail =
    bidsOnOwnedSpace &&
    bidsOnOwnedSpace.map((item: any) => {
      const spacesData: any = Spaces.find((space: any) => space.id === Number(item.spaceIndex));
      return { ...item, img: spacesData.img };
    });
  return (
    <MainContainer>
      <BreadCrumb crumbs={['Accounts', id.slice(0, 10)]} />
      <Box w='1050px' m='40px auto 0'>
        <BigTitle>Account Details</BigTitle>
        <SmallTitle>{id}</SmallTitle>
        <Row justify='center' gutter={[0, 15]}>
          <Col span={8}>
            <Title>Etherscan</Title>
            <a href={`https://etherscan.io/tx/${id}`} target='blank'>
              <LinkText>{id.slice(0, 20)}</LinkText>
            </a>
          </Col>
          <Col span={8}>
            <Title>Total Spaces Owned</Title>
            <Value>{spacesOwned.length}</Value>
          </Col>
          <Col span={8}>
            <Title>Last Active</Title>
            <Value>3 days ago</Value>
          </Col>
          <Col span={8}>
            <Title>Total Amount Spent Buying Spaces</Title>
            <Value>
              {totalBidOwnedSpaceValue &&
                library &&
                library.utils.fromWei(totalBidOwnedSpaceValue.toString(), 'ether')}
              Ξ ($
              {totalBidOwnedSpaceValue &&
                library &&
                library.utils.fromWei(totalBidOwnedSpaceValue.toString(), 'ether') * 3000}
              )
            </Value>
          </Col>
          <Col span={8}>
            <Title>Bids On Owned Spaces</Title>
            <Value>{bidsOnOwnedSpace && bidsOnOwnedSpace.length}</Value>
          </Col>
          <Col span={8}>
            <Title>Value of Bids On Owned Spaces</Title>
            <Value>
              {' '}
              {totalBidOwnedSpaceValue &&
                library &&
                library.utils.fromWei(totalBidOwnedSpaceValue.toString(), 'ether')}
              Ξ ($
              {totalBidOwnedSpaceValue &&
                library &&
                library.utils.fromWei(totalBidOwnedSpaceValue.toString(), 'ether') * 3000}
              )
            </Value>
          </Col>
          <Col span={8}>
            <Title>Total Amount Earned Selling Spaces</Title>
            <Value>
              {' '}
              {data &&
                data.soldETHTotal &&
                library &&
                library.utils.fromWei(data.soldETHTotal.toString(), 'ether')}
              Ξ ($
              {data &&
                data.soldETHTotal &&
                library &&
                library.utils.fromWei(data.soldETHTotal.toString(), 'ether') * 3000}
              )
            </Value>
          </Col>
          <Col span={8}>
            <Title>Current Bids Placed By This Account</Title>
            <Value>{accountBids && accountBids.length}</Value>
          </Col>
          <Col span={8}>
            <Title>Value of Current Bids Placed</Title>
            <Value>
              {totalBidValue && library && library.utils.fromWei(totalBidValue.toString(), 'ether')}
              Ξ ($
              {totalBidValue &&
                library &&
                library.utils.fromWei(totalBidValue.toString(), 'ether') * 3000}
              ).
            </Value>
          </Col>
        </Row>

        <StyledSpace style={{ marginTop: 60 }}>
          <SpaceTitle>{spacesOwned && spacesOwned.length} Spaces Owned</SpaceTitle>
          <Content>
            <ItemsContainer justify='start' gutter={[0, 10]}>
              {spacesOwnedDetail.map((space) => (
                <Col span={2} key={space.id}>
                  <ImageContainer>
                    <ImageWrapper>
                      <Link to={`/detail/${space.id}`}>
                        <img src={space.img} alt={`img${space.id}`} />
                      </Link>
                    </ImageWrapper>
                  </ImageContainer>
                </Col>
              ))}
            </ItemsContainer>
          </Content>
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>
            {accountOffers && accountOffers.length} Spaces for Sale by this Account
          </SpaceTitle>
          <Content>
            <ItemsContainer justify='start' gutter={[0, 10]}>
              {accountOffers.map((space) => (
                <Col span={2} key={space.id}>
                  <ImageContainer>
                    <ImageWrapper>
                      <Link to={`/detail/${space.id}`}>
                        <img src={space.img} alt={`img${space.id}`} />
                      </Link>
                    </ImageWrapper>
                  </ImageContainer>
                  <StyledText $size='14px' $color='#4B4B4B'>
                    {space.price &&
                      library &&
                      library.utils.fromWei(space.price.toString(), 'ether')}{' '}
                    ETH
                  </StyledText>
                  <StyledText $size='14px' $color='#4B4B4B'>
                    $
                    {space.price &&
                      library &&
                      library.utils.fromWei(space.price.toString(), 'ether') * 3000}
                  </StyledText>
                </Col>
              ))}
            </ItemsContainer>
          </Content>
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>
            {totalBidOwnedSpaceValue &&
              library &&
              library.utils.fromWei(totalBidOwnedSpaceValue.toString(), 'ether')}{' '}
            ETH ($
            {totalBidOwnedSpaceValue &&
              library &&
              library.utils.fromWei(totalBidOwnedSpaceValue.toString(), 'ether') * 3000}
            ) in {spacesBidsOwnedSpaceDetail && spacesBidsOwnedSpaceDetail.length} Bids For Spaces
            Owned by this Account
          </SpaceTitle>
          <Content>
            <ItemsContainer justify='start' gutter={[0, 10]}>
              {spacesBidsOwnedSpaceDetail.map((space) => (
                <Col span={2} key={space.id}>
                  <ImageContainer>
                    <ImageWrapper>
                      <Link to={`/detail/${space.id}`}>
                        <img src={space.img} alt={`img${space.id}`} />
                      </Link>
                    </ImageWrapper>
                  </ImageContainer>
                  <StyledText $size='14px' $color='#4B4B4B'>
                    {space.value &&
                      library &&
                      library.utils.fromWei(space.value.toString(), 'ether')}{' '}
                    ETH
                  </StyledText>
                  <StyledText $size='14px' $color='#4B4B4B'>
                    $
                    {space.value &&
                      library &&
                      library.utils.fromWei(space.value.toString(), 'ether') * 3000}
                  </StyledText>
                </Col>
              ))}
            </ItemsContainer>
          </Content>
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>
            {totalBidValue && library && library.utils.fromWei(totalBidValue.toString(), 'ether')}{' '}
            ETH ($
            {totalBidValue &&
              library &&
              library.utils.fromWei(totalBidValue.toString(), 'ether') * 3000}
            ) in {accountBids && accountBids.length} Bid Placed by This Account
          </SpaceTitle>
          <Content>
            <ItemsContainer justify='start' gutter={[0, 10]}>
              {accountBids.map((space) => (
                <Col span={2} key={space.id}>
                  <ImageContainer>
                    <ImageWrapper>
                      <Link to={`/detail/${space.id}`}>
                        <img src={space.img} alt={`img${space.id}`} />
                      </Link>
                    </ImageWrapper>
                  </ImageContainer>
                  <StyledText $size='14px' $color='#4B4B4B'>
                    {space.price &&
                      library &&
                      library.utils.fromWei(space.price.toString(), 'ether')}{' '}
                    ETH
                  </StyledText>
                  <StyledText $size='14px' $color='#4B4B4B'>
                    $
                    {space.price &&
                      library &&
                      library.utils.fromWei(space.price.toString(), 'ether') * 3000}
                  </StyledText>
                </Col>
              ))}
            </ItemsContainer>
          </Content>
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>
            {' '}
            {data.boughtETHTotal &&
              library &&
              library.utils.fromWei(data.boughtETHTotal.toString(), 'ether')}{' '}
            ETH ($
            {data.boughtETHTotal &&
              library &&
              library.utils.fromWei(data.boughtETHTotal.toString(), 'ether') * 3000}
            ) in {spacesBoughtDetail && spacesBoughtDetail.length} Space Bought by This Account
          </SpaceTitle>
          <Content>
            <ItemsContainer justify='start' gutter={[0, 10]}>
              {spacesBoughtDetail &&
                spacesBoughtDetail.map((space: any) => (
                  <Col span={2} key={space.id}>
                    <ImageContainer>
                      <ImageWrapper>
                        <Link to={`/detail/${space.id}`}>
                          <img src={space.img} alt={`img${space.id}`} />
                        </Link>
                      </ImageWrapper>
                    </ImageContainer>
                    <StyledText $size='14px' $color='#4B4B4B'>
                      {space.amount &&
                        library &&
                        library.utils.fromWei(space.amount.toString(), 'ether')}{' '}
                      ETH
                    </StyledText>
                    <StyledText $size='14px' $color='#4B4B4B'>
                      $
                      {space.amount &&
                        library &&
                        library.utils.fromWei(space.amount.toString(), 'ether') * 3000}
                    </StyledText>
                  </Col>
                ))}
            </ItemsContainer>
          </Content>
        </StyledSpace>

        <StyledSpace>
          <SpaceTitle>
            {' '}
            {data.soldETHTotal &&
              library &&
              library.utils.fromWei(data.soldETHTotal.toString(), 'ether')}{' '}
            ETH ($
            {data.soldETHTotal &&
              library &&
              library.utils.fromWei(data.soldETHTotal.toString(), 'ether') * 3000}
            ) in {spacesSoldDetail && spacesSoldDetail.length} Space Sold by This Account
          </SpaceTitle>
          <Content>
            <ItemsContainer justify='start' gutter={[0, 10]}>
              {spacesSoldDetail &&
                spacesSoldDetail.map((space: any) => (
                  <Col span={2} key={space.id}>
                    <ImageContainer>
                      <ImageWrapper>
                        <Link to={`/detail/${space.id}`}>
                          <img src={space.img} alt={`img${space.id}`} />
                        </Link>
                      </ImageWrapper>
                    </ImageContainer>
                    <StyledText $size='14px' $color='#4B4B4B'>
                      {space.amount &&
                        library &&
                        library.utils.fromWei(space.amount.toString(), 'ether')}{' '}
                      ETH
                    </StyledText>
                    <StyledText $size='14px' $color='#4B4B4B'>
                      $
                      {space.amount &&
                        library &&
                        library.utils.fromWei(space.amount.toString(), 'ether') * 3000}
                    </StyledText>
                  </Col>
                ))}
            </ItemsContainer>
          </Content>
        </StyledSpace>
      </Box>
    </MainContainer>
  );
};

const Content = styled.div`
  min-height: 70px;
`;

const StyledSpace = styled.div`
  width: 100%;
`;

const SpaceTitle = styled(Text)`
  font-size: 22px;
  display: block;
  font-weight: bold;
  border-bottom: 1px solid #bbb;
  width: 100%;
`;

const ItemsContainer = styled(Row)`
  margin: 30px 0;
`;

const BigTitle = styled(Text)`
  font-size: 45px;
  font-weight: bold;
  display: block;
`;

const Title = styled(Text)`
  font-size: 18px;
  display: block;
`;

const Value = styled(Text)`
  font-size: 18px;
  display: block;
  font-weight: bold;
`;

const SmallTitle = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  display: block;
  margin-bottom: 30px;
`;

const LinkText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${(p) => p.theme.primary};
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 90px;
  background-color: #8e6fb6;
  position: relative;
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
    width: 70px;
    height: 70px;
  }
`;

const StyledText = styled(Text)`
  display: block;
  text-align: center;
`;

export default Account;

// const ItemsLargestSales = () => (
//   <>

//   </>
// );
