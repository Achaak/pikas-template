import React from 'react';
import TypesafeI18n from '../i18n/i18n-react';
import type { Locales } from '../i18n/i18n-types';
import type { NamespaceProviderProps } from './NamespaceProvider/namespaceProvider';
import { NamespaceProvider } from './NamespaceProvider/namespaceProvider';

interface CustomProps extends NamespaceProviderProps {
  locale: Locales;
}
export const CustomTypesafeI18n: React.FC<CustomProps> = ({
  namespaces,
  children,
  locale,
}) => {
  return (
    <TypesafeI18n locale={locale}>
      <NamespaceProvider namespaces={namespaces}>{children}</NamespaceProvider>
    </TypesafeI18n>
  );
};
