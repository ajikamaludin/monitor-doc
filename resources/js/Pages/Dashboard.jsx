import React from 'react';
import "@fullcalendar/react/dist/vdom";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';

export default function Dashboard(props) {
    const { count_active, count_update } = props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            notify={props.notify}
        >
            <Head title="Dashboard" />

            <div className='mx-auto px-2 md:px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1'>
                <div className="stats bg-base-100 shadow-md w-full overflow-hidden">
                    <div className="stat">
                        <div className="stat-title">Dokumen Mendekati Jatuh Tempo</div> 
                        <Link className="stat-value" href={route("docs.index", {status: 2})}>{count_active}</Link> 
                    </div>
                </div>
                <div className="stats bg-base-100 shadow-md w-full overflow-hidden">
                    <div className="stat">
                        <div className="stat-title">Dokumen Jatuh Tempo</div> 
                        <Link className="stat-value" href={route("docs.index", {status: 1})}>{count_update}</Link> 
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
