import React, { useEffect, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { FaReply, FaUser } from 'react-icons/fa6'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useParams, } from 'react-router-dom';
import { PiChatTeardropTextFill } from 'react-icons/pi';

const SingleComment = () => {
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
                        <div className="flex items-start gap-40 lg:gap-52 w-full">
                            <div className="flex items-start  gap-2">
                                <div className="p-2 rounded-full bg-white ">
                                    <FaUser className='text-primary text-2xl' />
                                </div>
                                <div className="flex items-start flex-col  text-base">
                                    <div className="text-white font-bold lg:text-xl">Basir ahmed</div>
                                    <div className="text-xs text-gray-500">11 min ago</div>
                                </div>
                            </div>
                            <div onClick={() => setReply(prev => !prev)} className="flex cursor-pointer items-center gap-2 bg-ash rounded-md px-3 py-1 ">
                                <FaReply />
                                <div className="">reply</div>
                            </div>
                        </div>
                        <div className="poppins mt-2">This is the actual comment. It's can be long or short. And must contain only text information.</div>
                        {reply && <div className="flex items-start mt-5 flex-col gap-3 w-full poppins">
                            <div className="text-lg font-bold  ">New Reply</div>
                            <div className="flex items-start lg:flex-row w-full lg:gap-5 gap-3">
                                <div className=""><PiChatTeardropTextFill className='text-3xl text-ash' /></div>
                                <textarea
                                    className=' resize-y w-full lg:w-1/2 max-h-52 min-h-20 p-2 rounded-md bg-primary' placeholder='enter your reply'
                                    name="" id=""></textarea>
                            </div>
                            <div className="w-full lg:w-1/2 flex items-center justify-center gap-3">
                                <button onClick={() => setReply(false)} className='w-full bg-gray-600 hover:bg-gray-700 rounded-md py-2'>Cancel</button>
                                <button className='w-full bg-ash hover:bg-ash/90 rounded-md py-2'>Reply</button>
                            </div>
                        </div>}
                        <div className="mt-10 mb-5 poppins font-bold text-xl ">All replies</div>
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

export default SingleComment