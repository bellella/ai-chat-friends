import { redirect } from 'next/navigation'

export default function FriendPage() {
  redirect('/friends')
  return null;
}