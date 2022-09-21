import type { Session } from 'next-auth';

export type UserState = {
  me: Session['user'] | null;
};
