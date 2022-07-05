import { getEnv } from '@pikas-template/common/dist/env.js';
import { getLang } from '@pikas-template/common/dist/lang.js';

import type { RouteOption } from './types';

export const formatRouteURL = ({
  devUrl,
  passHash,
  passSearch,
  route,
  isUrl,
  prodUrl,
  lang,
}: {
  route: string;
  prodUrl: string;
  devUrl: string;
} & RouteOption): string => {
  let APP_URL = '';
  const hash =
    typeof window !== 'undefined' && passHash ? window.location.hash : '';
  const search =
    typeof window !== 'undefined' && passSearch ? window.location.search : '';

  if (isUrl) {
    const newLang = lang || getLang();
    const langFormat = newLang ? '/' + newLang : '';

    if (getEnv() === 'dev') {
      APP_URL = devUrl + langFormat;
    } else {
      APP_URL = prodUrl + langFormat;
    }
  }

  return `${APP_URL}${route}${search}${hash}`;
};
