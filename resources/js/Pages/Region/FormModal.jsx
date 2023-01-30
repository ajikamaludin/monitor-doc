import React, { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default function FormModal(props) {
    const { modalState } = props
    const { props: { groups } } = usePage()

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        group_id: ''
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
        const region = modalState.data
        if(region !== null) {
            put(route('regions.update', region), {
                onSuccess: () =>
                    Promise.all([
                        handleReset(),
                        modalState.toggle(),
                        toast.success('The Data has been changed'),
                    ]),
            })
            return
        }
        post(route('regions.store'), {
            onSuccess: () =>
                Promise.all([
                    handleReset(),
                    modalState.toggle(),
                    toast.success('The Data has been saved'),
                ]),
        })
    }

    useEffect(() => {
        const region = modalState.data
        if (region !== null) {
            setData({
                name: region?.name,
                group_id: region?.group_id
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
                <h1 className="font-bold text-2xl pb-8">Region</h1>
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Group</span>
                    </label>
                    <select 
                        className={`select select-bordered w-full ${
                            errors.group_id && 'select-error'
                        }`}
                        name='group_id' 
                        value={data.group_id}
                        onChange={handleOnChange}
                    >
                        <option disabled value=""></option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                    <label className="label">
                        <span className="label-text-alt">
                            {errors.group_id}
                        </span>
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