import React, { useEffect, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { CiLink } from "react-icons/ci";
import { IoChevronForwardSharp } from "react-icons/io5";
import FormInput from '../../utils/FormInput';
import Comments from '../../GeneralComponents/Comments';
import { useParams } from 'react-router-dom';
import { Apis, GetApi, imageurl } from '../../services/API';
import avatar from '../../assets/images/avatar.svg'
import moment from 'moment';

const parapgraphs = [
    `Main header`,
    `First paragraph`,
    `Second paragraph`,
    `Extras paragraph`,
    `Conclusion`,
]

const SingleBlog = () => {
    const { feature, id } = useParams()
    const [singleBlog, setSingleBlog] = useState({})
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        const FetchSingleBlog = async () => {
            try {
                const response = await GetApi(`${Apis.admin.single_blog}/${id}`)
                if (response.status === 200) {
                    setSingleBlog(response.msg)
                }

            } catch (error) {
                //
            } finally {
                setDataLoading(false)
            }
        }
        FetchSingleBlog()
    }, [])

    return (
        <PageLayout>
            <div className='w-full bg-dark py-10 text-white'>
                {dataLoading ?
                    <div className='w-11/12 mx-auto'>
                        <div className='flex items-start gap-5 flex-col lg:flex-row animate-pulse'>
                            <div className='flex flex-col gap-16 lg:w-[30%] w-full p-2'>
                                <div className='w-full h-52 bg-slate-500 rounded-xl'></div>
                                <div className='flex flex-col gap-6'>
                                    <div className='bg-slate-500 w-52 h-4 rounded-full'></div>
                                    <div className='flex flex-col gap-4'>
                                        {new Array(4).fill(0).map((_, i) => (
                                            <div key={i} className='w-36 h-2 bg-slate-500 rounded-full'></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[70%] w-full'>
                                <div className='flex justify-between w-full'>
                                    <div className='flex gap-2'>
                                        <div className='w-10 h-10 rounded-full bg-slate-500'></div>
                                        <div className='flex flex-col gap-2.5'>
                                            <div className='w-28 h-2 bg-slate-500 rounded-full'></div>
                                            <div className='w-36 h-1.5 bg-slate-500 rounded-full'></div>
                                            <div className='w-32 h-1.5 bg-slate-500 rounded-full'></div>
                                        </div>
                                    </div>
                                    <CiLink className='text-3xl cursor-pointer text-sky-400' />
                                </div>
                                <div className='mt-8 flex gap-2 items-center'>
                                    <div className='w-14 h-1.5 bg-slate-500 rounded-full'></div>
                                    <IoChevronForwardSharp className='text-slate-500' />
                                    <div className='w-14 h-1.5 bg-slate-500 rounded-full'></div>
                                </div>
                                <div className='flex flex-col gap-16 mt-16'>
                                    {new Array(2).fill(0).map((_, i) => (
                                        <div key={i} className='flex flex-col gap-5'>
                                            <div className='w-48 h-4 bg-slate-500 rounded-full'></div>
                                            <div className='flex flex-col gap-2'>
                                                {new Array(8).fill(0).map((_, i) => (
                                                    <div key={i} className='w-full h-0.5 rounded-full bg-slate-500'></div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="w-11/12 mx-auto">
                        <div className="w-full flex items-start gap-6 flex-col lg:flex-row">
                            <div className="lg:w-[30%] w-full">
                                <div className="flex items-start flex-col gap-20">
                                    <img src={`${imageurl}/blogs/${singleBlog?.image}`} alt="blog image" className="w-full rounded-xl max-h-52 object-cover " />
                                    <div className="w-full flex items-start flex-col gap-2">
                                        <div className="poppins font-bold text-2xl">Table of contents</div>
                                        {parapgraphs.map((item, i) => {
                                            return (
                                                <div key={i} className={`cursor-pointer hover:text-lightgreen mont `}>{item}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-[70%] w-full">
                                <div className="flex items-start w-full justify-between">
                                    <div className="flex items-start gap-2">
                                        <img src={singleBlog?.blog_user?.image ? `${imageurl}/profiles/${singleBlog?.blog_user?.image}` : avatar} alt="blog" className=" rounded-full h-10 w-10 object-cover " />
                                        <div className="flex items-start flex-col gap-1 text-sm">
                                            <div className="mont capitalize">{singleBlog?.blog_user?.first_name} {singleBlog?.blog_user?.surname}</div>
                                            <div className="text-xs text-gray-400">Updated on {moment(singleBlog?.updatedAt).format('D MMM YYYY')}</div>
                                            <div className="text-xs text-gray-400">Written on {moment(singleBlog?.createdAt).format('D MMM YYYY')}</div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <CiLink className='text-3xl cursor-pointer text-sky-400' />
                                    </div>
                                </div>
                                <div className="mt-5 text-sky-400 text-sm flex items-center gap-2">
                                    <div className="">blogs</div>
                                    <div className=""><IoChevronForwardSharp /></div>
                                    <div className=" lowercase">{singleBlog?.feature}</div>
                                </div>
                                <div className="flex items-start poppins flex-col gap-16 mt-14 text-gray-400">
                                    <div className='flex flex-col gap-2 items-start'>
                                        <div className="text-[1.8rem] leading-[33px] font-bold poppins text-white"> Main Header</div>
                                        <div className="">{singleBlog?.main_header}</div>
                                    </div>
                                    <div className="flex items-start gap-2 flex-col">
                                        <div className="text-white font-bold leading-[33px] text-2xl poppins ">First Paragragh</div>
                                        <div className="">{singleBlog?.first_paragraph}</div>
                                    </div>
                                    <div className="flex items-start gap-2 flex-col">
                                        <div className="text-white font-bold leading-[33px] poppins  text-2xl">Second Paragraph.</div>
                                        <div className="">{singleBlog?.second_paragraph}</div>
                                    </div>
                                    <div className="flex items-start gap-2 flex-col">
                                        <div className="text-white font-bold leading-[33px] poppins  text-2xl">extras</div>
                                        <div className="">{singleBlog?.extras}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 flex-col my-5">
                            <div className="text-white font-bold leading-[33px] text-2xl poppins ">Conclusion</div>
                            <div className="text-gray-400 poppins">{singleBlog?.conclusion}</div>
                        </div>

                        <div className="w-full my-10">
                            <div className="mont text-lg font-bold mb-5 ">Comments</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                                {new Array(5).fill(0).map((_, i) => {
                                    return (
                                        <Comments feature={feature} key={i} i={i} param={id} />
                                    )
                                })}
                            </div>
                        </div>
                        <form className="w-full p-3 rounded-md bg-primary">
                            <div className="text-lg mont">Leave a comment</div>
                            <div className="flex mt-4 flex-col gap-4 w-full lg:w-3/4">
                                <div className="flex items-center flex-col lg:flex-row gap-5">
                                    <div className="w-full">
                                        <FormInput label={`Username`} />
                                    </div>
                                    <div className="w-full">
                                        <FormInput label={`Email Address`} type='email' />
                                    </div>
                                </div>
                                <div className="w-full flex-col  flex items-start gap-2">
                                    <div className="text-base">Comment</div>
                                    <textarea
                                        className=' resize-y w-full max-h-52 min-h-20 p-2 rounded-md bg-primary' placeholder='enter your comment'
                                        name="" id=""></textarea>
                                </div>
                                <div className="w-1/2 flex items-center justify-center ml-auto">
                                    <button className='w-full bg-ash hover:bg-ash/90 rounded-md py-2'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </PageLayout>
    )
}

export default SingleBlog