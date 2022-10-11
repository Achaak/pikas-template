import { protectedProcedure, router } from '../routers/trpc';

export const protectedExampleRouter = router({
  getSession: protectedProcedure.query(({ ctx }) => ctx.session),
  getSecretMessage: protectedProcedure.query(
    () =>
      'He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.'
  ),
});
