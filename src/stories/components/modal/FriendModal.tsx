import React from 'react';
import Image from 'next/image';
import SearchSvg from '../../../resources/icon/search.svg';
import Avatar from '../../../components/common/avatar';
const friend =
{
  image: 'https://m.media-amazon.com/images/I/51I3EcXbLzL._AC_UF894,1000_QL80_.jpg',
  name: 'Kuromi',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, velit!'
}


export const Page: React.FC = () => {
  return (
    <div className="bg-gray-300 h-[100vh] p-3">
      <div className="w-[400px] bg-white p-5 rounded-lg">
        <div className="h-[300px] bg-gray-100 rounded-lg overflow-hidden flex justify-center">
          <img src={friend.image} alt="friend image" />
        </div>
        <div>
          <div className="flex gap-3 mt-3">
            <Avatar image={friend.image} />
            <div>
              <h4 className="text-md">
                {friend.name}
              </h4>
              <span className="text-sm text-gray-600">Cute girl</span>
            </div>
          </div>
          <p className="my-3">{friend.description}</p>
          <button className="button-base">Start Talking</button>
        </div>
      </div>
    </div>
  );
};
