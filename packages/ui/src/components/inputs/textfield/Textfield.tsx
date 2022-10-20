import type { TextfieldProps } from '@pikas-ui/textfield';
import { Textfield as TextfieldPikasUI } from '@pikas-ui/textfield';
import { forwardRef } from 'react';

export type {
  textfieldPadding,
  textfieldGap,
  textfieldType,
} from '@pikas-ui/textfield';

export type {
  TextfieldProps,
  TextfieldCSS,
  TextfieldGap,
  TextfieldType,
  TextfieldPadding,
} from '@pikas-ui/textfield';

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  (props, ref) => <TextfieldPikasUI ref={ref} {...props} />
);

Textfield.displayName = 'Textfield';
