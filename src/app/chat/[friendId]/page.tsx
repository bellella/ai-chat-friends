"use client";
import Avatar from "@/components/common/avatar";
import SubPage from "@/components/common/subpage";
import {IFriend} from "@/lib/db/models/Friend";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Page({ params }: { params: { friendId: string } }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [friend, setFriend] = React.useState<IFriend>();
  const [isLoading, setIsLoading] = React.useState(true);

  // history
  useEffect(() => {
    fetch('/api/friends/history/' + params.friendId, {
      method: "GET",
    }).then(async res => {
      const { history } = await res.json();
      if (history.length) {
        setMessages(history);
        scrollRef?.current?.scroll({ top: scrollRef?.current.scrollHeight });
      } else {
        const greetingRes = await fetch(`/api/friends/${params.friendId}/greeting`, {
          method: "POST",
        });
        const { greeting } = await greetingRes.json();
        setMessages(m => ([...m, { role: 'assistant', content: greeting }]));
      }
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

  // scroll event
  useEffect(() => {
    scrollRef?.current?.scroll({ top: scrollRef?.current.scrollHeight, behavior: 'smooth' });
  }, [messages])

  // useEffect(() => {
  //   if (scrollRef?.current) {
  //     scrollRef.current.addEventListener('DOMNodeInserted', event => {
  //       const { currentTarget: target } = event;
  //       target?.scroll({ top: target.scrollHeight, behavior: 'smooth' });
  //     });
  //     //scrollRef?.current?.scroll({ top: scrollRef?.current.scrollHeight, behavior: 'smooth' });
  //   }
  // }, [scrollRef?.current]);

  useEffect(() => {
    // 프렌즈 데이터 가져오기
    fetch('/api/friends/' + params.friendId, {
      method: "GET",
    }).then(async res => {
      const { friend } = await res.json();
      setFriend(friend);
    });
  }, [])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const submit = async (input: string) => {
    setValue('input', '');
    setMessages(m => ([...m, { role: 'user', content: input }]));

    const messagesWithUserReply = messages.concat({ content: input, role: "user" });
    const response = await fetch('/api/chat', {
      method: "POST",
      body: JSON.stringify({
        friendId: params.friendId,
        input,
        messages: messagesWithUserReply,
      })
    });
    const { content } = await response.json();

    setMessages(m => ([...m, { role: 'assistant', content }]));
  }

  if(!friend) {
    return null;
  }

  return (
    <SubPage title={`Chat with ${friend?.name}`} className="max-w-[500px] mx-auto mt-5">
      <div className="mx-auto max-w-md relative">
        {isLoading && <Skeleton />}
        <div className="border border-gray-100 rounded-lg">
          <div className="px-5 py-3 flex gap-4 items-center border-b">
            <Avatar image={friend?.avatarImage} />
            <span>{friend?.name}</span>
          </div>
          <div ref={scrollRef} className="flex flex-col gap-5 h-[400px] overflow-y-scroll p-5">
            {messages.map((msg, index) => (
              // <div key={index}
              //   className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              //   {msg.role === 'assistant' && <Avatar image={friend?.avatarImage} />}
              //   <div className="max-w-[80%] bg-purple-100 rounded rounded-e-xl rounded-es-xl p-2">
              //     <p className="break-all">{msg.content}</p>
              //   </div>
              // </div>
              msg.role === 'assistant' ? <ChatBubble key={index} avatarImage={friend.avatarImage}>{msg.content}</ChatBubble> :
              <UserChatBubble key={index}>{msg.content}</UserChatBubble>
            ))}
          </div>
          <div className="p-5">
            <form onSubmit={handleSubmit((data) => submit(data.input))}>
              <div className="flex gap-3">
                <input {...register("input", { required: true })} type="text" className="input-base flex-1 w-1" placeholder="Message Friend..." autoComplete="off"/>
                <button className="button-base w-1/3 hidden sm:block">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SubPage>
  )
}

const ChatBubble: React.FC<React.PropsWithChildren<{avatarImage: string}>> = ({children, avatarImage}) => <div
className="flex gap-3"><Avatar image={avatarImage} />
<div className="max-w-[80%] bg-purple-100 rounded rounded-e-xl rounded-es-xl p-2">
  <p>{children}</p>
</div>
</div>

const UserChatBubble: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className="ml-auto max-w-[60%] rounded p-2 rounded-s-xl rounded-ee-xl bg-gray-200 ">
  <p>{children}</p>
</div>

function Skeleton() {
  return <div className="absolute left-0 top-0 bg-white border border-gray-100 rounded-lg p-4 w-full mx-auto">
    <div className="animate-pulse">
      <div className="px-5 py-3 flex gap-4 items-center border-b">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="h-3 bg-slate-200 rounded rounded-lg w-20"></div>
      </div>
      <div className="h-[400px] p-5">
        <div
          className={`flex gap-5`}>
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 w-[80%] bg-gray-100 rounded rounded-e-xl rounded-es-xl p-2">
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-slate-100 h-10 w-full"></div>
    </div>
  </div>
}
