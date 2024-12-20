import React, { useState } from 'react'
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";

const PasswordInputField = ({ label, onChange, value, name, placeholder, className }) => {
    const [eye, setEye] = useState(false)
    const EyeIcon = eye ? HiOutlineEye : HiOutlineEyeSlash

    return (
        <div className='flex flex-col gap-2'>
            <div className='text-sm font-medium'>{label}</div>
            <div className='relative'>
                <input className={`outline-none border border-gray-400 bg-transparent w-full h-fit py-3 px-4 lg:text-sm text-base rounded-xl ${className}`} name={name} value={value} placeholder={placeholder} onChange={onChange} type={`${eye ? 'text' : 'password'}`}></input>
                <EyeIcon className='absolute top-3.5 right-4 cursor-pointer text-light text-xl' onClick={() => setEye(!eye)} />
            </div>
        </div>
    )
}

export default PasswordInputField