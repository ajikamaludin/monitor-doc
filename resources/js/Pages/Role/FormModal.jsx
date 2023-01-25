import React, { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default function FormModal(props) {
    const { modalState } = props
    const { props: { permissions } } = usePage()

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        permissions: []
    })

    const handleOnChange = (event) => {
        if (event.target.type === 'checkbox') {
            if (!event.target.checked) {
                setData('permissions', data.permissions.filter(i => i.name !== event.target.name))
                return
            }
            const permission = permissions.find(i => i.name === event.target.name)
            setData('permissions', data.permissions.concat(permission))
            return
        }
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
        const role = modalState.data
        if(role !== null) {
            put(route('roles.update', role), {
                onSuccess: () =>
                    Promise.all([
                        handleReset(),
                        modalState.toggle(),
                        toast.success('The Data has been changed'),
                    ]),
            })
            return
        }
        post(route('roles.store'), {
            onSuccess: () =>
                Promise.all([
                    handleReset(),
                    modalState.toggle(),
                    toast.success('The Data has been saved'),
                ]),
        })
    }

    const handleCheckAll = (event) => {
        if(event.target.checked) {
            setData('permissions', permissions)
            return 
        }
        setData('permissions', [])
    }

    const isChecked = (permission) => {
        const checked = data.permissions.find(i => i.name === permission.name)
        if (checked) {
            return true
        }
        return false
    }

    useEffect(() => {
        const role = modalState.data
        if (role !== null) {
            setData({
                name: role?.name,
                permissions: role?.permissions
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
                <h1 className="font-bold text-2xl pb-8">Role</h1>
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
                        <span className="label-text font-semibold">Permission</span>
                    </label>
                    <label className="label cursor-pointer">
                            <span className="label-text">Check All</span> 
                            <input 
                                type="checkbox" 
                                className="checkbox"
                                onChange={handleCheckAll}
                            />
                        </label>
                    {permissions.map(permission => (
                        <label className="label cursor-pointer" key={permission.id}>
                            <span className="label-text">{permission.label}</span> 
                            <input 
                                type="checkbox" 
                                className="checkbox"
                                checked={isChecked(permission)}
                                name={permission.name}
                                onChange={handleOnChange}
                            />
                        </label>
                    ))}
                    <label className="label">
                        <span className="label-text-alt text-red-600">{errors.permissions}</span>
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