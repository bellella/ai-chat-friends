'use client'

import Loading from "@/components/common/loading";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    signIn('google', {callbackUrl: '/friends'});
  },[]);
  return (
      <><Loading/></>
  )
}
