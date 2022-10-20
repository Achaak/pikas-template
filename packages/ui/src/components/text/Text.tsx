import type {
  DescriptionProps,
  LabelProps,
  TextErrorProps,
} from '@pikas-ui/text';
import {
  Description as DescriptionPikasUI,
  Label as LabelPikasUI,
  TextError as TextErrorPikasUI,
} from '@pikas-ui/text';
import { FC } from 'react';

export type {
  DescriptionProps,
  LabelProps,
  TextErrorProps,
} from '@pikas-ui/text';

export const Description: FC<DescriptionProps> = (props) => (
  <DescriptionPikasUI {...props} />
);

export const Label: FC<LabelProps> = (props) => <LabelPikasUI {...props} />;

export const TextError: FC<TextErrorProps> = (props) => (
  <TextErrorPikasUI {...props} />
);
