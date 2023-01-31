import React, { useRef } from 'react'
import { useForm } from '@inertiajs/react'

export default function ModalImport(props) {
    const { modalState } = props
    
    const { data, setData, post, progress, errors, clearErrors } = useForm({
        file: null,
    });

    const inputFileImport = useRef();

    const handleReset = () => {
        setData({file: null});
        inputFileImport.current.value = ""
        clearErrors();
    };

    const handleCancel = () => {
        modalState.toggle()
        handleReset();
    };

    function handleSubmit(e) {
        e.preventDefault();
        post(route("docs.import"), {
            forceFormData: false,
            onSuccess: () => Promise.all([handleReset(), modalState.toggle()]),
        });
        return;
    }

    return (
        <div
            className="modal modal-bottom sm:modal-middle pb-10"
            style={
                modalState.isOpen
                    ? {
                        opacity: 1,
                        pointerEvents: 'auto',
                        visibility: 'visible',
                    }
                    : {}
            }
        >
            <div className="modal-box">
                <h1 className="font-bold text-2xl pb-8">Import</h1>
                
                <div className='flex flex-row items-center gap-2'>
                    <div
                        className={`btn ${
                            errors.photo && 'input-error'
                        }`}
                        onClick={() => {
                            console.log(inputFileImport.current.click())
                        }}
                    >Pilih File: </div>
                    <div>
                        {data.file ? data.file.name : 'Pilih File'}
                    </div>
                </div>
                
                <input
                    ref={inputFileImport}
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                        setData("file", e.target.files[0])
                    }
                />
                {progress && (
                    <progress className='progress' value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                <div>
                    {errors.file}
                </div>
                <p>
                    Unduh format file import{" "}
                    <a
                        className="underline text-blue-500"
                        href="/sample-import.csv"
                    >
                        disini
                    </a>
                </p>
                <div className='flex justify-between mt-4 space-x-4'>
                    <div className='btn' onClick={handleSubmit}>Upload</div>
                    <div className='btn btn-outline' onClick={handleCancel}>Batal</div>
                </div>
            </div>
        </div>
    )
}