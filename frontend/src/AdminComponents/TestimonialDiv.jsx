import React from 'react'
import { imageurl } from '../services/API'
import { FaQuoteLeft,FaQuoteRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const TestimonialDiv = ({ item }) => {
    return (
        <div className='w-full max-h-72 h-72 border border-primary rounded-md p-2'>
            <div className="flex items-center gap-2 w-full">
                <img src={`${imageurl}/testimonials/${item.gen_id}/${item.image}`} alt={`${item.firstname} image`}
                    className='w-20 h-20 rounded-full' />
                <div className="flex flex-col gap-2">
                    <div className="">{item.firstname} {item.lastname}</div>
                    <div className="px-3 py-1 rounded-md bg-primary">{item.title}</div>
                </div>
                <div className="w-fit ml-auto">
                    <Link to={`/admin/testimonials/${item.id}`} className='px-4 rounded-md py-1 bg-lightgreen'>Edit</Link>
                </div>
            </div>
            <div className="mt-5 w-11/12 mx-auto relative">
                <div className="absolute top-0 left-0"><FaQuoteLeft/></div>
                <div className="px-5 mx-auto">Earning and growing money in the digital space can be complicated, but MonieQuest makes it straightforward. I love how it brings together different productivity tools and opportunities in one place. Definitely worth checking out!</div>
                <div className="absolute bottom-0 right-0"><FaQuoteRight/></div>
            </div>
        </div>
    )
}

export default TestimonialDiv