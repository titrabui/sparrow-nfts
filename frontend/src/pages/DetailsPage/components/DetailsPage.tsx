import React from 'react';
import MainContainer from 'ui/MainContainer';
import Spaces from 'utils/spaces';
import { Redirect } from 'react-router-dom';
import { MAX_SPACE_SUPPLY_TOTAL } from 'environment';
import Avatar from './Avatar';
import Information from './Information';
import TransactionsHistory from './TransactionsHistory';

const DetailsPage: React.FC = (props: any) => {
  const id = (props as any)?.match?.params?.id;
  const space = Spaces.find((item) => item.id === Number(id));
  return id > MAX_SPACE_SUPPLY_TOTAL ? (
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
