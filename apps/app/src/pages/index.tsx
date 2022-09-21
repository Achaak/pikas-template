import { useI18nContext } from '@pikas-template/translate';
import { signIn, signOut, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import React from 'react';
import { AppLayout } from '../components/layouts/app';
import { HomeContainer } from '../components/pages/home';
import { globalNamespaces } from '../configs/globalNamespaces';
import { trpc } from '../utils/trpc';

import type { NextPageWithLayout } from './_app';

const AuthShowcase: React.FC = () => {
  const { data: secretMessage, isLoading } = trpc.useQuery([
    'protected.getSecretMessage',
  ]);

  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
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

Home.getLayout = (page: React.ReactNode): React.ReactNode => {
  return <AppLayout>{page}</AppLayout>;
};

Home.namespaces = [...globalNamespaces];

export default Home;
