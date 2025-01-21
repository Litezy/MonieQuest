import moment from 'moment'
import React from 'react'

const ToolComp = ({item}) => {
    return (
        <div className='w-full h-fit relative text-semi-white rounded-lg shadow_auth'>
            <div className='p-4 bg-secondary text-sm font-medium rounded-t-lg flex justify-between gap-4'>
                <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mm')}</div>
                <div>ID: {item.gen_id}</div>
            </div>
            <div className='bg-primary grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-xs rounded-b-lg capitalize md:p-0 p-4'>
                <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                    <div className='flex justify-between gap-4'>
                        <span>title:</span>
                        <span>{item.title}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>category:</span>
                        <span>{item.catgory}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>price:</span>
                        <span>${item.price.toLocaleString()}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-800 overflow-hidden'>
                    <div className='flex justify-between gap-4'>
                        <span>link:</span>
                        <span>{item.link}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>contact details:</span>
                        <span>{item.contact_details}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>status:</span>
                        <span className={`${item.status === 'approved' ? 'text-green-400' : item.status === 'declined' ? 'text-red-500' : 'text-yellow-300'}`}>{item.status}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolComp