import { themeDefault } from '@pikas-template/ui';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {},
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: themeDefault.colors.WHITE,
      },
      {
        name: 'dark',
        value: themeDefault.colors.BLACK,
      },
      {
        name: 'primary',
        value: themeDefault.colors.PRIMARY,
      },
      {
        name: 'primary-lightest-1',
        value: themeDefault.colors.PRIMARY_LIGHTEST_1,
      },
      {
        name: 'gray-lightest-2',
        value: themeDefault.colors.GRAY_LIGHTEST_2,
      },
    ],
  },
};
