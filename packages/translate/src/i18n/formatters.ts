import type { Locales, Formatters } from './i18n-types.js';
import type { FormattersInitializer } from 'typesafe-i18n';

export const initFormatters: FormattersInitializer<
  Locales,
  Formatters
> = () => {
  const formatters: Formatters = {
    // add your formatter functions here
  };

  return formatters;
};
