import { themeDefault } from '@pikas-template/ui/dist/styles/theme-default';
import { themeDark } from '@pikas-template/ui/dist/styles/theme-dark';
import { customGlobalCss } from '@pikas-template/ui/dist/styles/globalCss';
import type {
  Locales,
  Namespaces,
} from '@pikas-template/translate/dist/i18n/i18n-types';
import { CustomTypesafeI18n } from '@pikas-template/translate/dist/CustomTypesafeI18n/namespaceProvider';
import {
  baseLocale,
  detectLocale,
} from '@pikas-template/translate/dist/i18n/i18n-util';
import { loadLocaleAsync } from '@pikas-template/translate/dist/i18n/i18n-util.async';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import superjson from 'superjson';

import SEO from '../../next-seo.config';
import { PikasUIProvider } from '@pikas-template/ui/dist/core/pikas-ui/Styles';
import type { Session } from 'next-auth';
import type { AppRouter } from '../server/routers/_app';
import { StoreProvider } from '../store/hooks';
import { store } from '../store/store';
import { getBaseUrl } from '../utils/getBaseUrl';
import { usePWA } from '../hooks/usePWA';
import { MetaHead } from '../components/global/MetaHead';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    workbox: any;
  }
}

export type NextPageWithLayout<
  T extends Record<string, unknown> = Record<string, unknown>
> = NextPage<T> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
  namespaces?: Namespaces[];
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
} & {
  pageProps: {
    session?: Session | null | undefined;
  } & AppProps['pageProps'];
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithLayout): JSX.Element => {
  const getLayout =
    Component.getLayout ?? ((page: React.ReactNode): React.ReactNode => page);

  const [locale, setLocale] = useState<Locales | undefined>(undefined);

  customGlobalCss();

  useEffect(() => {
    const l = detectLocale(() => [router.locale || baseLocale]);

    loadLocaleAsync(l).then(() => setLocale(l));
  }, [router.locale]);

  usePWA();

  return (
    <>
      <Head>
        <MetaHead />
      </Head>
      <DefaultSeo {...SEO} />
      <PikasUIProvider lightTheme={themeDefault} darkTheme={themeDark}>
        <SessionProvider session={session}>
          <StoreProvider store={store}>
            {locale && (
              <CustomTypesafeI18n
                locale={locale}
                namespaces={Component.namespaces}
              >
                {getLayout(<Component {...pageProps} />)}
              </CustomTypesafeI18n>
            )}
          </StoreProvider>
        </SessionProvider>
      </PikasUIProvider>
    </>
  );
};

export default withTRPC<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
  /**
   * Set headers or status code when doing SSR
   */
  // responseMeta({ clientErrors }) {
  //   if (clientErrors.length && clientErrors[0]) {
  //     // propagate http first error from API calls
  //     return {
  //       status: clientErrors[0].data?.httpStatus ?? 500,
  //     }
  //   }

  //   // for app caching with SSR see https://trpc.io/docs/caching

  //   return {}
  // },
})(MyApp);
