import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import UserTemp, { IUserTemp } from "@/lib/db/models/UserTemp";
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
            if (!(account && profile && profile.email && profile.name)) {
                return false;
            }
            if (account.provider === "google") {
                const {email, name} = profile;
                // check if user exist in db
                const userFromDb = await getUser(email);
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
                const userFromDb = await getUser(user.email);
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
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}

async function getUser(email: string) {
    await dbConnect();
    const user = await User.findOne({
        email
    });
    return user;
}

async function createUserTemp(email: string, name: string): Promise<IUserTemp> {
    await dbConnect();
    const user = await UserTemp.create({
        email,
        name,
    });
    return user;
}

// Use it in server contexts
export async function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    const session = await getServerSession(...args, authOptions);
    return {user: session?.user}
  }

