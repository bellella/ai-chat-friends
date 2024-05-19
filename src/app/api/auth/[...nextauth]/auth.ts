import { createUserTemp, getUserByEmail } from "@/lib/data/user.data";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async redirect() {
            return '/';
        },
        async signIn({ user, account, profile }) {
            if (!(account && profile && profile.email && profile.name)) {
                return false;
            }
            if (account.provider === "google") {
                const {email, name} = profile;
                // check if user exist in db
                const userFromDb = await getUserByEmail(email);
                //db 있음
                if (userFromDb) {
                    return true;
                } else {
                    // temp에 저장
                    const user = await createUserTemp(email, name);
                    return `/sign/form/${user._id}`;
                }
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        async jwt({ token, account, user }) {
            if (!(account && user && user.email)) {
                return token;
            }
            if (account) {
                // user 정보 가져오기
                const userFromDb = await getUserByEmail(user.email);
                token.accessToken = account.access_token;
                token.id = user.id;
                token.name = userFromDb.name;
            }
            return token
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            // session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.name = token.name;
            return session;
        },
    },
    pages: {
        signIn: '/sns/signin',
        signOut: '/',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}

// Use it in server contexts
export async function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    const session = await getServerSession(...args, authOptions);
    return {user: session?.user, isAuthenticated: !!session}
  }
