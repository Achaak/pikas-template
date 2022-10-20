import { styled } from '@pikas-template/ui/dist/core/pikas-ui/Styles';
import { FC, ReactNode } from 'react';

const Container = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 8px',
  overflow: 'auto',
  backgroundColor: '$BACKGROUND',

  '@md': {
    padding: 32,
  },
});

const Content = styled('div', {
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  customRowGap: 24,
  width: 300,
  marginTop: 'auto',
  marginBottom: 'auto',

  '@md': {
    customRowGap: 32,
  },
});

type CustomProps = {
  children?: ReactNode;
};

export const AuthLayout: FC<CustomProps> = ({ children }) => (
  <Container>
    <Content>{children}</Content>
  </Container>
);
