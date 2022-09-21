import type { Session } from 'next-auth';
import type { RootState } from '../../store';

export const selectMe = (state: RootState): Session['user'] | null =>
  state.user.me;
