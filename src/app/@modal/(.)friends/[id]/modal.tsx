'use client'
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import { Fragment } from "react";
import Image from 'next/image';
import { useAuth } from "@/lib/hooks/auth.hook";
import Avatar from "@/components/common/avatar";

export default function Modal({ friend }) {
  const { isAuthencated } = useAuth();
  const router = useRouter();
  if (!isAuthencated) {
    return router.replace('/sign/sns')
  }
  React.useEffect(() => {
    if (!isAuthencated) {
      return router.replace('/sign/sns')
    }
  }, [isAuthencated]);

  const [show, setShow] = React.useState<boolean>(true);
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-md">
                <div className="p-5">
                  <div className="h-[300px] bg-gray-100 rounded-lg overflow-hidden flex justify-center">
                    <img className="object-contain" src={friend.mainImage} alt="" />
                  </div>
                  <div>
                    <div className="flex gap-3 mt-3">
                      <Avatar image={friend.mainImage} />
                      <div>
                        <h4 className="text-md">
                          {friend.name}
                        </h4>
                        <span className="text-sm text-gray-600">Cute girl</span>
                      </div>
                    </div>
                    <p className="mt-3">{friend.description}</p>
                    <Link className="button-base block mt-5" href={`/chat/${friend.id}`}
                    onClick={() => setShow(false)}>Start Talking</Link>
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