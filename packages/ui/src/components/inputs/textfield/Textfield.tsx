import type { TextfieldProps } from "@pikas-ui/textfield";
import { Textfield as TextfieldPikasUI } from "@pikas-ui/textfield";
import { forwardRef } from "react";

export {
  TextfieldGap,
  TextfieldPadding,
  TextfieldType,
} from "@pikas-ui/textfield";
export type {
  TextfieldGapType,
  TextfieldPaddingType,
  TextfieldProps,
  TextfieldCSSType,
  TextfieldTypeType,
} from "@pikas-ui/textfield";

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  (props, ref) => {
    return <TextfieldPikasUI ref={ref} {...props} />;
  }
);
