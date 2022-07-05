import { AuthLayout } from '@/components/layouts/auth';
import type { NextPageWithLayout } from '@/pages/_app';
import { Button } from '@pikas-template/ui/src/components/inputs/button';
import { Textfield } from '@pikas-template/ui/src/components/inputs/textfield';
import { IconByName } from '@pikas-template/ui/src/core/pikas-ui/Icons';
import { APP_ROUTE_DEFAULT } from '@pikas-template/router/dist/app';
import { styled } from '@pikas-template/ui/src/core/pikas-ui/Styles';
import type { GetServerSideProps } from 'next';
import type { Provider } from 'next-auth/providers';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useI18nContext } from '@pikas-template/translate';

const ProviderContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  boxShadow: '$ELEVATION_BOTTOM_5',
  backgroundColor: '$WHITE',
  padding: 32,
  br: 'lg',
  customRowGap: 8,
  width: '100%',
});

const BackContainer = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const BackText = styled('span', {
  marginLeft: 8,
  color: '$BLACK',
});

const EmailContainer = styled('form', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
});

const Separator = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '8px 0',
});

const SeparatorLine = styled('div', {
  flex: 1,
  backgroundColor: '$GRAY_DARK',
  height: 1,
});

const SeparatorText = styled('span', {
  padding: '0 8px',
  color: '$GRAY_DARK',
});

const ButtonMore = styled('button', {
  background: 'none',
  border: 'none',
  fontSize: '$REM-SMALL',
  marginTop: 8,
  color: '$PRIMARY',
  cursor: 'pointer',
});

const MAX_PROVIDER = 3;

const SignIn: NextPageWithLayout<{
  providers: Provider | null;
  csrfToken: string | undefined;
}> = ({ providers, csrfToken }) => {
  const { LL } = useI18nContext();
  const [moreClicked, setMoreClicked] = useState(false);

  if (!providers) {
    return null;
  }

  return (
    <>
      <ProviderContainer>
        <EmailContainer method="post" action="/api/auth/signIn/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Textfield
            type="email"
            id="email"
            name="email"
            label={LL.app_signIn.email.label()}
            borderRadius="md"
            placeholder={LL.app_signIn.email.placeholder()}
          />
          <Button type="submit" style={{ marginTop: 8 }}>
            {LL.app_signIn.email.button()}
          </Button>
        </EmailContainer>

        <Separator>
          <SeparatorLine />
          <SeparatorText>{LL.app_signIn.or()}</SeparatorText>
          <SeparatorLine />
        </Separator>

        {Object.values(providers).map(
          (provider, providerKey) =>
            (moreClicked || providerKey < MAX_PROVIDER) && (
              <Button
                key={provider.name}
                color={provider.id.toUpperCase() as never}
                onClick={(): void => {
                  signIn(provider.id, {
                    callbackUrl: APP_ROUTE_DEFAULT({ isUrl: true }),
                    redirect: true,
                  });
                }}
              >
                {provider.name}
              </Button>
            )
        )}

        {!moreClicked && (
          <ButtonMore onClick={(): void => setMoreClicked(true)}>
            {LL.app_signIn.more()}
          </ButtonMore>
        )}
      </ProviderContainer>

      <Link href={APP_ROUTE_DEFAULT()} passHref>
        <BackContainer>
          <IconByName name="bx:left-arrow-alt" size={20} color="BLACK" />
          <BackText>{LL.app_signIn['back-to-website']()}</BackText>
        </BackContainer>
      </Link>
    </>
  );
};

SignIn.getLayout = (page: React.ReactNode): React.ReactNode => {
  return <AuthLayout>{page}</AuthLayout>;
};

SignIn.namespaces = ['app_signIn'];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers, csrfToken },
  };
};

export default SignIn;
