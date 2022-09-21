import type { Prisma } from '@pikas-template/database';
import type { selectUserFull, selectUser } from '../selector/user';

export type UserFull = Prisma.UserGetPayload<{
  select: typeof selectUserFull;
}>;

export type User = Prisma.UserGetPayload<{
  select: typeof selectUser;
}>;
