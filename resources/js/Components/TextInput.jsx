import React, { useEffect, useRef } from 'react';

export default function TextInput({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    isError,
    readOnly = false,
    placeholder = '',
    onKeyDown = () => {},
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    if (type === "textarea") {
        return (
            <textarea 
                className={`
                    ${isError ? ' textarea-error ' : ''}
                    textarea textarea-bordered ${className}
                `}
                required={required}
                onChange={(e) => handleChange(e)}
                value={value}
                name={name}
                readOnly={readOnly}
            >
            </textarea>
        )
    }
    return (
        <div className="flex flex-col items-start px-1">
            <input
                type={type}
                name={name}
                value={value}
                className={`
                    ${isError ? ' input-error ' : ''}
                    input input-bordered w-full ${className}
                `}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                readOnly={readOnly}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}
