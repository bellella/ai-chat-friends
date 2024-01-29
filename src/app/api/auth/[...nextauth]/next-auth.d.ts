import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      oid: string;
    } & DefaultSession['user'];
  }
}