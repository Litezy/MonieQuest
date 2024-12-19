import React from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import testimg from '../../assets/images/pdt.jpg'
import testimg2 from '../../assets/images/pdt2.jpg'
import { FaCheckCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MoveToTop } from '../../utils/pageUtils';

const ProductsPage = () => {
    return (
        <PageLayout>
            <div className='pb-20 bg-dark'>
                <div className='pageBg'>
                    <div className='w-full h-full bg-[#212134ea] py-10'>
                        <div className='text-4xl font-bold text-white text-center'>Products</div>
                    </div>
                </div>
                <div className='w-11/12 mx-auto text-gray-200 mt-16'>
                    <div className='flex flex-col gap-16'>
                        <div className='flex flex-col gap-8'>
                            <div className='text-2xl font-bold'>Popular this week</div>
                            <div className='flex flex-wrap gap-6 justify-center'>
                                {new Array(4).fill(0).map((item, i) => (
                                    <div key={i} className='bg-primary h-fit w-72 rounded-[4px] relative z-10'>
                                        {[0, 2].includes(i) && <>
                                            <div className='bg-[#B2212F] text-white text-[0.8rem] uppercase font-extrabold py-1.5 px-3 absolute -top-1 -left-3'>50% off</div>
                                            <div className='edge'></div>
                                        </>}
                                        <Link to={`/products/${i}`} onClick={MoveToTop}>
                                            <img src={testimg} alt='profit tool' className='w-full h-48 rounded-t-[4px] object-cover object-center'></img>
                                        </Link>
                                        <div className='flex flex-col gap-4 px-2 py-4'>
                                            <div className='flex justify-between items-center'>
                                                <div className='capitalize text-sm font-bold'>playwrite</div>
                                                <FaCheckCircle className='text-lightgreen text-xl' />
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='text-xs capitalize'>in <span className='text-lightgreen'>fonts</span></div>
                                                <div className='flex gap-2 items-center text-sm font-extrabold'>
                                                    <div className='text-[#B2212F] underline'>$3.00</div>
                                                    <div className='line-through'>$6.00</div>
                                                </div>
                                            </div>
                                            <button className='outline-none w-full h-fit flex gap-2 items-center justify-center py-2 bg-ash hover:bg-secondary uppercase text-sm font-semibold rounded-[4px] text-white tracking-wider'>
                                                <IoCart className='text-lg' />
                                                <span>add to cart</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <div className='text-2xl font-bold'>New releases</div>
                            <div className='flex flex-wrap gap-6 justify-center'>
                                {new Array(4).fill(0).map((item, i) => (
                                    <div key={i} className='bg-primary h-fit w-72 rounded-[4px] relative z-10'>
                                        {[1, 2, 3].includes(i) && <>
                                            <div className='bg-[#B2212F] text-white text-[0.8rem] uppercase font-extrabold py-1.5 px-3 absolute -top-1 -left-3'>90% off</div>
                                            <div className='edge'></div>
                                        </>}
                                        <Link to={`/products/${i}`} onClick={MoveToTop}>
                                            <img src={testimg2} alt='profit tool' className='w-full h-48 rounded-t-[4px] object-cover object-center'></img>
                                        </Link>
                                        <div className='flex flex-col gap-4 px-2 py-4'>
                                            <div className='flex justify-between items-center'>
                                                <div className='capitalize text-sm font-bold'>the grinch mas</div>
                                                <FaCheckCircle className='text-lightgreen text-xl' />
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='text-xs capitalize'>in <span className='text-lightgreen'>fonts</span></div>
                                                <div className='flex gap-2 items-center text-sm font-extrabold'>
                                                    <div className='text-[#B2212F] underline'>$12.00</div>
                                                    <div className='line-through'>$120.00</div>
                                                </div>
                                            </div>
                                            <button className='outline-none w-full h-fit flex gap-2 items-center justify-center py-2 bg-ash hover:bg-secondary uppercase text-sm font-semibold rounded-[4px] text-white tracking-wider'>
                                                <IoCart className='text-lg' />
                                                <span>add to cart</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default ProductsPage