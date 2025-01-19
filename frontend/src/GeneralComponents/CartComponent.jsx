import React, { useState } from 'react'
import emptybox from '../assets/images/emptybox.png'
import FormInput from '../utils/FormInput'
import { ErrorAlert } from '../utils/pageUtils'
import { MdContentCopy } from "react-icons/md";
import { SlClock } from "react-icons/sl";
import Loading from './Loading';

const CartComponent = ({ cartItems, setCartItems, dataLoading }) => {
    const localName = 'products'
    const activeScreen = JSON.parse(localStorage.getItem('screen'))
    const [email, setEmail] = useState('')
    const [screen, setScreen] = useState(activeScreen || 1)
    const [loading, setLoading] = useState(false)
    const [copy, setCopy] = useState(false)


    let oldTotalPrice = 0
    let newTotalPrice = 0
    cartItems.map((ele) => (
        oldTotalPrice += ele.old_price,
        newTotalPrice += ele.new_price
    ))

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText('8260456789')
        setCopy(true)
    }

    const RemoveCart = (item) => {
        const localData = JSON.parse(localStorage.getItem(localName))
        const filteredData = localData.filter(ele => ele.id !== item.id)
        localStorage.setItem(localName, JSON.stringify(filteredData))
        setCartItems(filteredData)
    }

    const CheckOut = () => {
        if (!email) return ErrorAlert('Enter your email address')
        setScreen(2)
        localStorage.setItem('screen', JSON.stringify(2))
    }

    const MakePayment = () => {
        setScreen(3)
        localStorage.setItem('screen', JSON.stringify(3))
    }

    const EmptyCart = () => {
        setCartItems([])
        localStorage.setItem(localName, JSON.stringify([]))
        setScreen(1)
        localStorage.setItem('screen', JSON.stringify(1))
    }

    return (
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-10'>
            {dataLoading ?
                <>
                    <div className='flex flex-col gap-8 lg:col-span-2 col-span-1'>
                        <div className='flex flex-col gap-4'>
                            <div className='w-64 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                            <div className='border-b border-slate-400 w-full'></div>
                        </div>
                        <div className='w-full h-28 rounded-[3px] bg-slate-400 animate-pulse'></div>
                    </div>
                    <div className='col-span-1 w-full h-80 rounded-[3px] bg-slate-400 animate-pulse'></div>
                </>
                :
                <>
                    <div className='lg:col-span-2 col-span-1'>
                        <div className='uppercase font-bold border-b border-zinc-500 pb-2'>{cartItems.length > 0 ? <span>your shopping cart ({cartItems.length} item{cartItems.length > 1 && 's'})</span> : <span>your cart is still empty</span>}</div>
                        {cartItems.length < 1 ?
                            <div className='flex flex-col gap-8 mt-6'>
                                <div className='text-sm'>Add a product here by clicking on the add to cart button.</div>
                                <img alt='empty box' src={emptybox} className='md:w-52 w-40 h-auto'></img>
                            </div>
                            :
                            <div className='flex flex-col gap-5 mt-8'>
                                {cartItems.map((item, i) => (
                                    <div className='w-full h-fit bg-primary flex md:p-0 p-3 rounded-[3px] overflow-hidden' key={i}>
                                        <div className='md:w-[25%] w-[30%]'>
                                            <img src={item.image} alt={item.image} className='w-full md:h-28 h-20 object-cover rounded-tl-[3px] rounded-bl-[3px]'></img>
                                        </div>
                                        <div className='md:w-[75%] w-[70%] px-4 md:pt-3 flex flex-col'>
                                            <div className='flex md:flex-row flex-col md:justify-between gap-1'>
                                                <div className='capitalize font-bold md:text-base text-sm'>{item.title}</div>
                                                <div className='flex items-center md:flex-col flex-row gap-1.5'>
                                                    <div className='font-semibold'>${item.new_price.toFixed(2)}</div>
                                                    <div className='text-xs font-semibold line-through'>${item.old_price.toFixed(2)}</div>
                                                </div>
                                            </div>
                                            <div className='flex md:flex-row flex-col md:justify-between md:items-center text-xs mt-3'>
                                                <button className='outline-none w-fit h-fit bg-secondary rounded-md py-2 px-3 capitalize hover:text-lightgreen' onClick={() => RemoveCart(item)}>remove tool</button>
                                                <div className='text-lightgreen md:block hidden'>You are saving {(item.old_price - item.new_price) / item.old_price * 100}%</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <div className='col-span-1'>
                        {cartItems.length > 0 &&
                            <div className='w-full h-fit bg-primary py-6 px-4 text-sm rounded-[3px] relative'>
                                {loading && <Loading />}
                                {screen === 1 &&
                                    <div className='flex flex-col gap-8'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex justify-between'>
                                                <div className='capitalize'>cart subtotal</div>
                                                <div className='font-bold'>${newTotalPrice.toFixed(2)}</div>
                                            </div>
                                            <div className='text-lightgreen border-b border-zinc-500 pb-4'>You are saving ${oldTotalPrice - newTotalPrice}</div>
                                        </div>
                                        <div className='flex flex-col gap-6'>
                                            <div className='flex justify-between font-bold uppercase'>
                                                <div>Total</div>
                                                <div className='text-xl'>${newTotalPrice.toFixed(2)}</div>
                                            </div>
                                            <div className='-mt-2'>
                                                <FormInput placeholder='Enter Email Address' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <button className='bg-lightgreen text-ash uppercase font-extrabold w-full h-fit py-3 rounded-[4px]' onClick={CheckOut}>proceed to checkout</button>
                                            <div className='capitalize text-xs text-center'>payment method: bank transfer only</div>
                                        </div>
                                    </div>
                                }
                                {screen === 2 &&
                                    <div className='flex flex-col gap-4 items-center'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-3xl font-bold text-lightgreen'>₦35,015</span>
                                            <span className='text-xs capitalize text-gray-300 text-center'>bank transfer</span>
                                        </div>
                                        <div className='text-center'>Kindly pay the above exact amount to the payment details below</div>
                                        <div className='bg-secondary rounded-md w-full h-fit p-4 flex flex-col gap-4'>
                                            <div className='flex justify-between gap-4'>
                                                <span>Bank name</span>
                                                <span className='capitalize'>moniepoint</span>
                                            </div>
                                            <div className='flex justify-between gap-4'>
                                                <span>Account number</span>
                                                <div className='flex gap-2 items-center'>
                                                    <span>8260456789</span>
                                                    <div className={`cursor-pointer ${copy && 'text-lightgreen'}`} onClick={copyFunction}>
                                                        <MdContentCopy />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex justify-between gap-4'>
                                                <span>Account name</span>
                                                <span className='uppercase'>velox dawan</span>
                                            </div>
                                        </div>
                                        <button className='bg-lightgreen text-ash font-extrabold w-full h-fit py-3 rounded-[4px]' onClick={MakePayment}>I have made my payment</button>
                                    </div>
                                }
                                {screen === 3 &&
                                    <div className='flex flex-col gap-6 items-center'>
                                        <SlClock className='text-8xl' />
                                        <div className='text-center'>Your order is being processed. Keep an eye on your email for delivery updates.
                                        </div>
                                        <button className='bg-lightgreen text-ash font-extrabold w-full h-fit py-3 rounded-[4px] uppercase' onClick={EmptyCart}>empty cart</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default CartComponent