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

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-base-100 overflow-hidden shadow-sm">
                        <div className="p-6 bg-base-100 border-b border-base-200">You're logged in!</div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
