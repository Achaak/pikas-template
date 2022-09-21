import { AppLayout } from '@/components/layouts/app';
import { HomeContainer } from '@/components/pages/home';
import { globalNamespaces } from '@/configs/globalNamespaces';
import { useI18nContext } from '@pikas-template/translate';
import { NextSeo } from 'next-seo';
import React from 'react';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />

      <HomeContainer />
    </>
  );
};

Home.getLayout = (page: React.ReactNode): React.ReactNode => {
  return <AppLayout>{page}</AppLayout>;
};

Home.namespaces = [...globalNamespaces];

export default Home;
