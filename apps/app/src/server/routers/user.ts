import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectUser } from '../../selector/user';
import { createRouter } from '../createRouter';

export const userRouter = createRouter().query('byId', {
  input: z.object({
    id: z.string(),
  }),
  async resolve({ ctx, input }) {
    const { id } = input;
    const user = await ctx.prisma.user.findUnique({
      where: { id },
      select: selectUser,
    });

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No user with id '${id}'`,
      });
    }

    return {
      ...user,
    };
  },
});
