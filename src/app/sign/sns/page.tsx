export default function Page() {
  return (
    <div className="mt-10 mx-auto max-w-md flex flex-col gap-5">
     <SnsItem name="Google"/>
     <SnsItem name="Apple"/>
    </div>
  )
}

const SnsItem = ({ name }) => (<>
<button className="bg-pink-300 py-3 px-5 w-full rounded-md">{name}</button></>)