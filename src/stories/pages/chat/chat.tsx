import React from 'react';

const friend = {
  image: 'https://m.media-amazon.com/images/I/51I3EcXbLzL._AC_UF894,1000_QL80_.jpg',
  name: 'Kuromi'
}

const messages = [
  {
    role: 'assistant',
    content: 'Hi My name is Kuromi'
  },
  {
    role: 'user',
    content: 'Hi Kuromi?'
  },
  {
    role: 'assistant',
    content: 'Hi My name is Kuromi'
  },
]

export const FormPage: React.FC = () => {
  return (
    <div className="page max-w-[800px] w-full mx-auto mt-10">
      <div className="mx-auto max-w-md relative">
        {/* {isLoading && <Skeleton />} */}
        <div className="border border-gray-100 rounded-lg">
          <div className="px-5 py-3 flex gap-4 items-center border-b">
            <img
              src={friend.image}
              className="rounded rounded-full overflow-hidden w-8 h-8" />
            <span>{friend?.name}</span>
          </div>
          <div className="flex flex-col gap-5 h-[400px] overflow-y-scroll p-5">
            {messages.map((msg, index) => (
              <div key={index}
                className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && <img
                  src={friend.image}
                  className="rounded rounded-full overflow-hidden w-8 h-8" />}
                <div className="max-w-[80%] bg-purple-100 rounded rounded-e-xl rounded-es-xl p-2">
                  <p className="break-all">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5">
              <div className="flex gap-3">
                <input type="text" className="input-base" placeholder="Message Friend..." />
                <button className="button-base">Send</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
