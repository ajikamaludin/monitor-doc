import React, { useState } from 'react'
import { statuses } from '@/utils'
import InputLabel from '@/Components/InputLabel'

export default function ModalFilter(props) {
    const { isOpen, toggle, handleSetFilter, types, departments, filter } = props
    const [type, setType] = useState('')
    const [dep, setDep] = useState('')
    const [status, setStatus] = useState('')

    const onClickFilter = () => {
        toggle()
        handleSetFilter({
            ...filter,
            type_doc_id: type,
            status: status,
            department_id: dep
        })
    }

    const onClickReset = () => {
        toggle()
        setType('')
        setDep('')
        setStatus('')
        handleSetFilter({
            ...filter,
            type_doc_id: '',
            status: '',
            department_id: ''
        })
    }

    const onClickExport = () => {
        // call export url 
    }

    return (
        <div
            className="modal modal-bottom sm:modal-middle pb-10"
            style={
                isOpen
                    ? {
                        opacity: 1,
                        pointerEvents: 'auto',
                        visibility: 'visible',
                    }
                    : {}
            }
        >
            <div className="modal-box">
                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={toggle}>✕</label>
                <div className='mt-4'>
                    <InputLabel forInput="type" value="Jenis" />
                    <select 
                        className="mt-1 select select-bordered w-full" 
                        name="type_doc_id" 
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <option key={`type.id`} value={``}> - </option>
                        {types.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <div className='mt-4'>
                    <InputLabel forInput="type" value="Deparment" />
                    <select 
                        className="mt-1 select select-bordered w-full" 
                        name="department_id" 
                        onChange={(e) => setDep(e.target.value)}
                        value={dep}
                    >
                        <option key={`dep.id`} value={``}> - </option>
                        {departments.map(dep => (
                            <option key={dep.id} value={dep.id}>{dep.name}</option>
                        ))}
                    </select>
                </div>
                <div className='mt-4'>
                    <InputLabel forInput="status" value="Status" />
                    <select 
                        className="mt-1 select select-bordered w-full" 
                        name="status" 
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option key={`status.id`} value={``}> - </option>
                        {statuses.map(status => (
                            <option key={`status-${status.key}`} value={status.key}>{status.value}</option>
                        ))}
                    </select>
                </div>
                <div className='flex justify-center mt-4 space-x-4'>
                    <div className='btn btn-outline' onClick={onClickFilter}>Filter</div>
                    <div className='btn btn-outline' onClick={onClickReset}>Reset</div>
                    <div className='btn btn-info btn-outline' onClick={onClickExport}>Export</div>
                </div>
            </div>
        </div>
    )
}