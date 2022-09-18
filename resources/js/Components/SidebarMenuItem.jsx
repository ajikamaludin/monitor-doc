import React from 'react'
import { Link } from '@inertiajs/inertia-react'

export default function MenuItem({ routeName, name, active }) {
    return (
        <li>
            <Link href={route(routeName)} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${route().current(active) ? 'bg-gray-100' : 'hover:bg-gray-100'} dark:hover:bg-gray-700`}>
            <span className="ml-3">{name}</span>
            </Link>
        </li>
    )
}