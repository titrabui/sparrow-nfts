import React from 'react';
import MainContainer from 'ui/MainContainer';
import Spaces from 'utils/spaces';
import { Redirect } from 'react-router-dom';
import { totalSpace } from 'environment';
import Avatar from './Avatar';
import Information from './Information';
import TransactionsHistory from './TransactionsHistory';

const DetailsPage: React.FC = (props: any) => {
  const id = (props as any)?.match?.params?.id;
  const space = Spaces.find((item) => item.id === Number(id));
  return id > totalSpace ? (
    <Redirect to='/detail/1' />
  ) : (
    <MainContainer>
      <Avatar data={space} />
      <Information data={space} />
      <TransactionsHistory data={space} />
    </MainContainer>
  );
};

export default DetailsPage;
