import React from "react"
import { Link } from "@inertiajs/react"
import { ArrowDownIcon } from "./Icons"

export default function NavDropdown({ name, items }) {
    const active = items.find(act => act.route === route().current()) 

    return (
        <div className="dropdown">
            <label tabIndex={0} className={`btn btn-ghost rounded-btn gap-2 ${active ? 'btn-active' : ''}`}>
                {name}
                <ArrowDownIcon/>
            </label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
            {items.map((item, index) => (
                <li key={index}>
                    <Link href={route(item.route)}>{item.name}</Link>
                </li>
            ))}
            </ul>
        </div>
    )
}