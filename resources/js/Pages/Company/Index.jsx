import React from 'react'
import { Head } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'

import { useModalState } from '@/Hooks'
import { hasPermission } from '@/utils'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import ModalConfirm from '@/Components/ModalConfirm'
import FormModal from './FormModal'

export default function Types(props) {
    const { data: companies, links } = props.companies

    const formModal = useModalState(false)
    const toggle = (company = null) => {
        formModal.setData(company)
        formModal.toggle()
    }

    const confirmModal = useModalState(false)
    const handleDelete = (company) => {
        confirmModal.setData(company)
        confirmModal.toggle()
    }

    const onDelete = () => {
        const company = confirmModal.data
        if(company != null) {
            router.delete(route('companies.destroy', company), {
                onSuccess: () => toast.success('The Data has been deleted'),
            })
        }
    }

    const canCreate = hasPermission('create-company', props.auth.user)
    const canUpdate = hasPermission('update-company', props.auth.user)
    const canDelete = hasPermission('delete-company', props.auth.user)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            notify={props.notify}
        >
            <Head title="Roles" />
            <div className="flex flex-col w-full sm:px-6 lg:px-8 space-y-2">
                <div className="card bg-base-100 w-full">
                    <div className="card-body">
                        <div className="flex w-full mb-4 justify-between">
                            {canCreate && (
                                <div
                                    className="btn btn-neutral"
                                    onClick={() => toggle()}
                                >
                                    Tambah
                                </div>
                            )}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full table-zebra">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nama</th>
                                        <th>Inisial</th>
                                        <th>Region</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies?.map((company) => (
                                        <tr key={company.id}>
                                            <th>{company.id}</th>
                                            <td>{company.name} ({company.region.name})</td>
                                            <td>{company.short}</td>
                                            <td>{company.region.name}</td>
                                            <td className="text-right">
                                                {canUpdate && (
                                                    <div
                                                        className="btn btn-primary mx-1"
                                                        onClick={() =>
                                                            toggle(company)
                                                        }
                                                    >
                                                        Edit
                                                    </div>
                                                )}
                                                {canDelete && (
                                                    <div
                                                        className="btn btn-secondary mx-1"
                                                        onClick={() =>
                                                            handleDelete(company)
                                                        }
                                                    >
                                                        Delete
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={links} />
                    </div>
                </div>
            </div>
            
            <FormModal
                modalState={formModal}
            />
            <ModalConfirm
                isOpen={confirmModal.isOpen}
                toggle={confirmModal.toggle}
                onConfirm={onDelete}
            />
        </AuthenticatedLayout>
    )
}