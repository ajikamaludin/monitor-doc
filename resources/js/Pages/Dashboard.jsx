import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />

            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between space-x-1'>
                <div class="stats bg-base-100 border-base-300 border md:w-1/4">
                    <div class="stat">
                        <div class="stat-title">Dokumen Aktif</div> 
                        <div class="stat-value">1,400</div> 
                    </div>
                </div>
                <div class="stats bg-base-100 border-base-300 border md:w-1/4">
                    <div class="stat">
                        <div class="stat-title">Dokumen Diperbarui</div> 
                        <div class="stat-value">2,400</div> 
                    </div>
                </div>
                <div class="stats bg-base-100 border-base-300 border md:w-1/4">
                    <div class="stat">
                        <div class="stat-title">Dokumen Berakhir</div> 
                        <div class="stat-value">1,400</div> 
                    </div>
                </div>
                <div class="stats bg-base-100 border-base-300 border md:w-1/4">
                    <div class="stat">
                        <div class="stat-title">Total Dokumen</div> 
                        <div class="stat-value">4,400</div> 
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
