import type {
  ButtonLinkProps,
  ButtonProps,
  ButtonIconProps,
  ButtonIconLinkProps,
} from '@pikas-ui/button';
import {
  Button as ButtonPikasUI,
  ButtonLink as ButtonLinkPikasUI,
  ButtonIcon as ButtonIconPikasUI,
  ButtonIconLink as ButtonIconLinkPikasUI,
} from '@pikas-ui/button';
import { FC } from 'react';

export type {
  ButtonDefaultProps,
  ButtonLinkProps,
  ButtonProps,
  ButtonCSS,
  ButtonEffect,
  ButtonGap,
  ButtonPadding,
  ButtonTarget,
  ButtonTextTransform,
  ButtonType,
  BaseButtonIconLinkProps,
  BaseButtonIconProps,
  BaseButtonLinkProps,
  BaseButtonProps,
  ButtonIconCSS,
  ButtonIconDefaultProps,
  ButtonIconLinkProps,
  ButtonIconProps,
} from '@pikas-ui/button';
export {
  buttonEffect,
  buttonGap,
  buttonPadding,
  buttonTarget,
  buttonTextTransform,
  buttonType,
} from '@pikas-ui/button';

export const Button: FC<ButtonProps> = (props) => <ButtonPikasUI {...props} />;

export const ButtonLink: FC<ButtonLinkProps> = (props) => (
  <ButtonLinkPikasUI {...props} />
);

export const ButtonIcon: FC<ButtonIconProps> = (props) => (
  <ButtonIconPikasUI {...props} />
);

export const ButtonIconLink: FC<ButtonIconLinkProps> = (props) => (
  <ButtonIconLinkPikasUI {...props} />
);
