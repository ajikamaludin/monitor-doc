import React, { useState } from 'react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'

export default function ModalReminder(props) {
    const { isOpen, toggle, onAdd } = props
    const [date, setDate] = useState('')

    const handleClickAdd = () => {
        if (date !== '') {
            toggle()
            onAdd(date)
        }
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
                    <InputLabel forInput="date" value="Tanggal" />
                    <TextInput
                        type="date"
                        name="date"
                        value={date}
                        className="mt-1 block w-full"
                        autoComplete={"false"}
                        handleChange={e => setDate(e.target.value)}
                    />
                </div>
                <div className='flex justify-center mt-4 space-x-4'>
                    <div className='btn btn-outline' onClick={handleClickAdd}>Tambah</div>
                </div>
            </div>
        </div>
    )
}