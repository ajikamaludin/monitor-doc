import React, { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { ToastContainer, toast } from 'react-toastify'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/inertia-react';
import MenuItem from '@/Components/SidebarMenuItem';
import { IconBell, IconBellRing } from '@/Icons';
import { Inertia } from '@inertiajs/inertia';
import { NavDropdown, NavItem } from '@/Components/NavItem';

const Notification = ({ notifications, hasUnread }) => {
    const redirect = (item) => {
        Inertia.get(route('notification.redirect', item))
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
                            <NavItem href={route("dashboard")}  active={route().current('dashboard')}>
                                Dashboard
                            </NavItem>
                           <NavDropdown
                            name="Dokumen"
                            items={[
                                {label: "Dokumen", route: 'docs.index'},
                                {label: "User", route: 'users.index'},
                            ]}
                           ></NavDropdown>
                            <NavItem href={route("users.index")}  active={route().current('users.*')}>
                                User
                            </NavItem>
                        </div>
                    </div>
                    <div className="sm:flex justify-end flex-1 px-2 hidden">
                        {auth.user.name}
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
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('docs.index')} active={route().current('docs.*')}>
                            Monitoring
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('users.index')} active={route().current('users.*')}>
                            Users
                        </ResponsiveNavLink>
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
