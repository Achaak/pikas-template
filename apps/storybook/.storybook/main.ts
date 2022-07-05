import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-storyshots',
    '@storybook/addon-storysource',
  ],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgenTypescriptOptions: {
      propFilter: (prop) => ['label', 'disabled'].includes(prop.name),
    },
  },
  framework: '@storybook/react',
};

module.exports = config;
