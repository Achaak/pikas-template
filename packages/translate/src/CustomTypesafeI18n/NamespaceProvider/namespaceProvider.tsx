import React, { useEffect } from 'react';
import { useI18nContext } from '../../i18n/i18n-react';
import type { Namespaces } from '../../i18n/i18n-types';
import { loadNamespaceAsync } from '../../i18n/i18n-util.async';

export interface NamespaceProviderProps {
  namespaces?: Namespaces[];
  children?: React.ReactNode;
}
export const NamespaceProvider: React.FC<NamespaceProviderProps> = ({
  namespaces,
  children,
}) => {
  const { setLocale, locale } = useI18nContext();

  useEffect(() => {
    if (!namespaces) {
      return;
    }

    Promise.all(
      namespaces.map(async (namespace) => {
        await loadNamespaceAsync(locale, namespace);
      })
    ).then(() => setLocale(locale));
  }, [locale, namespaces]);

  return <>{children}</>;
};
