'use client'

import { signIn } from "next-auth/react";

export default function Page() {

  async function signInGoogle() {
    const res = await signIn('google', {callbackUrl: '/friends'}).catch(e => {
    });
  }
  return (
      <div className="container mt-20 mx-auto max-w-[500px] flex flex-col gap-3 px-5">
        <SnsItem name="Sign In By Google" onClick={signInGoogle} />
        <SnsItem name="Sign In By ..." onClick={null}/>
        <SnsItem name="Sign In By ..." onClick={null}/>
        <SnsItem name="Sign In By ..." onClick={null}/>
    </div>

  )
}

const SnsItem = ({ name, onClick }: {name: string; onClick: (() => Promise<void>) | null}) => {
  return onClick ? (
    <button onClick={onClick} className="button-primary max-w-[500px]">{name}</button>
  ) : (
    <button className="button-disabled">{name}</button>
  )
}