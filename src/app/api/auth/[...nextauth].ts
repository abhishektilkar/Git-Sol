// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email', // Requesting user info and email
        },
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, account }) {
      // Persist the access token in the JWT
      // console.log("Abhishek Token", token);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      // Add access token to the session
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);