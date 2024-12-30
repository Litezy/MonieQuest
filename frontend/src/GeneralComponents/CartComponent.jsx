import React, { useState } from 'react'
import payment from '../assets/images/payment.png'
import emptybox from '../assets/images/emptybox.png'

const CartComponent = ({ cartItems, setCartItems }) => {
    const localName = 'products'
    const [quanity, setQuantity] = useState(1)
    const [dataLoading, setDataLoading] = useState(true)

    setTimeout(() => {
      setDataLoading(false)
    }, 2000)

    let oldTotalPrice = 0
    let newTotalPrice = 0
    cartItems.map((ele) => (
        oldTotalPrice += ele.old_price,
        newTotalPrice += ele.new_price
    ))

    const RemoveCart = (item) => {
        const localData = JSON.parse(localStorage.getItem(localName))
        const filteredData = localData.filter(ele => ele.id !== item.id)
        localStorage.setItem(localName, JSON.stringify(filteredData))
        setCartItems(filteredData)
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
                    <div className='col-span-1 w-full h-72 rounded-[3px] bg-slate-400 animate-pulse'></div>
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
                                    <div className='w-full h-fit bg-primary flex md:py-0 py-3 rounded-[3px] overflow-hidden' key={i}>
                                        <div className='md:w-[25%] w-[30%]'>
                                            <img src={item.image} alt='product image' className='w-full md:h-28 h-20 md:pl-0 pl-3 object-cover rounded-tl-[3px] rounded-bl-[3px]'></img>
                                        </div>
                                        <div className='md:w-[75%] w-[70%] px-4 md:py-3 flex flex-col'>
                                            <div className='flex md:flex-row flex-col md:justify-between gap-1'>
                                                <div className='capitalize font-bold md:text-base text-sm'>{item.title}</div>
                                                <div className='flex items-center md:flex-col flex-row gap-2'>
                                                    <div className='font-semibold'>${item.new_price.toFixed(2)}</div>
                                                    <div className='text-xs font-semibold line-through'>${item.old_price.toFixed(2)}</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-4 md:text-sm text-xs items-center md:mt-0 mt-1'>
                                                <div className='flex gap-4 items-center'>
                                                    <div>Quantity</div>
                                                    <input className='outline-none border border-gray-500 bg-transparent w-10 h-fit md:py-1.5 py-1 px-3 lg:text-sm text-base rounded-[3px]' value={quanity} onChange={(e) => setQuantity(e.target.value)}></input>
                                                </div>
                                                <div className='border-l border-zinc-500 md:pl-4 pl-2 cursor-pointer hover:text-lightgreen' onClick={() => RemoveCart(item)}>Remove</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <div className='col-span-1'>
                        {cartItems.length > 0 &&
                            <div className='w-full h-fit bg-primary py-6 px-4 text-sm rounded-[3px]'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex justify-between'>
                                        <div className='capitalize'>cart subtotal</div>
                                        <div className='font-bold'>${newTotalPrice.toFixed(2)}</div>
                                    </div>
                                    <div className='text-lightgreen border-b border-zinc-500 pb-4'>You are saving ${oldTotalPrice - newTotalPrice}</div>
                                </div>
                                <div className='flex flex-col gap-4 mt-8'>
                                    <div className='flex justify-between font-bold uppercase'>
                                        <div>Total</div>
                                        <div className='text-xl'>${newTotalPrice.toFixed(2)}</div>
                                    </div>
                                    <button className='bg-lightgreen text-ash uppercase font-extrabold w-full h-fit py-3 rounded-[3px]'>proceed to checkout</button>
                                </div>
                                <div className='flex flex-col gap-4 mt-4'>
                                    <div className='text-xs text-gray-400'>Secure 256-bit Encrypted checkout.</div>
                                    <img src={payment} alt='payment mediums' className='w-60'></img>
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default CartComponent