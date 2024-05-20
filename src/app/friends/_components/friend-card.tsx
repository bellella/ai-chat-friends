import { Friend } from "@prisma/client";
import Link from "next/link";

export default function FriendCard({ id, name, mainImage, subname, ...rest }: Partial<Friend>) {
    return (<Link href={`/friends/${id}`} prefetch={true}>
      <div className="aspect-square overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
        <img
          src={mainImage}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <p className="font-bold text-xl mt-3">{name}</p>
      <p className="text-small mt-1">{subname}</p>
    </Link>)
  };