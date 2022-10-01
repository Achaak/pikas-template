import { FC } from 'react';
import TypesafeI18n from '../i18n/i18n-react';
import type { Locales } from '../i18n/i18n-types';
import type { NamespaceLoaderProviderProps } from './NamespaceLoaderProvider';
import { NamespaceLoaderProvider } from './NamespaceLoaderProvider';

type CustomProps = NamespaceLoaderProviderProps & {
  locale: Locales;
};
export const CustomTypesafeI18n: FC<CustomProps> = ({
  namespaces,
  children,
  locale,
}) => (
  <TypesafeI18n locale={locale} key={locale}>
    <NamespaceLoaderProvider namespaces={namespaces}>
      {children}
    </NamespaceLoaderProvider>
  </TypesafeI18n>
);
