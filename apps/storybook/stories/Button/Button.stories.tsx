import { customGlobalCss } from '@pikas-template/ui';
import type { ButtonProps } from '@pikas-template/ui/dist/components/inputs/button/index';
import { Button } from '@pikas-template/ui/dist/components/inputs/button/index';
import type { Story, Meta } from '@storybook/react';

export default {
  title: 'Components/Inputs/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  customGlobalCss();

  return <Button {...args} />;
};

export const Squared = Template.bind({});
Squared.args = {
  color: 'PRIMARY',
  children: 'Button',
  fontSize: 'EM-MEDIUM',
  effect: 'boxScale',
};

export const Rounded = Template.bind({});
Rounded.args = {
  color: 'PRIMARY',
  children: 'Button',
  borderRadius: 'round',
  effect: 'boxScale',
};
