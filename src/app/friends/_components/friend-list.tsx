import { getFriends } from "@/lib/data/friend.data";
import FriendCard from "./friend-card";

export default async function FriendList({ search }: { search: string }) {
  const friends = await getFriends(search);
  return <>
    {friends.map(({ _id, name, mainImage, description}, i) => (
      <FriendCard key={i} _id={_id} name={name} mainImage={mainImage} description={description} />
    ))}</>
}