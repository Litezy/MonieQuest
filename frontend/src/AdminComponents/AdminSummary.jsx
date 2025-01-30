import React from 'react'

const AdminSummary = ({title,data,color,item}) => {
    return (
        <div className="shadow-md rounded-e-xl h-32 mb-5 bg-primary">
            <div className={`w-full ${item? item.color : color} rounded-lg h-1/2  flex font-bold px-3  items-center justify-center`}>
                <h1 className='text-base lg:text-lg'>{item ? item.title:title}</h1>
            </div>
            <div className="h-1/2 flex items-center text-base lg:text-lg font-bold justify-center">{item ? item.value : data}</div>
         </div>
      )
}

export default AdminSummary