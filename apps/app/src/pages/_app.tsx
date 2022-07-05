import type { AppRouter } from '@/server/routers/_app';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { themeDefault } from '@pikas-template/ui/src/styles/theme-default';
import { themeDark } from '@pikas-template/ui/src/styles/theme-dark';
import { customGlobalCss } from '@pikas-template/ui/src/styles/globalCss';
import type {
  Locales,
  Namespaces,
} from '@pikas-template/translate/src/i18n/i18n-types';
import { CustomTypesafeI18n } from '@pikas-template/translate/src/CustomTypesafeI18n/namespaceProvider';
import {
  baseLocale,
  detectLocale,
} from '@pikas-template/translate/src/i18n/i18n-util';
import { loadLocaleAsync } from '@pikas-template/translate/src/i18n/i18n-util.async';
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
import { StoreProvider } from '@/store/hooks';
import { store } from '@/store/store';
import { PikasUIProvider } from '@pikas-template/ui/src/core/pikas-ui/Styles';

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
};

const MyApp = ({
  Component,
  pageProps,
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

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;

      const promptNewVersionAvailable = (): void => {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });

        wb.messageSkipWaiting();
      };

      wb.addEventListener('waiting', promptNewVersionAvailable);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="/favicons/favicon-194x194.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Pikas-template" />
        <meta name="application-name" content="Pikas-template" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/mstile-144x144.png"
        />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo {...SEO} />
      <PikasUIProvider lightTheme={themeDefault} darkTheme={themeDark}>
        <SessionProvider session={pageProps.session}>
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
