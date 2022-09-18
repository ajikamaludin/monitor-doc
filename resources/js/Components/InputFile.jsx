import React from "react";


export default function InputFile({ file, isError, inputRef, handleChange }) {
    return (
        <div className="btn-group w-full">
            <input
                readOnly={true}
                className={`input input-bordered w-full ${
                    isError && 'input-error'
                }`}
                value={file ? file.name : ''}
            />
            <div 
                className="btn btn-active w-1/6"
                onClick={() => {
                    console.log(inputRef.current.click())
                }}
            >
                Pilih File
            </div>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                name="document"
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}