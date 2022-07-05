export const getLang = (): string | undefined => {
  if (typeof document === 'undefined') {
    return;
  }
  return document.documentElement.lang;
};

export const Lang = [
  {
    iso: 'en',
    name: 'English',
  },
  {
    iso: 'fr',
    name: 'Français',
  },
] as const;

export type LangISO = typeof Lang[number]['iso'];
