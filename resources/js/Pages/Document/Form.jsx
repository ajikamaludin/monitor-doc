import React, { useEffect, useRef } from 'react'
import { Link, Head, useForm } from '@inertiajs/inertia-react'
import { toast } from 'react-toastify'

import {statuses} from '@/utils'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import InputFile from '@/Components/InputFile'


export default function FormDocument(props) {
    const { types, departments, doc }= props

    const { data, setData, post, processing, errors, reset } = useForm({
        no_doc: '',
        email: '',
        type_doc_id: '1',
        department_id: '1',
        company_name: '',
        first_person_name: '',
        second_person_name: '',
        start_date: '',
        end_date: '',
        pic_name: '',
        note: '',
        document: null,
        document_name: '',
        status: 0,
        reminder: ''
    });

    const inputDocument = useRef()

    useEffect(() => {
        if(doc !== undefined) {
            setData({
                no_doc: doc.no_doc,
                email: doc.email,
                type_doc_id: doc.type_doc_id,
                department_id: doc.department_id,
                company_name: doc.company_name,
                first_person_name: doc.first_person_name,
                second_person_name: doc.second_person_name,
                start_date: doc.start_date,
                end_date: doc.end_date,
                pic_name: doc.pic_name,
                note: doc.note,
                document: null,
                document_name: doc.document,
                status: doc.status,
            })
        }
    }, [doc]);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        if(doc !== undefined) {
            post(route('docs.update', doc), {
                onError: () => toast.error('please recheck the data')
            });
            return
        }
        post(route('docs.store'), {
            onError: () => toast.error('please recheck the data')
        });
    };
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
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel forInput="no_doc" value="No Dokumen" />
                                <TextInput
                                    type="text"
                                    name="no_doc"
                                    value={data.no_doc}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.no_doc}
                                />
                                <InputError message={errors.no_doc}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="type" value="Jenis" />
                                <select 
                                    className="mt-1 select select-bordered w-full" 
                                    name="type_doc_id" 
                                    onChange={onHandleChange}
                                    value={data.type_doc_id}
                                >
                                    {types.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.type_doc_id}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="company_name" value="Nama Perusahaan" />
                                <TextInput
                                    type="text"
                                    name="company_name"
                                    value={data.company_name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.company_name}
                                />
                                <InputError message={errors.company_name}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="first_person_name" value="Nama Pihak Pertama" />
                                <TextInput
                                    type="text"
                                    name="first_person_name"
                                    value={data.first_person_name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.first_person_name}
                                />
                                <InputError message={errors.first_person_name}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="second_person_name" value="Nama Pihak Kedua" />
                                <TextInput
                                    type="text"
                                    name="second_person_name"
                                    value={data.second_person_name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.second_person_name}
                                />
                                <InputError message={errors.second_person_name}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="start_date" value="Tanggal Mulai" />
                                <TextInput
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.start_date}
                                />
                                <InputError message={errors.start_date}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="end_date" value="Tanggal Berakhir" />
                                <TextInput
                                    type="date"
                                    name="end_date"
                                    value={data.end_date}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.end_date}
                                />
                                <InputError message={errors.end_date}/>
                            </div>

                            <div className='mt-4'>
                                <InputLabel forInput="type" value="Deparment" />
                                <select 
                                    className="mt-1 select select-bordered w-full" 
                                    name="department_id" 
                                    onChange={onHandleChange} 
                                    value={data.department_id}
                                >
                                    {departments.map(dep => (
                                        <option key={dep.id} value={dep.id}>{dep.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.type_doc_id}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="pic_name" value="Nama PIC" />
                                <TextInput
                                    type="text"
                                    name="pic_name"
                                    value={data.pic_name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.pic_name}
                                />
                                <InputError message={errors.pic_name}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="email" value="Email" />
                                <TextInput
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.email}
                                />
                                <InputError message={errors.email}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="note" value="Catatan" />
                                <TextInput
                                    type="textarea"
                                    name="note"
                                    value={data.note}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    isError={errors.note}
                                />
                                <InputError message={errors.note}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="document" value="Dokumen" />
                                <InputFile  
                                    file={data.document} 
                                    isError={errors.document} 
                                    inputRef={inputDocument} 
                                    handleChange={e => setData('document', e.target.files[0])}
                                />
                                <InputError message={errors.document}/>
                                {doc !== undefined && (
                                    <p className='text-sm'>file saved is found, reupload to replace</p>
                                )}
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="status" value="Status" />
                                <select 
                                    className="mt-1 select select-bordered w-full" 
                                    name="status" 
                                    onChange={onHandleChange} 
                                    value={data.status}
                                >
                                    {statuses.map(status => (
                                        <option key={`status-${status.key}`} value={status.key}>{status.value}</option>
                                    ))}
                                </select>
                                <InputError message={errors.status}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="reminder" value="Reminder" />
                                <div className="btn-group w-full">
                                    <TextInput
                                        type="text"
                                        name="reminder"
                                        value={data.reminder}
                                        className="mt-1 block w-full"
                                        autoComplete={"false"}
                                        isError={errors.reminder}
                                    />
                                    <div className='btn btn-active w-1/6'>+</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <PrimaryButton processing={processing}>
                                    Simpan
                                </PrimaryButton>

                                <Link href={route('docs.index')} className="btn btn-outline">
                                    Batal
                                </Link>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </AuthenticatedLayout>
    )
}