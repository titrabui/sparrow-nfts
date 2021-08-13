/* eslint-disable no-unused-vars */
import Bids from 'pages/Bids';
import DetailsPage from 'pages/DetailsPage';
import ForSale from 'pages/ForSale';
import HomePage from 'pages/Home';
import TopOwners from 'pages/TopOwners';
import TopSale from 'pages/TopSale';
import { FunctionComponent } from 'react';

type RouteType = {
  path: string;
  component: FunctionComponent;
  exact?: boolean;
};

/**
 * * Reused when you want to redirect to any page.
 */
export enum routesEnum {
  login = '/login',
  home = '/home',
  topOwners = '/topOwners',
  detail = '/detail/:id',
  topSale = '/topSale',
  forSale = '/forSale',
  bids = '/bids',
  notFoundPage = '/*',
  default = '/'
}

const privateRoutes: RouteType[] = [];
const publicRoutes: RouteType[] = [
  {
    path: routesEnum.home,
    component: HomePage,
    exact: true
  },
  {
    path: routesEnum.default,
    component: HomePage,
    exact: true
  },
  {
    path: routesEnum.topOwners,
    component: TopOwners,
    exact: true
  },
  {
    path: routesEnum.detail,
    component: DetailsPage,
    exact: false
  },
  {
    path: routesEnum.topSale,
    component: TopSale,
    exact: true
  },
  {
    path: routesEnum.forSale,
    component: ForSale,
    exact: true
  },
  {
    path: routesEnum.bids,
    component: Bids,
    exact: true
  }
];
export { privateRoutes, publicRoutes };
