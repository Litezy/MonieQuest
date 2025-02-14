import React from 'react'

const ButtonLoader = ({ className }) => {
    return (
        <div className={`w-full h-full absolute top-0 left-0  flex items-center justify-center bg-[#1415238a] z-20 ${className}`}>
            <div className="button_loader"></div>
        </div>
    )
}

export default ButtonLoader