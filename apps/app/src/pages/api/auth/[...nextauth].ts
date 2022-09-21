import { prisma } from '@pikas-template/database';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
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
      if (session.user) {
        session.user.id = user.id;

        const userRes = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            emailVerified: true,
          },
        });

        if (userRes) {
          session.user.emailVerified = userRes.emailVerified;
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
