import React, { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default function UserFormModal(props) {
    const { isOpen, toggle = () => {} , user = null } = props
    const { props: { roles }} = usePage()

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role_id: '',
        is_admin: '0',
        group: '',
        region: ''
    })

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const handleReset = () => {
        reset()
        clearErrors()
    }

    const handleCancel = () => {
        handleReset()
        toggle()
    }

    const handleSubmit = () => {
        if(user !== null) {
            put(route('users.update', user), {
                onSuccess: () =>
                    Promise.all([
                        handleReset(),
                        toggle(),
                        toast.success('The Data has been changed'),
                    ]),
            })
            return
        }
        post(route('users.store'), {
            onSuccess: () =>
                Promise.all([
                    handleReset(),
                    toggle(),
                    toast.success('The Data has been saved'),
                ]),
        })
    }

    useEffect(() => {
        setData({
            name: user?.name,
            email: user?.email,
            role_id: user?.role_id,
            is_admin: user?.is_admin,
            group: user?.group,
            region: user?.region
        })
    }, [user])

    return (
        <div
            className="modal modal-bottom sm:modal-middle pb-10"
            style={
                isOpen
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
                <h1 className="font-bold text-2xl pb-8">User</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nama</span>
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
                        <span className="label-text-alt">{errors.name}</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        placeholder="email"
                        className={`input input-bordered ${
                            errors.email && 'input-error'
                        }`}
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">{errors.email}</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        className={`input input-bordered ${
                            errors.password && 'input-error'
                        }`}
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">
                            {errors.password}
                        </span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Group</span>
                    </label>
                    <input
                        type="text"
                        placeholder="group"
                        className={`input input-bordered ${
                            errors.name && 'input-error'
                        }`}
                        name="group"
                        value={data.group}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">{errors.group}</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Region</span>
                    </label>
                    <input
                        type="text"
                        placeholder="region"
                        className={`input input-bordered ${
                            errors.name && 'input-error'
                        }`}
                        name="region"
                        value={data.region}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt">{errors.region}</span>
                    </label>
                </div>
                {(user === null || +user?.is_admin === 0) && (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select 
                            className={`select select-bordered w-full ${
                                errors.role_id && 'select-error'
                            }`}
                            name='role_id' 
                            value={data.role_id}
                            onChange={handleOnChange}
                        >
                            <option disabled value=""></option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                        <label className="label">
                            <span className="label-text-alt">
                                {errors.role_id}
                            </span>
                        </label>
                    </div>
                )}
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