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
import CarouselComponent from '../../GeneralComponents/Carousel.jsx'
import image1 from '../../assets/images/pdt.jpg'
import image2 from '../../assets/images/airdrop_banner.jfif'
import image3 from '../../assets/images/testimg.webp'

const singleProductImages = [
    image1,
    image2,
    image3
]

const SingleProductPage = () => {
    const localName = 'products'
    const localData = JSON.parse(localStorage.getItem(localName))
    const { id } = useParams()
    const [track, setTrack] = useState('')
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
                                    <div className='w-full md:h-80 h-56 bg-slate-400 animate-pulse'></div>
                                    <div className='flex gap-1 items-center justify-center'>
                                        {new Array(3).fill(0).map((_, i) => (
                                            <div key={i} className='w-28 h-16 rounded-sm bg-slate-400 animate-pulse'></div>
                                        ))}
                                    </div>
                                    <div className='flex flex-col gap-6 mt-8'>
                                        <div className='w-72 h-4 rounded-full bg-slate-400 animate-pulse'></div>
                                        <div className='border-b border-slate-400 w-full'></div>
                                        <div>
                                            {new Array(4).fill(0).map((_, i) => (
                                                <div key={i} className='w-full h-1 rounded-full bg-slate-400 animate-pulse mt-2'></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='w-full h-64 bg-slate-400 animate-pulse'></div>
                                        <div className='flex justify-between gap-4'>
                                            <div className='w-56 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                            <div className='w-28 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                        </div>
                                    </div>
                                    <div className='w-full h-24 bg-slate-400 animate-pulse'></div>
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
                                <div className='flex flex-col gap-4'>
                                    <CarouselComponent singleProductImages={singleProductImages} setTrack={setTrack} />
                                    <div className='flex gap-1 items-center justify-center'>
                                        {singleProductImages.map((item, i) => (
                                            <div className={`${i === track && 'border-2 border-lightgreen rounded-sm'}`} key={i}>
                                                <img alt={item} src={item} className='h-16 w-28 object-cover'></img>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mt-8 text-xl font-extrabold capitalize'>about playwrite script font</div>
                                    <div className='border-t border-ash pt-6'>
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
                                                {CartButton()}
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
                                    <div className='mt-3 flex justify-between gap-4 text-xs'>
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
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default SingleProductPage