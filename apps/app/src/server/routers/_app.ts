import { protectedExampleRouter } from './protected';
import { t } from './trpc';
import { userRouter } from './user';

export const appRouter = t.router({
  user: userRouter,
  protected: protectedExampleRouter,
});

export type AppRouter = typeof appRouter;
