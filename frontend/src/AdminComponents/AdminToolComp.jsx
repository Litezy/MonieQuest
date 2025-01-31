import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { currencySign, MoveToTop } from '../utils/pageUtils'

const AdminToolComp = ({ item }) => {
    return (
        <div className='w-full h-fit relative text-semi-white rounded-lg shadow_auth'>
            <div className='px-4 py-3 bg-secondary text-sm rounded-t-lg flex justify-between gap-4 items-center text-lightgreen'>
                <div>{moment(item.createdAt).format('DD-MM-yyyy')} / {moment(item.createdAt).format('h:mm')}</div>
                <div className='flex gap-3 items-center'>
                    <div>ID: {item.gen_id}</div>
                    <Link to={`/admin/profit_tools/${item.id}/${item.title}`} onClick={MoveToTop} >
                        <button className='outline-none w-fit h-fit bg-ash py-2 px-4 text-xs rounded-md text-white font-medium'>View</button>
                    </Link>
                </div>
            </div>
            <div className='bg-primary grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-2 text-sm rounded-b-lg capitalize md:p-0 p-4'>
                <div className='flex flex-col gap-2 md:p-4 overflow-hidden'>
                    <div className='flex justify-between gap-4'>
                        <span>title:</span>
                        <span>{item.title}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>category:</span>
                        <span>{item.category}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>price:</span>
                        <span>{currencySign[1]}{item.price.toLocaleString()}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:p-4 md:border-l border-gray-800 overflow-hidden'>
                    <div className='flex justify-between gap-4'>
                        <span>discount:</span>
                        <span>{item.discount > 0 ? <span>{item.discount}%</span> : 'n/a'}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>link:</span>
                        <a href={item.link}>{item.link}</a>
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

export default AdminToolComp