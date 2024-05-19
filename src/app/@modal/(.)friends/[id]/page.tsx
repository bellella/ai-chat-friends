import { getFriendById } from "@/lib/data/friend.data";
import Modal from "./modal";
import { unstable_noStore as noStore } from 'next/cache'

export default async function FriendModal({
  params: { id },
}: {
  params: { id: string };
}) {
  noStore();
  const friend = await getFriendById(id);
  if (!friend) return null;

  return <Modal friend={friend}></Modal>;
}

export function generateStaticParams() {
  return [{
    params: {
      id: 'a'
    }
  }];
}