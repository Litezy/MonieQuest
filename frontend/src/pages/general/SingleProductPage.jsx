import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { Link, useParams } from 'react-router-dom'
import { IoCart } from 'react-icons/io5'
import { FaCheckCircle } from 'react-icons/fa'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MoveToTop } from '../../utils/pageUtils'
import Rating from '@mui/material/Rating';
import testimg from '../../assets/images/pdt.jpg'



const SingleProductPage = () => {
    const localName = 'products'
    const localData = JSON.parse(localStorage.getItem(localName))
    const { id } = useParams()
    const [rating, setRating] = useState(1)
    const [submit, setSubmit] = useState(false)
    const [singleProduct, setSingleProduct] = useState({})
    const [dataLoading, setDataLoading] = useState(true)

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)


    // const AddToCart = () => {
    //     const findIfCartExist = localData.find((ele) => ele.id === singleProduct.id);
    //     if (!findIfCartExist) {
    //         const currentData = JSON.parse(localStorage.getItem(localName))
    //         currentData.push(singleProduct)
    //         localStorage.setItem(localName, JSON.stringify(currentData))
    //     }
    // };

    const CartButton = () => {
        const exists = localData.some(ele => ele.id === parseInt(id))
        return exists ? (
            <span>Added to Cart</span>
        ) : (
            <>
                <IoCart className="text-lg" />
                <span>Add to Cart</span>
            </>
        );
    }

    return (
        <PageLayout>
            <div className='w-full bg-dark py-20'>
                <div className='w-11/12 mx-auto text-gray-200'>
                    {dataLoading ?
                        <div className='flex flex-col gap-6'>
                            <div className='flex md:flex-row md:justify-between flex-col gap-6 md:items-end'>
                                <div className='flex flex-col gap-4'>
                                    <div className='w-48 h-4 rounded-full bg-slate-400 animate-pulse'></div>
                                    <div className='flex gap-2 items-center'>
                                        <div className='w-16 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                        <div className='text-slate-400'>/</div>
                                        <div className='w-16 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <Rating
                                        value={5}
                                        readOnly
                                    />
                                    <div className='w-60 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
                                <div className='flex flex-col gap-4'>
                                    <div className='w-full md:h-96 h-60 bg-slate-400 animate-pulse'></div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='w-full h-96 bg-slate-400 animate-pulse'></div>
                                        <div className='flex justify-between gap-4'>
                                            <div className='w-56 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                            <div className='w-28 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                        </div>
                                    </div>
                                    <div className='w-full h-28 bg-slate-400 animate-pulse'></div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex flex-col gap-6'>
                            <div className='flex md:flex-row md:justify-between flex-col gap-6 md:items-end'>
                                <div className='flex flex-col gap-4'>
                                    <div className='capitalize text-3xl font-extrabold'>playwrite</div>
                                    <div className='capitalize text-sm flex gap-2'><span>fonts</span> <span>/</span><span>playwrite font</span></div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Rating
                                        value={5}
                                        readOnly
                                    />
                                    <div>Score of 5.0 based on 3 reviews</div>
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
                                <div className='w-full md:h-96 h-60'>
                                    <img src={testimg} alt={singleProduct.image} className='w-full h-full object-cover' />
                                </div>
                                <div>
                                    <div className='bg-primary border border-ash w-full h-fit p-5 flex flex-col gap-4'>
                                        <div className='flex gap-4 items-center'>
                                            <span className='text-sm text-red-600'>-30%</span>
                                            <div className='flex gap-2 items-end'>
                                                <span className='text-3xl font-bold'>$3.00</span>
                                                <span className='line-through text-sm'>$6.00</span>
                                            </div>
                                        </div>
                                        <div className='text-sm'>Playwrite is a lovely signature font that boasts sophisticated charm with its delicate curves and flowing lines. Ideal for enhancing the elegance of wedding invites, crafts design, logotype, print design, social media graphics, or branding materials.</div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='uppercase font-bold'>key features:</div>
                                            <div className='flex gap-2'>
                                                <FaCheckCircle className='text-lightgreen text-lg' />
                                                <span>Include this font</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <FaCheckCircle className='text-lightgreen text-lg' />
                                                <span>Unlimited access to hundreds of fonts</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <FaCheckCircle className='text-lightgreen text-lg' />
                                                <span>New fonts added daily</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <FaCheckCircle className='text-lightgreen text-lg' />
                                                <span>Get 10 downloads 100% free</span>
                                            </div>
                                        </div>
                                        <div className='flex justify-end'>
                                            <button className='outline-none w-fit h-fit flex gap-2 items-center justify-center py-3 px-14 bg-lightgreen uppercase text-sm font-extrabold rounded-[4px] text-ash tracking-wider'>
                                                {CartButton()}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-3 flex justify-between gap-4 text-xs'>
                                        <div className='flex gap-1'>
                                            <span>Listed on Dec 18, 2024</span>
                                            <span>- ID 109875639</span>
                                        </div>
                                        <Link to='/contact' onClick={MoveToTop} className='text-xs underline capitalize'>report problem</Link>
                                    </div>
                                    <div className='bg-primary border border-ash w-full h-fit p-5 mt-4'>
                                        <div className='grid grid-cols-2 items-center'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='text-xl font-bold'>Reviews</div>
                                                <Rating
                                                    value={rating}
                                                    onChange={(event, newValue) => {
                                                        setRating(newValue);
                                                    }}
                                                />
                                            </div>
                                            <button className='outline-none w-fit h-fit flex gap-1 items-center justify-center py-3 px-8 bg-ash uppercase text-sm font-bold rounded-[4px] text-white tracking-widest relative' onClick={() => { console.log(rating); setSubmit(true) }}>
                                                <span>{submit ? 'submitted' : 'submit'}</span>
                                                <IoCheckmarkDoneCircle />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default SingleProductPage