import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!(account && profile)) {
                return false;
            }
            if (account.provider === "google") {
                const email = profile.email;
                // db search
                // TODO url issue
                const res = await fetch('http://localhost:3000/api/user/signin', { method: 'POST', body: JSON.stringify({ email }) })
                    .catch(e => {
                        console.log(e)
                    });
                const resJson = await res?.json();
                //db 있음
                if (resJson.status === 'OK') {
                    console.log('user its')
                    return true;
                } else {
                    const res = await fetch('http://localhost:3000/api/user/signin/temp', { method: 'POST', body: JSON.stringify({ email }) })
                    const { userFromDb } = await res.json();
                    return `/sign/form/${userFromDb.id}`;
                }
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        async jwt({ token, account,user }) {
            if (account) {
                const res = await fetch('http://localhost:3000/api/user/signin', { method: 'POST', body: JSON.stringify({ email: user.email }) })
                .catch(e => {
                    console.log(e)
                });
                const resJson = await res?.json();
                token.accessToken = account.access_token;
                token.id = resJson.user.id;
            }
            return token
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            // session.accessToken = token.accessToken;
            session.user.id = token.id;
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}

const handler = NextAuth(authOptions);

// Use it in server contexts
export async function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    const session = await getServerSession(...args, authOptions);
    return {user: session?.user}
  }

export { handler as GET, handler as POST };