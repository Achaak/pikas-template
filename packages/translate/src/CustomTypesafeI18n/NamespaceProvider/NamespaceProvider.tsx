import { useI18nContext } from '../../i18n/i18n-react.js';
import type { Namespaces } from '../../i18n/i18n-types.js';
import { loadNamespaceAsync } from '../../i18n/i18n-util.async.js';
import { FC, ReactNode, useEffect } from 'react';

export type NamespaceProviderProps = {
  namespaces?: Namespaces[];
  children?: ReactNode;
};
export const NamespaceProvider: FC<NamespaceProviderProps> = ({
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
