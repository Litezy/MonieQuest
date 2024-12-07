import React from 'react'

const FormButton = ({title, type="submit", onClick, className}) => {
  return (
    <button className={`bg-ash hover:bg-lightgreen text-white w-full h-fit py-3.5 text-lg rounded-xl ${className}`} type={type} onClick={onClick}>{title}</button>
  )
}

export default FormButton