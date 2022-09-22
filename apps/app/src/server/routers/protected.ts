import { isAuth } from '../middlewares/isAuth';
import { t } from './_app';

const authProcedure = t.procedure.use(isAuth);

export const protectedExampleRouter = t.router({
  getSession: authProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: authProcedure.query(({ ctx }) => {
    return 'He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.';
  }),
});
