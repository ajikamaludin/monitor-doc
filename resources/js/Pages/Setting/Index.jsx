import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useModalState } from '@/Hooks';
import FormModal from './FormModal';

export default function Dashboard(props) {
    const { settings, ccs } = props
    const setting = settings.find(s => s.key === 'DESTINATION_MAIL' )
    const { data, setData, post,  processing, errors } = useForm({
        email: setting.value,
    })

    const ccModal = useModalState()

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const handleSubmit = () => {
        post(route('setting.update'), {
            onSuccess: () =>
                Promise.all([
                    toast.success('The Data has been saved'),
                ]),
        })
    }

    const handleSubmitAndTest = () => {
        post(route('setting.update', { test: 'test' }), {
            onSuccess: () =>
                Promise.all([
                    toast.success('The Data has been saved'),
                ]),
        })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            notify={props.notify}
        >
            <Head title="Setting" />

            <div className="flex flex-row w-full justify-center sm:px-6 lg:px-8 space-y-2">
                <div className="card bg-base-100 w-full max-w-md">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email Tujuan</span>
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
                                <span className="label-text-alt text-red-600">{errors.email}</span>
                            </label>
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text font-semibold">CC:</span>
                                <div className='btn btn-sm' onClick={ccModal.toggle}>+</div>
                            </label>
                            <div className='flex flex-col px-4 pb-4 gap-1'>
                                {ccs.map(cc => (
                                    <div className='flex flex-row justify-between' key={cc.id}>
                                        <div>{cc.value}</div>
                                        <Link className="btn btn-xs btn-circle btn-error" as='button' method='delete' href={route('setting.delete-cc', cc.id)}>x</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            onClick={handleSubmit}
                            className="btn btn-primary"
                            disabled={processing}
                        >
                            Simpan
                        </div>
                        <div
                            onClick={handleSubmitAndTest}
                            className="btn btn-secondary"
                            disabled={processing}
                        >
                            Simpan & Test
                        </div>
                    </div>
                </div>
            </div>
            <FormModal modalState={ccModal}/>
        </AuthenticatedLayout>
    );
}
