import React, { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default function FormModal(props) {
    const { modalState } = props
    const { props: { regions } } = usePage()

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        short: '',
        region_id: ''
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
        const company = modalState.data
        if(company !== null) {
            put(route('companies.update', company), {
                onSuccess: () =>
                    Promise.all([
                        handleReset(),
                        modalState.toggle(),
                        toast.success('The Data has been changed'),
                    ]),
            })
            return
        }
        post(route('companies.store'), {
            onSuccess: () =>
                Promise.all([
                    handleReset(),
                    modalState.toggle(),
                    toast.success('The Data has been saved'),
                ]),
        })
    }

    useEffect(() => {
        const company = modalState.data
        if (company !== null) {
            setData({
                name: company?.name,
                short: company?.short,
                region_id: company?.region_id,
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
                <h1 className="font-bold text-2xl pb-8">Perusahaan</h1>
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
                        <span className="label-text font-semibold">Inisial</span>
                    </label>
                    <input
                        type="text"
                        placeholder="inisial"
                        className={`input input-bordered ${
                            errors.short && 'input-error'
                        }`}
                        name="short"
                        value={data.short}
                        onChange={handleOnChange}
                    />
                    <label className="label">
                        <span className="label-text-alt text-red-600">{errors.short}</span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Region</span>
                    </label>
                    <select 
                        className={`select select-bordered w-full ${
                            errors.region_id && 'select-error'
                        }`}
                        name='region_id' 
                        value={data.region_id}
                        onChange={handleOnChange}
                    >
                        <option disabled value=""></option>
                        {regions.map(region => (
                            <option key={region.id} value={region.id}>{region.name} ({region.group?.name})</option>
                        ))}
                    </select>
                    <label className="label">
                        <span className="label-text-alt">
                            {errors.region_id}
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