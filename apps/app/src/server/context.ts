import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { type Session } from 'next-auth';
import { prisma } from '@pikas-template/database';
import { getServerAuthSession } from '../utils/get-server-auth-session';

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we don't have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = (opts: CreateContextOptions) => ({
  session: opts.session,
  prisma,
});

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
