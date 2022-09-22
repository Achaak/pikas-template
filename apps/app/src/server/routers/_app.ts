import { initTRPC } from '@trpc/server';
import { Context } from '../context';
import { protectedExampleRouter } from './protected';
import { userRouter } from './user';

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  user: userRouter,
  protected: protectedExampleRouter,
});

export type AppRouter = typeof appRouter;
