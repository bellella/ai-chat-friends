'use client'
import Modal from "./modal";

export default async function FriendModal({
    params: { id },
  }: {
    params: { id: string };
  }) {
    const res = await fetch('/api/friends/'+id);
    const friend = (await res.json()).friend;
    return <Modal character={friend}></Modal>;
  }
