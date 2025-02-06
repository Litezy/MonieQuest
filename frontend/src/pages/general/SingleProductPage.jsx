import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { Link, useParams } from 'react-router-dom'
import { IoCart } from 'react-icons/io5'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { MoveToTop } from '../../utils/pageUtils'
import Rating from '@mui/material/Rating';
import { Apis, GetApi, imageurl, PutApi } from '../../services/API';
import moment from 'moment'
import Loading from '../../GeneralComponents/Loading';


const SingleProductPage = () => {
    const { id } = useParams()
    const localName = 'products'
    const localData = JSON.parse(localStorage.getItem(localName))
    const ratingData = JSON.parse(localStorage.getItem('ratingData'))
    const [cartItems, setCartItems] = useState(localData || []);
    const [singleProduct, setSingleProduct] = useState({})
    const [form, setForm] = useState({
        rating: 1,
        submit: false
    })
    const [dataLoading, setDataLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!ratingData) {
            localStorage.setItem('ratingData', JSON.stringify([]))
        }
        else if (ratingData.length > 0) {
            ratingData.map((ele) => {
                if (ele.id === parseFloat(id)) {
                    setForm({
                        rating: ele.rating,
                        submit: ele.submit
                    })
                }
            })
        }
    }, [])

    const FetchSingleProduct = useCallback(async () => {
        try {
            const response = await GetApi(`${Apis.admin.single_tool}/${id}`)
            if (response.status === 200) {
                setSingleProduct(response.msg)
            }

        } catch (error) {
            //
        } finally {
            setDataLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchSingleProduct()
    }, [FetchSingleProduct])


    const AddToCart = () => {
        const findIfCartExist = cartItems.find((ele) => ele.id === singleProduct.id);
        if (!findIfCartExist) {
            setCartItems([...cartItems, singleProduct])
            const currentData = JSON.parse(localStorage.getItem(localName))
            currentData.push(singleProduct)
            localStorage.setItem(localName, JSON.stringify(currentData))
        }
    }

    const CartButton = (id) => {
        const exists = cartItems.some(ele => ele.id === id)
        return exists ? (
            <span>Added to Cart</span>
        ) : (
            <>
                <IoCart className="text-lg" />
                <span>Add to Cart</span>
            </>
        );
    }

    const submitRating = async () => {
        if (!form.submit) {
            const formbody = {
                tool_id: singleProduct.id,
                rating: form.rating
            }
            setLoading(true)
            try {
                const response = await PutApi(Apis.profitTools.add_rating, formbody)
                if (response.status === 200) {
                    setForm({ ...form, submit: true })
                    const currentData = JSON.parse(localStorage.getItem('ratingData'))
                    currentData.push(response.msg)
                    localStorage.setItem('ratingData', JSON.stringify(currentData))
                    FetchSingleProduct()
                } else {
                    console.log(response.msg)
                }
            } catch (error) {
                //
            } finally {
                setLoading(false)
            }
        }
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
                                    <div className='flex gap-2'>
                                        {new Array(3).fill(0).map((_, i) => (
                                            <div key={i} className='w-16 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                        ))}
                                    </div>
                                </div>
                                <div className='w-60 h-2 rounded-full bg-slate-400 animate-pulse'></div>
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
                                <div className='flex flex-col gap-2'>
                                    <div className='capitalize text-3xl font-extrabold'>{singleProduct?.title}</div>
                                    <div className='flex md:flex-row flex-col gap-1 text-sm'>
                                        {JSON.parse(singleProduct.category).map((ele, i) => (
                                            <div key={i} className=''>{ele}{i === singleProduct.category.length - 1 ? '.' : ','}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Rating
                                        name="half-rating"
                                        precision={0.25}
                                        value={singleProduct.total_ratings > 0 ? singleProduct.total_ratings / singleProduct.total_rate_persons : 0}
                                        readOnly
                                        sx={{
                                            '& .MuiRating-iconEmpty': {
                                                color: 'gray'
                                            }
                                        }}
                                    />
                                    <div>Score of {singleProduct.total_ratings > 0 ? (singleProduct.total_ratings / singleProduct.total_rate_persons).toFixed(1) : 0} based on {singleProduct?.total_rate_persons} reviews</div>
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
                                <div className='w-full md:h-96 h-60'>
                                    <img src={`${imageurl}/tools/${singleProduct?.image}`} alt={singleProduct.image} className='w-full h-full object-cover' />
                                </div>
                                <div>
                                    <div className='bg-primary border border-ash w-full h-fit p-5 flex flex-col gap-4'>
                                        {Object.values(singleProduct).length !== 0 &&
                                            <div className='flex gap-4 items-center'>
                                                {singleProduct.discount_percentage && <div className='text-sm text-red-600'>-{singleProduct.discount_percentage}%</div>}
                                                <div className='flex gap-2 items-end'>
                                                    <div className='text-3xl font-bold'>₦{singleProduct.price.toLocaleString()}</div>
                                                    {singleProduct.discount_percentage && <div className='line-through text-sm'>₦{((100 - singleProduct.discount_percentage) / 100 * singleProduct.price).toLocaleString()}</div>}
                                                </div>
                                            </div>
                                        }
                                        <p className='text-sm'>{singleProduct?.about}</p>
                                        <div className='flex flex-col gap-2'>
                                            <div className='uppercase font-bold'>key features:</div>
                                            <div className='flex gap-2 items-baseline'>
                                                <div className='w-[3%]'>
                                                    <GiCheckMark className='text-lightgreen text-sm' />
                                                </div>
                                                <div className='w-[97%]'>{singleProduct?.feature1}</div>
                                            </div>
                                            <div className='flex gap-2 items-baseline'>
                                                <div className='w-[3%]'>
                                                    <GiCheckMark className='text-lightgreen text-sm' />
                                                </div>
                                                <div className='w-[97%]'>{singleProduct?.feature2}</div>
                                            </div>
                                        </div>
                                        <div className='flex justify-end mt-4'>
                                            <button className='outline-none w-fit h-fit flex gap-2 items-center justify-center py-3 px-14 bg-lightgreen uppercase text-sm font-extrabold rounded-[4px] text-ash tracking-wider' onClick={AddToCart}>
                                                {CartButton(singleProduct.id)}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-3 flex justify-between gap-4 text-xs'>
                                        <div className='flex gap-1'>
                                            <span>Listed on {moment(singleProduct?.updatedAt).format('MMM Do YYYY')}</span>
                                            <span>- ID {singleProduct?.gen_id}</span>
                                        </div>
                                        <Link to='/contact' onClick={MoveToTop} className='text-xs underline capitalize'>report problem</Link>
                                    </div>
                                    <div className='bg-primary border border-ash w-full h-fit p-5 mt-4'>
                                        <div className='grid grid-cols-2 items-center'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='text-xl font-bold'>Reviews</div>
                                                <Rating
                                                    value={form.rating}
                                                    onChange={(event, newValue) => {
                                                        setForm({ ...form, rating: newValue })
                                                    }}
                                                    sx={{
                                                        '& .MuiRating-iconEmpty': {
                                                            color: 'gray'
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className='w-fit relative'>
                                                {loading && <Loading />}
                                                <button className='outline-none w-fit h-fit flex gap-1 items-center justify-center py-3 px-8 bg-ash uppercase text-sm font-bold rounded-[4px] text-white tracking-widest relative' onClick={submitRating}>
                                                    <span>{form.submit ? 'submitted' : 'submit'}</span>
                                                    <IoCheckmarkDoneCircle />
                                                </button>
                                            </div>
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