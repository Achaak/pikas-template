// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initFormatters } from './formatters';
import type { Locales, Translations } from './i18n-types';
import { loadedFormatters, loadedLocales, locales } from './i18n-util';

import en from './en';
import fr from './fr';

import en_app_signIn from './en/app_signIn';
import en_common from './en/common';
import fr_app_signIn from './fr/app_signIn';
import fr_common from './fr/common';

const localeTranslations = {
  en: {
    ...en,
    app_signIn: en_app_signIn,
    common: en_common,
  },
  fr: {
    ...fr,
    app_signIn: fr_app_signIn,
    common: fr_common,
  },
};

export const loadLocale = (locale: Locales): void => {
  if (loadedLocales[locale]) return;

  loadedLocales[locale] = localeTranslations[locale] as unknown as Translations;
  loadFormatters(locale);
};

export const loadAllLocales = (): void => locales.forEach(loadLocale);

export const loadFormatters = (locale: Locales): void =>
  void (loadedFormatters[locale] = initFormatters(locale));
