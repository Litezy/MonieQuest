import React from 'react'

const AdminSummary = ({ item }) => {
    return (
        <div className="shadow-md rounded-e-xl rounded-tl-lg h-32 w-full mb-5 bg-primary">
            <div className={`w-full ${item?.color} rounded-lg h-1/2  flex font-bold px-3  items-center justify-center`}>
                <h1 className='text-base lg:text-lg capitalize'>{item?.title}</h1>
            </div>
            <div className="h-1/2 flex items-center text-base lg:text-lg font-bold justify-center">{item?.value}</div>
        </div>
    )
}

export default AdminSummary