import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { Link, useParams } from 'react-router-dom'
import testimg from '../../assets/images/pdt.jpg'
import { IoCart } from 'react-icons/io5'
import { FaCheckCircle } from 'react-icons/fa'
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MoveToTop } from '../../utils/pageUtils'
import Rating from '@mui/material/Rating';

const SingleProductPage = () => {
    const { id } = useParams()
    const [track, setTrack] = useState(0)
    const [rating, setRating] = useState(1)
    const [submit, setSubmit] = useState(false)
    // console.log(id)

    return (
        <PageLayout>
            <div className='w-full bg-dark py-20'>
                <div className='w-11/12 mx-auto text-gray-200'>
                    <div className='flex md:flex-row md:justify-between flex-col gap-6 md:items-end'>
                        <div className='flex flex-col gap-4'>
                            <div className='capitalize text-3xl font-extrabold'>playwrite</div>
                            <div className='capitalize text-sm flex gap-2'><span>fonts</span> <span>/</span><span>playwrite font</span></div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Rating
                                value={5}
                                readOnly
                            // onChange={(event, newValue) => {
                            //     setValue(newValue);
                            // }}
                            />
                            <div>Score of 5.0 based on 3 reviews</div>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6'>
                        <div className='flex flex-col gap-4'>
                            <img alt='profit tool' src={testimg} className='w-full h-auto'></img>
                            <div className='flex gap-1 items-center justify-center'>
                                {new Array(4).fill(0).map((item, i) => (
                                    <div className={`${i === track && 'border-2 border-lightgreen rounded-sm'} cursor-pointer`} key={i} onClick={() => setTrack(i)}>
                                        <img alt='profit tool' src={testimg} className='h-16 w-auto'></img>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-8 text-xl font-extrabold capitalize'>about playwrite script font</div>
                            <div className='border-t border-ash py-6'>
                                Playwrite is a lovely signature font that boasts sophisticated charm with its delicate curves and flowing lines. Ideal for enhancing the elegance of wedding invites, crafts design, logotype, print design, social media graphics, or branding materials, it adds a touch of refinement to any project. It is also PUA encoded which means you can access all of the glyphs and swashes with ease!
                            </div>
                        </div>
                        <div>
                            <div className='bg-primary border border-ash w-full h-fit p-5'>
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-8'>
                                    <div className='flex gap-2 items-end'>
                                        <span className='text-3xl font-bold'>$3.00</span>
                                        <span className='line-through text-sm'>$6.00</span>
                                    </div>
                                    <button className='outline-none w-full h-fit flex gap-2 items-center justify-center p-3 bg-lightgreen uppercase text-sm font-extrabold rounded-[4px] text-ash tracking-wider'>
                                        <IoCart className='text-lg' />
                                        <span>add to cart</span>
                                    </button>
                                </div>
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-8 mt-8 text-sm items-center pb-4'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='uppercase font-bold'>get this font for free</div>
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
                                    <div className='flex flex-col gap-2 items-center'>
                                        <div className='text-3xl font-extrabold uppercase'>free</div>
                                        <button className='outline-none w-full h-fit p-3 bg-ash uppercase text-sm font-extrabold rounded-[4px] text-white tracking-wider'>
                                            <span>download for free</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 flex justify-between text-xs'>
                                <div className='flex gap-1'>
                                    <span>Listed on Dec 18, 2024</span>
                                    <span>- ID 109875639</span>
                                </div>
                                <Link to='/contact' onClick={MoveToTop} className='text-xs underline capitalize'>report problem</Link>
                            </div>
                            <div className='bg-primary border border-ash w-full h-fit p-5 mt-4'>
                                <div className='grid grid-cols-2'>
                                    <div className='flex gap-2 items-center'>
                                        <img alt='creator img' src={testimg} className='w-10 h-10 rounded-full'></img>
                                        <div className='text-sm capitalize font-bold'>lightWell</div>
                                    </div>
                                    <button className='outline-none w-fit h-fit flex gap-2 items-center justify-center py-3 px-6 bg-secondary uppercase text-sm font-bold rounded-[4px] text-white tracking-widest'>
                                        <MdPersonAddAlt1 className='text-lg' />
                                        <span>follow creator</span>
                                    </button>
                                </div>
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
            </div>
        </PageLayout>
    )
}

export default SingleProductPage