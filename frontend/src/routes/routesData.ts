import BasicPage from 'pages/Basic';
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
  notFoundPage = '/*'
}

const privateRoutes: RouteType[] = [
  
];
const publicRoutes: RouteType[] = [
  {
    path: routesEnum.login,
    component: BasicPage,
    exact: true
  },
  {
    path: routesEnum.basic,
    component: BasicPage,
    exact: true
  }
];
export { privateRoutes, publicRoutes };
