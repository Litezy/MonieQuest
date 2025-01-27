import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import img1 from '../assets/images/blog1.jpg'
import img2 from '../assets/images/blog2.jpg'
import { Link, useParams } from 'react-router-dom';
import { PiArrowUpRight } from "react-icons/pi";

const BlogDiv = ({ item, isEven,i,feat }) => {

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 2000)
    })
    return (
        <div className='w-full bg-black rounded-xl p-2'>
            {loading ? <div className={`w-full animate-pulse`}>
                <div className=" bg-gray-500 h-40 rounded-xl  w-full">

                </div>
                <div className="mt-2 flex items-start flex-col gap-3  ">
                    <div className=" rounded-sm h-3 w-1/2  bg-gray-500"></div>
                    <div className="h-10 bg-gray-500 w-full"></div>
                    <div className="flex items-center gap-2 w-full ">
                        <div className="bg-gray-500 h-10 w-12 rounded-full"></div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="bg-gray-500 w-1/2 h-3"></div>
                            <div className="bg-gray-500 w-1/2 h-3"></div>
                        </div>
                    </div>
                </div>
            </div> :
                <Link to={`/blogs/${feat}/${i+1}`} className={`w-full`}>
                    <div className="   w-full">
                        <img src={isEven ? img1 : img2} alt="blog" className="w-full rounded-xl max-h-40 object-cover " />
                    </div>
                    <div className="mt-2 flex items-start flex-col gap-3">
                        <div className="text-sm text-gray-400">Airdrop article</div>
                        <div className="lg:flex items-center gap-3  text-sky-400">
                            <div className=" text-sm  lg:w-3/4">Quick Guide: How to Check Your Walmart Gift Card Balance</div>
                            <PiArrowUpRight className='text-lg hidden lg:block' />
                        </div>
                        <div className="flex items-center gap-2 w-full ">
                            <div className=""><FaUser className='text-2xl text-white' /></div>
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="font-bold">Basit Michael</div>
                                <div className="text-xs">03 Dec 2024</div>
                            </div>
                        </div>
                    </div>
                </Link>}
        </div>
    )
}

export default BlogDiv