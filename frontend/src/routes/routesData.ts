import BasicPage from 'pages/Basic';
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
  basic = '/basic',
  login = '/login',
  home = '/home',
  topOwners = '/topOwners',
  notFoundPage = '/*',
  default = '/',
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
    path: routesEnum.basic,
    component: BasicPage,
    exact: true
  },
  {
    path: routesEnum.topOwners,
    component: TopOwners,
    exact: true
  },
];
export { privateRoutes, publicRoutes };
