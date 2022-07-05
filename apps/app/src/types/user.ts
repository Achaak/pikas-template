import type { selectUserFull, selectUser } from '@/selector/user';
import type { Prisma } from '@prisma/client';

export type UserFull = Prisma.UserGetPayload<{
  select: typeof selectUserFull;
}>;

export type User = Prisma.UserGetPayload<{
  select: typeof selectUser;
}>;
