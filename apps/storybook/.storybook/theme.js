import { themeDefault } from '@pikas-template/ui';
import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: themeDefault.colors.PRIMARY.value,
  colorSecondary: themeDefault.colors.SECONDARY.value,

  // UI
  appBg: themeDefault.colors.PRIMARY_LIGHTEST_1.value,
  appContentBg: themeDefault.colors.WHITE.value,
  appBorderColor: themeDefault.colors.GRAY.value,
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: themeDefault.colors.GRAY_DARKER.value,
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: themeDefault.colors.GRAY.value,
  barSelectedColor: themeDefault.colors.PRIMARY_DARKER.value,
  barBg: themeDefault.colors.WHITE.value,

  // Form colors
  inputBg: themeDefault.colors.WHITE.value,
  inputBorder: themeDefault.colors.GRAY.value,
  inputTextColor: themeDefault.colors.BLACK.value,
  inputBorderRadius: 4,

  brandTitle: 'Secrecy Storybook',
  brandUrl: 'https://pikas-template.me',
  brandImage:
    'https://pikas-template.me/pikas-template-logo/Secrecy_Logo_Long.png',
});
