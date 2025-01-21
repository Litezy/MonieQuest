import React, { useState } from 'react'
import ProfitToolsLayout from '../../AuthComponents/ProfitToolsLayout'
import moment from 'moment';
import { SlSocialDropbox } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const ProfitTools = () => {
    const [dataLoading, setDataLoading] = useState(true)
    const [allTools, setAllTools] = useState([
        {
            gen_id: '123456789',
            title: 'acrobat',
            catgory: 'AI assistant',
            price: 100,
            link: 'https://app.gradient.network',
            contact_details: '09011234567',
            status: 'approved'
        },
        {
            gen_id: '123456789',
            title: 'playwrite',
            catgory: 'font',
            price: 20,
            link: 'https://app.gradient.network',
            contact_details: '09011234567',
            status: 'rejected'
        }
    ])

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)

    return (
        <ProfitToolsLayout>
            <div className='w-11/12 mx-auto'>
                <div className='mt-16'>
                    {dataLoading ?
                        <div className='w-full h-fit'>
                            <div className='h-11 bg-slate-600 animate-pulse rounded-t-lg'></div>
                            <div className='md:h-24 h-40 bg-slate-500 animate-pulse rounded-b-lg'></div>
                        </div>
                        :
                        <>
                            {allTools.length > 0 ?
                                <>
                                    <div className='flex flex-col gap-4'>
                                        {allTools.map((item, i) => (
                                            <div key={i} className='w-full h-fit relative text-semi-white rounded-lg shadow_auth'>
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
                                                            <span className={`${item.status === 'approved' && 'text-lightgreen'} ${item.status === 'rejected' && 'text-red-500'}`}>{item.status}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                                :
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <SlSocialDropbox className='text-4xl' />
                                    <div>no records found...</div>
                                    <div className='mt-2'>You can create a profit tool in minutes <Link to='/user/profit_tools/create' className='text-lightgreen'>here</Link></div>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </ProfitToolsLayout>
    )
}

export default ProfitTools