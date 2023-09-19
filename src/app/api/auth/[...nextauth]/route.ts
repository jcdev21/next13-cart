import prisma from '@/lib/db';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'jundi'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        const loginErrorMessage = 'Invalid email or password';

        const isUserExisted = await prisma.user.findUnique({ where: { email: credentials?.username } });

        if (!isUserExisted) {
          throw Error(loginErrorMessage);
        }

        if (isUserExisted && credentials?.password && (await compare(credentials.password, isUserExisted.password))) {
          return isUserExisted;
        }

        throw Error(loginErrorMessage);
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  }
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
