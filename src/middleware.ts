import { withAuth } from 'next-auth/middleware';

const PRIVATE_ROUTE = [
    '/friends/',
]

export default withAuth({
    callbacks: {
        authorized: async ({ req, token }) => {
          const pathname = req.nextUrl.pathname;
          if (!token && PRIVATE_ROUTE.some(route => pathname.startsWith(route))) {
            return false;
          }
    
          return true;
        },
      },
    pages: {
      signIn: '/sign/sns',
    },
  });

// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }