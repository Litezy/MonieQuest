import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import testimg from '../../assets/images/pdt.jpg'
import testimg2 from '../../assets/images/pdt2.jpg'
import { FaCheckCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MoveToTop } from '../../utils/pageUtils';
import CartComponent from '../../GeneralComponents/CartComponent';

const products1 = [
    {
        image: testimg,
        title: 'playwrite',
        category: 'fonts',
        old_price: 6,
        new_price: 3,
        id: Math.random(5)
    },
]

const products2 = [
    {
        image: testimg2,
        title: 'the grinch mas',
        category: 'graphics',
        old_price: 120,
        new_price: 12,
        id: Math.random(5)
    },
]

const ProductsPage = () => {
    const [cartItems, setCartItems] = useState([])

    const AddToCart = (item) => {
        const findIfCartExist = cartItems.find(ele => ele.id === item.id)
        if (!findIfCartExist) {
            setCartItems([...cartItems, item])
        }
    }

    return (
        <PageLayout>
            <div className='pb-20 bg-dark'>
                <div className='pageBg'>
                    <div className='w-full h-full bg-[#212134ea] py-10'>
                        <div className='md:text-4xl text-3xl font-bold text-white text-center'>Products</div>
                    </div>
                </div>
                <div className='w-11/12 mx-auto text-gray-200 mt-16'>
                    <CartComponent cartItems={cartItems} setCartItems={setCartItems} />
                    <div className='flex flex-col gap-16 mt-20'>
                        <div className='flex flex-col gap-8'>
                            <div className='text-2xl font-bold'>Popular this week</div>
                            {products1.map((item, i) => (
                                <div className='flex flex-wrap gap-6 justify-center' key={i}>
                                    {new Array(4).fill().map((ele, index) => (
                                        <div key={index} className='bg-primary h-fit w-72 rounded-[4px] relative z-10'>
                                            {[0, 2].includes(index) && <>
                                                <div className='bg-[#B2212F] text-white text-[0.8rem] uppercase font-extrabold py-1.5 px-3 absolute -top-1 -left-3'>50% off</div>
                                                <div className='edge'></div>
                                            </>}
                                            <Link to={`/products/${index}`} onClick={MoveToTop}>
                                                <img src={item.image} alt='profit tool' className='w-full h-48 rounded-t-[4px] object-cover object-center'></img>
                                            </Link>
                                            <div className='flex flex-col gap-4 px-2 py-4'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='capitalize text-sm font-bold'>{item.title}</div>
                                                    <FaCheckCircle className='text-lightgreen text-xl' />
                                                </div>
                                                <div className='flex justify-between'>
                                                    <div className='text-xs capitalize'>in <span className='text-lightgreen'>{item.category}</span></div>
                                                    <div className='flex gap-2 items-center text-sm font-extrabold'>
                                                        <div className='text-[#B2212F] underline'>${item.new_price.toFixed(2)}</div>
                                                        <div className='line-through'>${item.old_price.toFixed(2)}</div>
                                                    </div>
                                                </div>
                                                <button className='outline-none w-full h-fit flex gap-2 items-center justify-center py-2 bg-ash hover:bg-secondary uppercase text-sm font-semibold rounded-[4px] text-white tracking-wider' onClick={() => AddToCart(item)}>
                                                    {cartItems.includes(item) ?
                                                        <span>added to cart</span>
                                                        :
                                                        <>
                                                            <IoCart className='text-lg' />
                                                            <span>add to cart</span>
                                                        </>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col gap-8'>
                            <div className='text-2xl font-bold'>New releases</div>
                            {products2.map((item, i) => (
                                <div key={i} className='flex flex-wrap gap-6 justify-center'>
                                    {new Array(4).fill(0).map((ele, index) => (
                                        <div key={index} className='bg-primary h-fit w-72 rounded-[4px] relative z-10'>
                                            {[1, 2, 3].includes(index) && <>
                                                <div className='bg-[#B2212F] text-white text-[0.8rem] uppercase font-extrabold py-1.5 px-3 absolute -top-1 -left-3'>90% off</div>
                                                <div className='edge'></div>
                                            </>}
                                            <Link to={`/products/${index}`} onClick={MoveToTop}>
                                                <img src={item.image} alt='profit tool' className='w-full h-48 rounded-t-[4px] object-cover object-center'></img>
                                            </Link>
                                            <div className='flex flex-col gap-4 px-2 py-4'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='capitalize text-sm font-bold'>{item.title}</div>
                                                    <FaCheckCircle className='text-lightgreen text-xl' />
                                                </div>
                                                <div className='flex justify-between'>
                                                    <div className='text-xs capitalize'>in <span className='text-lightgreen'>{item.category}</span></div>
                                                    <div className='flex gap-2 items-center text-sm font-extrabold'>
                                                        <div className='text-[#B2212F] underline'>${item.new_price.toFixed(2)}</div>
                                                        <div className='line-through'>${item.old_price.toFixed(2)}</div>
                                                    </div>
                                                </div>
                                                <button className='outline-none w-full h-fit flex gap-2 items-center justify-center py-2 bg-ash hover:bg-secondary uppercase text-sm font-semibold rounded-[4px] text-white tracking-wider' onClick={() => AddToCart(item)}>
                                                    {cartItems.includes(item) ?
                                                        <span>added to cart</span>
                                                        :
                                                        <>
                                                            <IoCart className='text-lg' />
                                                            <span>add to cart</span>
                                                        </>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default ProductsPage