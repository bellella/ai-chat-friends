import { IFriend } from '@/lib/db/models/Friend';
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { Fragment } from 'react'

export default async function Page({ searchParams: { search } }) {
  let friends: IFriend[] = [];
  try {
    const res = await fetch('http://localhost:3000/api/friends?search='+search, { method: 'GET', cache: 'no-cache' });
    friends = (await res.json()).friends;
  } catch (e) {
    console.log(e, 'erorr occured')
  }

  return (
    <div className="p-3 max-w-[1000px] mx-auto">
      {/* <FriendModal modal={modal} character={character} /> */}
      <h1 className="mb-5 text-3xl font-bold">Friends</h1>
      <form>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg> */}
          </div>
            <input type="search" id="search" name="search" defaultValue={search} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-5">
        {friends.map((c, i) => (
          <FriendCard key={i} {...c} />
        ))}
      </div>
    </div>
  )
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