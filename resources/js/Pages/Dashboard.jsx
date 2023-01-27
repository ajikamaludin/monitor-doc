import React from 'react';
import "@fullcalendar/react/dist/vdom";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick    

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react'

export default function Dashboard(props) {
    const { count_active, count_update, count_expired, count_total, events } = props

    // const calenderEvents = events.map(e => { 
    //     return {
    //         title: `${e.document.type.name} - ${e.document.name}`, 
    //         date: e.date, 
    //         id : e.id,
    //         url: route('docs.show', e.document)
    //     } 
    // }) 

    const handleEventClick = (arg) => {
        // console.log(arg.event)
    }

    const handleDateClick = (arg) => { // bind with an arrow function
        // apa yang harus di handle: tampilkan saja modal yang ada event pada date ini kemudian bisa tambah reminder atau hapus reminder pada data ini,
        // untuk tambah reminder pilih form doc id saja kemudian tambah , untuk delete cukup confirm kemudian hilang
        alert(arg.dateStr)
    }

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
                        <div className="stat-value">{count_active}</div> 
                    </div>
                </div>
                <div className="stats bg-base-100 shadow-md w-full overflow-hidden">
                    <div className="stat">
                        <div className="stat-title">Dokumen Jatuh Tempo</div> 
                        <div className="stat-value">{count_update}</div> 
                    </div>
                </div>
                {/* <div className="stats bg-base-100 shadow-md w-full">
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
                </div> */}
            </div>
            {/* <div className='bg-base-100 mx-2 md:mx-8 mt-4 p-2 md:p-4 lg:p-8 h-auto'>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    events={calenderEvents}
                />
            </div> */}
        </AuthenticatedLayout>
    );
}
