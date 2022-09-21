import TypesafeI18n from '../i18n/i18n-react.js';
import type { Locales } from '../i18n/i18n-types.js';
import type { NamespaceProviderProps } from './NamespaceProvider/index.js';
import { NamespaceProvider } from './NamespaceProvider/index.js';
import React from 'react';

interface CustomProps extends NamespaceProviderProps {
  locale: Locales;
}
export const CustomTypesafeI18n: React.FC<CustomProps> = ({
  namespaces,
  children,
  locale,
}) => {
  return (
    <TypesafeI18n locale={locale} key={locale}>
      <NamespaceProvider namespaces={namespaces}>{children}</NamespaceProvider>
    </TypesafeI18n>
  );
};
