import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import GitHubProvider from 'next-auth/providers/github';
import { Octokit } from "@octokit/rest";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email', // Requesting user info and email
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the access token in the JWT
      if (account) {
        token.accessToken = account.access_token;
        console.log('@auth', token.accessToken)
        const octokit = new Octokit({
          // @ts-ignore
          auth: token.accessToken
        });
        
  
        // Fetch authenticated user details
        const { data: userData } = await octokit.rest.users.getAuthenticated();
        // console.log('@auth2', userData)
        try {
          await prisma.$connect();
          console.log('@auth3')
          const gitUserId = String(userData.id);
          console.log(gitUserId);
          let user = await prisma.user.findUnique({
            where: {gitUserId}
          })
          console.log('@auth4')
          // If user is not found, create a new user
          if (!user) {
            user = await prisma.user.create({
              data: {
                // @ts-ignore
                // email: userData.email ,
                // @ts-ignore
                gitUserId,
                // @ts-ignore
                name: userData.name
              }
            })
          }
        } catch(e) {
          console.log(e);
        } finally {
          await prisma.$disconnect();
        }

      }
      return token;
    },
    async session({ session, token }) {
      // Add access token to the session
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
