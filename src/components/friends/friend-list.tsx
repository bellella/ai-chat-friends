import { IFriend } from "@/lib/db/models/Friend";
import Link from "next/link";

export default async function FriendList({ search = '' }: { search: string }) {
  let friends: IFriend[] = [];

  const res = await fetch('http://localhost:3000/api/friends?search=' + search, { method: 'GET', cache: 'no-cache', });
  friends = (await res.json()).friends;
  return <>
    {friends.map((c, i) => (
      <FriendCard key={i} {...c} />
    ))}</>
}

function FriendCard({ id, name, mainImage, description }: IFriend) {
  return (<Link href={`/friends/${id}`}>
    <div className="aspect-square overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
      <img
        src={mainImage}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <p className="font-bold text-xl mt-3">{name}</p>
    <p className="text-small mt-1">{description}</p>
  </Link>)
};