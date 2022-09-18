import React from 'react'
import { Link } from '@inertiajs/inertia-react'

export default function MenuItem({ routeName, name, active }) {
    return (
        <li>
            <Link href={route(routeName)} className={`flex items-center p-2 text-base font-normal rounded-lg ${route().current(active) ? 'bg-base-200' : 'hover:bg-base-200'} `}>
            <span className="ml-3">{name}</span>
            </Link>
        </li>
    )
}