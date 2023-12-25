import NextAuth from 'next-auth';
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from '../../lib/mongodb';
// import EmailProvider from 'next-auth/providers/email'

const adminEmails = ['mahad112002@gmail.com']

export const authConf = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  debug: true,
  theme: 'dark',
  adapter: MongoDBAdapter(clientPromise),
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error',
  //   verifyRequest: '/auth/verify-request',
  //   newUser: '/auth/new-user'
  // },
  callbacks: {
    session: ({session, token, user}) => {
      if(adminEmails.includes(session?.user?.email)){
        return session;
      }
      else{
        return false;
      }
    }
  }
}

export default NextAuth(authConf);