/* eslint-disable no-unused-vars */
import DetailsPage from 'pages/DetailsPage';
import HomePage from 'pages/Home';
import TopOwners from 'pages/TopOwners';
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
];
export { privateRoutes, publicRoutes };
