import SubPage from "@/components/common/subpage";
import { getFriendById } from "@/lib/data/friend.data";
import ChatBox from "../_components/ChatBox";
import { AI } from "../../../lib/actions/chat.action";
import { wait } from "@/lib/utils/promise.util";
import { createFriendGreetMessage, getChatMessages } from "@/lib/data/chat.data";

export default async function Page({ params }: { params: { friendId: string } }) {
  const [chatMessages, friend] = await Promise.all([
    getChatMessages(params.friendId).then(async messages => {
      // if there's no messages add friend's greeting message
      if(!messages.length) {
        const greetMessage = await createFriendGreetMessage(params.friendId);
        return [greetMessage];
      }
      return messages;
    }),
    getFriendById(params.friendId),
    wait(2000)
  ]);
  const initialState = chatMessages.map((msg, index) => ({id: index, display: msg.content, role: msg.role}))

  if (!friend) {
    return null;
  }

  return (
    <SubPage title={`Chat with ${friend?.name}`} className="max-w-[500px] mx-auto mt-5">
      <div className="mx-auto max-w-md relative">
        <AI initialUIState={initialState}>
          <ChatBox chatMessages={chatMessages} friend={friend} />
        </AI>
      </div>
    </SubPage>
  )
}
