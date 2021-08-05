import React from 'react';
import MainContainer from 'ui/MainContainer';
import Introduction from './Introduction';
import OverallStats from './OverallStats';
import LargestSales from './LargestSales';
import RecentTransactions from './RecentTransactions';
import ForSales from './ForSales';
import Bids from './Bids';
import Wrapped from './Wrapped';

const HomePage: React.FC = () => {
  return (
    <MainContainer mt='100px'>
      <Introduction />
      <OverallStats />
      <LargestSales />
      <RecentTransactions />
      <ForSales />
      <Bids />
      <Wrapped />
    </MainContainer>
  );
};

export default HomePage;
