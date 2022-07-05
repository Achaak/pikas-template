import type { ButtonProps } from '@pikas-ui/button';
import { Button as PikasButton } from '@pikas-ui/button';

export * from '@pikas-ui/button';

export const Button: React.FC<ButtonProps> = (props) => {
  return <PikasButton {...props} />;
};
