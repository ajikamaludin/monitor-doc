import React from 'react'
import { Link, Head } from '@inertiajs/inertia-react'

import DocStatusItem from './DocStatusItem'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'


export default function FormDocument(props) {
    const { doc, doc_url }= props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
        >
            <Head title="Document - Form" />

            <div className="flex flex-col w-full px-6 lg:px-8 space-y-2">
                <div className="card bg-base-100 w-full">
                    <div className="card-body">
                        <p className='font-bold text-2xl mb-4'>Dokumen</p>
                        <div className="overflow-x-auto">
                        <div>
                            <div>
                                <InputLabel forInput="no_doc" value="No Dokumen" />
                                <TextInput
                                    type="text"
                                    name="no_doc"
                                    value={doc.no_doc}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="type" value="Jenis" />
                                <TextInput
                                    type="text"
                                    name="no_doc"
                                    value={doc.type.name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="company_name" value="Nama Perusahaan" />
                                <TextInput
                                    type="text"
                                    name="company_name"
                                    value={doc.company_name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="first_person_name" value="Nama Pihak Pertama" />
                                <TextInput
                                    type="text"
                                    name="first_person_name"
                                    value={doc.first_person_name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="second_person_name" value="Nama Pihak Kedua" />
                                <TextInput
                                    type="text"
                                    name="second_person_name"
                                    value={doc.second_person_name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="start_date" value="Tanggal Mulai" />
                                <TextInput
                                    type="date"
                                    name="start_date"
                                    value={doc.start_date}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="end_date" value="Tanggal Berakhir" />
                                <TextInput
                                    type="date"
                                    name="end_date"
                                    value={doc.end_date}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>

                            <div className='mt-4'>
                                <InputLabel forInput="type" value="Deparment" />
                                <TextInput
                                    type="text"
                                    name="type"
                                    value={doc.department.name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="pic_name" value="Nama PIC" />
                                <TextInput
                                    type="text"
                                    name="pic_name"
                                    value={doc.pic_name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="email" value="Email" />
                                <TextInput
                                    type="text"
                                    name="email"
                                    value={doc.email}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="note" value="Catatan" />
                                <TextInput
                                    type="textarea"
                                    name="note"
                                    value={doc.note}
                                    className="mt-1 block w-full"
                                    readOnly={true}
                                />
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="document" value="Dokumen" />
                                <a href={doc_url} className='btn btn-outline'>Download</a>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="status" value="Status" />
                                <DocStatusItem status={doc.status}/>
                            </div>
                            <div className='mt-4'>
                                <div className='flex flex-row space-x-5 items-center'>
                                    <InputLabel forInput="reminder" value="Reminder" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-4">
                                    {doc.reminders.map((reminder, index) => (
                                        <div className='card text-center shadow-md pt-2 pb-4 px-2' key={index}> 
                                            <div>
                                                {reminder.date} 
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <Link href={route('docs.edit', doc)} className="btn btn-outline">
                                    Edit
                                </Link>
                                <Link href={route('docs.index')} className="btn btn-outline">
                                    Kembali
                                </Link>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </AuthenticatedLayout>
    )
}