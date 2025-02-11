import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { MoveToTop } from '../utils/pageUtils'

const BlogComp = ({ item }) => {
    return (
        <div className='w-full h-fit relative text-semi-white rounded-lg shadow_auth'>
            <div className='px-4 py-3 bg-secondary text-sm rounded-t-lg flex justify-between gap-4 items-center text-lightgreen'>
                <div>{moment(item?.createdAt).format('DD-MM-yyyy')} / {moment(item?.createdAt).format('h:mm')}</div>
                <div className='flex gap-3 items-center'>
                    <div>ID: {item?.gen_id}</div>
                    <Link to={`/admin/blogs/${item.id}/${item.slug}`} onClick={MoveToTop}>
                        <button className='outline-none w-fit h-fit bg-ash py-2 px-4 text-xs rounded-md text-white font-medium'>View</button>
                    </Link>
                </div>
            </div>
            <div className='bg-primary text-sm rounded-b-lg capitalize p-4'>
                <div className='flex flex-col gap-2 overflow-hidden'>
                    <div className='flex justify-between gap-8'>
                        <span>title:</span>
                        <span>{item?.title}</span>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <span>feature:</span>
                        <span>{item?.feature}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogComp