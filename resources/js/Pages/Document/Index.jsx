import React, { useEffect, useState } from 'react'
import { usePrevious } from 'react-use'
import { Head, Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'

import { useModalState } from '@/Hooks'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import ModalConfirm from '@/Components/ModalConfirm'
import { IconMenu } from '@/Icons'
import { formatDate, hasPermission } from '@/utils'

export default function Document(props) {
    const { types, departments } = props
    const { data: docs, links } = props.docs

    const [search, setSearch] = useState({q: ''})
    const preValue = usePrevious(search)

    const confirmModal = useModalState(false)
    const handleDelete = (doc) => {
        confirmModal.setData(doc)
        confirmModal.toggle()
    }

    const onDelete = () => {
        const doc = confirmModal.data
        if(doc != null) {
            router.delete(route('docs.destroy', doc), {
                onSuccess: () => toast.success('The Data has been deleted'),
            })
        }
    }

    const handleFilter = (filter) => {
        setSearch({
            ...search,
            ...filter,
        })
    }

    const sort = (key) => {
        setSearch({
            ...search,
            sortBy: key,
            sortRule: search.sortRule == 'asc' ? 'desc' : 'asc'
        })
    }

    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                search,
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    const canCreate = hasPermission('create-document', props.auth.user)
    const canUpdate = hasPermission('update-document', props.auth.user)
    const canDelete = hasPermission('delete-document', props.auth.user)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            notify={props.notify}
        >
            <Head title="Document" />
            <div className="flex flex-col w-full sm:px-6 lg:px-8 space-y-2">
                <div className="card bg-base-100 w-full">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row w-full mb-4 justify-between space-y-1 md:space-y-0">
                            {canCreate && (
                                <Link
                                    className="btn btn-neutral"
                                    href={route('docs.create')}
                                >
                                    Tambah
                                </Link>
                            )}
                            <div className='flex flex-row'>
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={search.q}
                                        onChange={(e) =>
                                            handleFilter({q: e.target.value})
                                        }
                                        placeholder="Search"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto pb-44">
                            <table className="table w-full table-zebra">
                                <thead>
                                    <tr>
                                        <th className='hover:underline' onClick={() => sort('type_id')}>Jenis</th>
                                        <th className='hover:underline' onClick={() => sort('category_id')}>Ketegori</th>
                                        <th>No Dokumen</th>
                                        <th>Nama Dokumen</th>
                                        <th className='hover:underline' onClick={() => sort('due_date')}>Tanggal Berakhir</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {docs?.map((doc) => (
                                        <tr key={doc.id}>
                                            <td>{doc.variety.name}</td>
                                            <td>{doc.category.name}</td>
                                            <td>{doc.no_doc}</td>
                                            <td>{doc.name}</td>
                                            <td>{formatDate(doc.due_date)}</td>
                                            <th>Status</th>
                                            <td className='text-right'>
                                                <div className="dropdown dropdown-left">
                                                    <label tabIndex={0} className="btn btn-sm m-1 px-1"><IconMenu/></label>
                                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li>
                                                            <Link href={route('docs.show', doc)}>Detail</Link>
                                                        </li>
                                                        {canUpdate && (
                                                            <li>
                                                                <Link href={route('docs.edit', doc)}>Edit</Link>
                                                            </li>
                                                        )}
                                                        {canDelete && (
                                                            <li onClick={() => handleDelete(doc)} className="bg-error ">
                                                                <div>Delete</div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={links} params={search}/>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <ModalConfirm
                isOpen={confirmModal.isOpen}
                toggle={confirmModal.toggle}
                onConfirm={onDelete}
            />
        </AuthenticatedLayout>
    )
}