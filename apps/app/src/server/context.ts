import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { prisma } from '@pikas-template/database';
import { authOptions as nextAuthOptions } from '../pages/api/auth/[...nextauth]';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  return {
    req,
    res,
    prisma,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
