import type { Prisma } from '@pikas-template/database';

import type { CheckSelectKeys } from './types';

const createUserSelect = <T extends Prisma.UserSelect>(
  arg: CheckSelectKeys<T, Prisma.UserSelect>
): CheckSelectKeys<T, Prisma.UserSelect> => arg;

export const selectUser = createUserSelect({
  id: true,
  email: true,
  image: true,
  name: true,
});

export const selectUserFull = createUserSelect({
  ...selectUser,
  emailVerified: true,
});

export type UserFull = Prisma.UserGetPayload<{
  select: typeof selectUserFull;
}>;

export type User = Prisma.UserGetPayload<{
  select: typeof selectUser;
}>;
