'use client'
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import NextLink from 'next/link';
import React from 'react';

export default function GlobalLayout({ children }) {
    return (
        <div className="bg-white">
            <Header></Header>
            <div className="relative min-h-svh px-6 pt-14 lg:px-8">
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
}

const navigation = [
    { name: 'friends', href: '/friends', authorized: undefined },
    { name: 'Sign Out', href: '/sign/form', authorized: true, fn: () => signOut()},
    { name: 'Sign In', href: '/sign/sns',authorized: false },
]

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const isAuthencated = status === "authenticated";

    return (<header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                    />
                </Link>
            </div>
            <div className="flex md:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className="hidden md:flex md:gap-x-12 absolute-x-center">
                {navigation.map((item) => (
                    (isAuthencated == item.authorized || item.authorized === undefined) ? 
                    <Link key={item.name} href={!item.fn ? item.href : ''} 
                    onClick={item.fn ? item.fn : undefined} className="text-sm font-semibold leading-6 text-gray-900">
                        {item.name}
                    </Link> : <></>
                ))}
            </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                        />
                    </a>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            {navigation.map((item) => (
                                <NextLink
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {item.name}
                                </NextLink>
                            ))}
                        </div>
                        <div className="py-6">
                            {status === 'authenticated' ?
                                                        <a
                                                        href="#"
                                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    >
                                                        Sign out
                                                    </a>: 
                            <a
                            href="#"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                            Sign in
                        </a>
                            }
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    </header>)
}

const Footer = () => {
    return (
        <div className="py-10 text-center bg-black">
            <p className="text-white">푸터입니다</p>
        </div>
    );
};