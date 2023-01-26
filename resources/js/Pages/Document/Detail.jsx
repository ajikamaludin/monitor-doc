import React from 'react'
import { Link, Head } from '@inertiajs/react'

import DocStatusItem from './DocStatusItem'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { formatDate } from '@/utils'
import { useModalState } from '@/Hooks'


export default function FormDocument(props) {
    const { doc, doc_url }= props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            notify={props.notify}
        >
            <Head title="Document - Form" />

            <div className="flex flex-col w-full px-6 lg:px-8 space-y-2">
                <div className="card bg-base-100 w-full">
                    <div className="card-body">
                        <p className='font-bold text-2xl mb-4'>Dokumen</p>
                        <div className="overflow-x-auto">
                            <div>
                                <div className='mt-4'>
                                    <InputLabel forInput="region" value="Region" />
                                    <TextInput
                                        type="text"
                                        name="region"
                                        value={doc.region}
                                        className="mt-1 block w-full"
                                        autoComplete={"false"}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel forInput="group" value="Group" />
                                    <TextInput
                                        type="text"
                                        name="group"
                                        value={doc.group}
                                        className="mt-1 block w-full"
                                        autoComplete={"false"}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel forInput="variety" value="Jenis" />
                                    <TextInput
                                        type="text"
                                        name="variety"
                                        value={doc.variety.name}
                                        className="mt-1 block w-full"
                                        autoComplete={"false"}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel forInput="category" value="Kategori" />
                                    <TextInput
                                        type="text"
                                        name="category"
                                        value={doc.category.name}
                                        className="mt-1 block w-full"
                                        autoComplete={"false"}
                                        readOnly={true}
                                    />
                                </div>
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
                                <div>
                                    <InputLabel forInput="name" value="Nama Dokumen" />
                                    <TextInput
                                        type="text"
                                        name="name"
                                        value={doc.name}
                                        className="mt-1 block w-full"
                                        autoComplete={"false"}
                                        readOnly={true}
                                    />
                                </div>
                                <div>
                                    <InputLabel forInput="publisher" value="Penerbit" />
                                    <TextInput
                                        type="text"
                                        name="publisher"
                                        value={doc.publisher}
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
                                    <div className="flex w-80 justify-between items-center">
                                        <InputLabel value="Tipe" />
                                        <label className="label cursor-pointer gap-2 pl-20">
                                            <span className="label-text">Tetap</span> 
                                            <input type="radio" name="type" value="1" className="radio" checked={+doc.type == 1} />
                                        </label>
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text">Tidak Tetap</span> 
                                            <input type="radio" name="type" value="0" className="radio" checked={+doc.type == 0} />
                                        </label>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <InputLabel forInput="publish_date" value="Tanggal Terbit" />
                                    <TextInput
                                        type="text"
                                        name="publish_date"
                                        value={formatDate(doc.publish_date)}
                                        className="mt-1 block w-full"
                                        autoComplete={"false"}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel forInput="due_date" value="Tanggal Jatuh Tempo" />
                                    <TextInput
                                        type="text"
                                        name="due_date"
                                        value={formatDate(doc.due_date)}
                                        className="mt-1 block w-full"
                                        autoComplete={"false"}
                                        readOnly={true}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel forInput="description" value="Keterangan" />
                                    <TextInput
                                        type="textarea"
                                        name="description"
                                        value={doc.description}
                                        className="mt-1 block w-full"
                                        readOnly={true}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel forInput="document" value="Dokumen" />
                                    <a href={doc_url} className='btn btn-outline'>Download</a>
                                </div>
                                <div className='mt-4'>
                                    <div className="flex w-32 justify-between items-center">
                                        <InputLabel value="Status" />
                                        <label className="label cursor-pointer gap-2 pl-20">
                                            <span className="label-text">Ya</span> 
                                            <input type="radio" name="status" value="1" className="radio" checked={+doc.status == 1} />
                                        </label>
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text">Tidak</span> 
                                            <input type="radio" name="status" value="0" className="radio" checked={+doc.status == 0} />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className='flex flex-row space-x-1'>
                                        <Link href={route('docs.edit', doc)} className="btn btn-outline">
                                            Edit
                                        </Link>
                                    </div>
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