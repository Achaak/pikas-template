import { themeDefault } from '@pikas-template/ui/dist/styles/theme-default';
import { themeDark } from '@pikas-template/ui/dist/styles/theme-dark';
import { customGlobalCss } from '@pikas-template/ui/dist/styles/globalCss';
import type {
  Locales,
  Namespaces,
} from '@pikas-template/translate/dist/i18n/i18n-types';
import { CustomTypesafeI18n } from '@pikas-template/translate/dist/CustomTypesafeI18n/index';
import {
  baseLocale,
  detectLocale,
} from '@pikas-template/translate/dist/i18n/i18n-util';
import { loadLocaleAsync } from '@pikas-template/translate/dist/i18n/i18n-util.async';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { ReactNode, useEffect, useState } from 'react';
import SEO from '../../next-seo.config';
import { PikasUIProvider } from '@pikas-template/ui/dist/core/pikas-ui/Styles';
import type { Session } from 'next-auth';
import { trpc } from '../utils/trpc';

export type NextPageWithLayout<
  T extends Record<string, unknown> = Record<string, unknown>
> = NextPage<T> & {
  getLayout?: (page: ReactNode) => ReactNode;
  namespaces?: Namespaces[];
};

type AppPropsWithLayout = AppProps<{ session?: Session | null | undefined }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithLayout): JSX.Element => {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode): ReactNode => page);

  const [locale, setLocale] = useState<Locales | undefined>(undefined);

  customGlobalCss();

  useEffect(() => {
    const l = detectLocale(() => [router.locale ?? baseLocale]);

    loadLocaleAsync(l)
      .then(() => setLocale(l))
      .catch((e) => console.error(e));
  }, [router.locale]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <PikasUIProvider lightTheme={themeDefault} darkTheme={themeDark}>
        <SessionProvider session={session}>
          {locale && (
            <CustomTypesafeI18n
              locale={locale}
              namespaces={Component.namespaces}
            >
              {getLayout(<Component {...pageProps} />)}
            </CustomTypesafeI18n>
          )}
        </SessionProvider>
      </PikasUIProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
