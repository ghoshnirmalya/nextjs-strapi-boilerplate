import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import IAccount from "types/account";
import iToken from "types/token";
import IUser from "types/user";
import ISession from "types/session";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "Password" },
      },
      authorize: async ({ password, email }) => {
        // 
        const authenticated = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identifier: email,
            password: password
          })
        }).then(res => res.json())
        .then(data => {
          return Promise.resolve(data);
        })
        .catch(err => {
          console.error(err.message)
          return Promise.reject();
        });



        if(authenticated){
          return Promise.resolve({
            id: authenticated.user.id,
            name: authenticated.user.username,
            email: authenticated.user.email,
            jwt: authenticated.jwt
          })
        }else{
          return Promise.reject();
        }
      },
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  debug: true,
  callbacks: {
    session: async (session: ISession, user: IUser) => {
      // We now have access to the jwt from strapi, and can use it for authenticated requests.
      session.jwt = user.jwt;
      session.id = user.id;

      return Promise.resolve(session);
    },
    jwt: async (token: iToken, user: IUser, account: IAccount) => {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        // For OAuth providers we need to get the the token from strapi here
        if (typeof account.provider !== "undefined") {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
          );

          const data = await response.json();

          token.jwt = data.jwt;
          token.id = data.user.id;
        }
        // If we are using credentials, we allready have the token from strapi
        else {
          (token.id = user.id), (token.jwt = user.jwt);
        }
      }
      return Promise.resolve(token);
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
