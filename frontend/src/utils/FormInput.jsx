import React from 'react'

const FormInput = ({ formtype = 'text', border = true, label, type = 'text', read = false, value, name, placeholder, className, onChange, onKeyUp }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-base font-medium'>{label}</div>
      {formtype === 'text' && <input readOnly={read ? true : false} className={`outline-none focus-within:outline-none focus:outline-none focus:ring-0 focus:border-gray-400 focus:border ${border ? 'border border-gray-400' : 'border-none'} bg-transparent w-full h-fit py-3 px-4 lg:text-sm text-base rounded-xl ${className}`} name={name} value={value} placeholder={placeholder} autoComplete={name} onChange={onChange} type={type} onKeyUp={onKeyUp} ></input>}


      {formtype === 'email' && <input className={`outline-none focus-within:outline-none focus:outline-none focus:ring-0 focus:border-gray-400 focus:border ${border ? 'border border-gray-400' : 'border-none'} bg-transparent w-full h-fit py-3 px-4 lg:text-sm text-base rounded-xl ${className}`} name={name} value={value} placeholder={placeholder} autoComplete={name} onChange={onChange} type={'email'} onKeyUp={onKeyUp} ></input>}

      {formtype === 'password' && <input className={`outline-none focus-within:outline-none focus:outline-none focus:ring-0 focus:border-gray-400 focus:border ${border ? 'border border-gray-400' : 'border-none'} bg-transparent w-full h-fit py-3 px-4 lg:text-sm text-base rounded-xl ${className}`} name={name} value={value} placeholder={placeholder} autoComplete={name} onChange={onChange} type={`password`} onKeyUp={onKeyUp} ></input>}


      {formtype === 'number' && <input className={`outline-none border border-gray-40 bg-transparent w-full  py-2 px-2 lg:text-base text-[1.2rem]  rounded-xl ${className}`} name={name} value={value} placeholder={placeholder} onChange={onChange} type={'number'} onKeyUp={onKeyUp} ></input>}

      {formtype === 'textarea' && <textarea type={`text`} autoComplete={name} name={name} value={value} onChange={onChange} className={`outline-none focus-within:outline-none  focus:outline-none focus:ring-0 focus:border-gray-400 focus:border border border-gray-400 bg-transparent lg:text-sm text-base w-full h-32 rounded-xl py-3 px-4 resize-none scrollHide ${className}`} placeholder={placeholder} ></textarea>}
    </div>
  )
}

export default FormInput