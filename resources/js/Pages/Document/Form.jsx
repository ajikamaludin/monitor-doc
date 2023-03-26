import React, { useEffect, useRef } from 'react'
import { Link, Head, useForm, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import InputFile from '@/Components/InputFile'

export default function FormDocument(props) {
    const inputDocument = useRef()
    const { types, categories, companies, doc }= props

    const { data, setData, post, processing, errors } = useForm({
        no_doc: '',
        name: '',
        type_id: '',
        category_id: '',
        publisher: '',
        description: '',
        publish_date: '',
        due_date: '',
        status: 0,
        type: 0,
        company_id: '',
        document: null,
        document_name: '',
    });

    useEffect(() => {
        if(doc !== undefined) {
            setData({
                no_doc: doc.no_doc,
                name: doc.name,
                type_id: doc.type_id,
                category_id: doc.category_id,
                publisher: doc.publisher,
                description: doc.description,
                publish_date: doc.publish_date,
                due_date: doc.due_date,
                status: doc.status,
                type: doc.type,
                company_id: doc.company_id,
                document: null,
                document_name: doc.document,
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
            notify={props.notify}
        >
            <Head title="Document - Form" />

            <div className="flex flex-col w-full px-6 lg:px-8 space-y-2">
                <div className="card bg-base-100 w-full">
                    <div className="card-body">
                        <p className='font-bold text-2xl mb-4'>Dokumen</p>
                        <div className="overflow-x-auto">
                        <form onSubmit={submit}>
                            <div className='mt-4 pl-1'>
                                <InputLabel forInput="type" value="Jenis" />
                                <select 
                                    className="mt-1 select select-bordered w-full" 
                                    name="type_id" 
                                    onChange={onHandleChange}
                                    value={data.type_id}
                                >
                                    <option selected disabled></option>
                                    {types.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.type_id}/>
                            </div>
                            <div className='mt-4 pl-1'>
                                <InputLabel forInput="category" value="Ketegori" />
                                <select 
                                    className="mt-1 select select-bordered w-full" 
                                    name="category_id" 
                                    onChange={onHandleChange}
                                    value={data.category_id}
                                >
                                    <option selected disabled></option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id}/>
                            </div>
                            <div className='mt-4 pl-1'>
                                <InputLabel forInput="company" value="Nama Perusahaan" />
                                <select 
                                    className="mt-1 select select-bordered w-full" 
                                    name="company_id" 
                                    onChange={onHandleChange}
                                    value={data.company_id}
                                >
                                    <option selected disabled></option>
                                    {companies.map(company => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.company_id}/>
                            </div>
                            <div className='mt-4'>
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
                                <InputLabel forInput="name" value="Nama Dokumen" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.name}
                                />
                                <InputError message={errors.name}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="publisher" value="Penerbit" />
                                <TextInput
                                    type="text"
                                    name="publisher"
                                    value={data.publisher}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.publisher}
                                />
                                <InputError message={errors.publisher}/>
                            </div>
                            <div className='mt-4'>
                                <div className="flex w-80 justify-between items-center">
                                    <InputLabel value="Tipe" />
                                    <label className="label cursor-pointer gap-2 pl-20">
                                        <span className="label-text">Tetap</span> 
                                        <input type="radio" name="type" onChange={onHandleChange} value="1" className="radio" checked={+data.type == 1} />
                                    </label>
                                    <label className="label cursor-pointer gap-2">
                                        <span className="label-text">Tidak Tetap</span> 
                                        <input type="radio" name="type" onChange={onHandleChange} value="0" className="radio" checked={+data.type == 0} />
                                    </label>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="publish_date" value="Tanggal Terbit" />
                                <TextInput
                                    type="date"
                                    name="publish_date"
                                    placeholder='dd-mm-yyyy'
                                    value={data.publish_date}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.publish_date}
                                />
                                <InputError message={errors.publish_date}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="due_date" value="Tanggal Jatuh Tempo" />
                                <TextInput
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    autoComplete={"false"}
                                    handleChange={onHandleChange}
                                    isError={errors.due_date}
                                />
                                <InputError message={errors.due_date}/>
                            </div>
                            <div className='mt-4'>
                                <InputLabel forInput="description" value="Keterangan" />
                                <TextInput
                                    type="textarea"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    isError={errors.description}
                                />
                                <InputError message={errors.description}/>
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
                                <div className="flex w-32 justify-between items-center">
                                    <InputLabel value="Status" />
                                    <label className="label cursor-pointer gap-2 pl-20">
                                        <span className="label-text">Ya</span> 
                                        <input type="radio" name="status" onChange={onHandleChange} value="1" className="radio" checked={+data.status == 1} />
                                    </label>
                                    <label className="label cursor-pointer gap-2">
                                        <span className="label-text">Tidak</span> 
                                        <input type="radio" name="status" onChange={onHandleChange} value="0" className="radio" checked={+data.status == 0} />
                                    </label>
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