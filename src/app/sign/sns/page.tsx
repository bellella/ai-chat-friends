'use client'

import { signIn } from "next-auth/react";

export default function Page() {

  async function signInGoogle() {
    // email 가져와서
    // api에 요청하기
    const res = await signIn('google', {redirect: false}).catch(e => {
      console.log(e,'eeeee')
    });
    console.log(res,'res~~')
    // 이미 있음 - 프렌즈 페이지

    // 없음 - 회원가입
  }
  return (
    <div className="mt-10 mx-auto max-w-md flex flex-col gap-5">
     <SnsItem name="Google" onClick={signInGoogle}/>
    </div>
  )
}

const SnsItem = ({ name, onClick }) => (<>
<button onClick={onClick} className="bg-pink-300 py-3 px-5 w-full rounded-md">{name}</button></>)