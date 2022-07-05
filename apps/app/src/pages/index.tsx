import { AppLayout } from '@/components/layouts/app';
import { useI18nContext } from '@pikas-template/translate';
import { NextSeo } from 'next-seo';
import React from 'react';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />

      <span>Hello world</span>
    </>
  );
};

Home.getLayout = (page: React.ReactNode): React.ReactNode => {
  return <AppLayout>{page}</AppLayout>;
};

export default Home;
