import { redirect } from 'next/navigation'

export default function FriendPage() {
  redirect('/friends')
  return null;
}

// export const dynamic = 'force-dynamic'
// export const dynamicParams = true;

export function generateStaticParams() {
  return [{
    params: {
      id: 'a'
    }
  }];
}