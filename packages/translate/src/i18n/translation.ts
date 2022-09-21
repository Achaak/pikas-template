import type { Locales } from '../index.js';
import type { TranslationFunctions } from './i18n-types.js';
import { baseLocale, detectLocale, i18nObject } from './i18n-util.js';
import { loadLocale } from './i18n-util.sync.js';
import { htmlLangAttributeDetector } from 'typesafe-i18n/detectors';

export const locale = (): Locales =>
  typeof window !== 'undefined'
    ? detectLocale(htmlLangAttributeDetector)
    : baseLocale;

export const getTranslation = (): TranslationFunctions => {
  if (typeof window === 'undefined') {
    loadLocale('en');
    return i18nObject('en');
  }

  const L = locale();
  loadLocale(L);

  return i18nObject(L);
};
