import React from 'react';
import Image from 'next/image';
import SearchSvg from '../../../resources/icon/search.svg';

const friends = [
  {
    image: 'https://m.media-amazon.com/images/I/51I3EcXbLzL._AC_UF894,1000_QL80_.jpg',
    name: 'Kuromi',
    description: 'HIHIHI'
  }
]

export const Page: React.FC = () => {
  return (
    <div className="page max-w-[1000px] mx-auto">
    <h1 className="mb-5 text-3xl font-bold">Friends</h1>
    <form>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center px-3 pointer-events-none">
          <Image src={SearchSvg} alt="search icon"/>
        </div>
        <input type="search" id="search" name="search" 
       autoComplete="off"
        className="block w-full p-3 ps-12 text-sm text-gray-900 border 
         ouline-purple-500
        border-gray-300 rounded-lg bg-gray-50
        focus:border-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-white" 
        placeholder="Search friends..." required />
      </div>
    </form>
    <div className="mt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {
        friends.map(f => (
          <FriendCard {...f} />
        ))
      }
    </div>
  </div>
  );
};

const FriendCard = ({image, name, description}) => (
  <div>
    <div className="aspect-square overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
      <img
        src={image}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <p className="font-bold text-xl mt-3">{name}</p>
    <p className="text-small mt-1">{description}</p>
    </div>
)