import { protectedExampleRouter } from './protected';
import { router } from './trpc';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  protected: protectedExampleRouter,
});

export type AppRouter = typeof appRouter;
