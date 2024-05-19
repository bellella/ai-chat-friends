import React, { Suspense } from 'react'
import Image from 'next/image';
import SearchSvg from '@/resources/icon/search.svg';
import FriendList from '@/app/friends/_components/friend-list';
import { NextPageFC } from '@/types/common';
import SubPage from '@/components/common/subpage';

const Page: NextPageFC<string, string> = async ({ searchParams }) => {
  const search = searchParams?.search || '';

  return (
    <SubPage title="Friends" className="max-w-[1000px]">
      <form>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 flex items-center px-3 pointer-events-none">
            <Image src={SearchSvg} alt="search icon" />
          </div>
          <input type="search" id="search" name="search" defaultValue={search}
            autoComplete="off"
            className="block w-full p-3 ps-12 text-sm text-gray-900 border 
           ouline-purple-500
          border-gray-300 rounded-lg bg-gray-50
          focus:border-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white"
            placeholder="Search friends..." />
        </div>
      </form>
      <div className="mt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <FriendList search={search} />
      </div>
    </SubPage>
  )
}

export default Page;