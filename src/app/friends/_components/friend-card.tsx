import { Friend } from "@/types";
import Link from "next/link";

export default function FriendCard({ _id, name, mainImage, description, ...rest }: Partial<Friend>) {
    return (<Link href={`/friends/${_id}`} prefetch={true}>
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