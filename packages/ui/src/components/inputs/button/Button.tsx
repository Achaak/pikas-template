import type { ButtonLinkProps, ButtonProps } from '@pikas-ui/button';
import {
  Button as ButtonPikasUI,
  ButtonLink as ButtonLinkPikasUI,
} from '@pikas-ui/button';
import { FC } from 'react';

export {
  ButtonEffect,
  ButtonGap,
  ButtonPadding,
  ButtonTarget,
  ButtonTextTransform,
  ButtonType,
} from '@pikas-ui/button';
export type {
  ButtonDefaultProps,
  ButtonLinkProps,
  ButtonProps,
} from '@pikas-ui/button';

export const Button: FC<ButtonProps> = (props) => (
  <ButtonPikasUI boxShadow="none" borderWidth={1} {...props} />
);

export const ButtonLink: FC<ButtonLinkProps> = (props) => (
  <ButtonLinkPikasUI boxShadow="none" borderWidth={1} {...props} />
);
