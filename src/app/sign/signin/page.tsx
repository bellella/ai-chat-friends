'use client';
import Loading from "@/components/common/loading";
import { signIn } from "next-auth/react";

export default function Page() {
  signIn('google', { callbackUrl: '/friends' });
  return (
    <><Loading /></>
  )
}
