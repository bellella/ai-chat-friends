export default function UserChatBubble({ children }: React.PropsWithChildren<{}>) {
  return <div className="ml-auto max-w-[60%] rounded p-2 rounded-s-xl rounded-ee-xl bg-gray-200 ">
    <p>{children}</p>
  </div>
}