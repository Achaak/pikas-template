import type { ButtonLinkProps, ButtonProps } from '@pikas-ui/button';
import {
  Button as ButtonPikasUI,
  ButtonLink as ButtonLinkPikasUI,
} from '@pikas-ui/button';

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
  ButtonEffectType,
  ButtonGapType,
  ButtonLinkProps,
  ButtonPaddingType,
  ButtonProps,
  ButtonCSSType,
  ButtonTargetType,
  ButtonTextTransformType,
  ButtonTypeType,
} from '@pikas-ui/button';

export const Button: React.FC<ButtonProps> = (props) => {
  return <ButtonPikasUI boxShadow="none" borderWidth={1} {...props} />;
};

export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  return <ButtonLinkPikasUI boxShadow="none" borderWidth={1} {...props} />;
};
