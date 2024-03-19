import NextAuth from "next-auth"
import { authOptions } from "./auth";


const handler = NextAuth(authOptions);

// Use it in server contexts
// export async function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
//     const session = await getServerSession(...args, authOptions);
//     return {user: session?.user}
//   }

export { handler as GET, handler as POST };