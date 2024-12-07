import React from 'react'

const FormInput = ({ formtype = 'text', label, type = 'text', value, name, placeholder, className, onChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-sm font-medium'>{label}</div>
      {formtype === 'text' && <input className={`outline-none border border-gray-400 bg-transparent w-full h-fit py-3 px-4 lg:text-sm text-base rounded-xl ${className}`} name={name} value={value} placeholder={placeholder} onChange={onChange} type={type} ></input>}
      {formtype === 'textarea' && <textarea type={type} className={`border h-32 border-gray-400 bg-transparent outline-none lg:text-sm text-base w-full rounded-xl py-3 px-4 ${className}`} placeholder={placeholder} ></textarea>}
    </div>
  )
}

export default FormInput