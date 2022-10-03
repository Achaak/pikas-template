import type { ButtonLinkProps, ButtonProps } from '@pikas-ui/button';
import {
  Button as ButtonPikasUI,
  ButtonLink as ButtonLinkPikasUI,
} from '@pikas-ui/button';
import { FC } from 'react';

export type {
  ButtonDefaultProps,
  ButtonLinkProps,
  ButtonProps,
  ButtonCSS,
} from '@pikas-ui/button';
export {
  ButtonEffect,
  ButtonGap,
  ButtonPadding,
  ButtonTarget,
  ButtonTextTransform,
} from '@pikas-ui/button';

export const Button: FC<ButtonProps> = (props) => <ButtonPikasUI {...props} />;

export const ButtonLink: FC<ButtonLinkProps> = (props) => (
  <ButtonLinkPikasUI {...props} />
);
