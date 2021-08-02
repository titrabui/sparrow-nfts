import { Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routesData';

import { Helmet } from 'react-helmet';
import PrivateRoute from './PrivateRoute';
import React from 'react';
import ScrollToTop from 'utils/ScrollToTop';

const Routes = (
  <ScrollToTop>
    <Helmet>
      <html lang='en' />
      <title>Napa NFTs</title>
      <meta property='og:title' content='' />
      <meta property='twitter:title' content='' />
      <meta name='description' content='' />
      <meta property='og:description' content='' />
      <meta property='twitter:description' content='' />
    </Helmet>
    <Switch>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} component={route.component} exact />
      ))}
      {privateRoutes.map((route) => (
        <PrivateRoute key={route.path} path={route.path} component={route.component} exact />
      ))}
    </Switch>
  </ScrollToTop>
);

export default Routes;
