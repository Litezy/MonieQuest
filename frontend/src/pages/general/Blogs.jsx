import React, { useEffect, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { GiArrowScope } from "react-icons/gi";
import BlogDiv from '../../GeneralComponents/BlogDiv';
import { Link } from 'react-router-dom';



const Blogs = () => {



    return (
        <PageLayout>
            <div className='pb-20 bg-dark w-full text-gray-200'>
                <div className='pageBg'>
                    <div className='w-full h-full bg-[#212134ea] py-10'>
                        <div className='md:text-4xl text-3xl capitalize font-bold text-white text-center'>crypto blog news</div>
                    </div>
                </div>
                <div className="w-11/12 mx-auto my-10 poppins">
                    <div className="flex items-center gap-5 w-11/12 lg:w-1/2 ">
                        <div className="text-xl"><GiArrowScope /></div>
                        <div className="text-lg">Latest articles on Airdrops</div>
                        <Link
                        to={`/blogs/airdrops`}
                        className="w-fit px-4 ml-auto lg:ml-0 text-xl">view all</Link>
                    </div>
                    <div className="mt-3 w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                        {new Array(6).fill(0).map((item,i) =>{
                            const isEven = i % 2 === 0
                            return (
                                <BlogDiv feat={`airdrops`} key={i} item={item} i={i} isEven={isEven}/>
                            )
                        })}
                    </div>
                </div>
                <div className="w-11/12 mx-auto my-20 poppins">
                    <div className="flex items-center gap-5 w-11/12 lg:w-1/2 ">
                        <div className="text-xl"><GiArrowScope /></div>
                        <div className="text-lg">Latest articles on Trading</div>
                        <Link
                        to={`/blogs/trading`}
                        className="w-fit px-4 ml-auto lg:ml-0 text-xl">view all</Link>
                    </div>
                    <div className="mt-3 w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                        {new Array(8).fill(0).map((item,i) =>{
                            const isEven = i % 2 === 0
                            return (
                                <BlogDiv feat={`trading`} key={i} item={item} i={i} isEven={isEven}/>
                            )
                        })}
                    </div>
                </div>
                <div className="w-11/12 mx-auto my-10 poppins">
                    <div className="flex items-center gap-5 w-11/12 lg:w-1/2 ">
                        <div className="text-xl"><GiArrowScope /></div>
                        <div className="text-lg">Latest on Personal Finances</div>
                        <Link
                        to={`/blogs/personal_finance`}
                        className="w-fit px-4 ml-auto lg:ml-0 text-xl ">view all</Link>
                    </div>
                    <div className="mt-3 w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                        {new Array(6).fill(0).map((item,i) =>{
                            const isEven = i % 2 === 0
                            return (
                                <BlogDiv feat={`personal_finance`} key={i} item={item} i={i} isEven={isEven}/>
                            )
                        })}
                    </div>
                </div>
            </div >
        </PageLayout >
    )
}

export default Blogs