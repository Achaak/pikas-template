import type { TextfieldProps } from '@pikas-ui/textfield';
import { Textfield as TextfieldPikasUI } from '@pikas-ui/textfield';

export const Textfield: React.FC<TextfieldProps> = (props) => {
  return <TextfieldPikasUI {...props} />;
};
