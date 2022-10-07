import { useState, useEffect } from 'react'

interface FormFieldProps{
    htmlFor: string,
    placeholder: string,
    type?: string,
    value: any,
    onChange?: (...args: any) => any, 
    error?: string
}

export function FormField({
    htmlFor,
    placeholder,
    type="text",
    value,
    onChange = () => {},
    error = ""
}: FormFieldProps ){
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])

    return<>
        <div className='relative'>
            <input onChange = {e => {
                onChange(e)
                setErrorText('')
            }} placeholder={placeholder} type={type} id={htmlFor} name={htmlFor} className="bg-gray-100 outline-none text-sm flex-1" value={value} />
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full absolute mt-4">
                {errorText || ''}
            </div>
        </div>
    </>
}