import { PrismaClient } from '@prisma/client';
import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

// Prevent multiple instances of Prisma Client in development
declare const global: NodeJS.Global & { prisma?: PrismaClient };

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getSession({ req });

  return {
    req,
    res,
    prisma,
    user: session?.user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
