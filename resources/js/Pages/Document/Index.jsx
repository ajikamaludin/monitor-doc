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
import ModalImport from './ModalImport'

export default function Document(props) {
    const { data: docs, links } = props.docs

    const [search, setSearch] = useState({ q: '', status: 0 })
    const preValue = usePrevious(search)

    const importModal = useModalState(false)

    const confirmModal = useModalState(false)
    const handleDelete = (doc) => {
        confirmModal.setData(doc)
        confirmModal.toggle()
    }

    const onDelete = () => {
        const doc = confirmModal.data
        if (doc != null) {
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
            sortRule: search.sortRule == 'asc' ? 'desc' : 'asc',
        })
    }

    useEffect(() => {
        if (preValue) {
            router.get(route(route().current()), search, {
                replace: true,
                preserveState: true,
            })
        }
    }, [search])

    const canCreate = hasPermission('create-document', props.auth.user)
    const canUpdate = hasPermission('update-document', props.auth.user)
    const canDelete = hasPermission('delete-document', props.auth.user)
    const canImport = hasPermission('import-document', props.auth.user)
    const canExport = hasPermission('export-document', props.auth.user)

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
                            <div className="flex flex-row gap-2">
                                {canCreate && (
                                    <Link
                                        className="btn btn-neutral"
                                        href={route('docs.create')}
                                    >
                                        Tambah
                                    </Link>
                                )}
                                {canImport && (
                                    <div
                                        className="btn btn-outline"
                                        onClick={importModal.toggle}
                                    >
                                        Import
                                    </div>
                                )}
                            </div>
                            <div className="flex md:flex-row flex-col gap-2">
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={search.q}
                                        onChange={(e) =>
                                            handleFilter({ q: e.target.value })
                                        }
                                        placeholder="Search"
                                    />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="dropdown dropdown-end">
                                        <label
                                            tabIndex={0}
                                            className="btn btn-outline"
                                        >
                                            Filter
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                        >
                                            <li>
                                                <div
                                                    onClick={() =>
                                                        handleFilter({
                                                            status: 0,
                                                        })
                                                    }
                                                >
                                                    Semua
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    onClick={() =>
                                                        handleFilter({
                                                            status: 1,
                                                        })
                                                    }
                                                >
                                                    Jatuh Tempo
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    onClick={() =>
                                                        handleFilter({
                                                            status: 2,
                                                        })
                                                    }
                                                >
                                                    Mendekati Jatuh Tempo
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {canExport && (
                                        <div className="dropdown dropdown-end">
                                            <label
                                                tabIndex={0}
                                                className="btn btn-outline"
                                            >
                                                Export
                                            </label>
                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                            >
                                                <li>
                                                    <a
                                                        href={route(
                                                            'docs.export',
                                                            { type: 'excel' }
                                                        )}
                                                        target="_blank"
                                                    >
                                                        XLSX
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href={route(
                                                            'docs.export',
                                                            { type: 'pdf' }
                                                        )}
                                                        target="_blank"
                                                    >
                                                        PDF
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href={route(
                                                            'docs.export',
                                                            { type: '' }
                                                        )}
                                                        target="_blank"
                                                    >
                                                        Print
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto pb-44">
                            <table className="table w-full table-zebra">
                                <thead>
                                    <tr>
                                        <th>Perusahaan</th>
                                        <th
                                            className="hover:underline"
                                            onClick={() => sort('type_id')}
                                        >
                                            Jenis
                                        </th>
                                        <th
                                            className="hover:underline"
                                            onClick={() => sort('category_id')}
                                        >
                                            Ketegori
                                        </th>
                                        <th>No Dokumen</th>
                                        {/* <th>Nama Dokumen</th> */}
                                        <th className='hover:underline' onClick={() => sort('publish_date')}>Tanggal Terbit</th>
                                        <th className='hover:underline' onClick={() => sort('due_date')}>Tanggal Berakhir</th>
                                        <th>Catatan</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {docs?.map((doc) => (
                                        <tr key={doc.id}>
                                            <td>
                                                {doc.company.short} (
                                                {doc.company.region.name})
                                            </td>
                                            <td>{doc.variety.name}</td>
                                            <td>{doc.category.name}</td>
                                            <td>{doc.no_doc}</td>
                                            {/* <td>{doc.name}</td> */}
                                            <td>
                                                {doc.publish_date !== null
                                                    ? formatDate(
                                                          doc.publish_date
                                                      )
                                                    : ''}
                                            </td>
                                            <td>
                                                {doc.due_date !== null
                                                    ? formatDate(doc.due_date)
                                                    : ''}
                                            </td>
                                            <th
                                                style={{
                                                    color: doc.due_status_color,
                                                }}
                                            >
                                                {doc.due_status}
                                            </th>
                                            <td className="text-right w-1/8">
                                                <div className="dropdown dropdown-left">
                                                    <label
                                                        tabIndex={0}
                                                        className="btn btn-sm m-1 px-1"
                                                    >
                                                        <IconMenu />
                                                    </label>
                                                    <ul
                                                        tabIndex={0}
                                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                                    >
                                                        <li>
                                                            <Link
                                                                href={route(
                                                                    'docs.show',
                                                                    doc
                                                                )}
                                                            >
                                                                Detail
                                                            </Link>
                                                        </li>
                                                        {canUpdate && (
                                                            <li>
                                                                <Link
                                                                    href={route(
                                                                        'docs.edit',
                                                                        doc
                                                                    )}
                                                                >
                                                                    Edit
                                                                </Link>
                                                            </li>
                                                        )}
                                                        {canDelete && (
                                                            <li
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        doc
                                                                    )
                                                                }
                                                                className="bg-error "
                                                            >
                                                                <div>
                                                                    Delete
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="w-full flex justify-center">
                                <Pagination links={links} params={search} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalConfirm
                isOpen={confirmModal.isOpen}
                toggle={confirmModal.toggle}
                onConfirm={onDelete}
            />
            <ModalImport modalState={importModal} />
        </AuthenticatedLayout>
    )
}
