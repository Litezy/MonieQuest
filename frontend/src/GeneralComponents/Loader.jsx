import React from 'react'

const Loader = ({ title }) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-50 flex flex-col gap-1 items-center justify-center bg-dark/30 backdrop-blur-sm">
      <div className='loader2 min-h-2 scrollHide'></div>
      {title && <div className='text-white'>...{title}</div>}
    </div>
  )
}

export default Loader