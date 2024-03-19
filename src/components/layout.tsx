'use client'
import { Dialog, Transition, Menu } from '@headlessui/react';
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import NextLink from 'next/link';
import Image from 'next/image';
import React, { Fragment } from 'react';
import LogoSvg from '@/resources/icon/logo.svg';
import UserSvg from '@/resources/icon/user.svg';
import { classNames } from '@/lib/helpers/ui';

export default function GlobalLayout({ children }) {
    return (
        <div className="bg-white">
            <Header></Header>
            <div className="relative min-h-svh">
                {children}
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
}

const navigation = [
    { name: 'home', href: '/', authorized: undefined },
    { name: 'friends', href: '/friends', authorized: undefined },
    // { name: 'Sign Out', href: '/sign/form', authorized: true, fn: () => signOut() },
    // { name: 'Sign In', href: '/sign/sns', authorized: false },
]

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const isAuthencated = status === "authenticated";

    return (<header className="bg-white fixed inset-x-0 top-0 z-10 h-20">
        <nav className="flex items-center justify-between h-full px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <Image
                        className="h-8 w-auto"
                        src={LogoSvg}
                        alt="Logo"
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
            <div className="hidden md:block">
                <HeaderUserInfo isSigned={isAuthencated} user={session?.user} />
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
                        <Image
                            className="h-8 w-auto"
                            src={LogoSvg}
                            alt="Logo"
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
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}

                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="py-6">
                            {status === 'authenticated' ?
                                <a
                                    href="javascript:void;"
                                    onClick={() => {
                                        setMobileMenuOpen(false); signOut();
                                    }}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Sign out
                                </a> :
                                <Link
                                    href="/sign/sns"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
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
        <footer className="bg-gray-600 text-white text-center py-4">
            <p>&copy; 2024 AI Friend Chat. All rights reserved.</p>
        </footer>
    );
};

function HeaderUserInfo({ isSigned, user }: { isSigned: boolean, user: any }) {
    return <div>
        {isSigned ? <>
            <UserInfoButton user={user} />
        </> : <><Link href="/sign/sns" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Image src={UserSvg} alt="signIn" />
            <p>Sign In</p>
        </Link></>}
    </div>
}

function UserInfoButton({ user }: any) {
    return <Menu as="div" className="relative inline-block text-left">
        <div>
            <Menu.Button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <img
                    src="https://m.media-amazon.com/images/I/51I3EcXbLzL._AC_UF894,1000_QL80_.jpg"
                    className="rounded rounded-full overflow-hidden w-8 h-8 object-cover" />
                <span>{user?.name}</span>
            </Menu.Button>
        </div>

        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                                onClick={() => signOut()}
                            >
                                Sign Out
                            </a>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
}