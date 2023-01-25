import React, { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import { ToastContainer, toast } from 'react-toastify'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavItem from '@/Components/NavItem';
import NavDropdown from '@/Components/NavDropdown';
import { IconBell, IconBellRing } from '@/Icons';
import { router } from '@inertiajs/react'
import { ArrowDownIcon } from '@/Components/Icons';

const routes = [
    {name: "Dashboard", route: "dashboard"},
    {name: "Dokumen", items: [
        {name: "Dokumen", route: 'docs.index'},
        {name: "Ketegori", route: 'docs.index'},
        {name: "Jenis", route: 'docs.index'},
    ]},
    {name: "User", route: "users.index"},
]

const Notification = ({ notifications, hasUnread }) => {
    const redirect = (item) => {
        router.get(route('notification.redirect', item))
    }

    return (
        <Dropdown>
            <Dropdown.Trigger>
                {hasUnread ? (
                    <IconBellRing color="#37cdbe" />
                ) : (
                    <IconBell/>
                )}  
            </Dropdown.Trigger>
            <Dropdown.Content contentClasses='p-1 bg-base-100' width='w-60' maxHeight='600px'>
                {notifications.map(item => (
                    <div className='pl-2 py-2 hover:bg-base-200' key={item.id} onClick={() => redirect(item)}>
                        <div className={`text-sm ${item.status == 0 ? 'font-bold' : ''}`}>{item.content}</div>
                        <div className='text-xs font-light'>• {item.date}</div>
                    </div>
                ))}
                {+notifications.length === 0 && (
                    <div className='pl-2 py-2 hover:bg-base-200'>
                        <div className={`text-sm`}>No Notification Found</div>
                    </div>
                )}
            </Dropdown.Content>
        </Dropdown>
    )
}

export default function Authenticated({ auth, children, flash, notify }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        if (flash.message !== null) {
            toast(flash.message.message, {type: flash.message.type})
        }
    }, [flash])

    return (
        <div className="min-h-screen bg-base-200 pb-10">
            <nav className="bg-base-100 border-b border-base-100">
                <div className="navbar bg-base-100 rounded-box max-w-7xl m-auto px-6">
                    <div className="px-2">
                        <a className="text-xl font-bold">Monitor Doc</a>
                    </div> 
                    <div className="sm:flex flex-1 px-6 hidden">
                        <div className="flex items-stretch">
                            {routes.map((item, index) => (
                                <div key={index}>
                                    {'items' in item ? (
                                        <NavDropdown
                                            name={item.name}
                                            items={item.items}
                                        />
                                    ) : (
                                        <NavItem href={route(item.route)}  active={route().current(item.route)}>
                                            {item.name}
                                        </NavItem>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sm:flex justify-end flex-1 px-2 hidden">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost gap-2 m-1 normal-case">
                                {auth.user.name}
                                <ArrowDownIcon/>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 justify-end items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {routes.map((item, index) => (
                            <div key={index}>
                                {'items' in item ? (
                                    <>
                                        {item.items.map((i, k) => (
                                            <ResponsiveNavLink href={route(i.route)} active={route().current(i.route)} key={k+i.route}>
                                                {i.name}
                                            </ResponsiveNavLink>
                                        ))}
                                    </>
                                ) : (
                                    <ResponsiveNavLink href={route(item.route)} active={route().current(item.route)}>
                                        {item.name}
                                    </ResponsiveNavLink>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='flex flex-row md:mt-5 max-w-7xl mx-auto'>

                <div className='w-full pt-5 md:pt-0'>
                    <main>{children}</main>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
