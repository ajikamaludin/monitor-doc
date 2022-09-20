import React, { useEffect, useState } from 'react'
import TextInput from '@/Components/TextInput'
import { validateEmail } from '@/utils'
import { toast } from 'react-toastify'
import { Inertia } from '@inertiajs/inertia'

export default function ModalShare(props) {
    const { isOpen, toggle, modalState } = props
    const [shareTo, setShareTo] = useState('')
    const [shares, setShares] = useState([])

    const handleKeyEnter = (e) => {
        if(e.code === 'Enter') {
            if(validateEmail(shareTo)){
                setShares(shares.concat({'share_to': shareTo}))
                setShareTo('')
            } else {
                toast.error('not valid email')
            }
        }
    }

    const removeItem = (index) => {
        setShares(shares.filter((_, i) => i !== index))
    }

    const handleClickShare = () => {
        if (shareTo != '') {
            toast.info('please press enter on form email')
            return
        }
        Inertia.post(route('docs.share', modalState.data), {
            shares: shares
        }, {
            onSuccess: () => toggle()
        })
    }

    useEffect(() => {
        if(modalState.data != null) {
            setShares(modalState.data.shares) //[{ user_id:'', 'share_to': ''}]
        }
    }, [modalState.data])

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
                <div className='mt-4'>
                    <TextInput
                        type="text"
                        name="share_to"
                        placeholder="email"
                        value={shareTo}
                        className="mt-1 block w-full"
                        autoComplete={"false"}
                        handleChange={e => setShareTo(e.target.value)}
                        onKeyDown={handleKeyEnter}
                    />
                </div>
                <div className='py-4'>
                    <div className="flex flex-wrap">
                        {shares.map((share, index) => (
                            <div className="card shadow-md rounded-xl bg-slate-400 m-1" key={`share-${index}`}>
                                <span className='flex items-center px-2 py-1'>
                                    <p className='pr-1'>
                                        {share.share_to}
                                    </p>
                                    <div className='btn btn-xs btn-circle' onClick={() => removeItem(index)}>x</div>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex justify-between mt-4 space-x-4'>
                    <div className='btn btn-outline' onClick={handleClickShare}>Bagikan</div>
                    <div className='btn btn-outline' onClick={toggle}>Batal</div>
                </div>
            </div>
        </div>
    )
}