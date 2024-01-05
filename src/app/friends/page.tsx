'use client'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import React, { Fragment } from 'react'

const characters = [
  {
    name: 'yellow girl',
    image: 'https://i.namu.wiki/i/XLYhkjegAADZ-Vx7vM_OqijCvD01K6cOdsbui4L8fAM2Wb-YlCxCJTfW5NsSQxD_Ynm3FksWt7ItZjkEy2lEg01vf_ikWVAFwNSGX-DGaS_sDp9GTZWRo_RVFQa5qDU-ZSzbaqZ0EuUWSMde994Hj_kdfORfrf3v2bCEQBVDqFk.webp',
    description: 'Hi I\'m yellow girl',
  },
  {
    name: 'red girl',
    image: 'https://i.namu.wiki/i/bGfaCwl_uA56kIIGrjOXGB9ReqjrTvhEU5a7Eh5OtjntdAgg0IoK1Bok1P7M7ps0Gc9eaoGma8bL_A6eXdnFhbnnWY4k94UGzDi3KE_qyhYiT5G8mrS65BKHO3sFCGQwqlkcocdgIZL3VR7ZYsUuag.webp',
    description: 'Hi I\'m yellow girl',
  },
  {
    name: 'green girl',
    image: 'https://www.writeups.org/wp-content/uploads/Buttercup-Powerpuff-Girls-Profile.jpg',
    description: 'Hi I\'m yellow girl',
  },
  {
    name: 'brown girl',
    image: 'https://static.wikia.nocookie.net/blossom/images/c/c7/2007-9-29-0.jpg/revision/latest/scale-to-width-down/218?cb=20191115204239',
    description: 'Hi I\'m yellow girl',
  }
]

export default function Page() {
  const [character, setCharacter] = React.useState();
  const modal = React.useState(false) //modal
  const click = (character) => {
    setCharacter(character);
    const [, set] = modal;
    set(true);
  }

  return (
    <div className="p-3 max-w-[1000px] mx-auto">
      <FriendModal modal={modal} character={character} />
      <h1 className="mb-5 text-3xl font-bold">Friends</h1>
      <form>
        <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-5">
        {characters.map((c, i) => (
          <FriendCard key={i} onClick={() => click(c)}  {...c} />
        ))}
      </div>
    </div>
  )
}

const FriendCard = React.forwardRef(({ name, image, description, onClick }, ref) => (
  <div ref={ref} onClick={onClick}>
    <div className="aspect-square overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
      <img
        src={image}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <p className="font-bold text-xl mt-3">{name}</p>
    <p className="text-small mt-1">{description}</p>
  </div>
))

const FriendModal = ({ modal, character }) => {
  const [open, setOpen] = modal;

  const cancelButtonRef = React.useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    </Dialog.Title>
                    <div className="mt-2 sm:flex gap-7">
                      <div className="flex-1 overflow-hidden rounded-lg">
                        <img className="w-full" src={character?.image} />
                      </div>
                      <div className="flex-1">
                        <h3 className="mt-2.5 font-bold text-lg">
                          {character?.name}
                        </h3>
                        <p className="mt-2.5 text-gray-700 text-sm">
                          {character?.description}
                        </p>
                      </div>
                    </div>
                    <button className="w-full mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start a Chat</button>
                    <div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}