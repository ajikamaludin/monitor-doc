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

export default function Classification(props) {
    const { data: classifications, links } = props.classifications

    const formModal = useModalState(false)
    const toggle = (classification = null) => {
        formModal.setData(classification)
        formModal.toggle()
    }

    const confirmModal = useModalState(false)
    const handleDelete = (classification) => {
        confirmModal.setData(classification)
        confirmModal.toggle()
    }

    const onDelete = () => {
        const classification = confirmModal.data
        if(classification != null) {
            router.delete(route('classifications.destroy', classification), {
                onSuccess: () => toast.success('The Data has been deleted'),
            })
        }
    }

    const canCreate = hasPermission('create-classification', props.auth.user)
    const canUpdate = hasPermission('update-classification', props.auth.user)
    const canDelete = hasPermission('delete-classification', props.auth.user)

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
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classifications?.map((classification) => (
                                        <tr key={classification.id}>
                                            <th>{classification.id}</th>
                                            <td>{classification.name}</td>
                                            <td className="text-right">
                                                {canUpdate && (
                                                    <div
                                                        className="btn btn-primary mx-1"
                                                        onClick={() =>
                                                            toggle(classification)
                                                        }
                                                    >
                                                        Edit
                                                    </div>
                                                )}
                                                {canDelete && (
                                                    <div
                                                        className="btn btn-secondary mx-1"
                                                        onClick={() =>
                                                            handleDelete(classification)
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