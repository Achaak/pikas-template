import {
  darkTheme,
  globalCss,
  styled,
  PikasUIProvider,
} from '@pikas-template/ui/';
import { Button } from '@pikas-template/ui/src/components/inputs/button';
import type { ButtonProps } from '@pikas-template/ui/src/components/inputs/button';
import type { Story, Meta } from '@storybook/react';
import type { IconProps } from '@pikas-template/ui/src/core/pikas-ui/Icons';
import { IconByName } from '@pikas-template/ui/src/core/pikas-ui/Icons';

const Container = styled('div', {
  display: 'flex',
});

export default {
  title: '@pikas-ui/button',
  component: Button,
} as Meta<ButtonProps>;

const Template: Story<ButtonProps> = (args) => {
  globalCss();

  return (
    <PikasUIProvider darkTheme={darkTheme}>
      <Container>
        <Button {...args}>Button</Button>
      </Container>
    </PikasUIProvider>
  );
};

const IconTest: React.FC<IconProps> = (props) => {
  return <IconByName {...props} name="bx:baguette" />;
};

export const Default = Template.bind({});
Default.args = {
  color: 'PRIMARY',
  outlined: false,
  padding: 'md',
  disabled: false,
  loading: false,
  LeftIcon: undefined,
  RightIcon: undefined,
  borderRadius: 'md',
  fontSize: 'EM-MEDIUM',
  width: 'auto',
  effect: 'opacity',
  fontWeight: 'MEDIUM',
  id: undefined,
  form: undefined,
  gap: 'md',
  name: undefined,
  onClick: console.log,
  styles: {},
  textTransform: 'none',
  type: 'button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Button',
  color: 'PRIMARY',
  outlined: true,
  padding: 'md',
  disabled: false,
  loading: false,
  LeftIcon: IconTest,
  RightIcon: undefined,
  borderRadius: 'md',
  fontSize: 'EM-MEDIUM',
  width: 'auto',
  effect: 'opacity',
  fontWeight: 'MEDIUM',
  id: undefined,
  form: undefined,
  gap: 'lg',
  name: undefined,
  onClick: console.log,
  styles: {},
  textTransform: 'none',
  type: 'button',
};
