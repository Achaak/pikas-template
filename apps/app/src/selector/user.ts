import type { Prisma } from '@prisma/client';

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
