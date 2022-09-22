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
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import SEO from '../../next-seo.config';
import { PikasUIProvider } from '@pikas-template/ui/dist/core/pikas-ui/Styles';
import type { Session } from 'next-auth';
import { StoreProvider } from '../store/hooks';
import { store } from '../store/store';
import { usePWA } from '../hooks/usePWA';
import { MetaHead } from '../components/global/MetaHead';
import { trpc } from '../utils/trpc';

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

export default trpc.withTRPC(MyApp);
