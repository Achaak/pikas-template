import { selectUserFull } from '@/selector/user';
import { prisma } from '@pikas-template/database';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, user }) {
      const userRes = await prisma.user.findUnique({
        where: { id: user.id },
        select: selectUserFull,
      });

      if (!userRes) {
        return session;
      }

      return {
        ...session,
        user: {
          ...userRes,
        },
      };
    },
  },
});
