import type { Namespaces } from '../i18n/i18n-types';
import { loadNamespaceAsync } from '../i18n/i18n-util.async';
import { FC, ReactNode, useEffect } from 'react';
import { useI18nContext } from '../i18n/i18n-react';

export type NamespaceLoaderProviderProps = {
  namespaces?: Namespaces[];
  children?: ReactNode;
};
export const NamespaceLoaderProvider: FC<NamespaceLoaderProviderProps> = ({
  namespaces,
  children,
}) => {
  const { setLocale, locale } = useI18nContext();

  useEffect(() => {
    if (!namespaces) {
      return;
    }

    void Promise.all(
      namespaces.map(async (namespace) => loadNamespaceAsync(locale, namespace))
    ).then(() => setLocale(locale));
  }, [locale, namespaces]);

  return <>{children}</>;
};
