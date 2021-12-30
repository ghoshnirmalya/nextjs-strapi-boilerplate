import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import IAccount from "types/account";
import iToken from "types/token";
import IUser from "types/user";
import ISession from "types/session";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret:"5xT45s7AKNuQREg7gF9LoQSXwW/dL62hAEKKfk/rk8k=", //PUT YOUR OWN SECRET (command: openssl rand -base64 32)
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    strategy: "jwt",
  },
  debug: true,
  callbacks: {
    async session({ session, token, user }) {
      session.jwt = token.jwt;
      session.id = token.id;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );

        const data = await response.json();

        token.jwt = data.jwt;
        token.id = data.user.id;
      }

      return token;
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
