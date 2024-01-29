'use client'
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React from "react";
import { Fragment } from "react";

export default function Modal({ character }) {
  const [show, setShow] = React.useState<boolean>(true);
  const router = useRouter();
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => router.back()}>
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
                        <img className="w-full" src={character?.mainImage} />
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
                    <div className="mt-5">
                    <Link href={`/chat/${character.id}`}
                    onClick={() => setShow(false)}
                      className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start a Chat
                    </Link>
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