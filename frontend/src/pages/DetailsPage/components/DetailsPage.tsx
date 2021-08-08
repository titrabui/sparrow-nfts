import React from 'react';
import MainContainer from 'ui/MainContainer';
import Spaces from 'utils/spaces';
import Avatar from './Avatar';
import Information from './Information';
import SearchBar from './SearchBar';
import TransactionsHistory from './TransactionsHistory';

const DetailsPage: React.FC = (props: any) => {
  const id = (props as any)?.match?.params?.id;
  const space = Spaces.find((item) => item.id === Number(id));
  return (
    <MainContainer>
      <Avatar data={space} />
      <Information data={space} />
      <TransactionsHistory data={space} />
      <SearchBar />
    </MainContainer>
  );
};

export default DetailsPage;
