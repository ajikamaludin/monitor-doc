import React from 'react';
import { Link } from '@inertiajs/react';

export default function NavItem({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`btn btn-ghost rounded-btn ${active ? 'btn-active' : ''}`}
        >
            {children}
        </Link>
    );
}