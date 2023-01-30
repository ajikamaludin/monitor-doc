import React, { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default function FormModal(props) {
    const { modalState } = props

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
    })

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const handleReset = () => {
        reset()
        clearErrors()
        modalState.setData(null)
    }

    const handleCancel = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = () => {
        const group = modalState.data
        if(group !== null) {
            put(route('groups.update', group), {
                onSuccess: () =>
                    Promise.all([
                        handleReset(),
                        modalState.toggle(),
                        toast.success('The Data has been changed'),
                    ]),
            })
            return
        }
        post(route('groups.store'), {
            onSuccess: () =>
                Promise.all([
                    handleReset(),
                    modalState.toggle(),
                    toast.success('The Data has been saved'),
                ]),
        })
    }

    useEffect(() => {
        const group = modalState.data
        if (group !== null) {
            setData({
                name: group?.name,
            })
        }
    }, [modalState])

    return (
        <div
            className="modal modal-bottom sm:modal-middle pb-10"
            style={
                modalState.isOpen
                    ? {
                        opacity: 1,
                        pointerEvents: 'auto',
                        visibility: 'visible',
                        overflowY: 'initial',
                    }
                    : {}
            }
        >
            <div className="modal-box overflow-y-auto max-h-screen">
                <h1 className="font-bold text-2xl pb-8">Group</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Nama</span>
                    </label>
                    <input
                        type="text"
                        placeholder="nama"
                        className={`input input-bordered ${
                            errors.name && 'input-error'
                        }`}
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt text-red-600">{errors.name}</span>
                    </label>
                </div>
                <div className="modal-action">
                    <div
                        onClick={handleSubmit}
                        className="btn btn-primary"
                        disabled={processing}
                    >
                        Simpan
                    </div>
                    <div
                        onClick={handleCancel}
                        className="btn btn-secondary"
                        disabled={processing}
                    >
                        Batal
                    </div>
                </div>
            </div>
        </div>
    )
}