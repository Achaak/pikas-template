import { useI18nContext } from '@pikas-template/translate';
import { signIn, signOut, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { FC, ReactNode, useCallback } from 'react';
import { AppLayout } from '../components/layouts/app';
import { HomeContainer } from '../components/pages/home';
import { globalNamespaces } from '../configs/globalNamespaces';
import { trpc } from '../utils/trpc';

import type { NextPageWithLayout } from './_app';

const AuthShowcase: FC = () => {
  const { data: secretMessage } = trpc.protected.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  const onClick = useCallback(() => {
    const f = async () => {
      if (sessionData) {
        await signOut();
      } else {
        await signIn();
      }
    };

    void f();
  }, [sessionData]);

  return (
    <div>
      {sessionData && <p>Logged in as {sessionData.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <button onClick={onClick}>{sessionData ? 'Sign out' : 'Sign in'}</button>
    </div>
  );
};

const Home: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      <AuthShowcase />
      <HomeContainer />
    </>
  );
};

Home.getLayout = (page: ReactNode): ReactNode => <AppLayout>{page}</AppLayout>;

Home.namespaces = [...globalNamespaces];

export default Home;
