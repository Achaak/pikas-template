import { styled } from '@pikas-template/ui/dist/core/pikas-ui/Styles';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { setMe } from '../../../store/reducers/user/actions';

const Container = styled('div', {
  backgroundColor: '$BACKGROUND',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  marginTop: 56,
  paddingTop: 24,
  paddingBottom: 24,
  overflow: 'auto',
  width: '100%',

  '@md': {
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

const Child = styled('div', {
  padding: 8,
  flex: 1,
  gridCols: 12,
  width: '100%',
  maxWidth: 1400,
  customRowGap: 40,
  customColumnGap: 16,
  alignItems: 'start',
  alignContent: 'strech',
  overflow: 'auto',

  '@md': {
    padding: 32,
    customRowGap: 40,
    customColumnGap: 40,
  },
});

interface CustomProps {
  children?: React.ReactNode;
}

export const AppLayout: React.FC<CustomProps> = ({ children }) => {
  // const { data, status } = useSession({
  //   required: true,
  //   onUnauthenticated: () => signIn(),
  // });

  // useEffect(() => {
  //   setMe({ me: data?.user || null });
  // }, [data]);

  // return (
  //   <>
  //     {status === 'authenticated' && (
  //       <Container>
  //         <Content>
  //           <Child>{children}</Child>
  //         </Content>
  //       </Container>
  //     )}
  //   </>
  // );
  return (
    <>
      {
        <Container>
          <Content>
            <Child>{children}</Child>
          </Content>
        </Container>
      }
    </>
  );
};
