import React, { useEffect, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { FaUser } from 'react-icons/fa6'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useParams, } from 'react-router-dom';

const BlogComments = () => {
    const { feature, id } = useParams()
    const [reply, setReply] = useState(false)

    return (
        <PageLayout>
            <div className='py-1 bg-dark w-full text-white '>
                <div className="w-11/12 mx-auto">
                    <div className="w-full  p-5 rounded-md ">
                        <Link to={`/blogs/${feature}/${id}`}
                            className="flex mb-5 w-fit px-4 py-1 rounded-2xl items-center gap-2 bg-ash">
                            <FaLongArrowAltLeft
                                className='text-white text-2xl ' />
                            <div className="">back</div>
                        </Link>
                        <div className="mt-10 mb-5 poppins font-bold text-xl ">All Comments</div>
                        <div className="ml-5 lg:ml-10">
                            {new Array(5).fill(0, 1, 5).map((_, j) => {
                                return (
                                    <div className="mb-5 w-full">
                                        <div className="flex items-start  gap-2">
                                            <div className="p-2 rounded-full bg-white ">
                                                <FaUser className='text-primary text-2xl' />
                                            </div>
                                            <div className="flex items-start flex-col  text-base">
                                                <div className="text-white font-bold lg:text-xl">Basir ahmed</div>
                                                <div className="text-xs text-gray-500">11 min ago</div>
                                            </div>
                                        </div>
                                        <div className="poppins mt-2 text-gray-400">This is the actual comment. It's can be long or short. And must contain only text information.</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default BlogComments