import type { RootState } from '@/store/store';
import type { UserFull } from '@/types/user';
export const selectMe = (state: RootState): UserFull | null => state.user.me;
