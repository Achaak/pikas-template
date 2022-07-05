import { formatRouteURL } from './tools.js';
import type { RouteOption } from './types.js';

export const APP_URL = 'https://pikas-template.com';
export const APP_URL_DEV = 'https://pikas-template.com';

const appPath = '';

export const APP_ROUTES_LIST = {
  HOME: `${appPath}/`,
};

export const APP_ROUTE_DEFAULT = (routeOptions?: RouteOption): string => {
  return formatRouteURL({
    ...routeOptions,
    prodUrl: APP_URL,
    devUrl: APP_URL_DEV,
    route: APP_ROUTES_LIST['HOME'],
  });
};

export const APP_ROUTES = (
  routeId: keyof typeof APP_ROUTES_LIST,
  routeOptions?: RouteOption
): string => {
  return formatRouteURL({
    ...routeOptions,
    prodUrl: APP_URL,
    devUrl: APP_URL_DEV,
    route: APP_ROUTES_LIST[routeId],
  });
};
