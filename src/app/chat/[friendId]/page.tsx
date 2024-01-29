"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page({ params }: { params: { friendId: string } }) {
  const scrollRef = React.useRef(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [friend, setFriend] = React.useState();
  const lastMessageRef = React.useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lastMessageRef.current]);
  useEffect(() => {
    // 프렌즈 데이터 가져오기
    fetch('http://localhost:3000/api/friends/' + params.friendId, {
      method: "GET",
    }).then(async res => {
      const { friend } = await res.json();
      setFriend(friend);
    });
    fetch('http://localhost:3000/api/friends/history/' + params.friendId, {
      method: "GET",
    }).then(async res => {
      const { history } = await res.json();
      setMessages(history);
    });
  }, [messages, setMessages])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const submit = async (data) => {
    const input = data.input;
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

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <div className="mx-auto max-w-md">
        <div className="border border-gray-100 rounded-lg">
          <div className="px-5 py-3 flex gap-4 items-center border-b">
            <img
              src={friend?.avatarImage}
              className="rounded rounded-full overflow-hidden w-8 h-8" />
            <span>{friend?.name}</span>
          </div>
          <div ref={scrollRef} className="flex flex-col gap-5 h-[500px] overflow-y-scroll p-5">
            {messages.map((msg, index) => (
              <div key={index}
                ref={(index === messages.length - 1) ? lastMessageRef : null}
                className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && <img
                  src={friend?.avatarImage}
                  className="rounded rounded-full overflow-hidden w-8 h-8" />}
                <div className="max-w-[80%] bg-gray-100 rounded rounded-e-xl rounded-es-xl p-2">
                  <p className="break-all">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5">
            <form onSubmit={handleSubmit(submit)}>
              <div className="flex gap-3">
                <input {...register("input", { required: true })} type="text" className="w-full border border-gray rounded-lg p-3" placeholder="Message Friend..." />
                <button className="items-center p-1 rounded-md flex item-center bg-purple-500 text-white font-medium px-5">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

