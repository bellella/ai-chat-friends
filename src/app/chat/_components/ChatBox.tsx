'use client';
import Avatar from "@/components/common/avatar";
import { ChatMessage, Friend } from "@/types";
import React, { useState } from "react";
import { useUIState, useActions } from 'ai/rsc';
import { AI } from "../../../lib/actions/chat.action";
import UserChatBubble from "./UserChatBubble";
import FriendChatBubble from "./FriendChatBubble";
import { ScrollAnchor } from "@/components/chat/scroll-achor";

interface ChatBoxInterface {
  chatMessages: ChatMessage[];
  friend: Friend;
}

export default function ChatBox({ friend }: ChatBoxInterface) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  const [inputValue, setInputValue] = useState('');
  //const { formRef, onKeyDown } = useEnterSubmit();
  return (
    <div className="border border-gray-100 rounded-lg">
      <div className="px-5 py-3 flex gap-4 items-center border-b">
        <Avatar image={friend.avatarImage} />
        <span>{friend.name}</span>
      </div>
      <div className="flex flex-col gap-5 h-[400px] overflow-y-scroll p-5">
        {messages.map((message, index) =>
        (
          message.role === 'assistant' ?
            <FriendChatBubble key={index} avatarImage={friend.avatarImage}>{message.display}</FriendChatBubble> :
            <UserChatBubble key={index}>{message.display}</UserChatBubble>
        ))
        }
        <ScrollAnchor/>
      </div>
      <div className="p-5">
        <form
          onSubmit={async (e: any) => {
            e.preventDefault();
            // Blur focus on mobile
            if (window.innerWidth < 600) {
              e.target['message']?.blur();
            }

            const value = inputValue.trim();
            setInputValue('');
            if (!value) return;

            // Add user message UI
            setMessages(currentMessages => [
              ...currentMessages,
              {
                role: 'user',
                id: Date.now(),
                display: value,
              },
            ]);

            try {
              // Submit and get response message
              const responseMessage = await submitUserMessage(friend.id, value);
              setMessages((currentMessages: any) => [
                ...currentMessages,
                responseMessage,
              ]);
            } catch (error) {
              // You may want to show a toast or trigger an error state.
              console.error(error);
            }
          }}
        >
          <div className="flex gap-3">
            <input type="text" className="input-base flex-1 w-1" placeholder="Message Friend..." autoComplete="off"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)} />
            <button className="button-base w-1/3 hidden sm:block" type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}
