import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    const { count_active, count_update, count_expired, count_total } = props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
        >
            <Head title="Dashboard" />

            <div className='mx-auto px-2 md:px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1'>
                <div className="stats bg-base-100 shadow-md w-full">
                    <div className="stat">
                        <div className="stat-title">Dokumen Aktif</div> 
                        <div className="stat-value">{count_active}</div> 
                    </div>
                </div>
                <div className="stats bg-base-100 shadow-md w-full">
                    <div className="stat">
                        <div className="stat-title">Dokumen Diperbarui</div> 
                        <div className="stat-value">{count_update}</div> 
                    </div>
                </div>
                <div className="stats bg-base-100 shadow-md w-full">
                    <div className="stat">
                        <div className="stat-title">Dokumen Berakhir</div> 
                        <div className="stat-value">{count_expired}</div> 
                    </div>
                </div>
                <div className="stats bg-base-100 shadow-md w-full">
                    <div className="stat">
                        <div className="stat-title">Total Dokumen</div> 
                        <div className="stat-value">{count_total}</div> 
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
