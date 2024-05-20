import { getFriends } from "@/lib/data/friend.data";
import FriendCard from "./friend-card";

export default async function FriendList({ search }: { search: string }) {
  const friends = await getFriends(search);
  return <>
    {friends.map((f, i) => (
      <FriendCard key={i} {...f} />
    ))}</>
}