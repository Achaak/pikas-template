import { FC } from 'react';
import { trpc } from '../../../utils/trpc';

export const HomeContainer: FC = () => {
  const { data } = trpc.user.byId.useQuery({
    id: '',
  });

  return <span>{data?.email}</span>;
};
