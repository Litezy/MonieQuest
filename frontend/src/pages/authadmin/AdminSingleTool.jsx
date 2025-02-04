import React, { useEffect, useRef, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link, useParams } from 'react-router-dom'
import FormInput from '../../utils/FormInput'
import testimg from "../../assets/images/pdt.jpg";
import { currencySign, ErrorAlert, SuccessAlert } from '../../utils/pageUtils';
import { FaCopy, FaEdit } from 'react-icons/fa';
import { RiDiscountPercentFill } from "react-icons/ri";
import SelectComp from '../../GeneralComponents/SelectComp';
import FormButton from '../../utils/FormButton';
import ModalLayout from '../../utils/ModalLayout';
import Loader from '../../GeneralComponents/Loader';
import { FiUploadCloud } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';

const fetchedData = {
    id: 1,
    gen_id: '123456789',
    image: testimg,
    title: 'acrobat',
    category: ['AI tool', 'eBook', 'bot', 'media generator'],
    price: 1000,
    about: 'Playwrite is a lovely signature font that boasts sophisticated charm with its delicate curves and flowing lines. Ideal for enhancing the elegance of wedding invites, crafts design, logotype, print design, social media graphics, or branding materials.',
    feature1: 'Generates visually stunning AI-powered graphics, layouts, and designs tailored to your specifications.',
    feature2: 'Produces AI-enhanced documents and presentations, streamlining workflows for writers, marketers, and designers.',
    account_number: '1234567890',
    account_name: 'Basit MoneyQuest',
    bank: 'Zenith Bank',
    link: 'https://app.gradient.network',
    contact_details: '09011234567',
    status: 'pending',
    listed: 'unlisted',
    discount: 0,
    discount_duration: 0,
    duration_type: ''
}

const statuses = [
    "pending", "approved", "declined"
]
const durationTypes = [
    "days", "weeks", "months"
]
const listOptions = [
    "listed", "unlisted"
]

const AdminSingleTool = () => {
    const { id } = useParams()
    const [dataLoading, setDataLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [singleTool, setSingleTool] = useState(fetchedData)
    const [form, setForm] = useState({
        title: singleTool?.title,
        category: singleTool?.category,
        price: singleTool?.price,
        about: singleTool?.about,
        feature1: singleTool?.feature1,
        feature2: singleTool?.feature2,
        status: singleTool?.status,
        listed: singleTool?.listed,
        discount: singleTool?.discount,
        discount_duration: singleTool?.discount_duration,
        duration_type: singleTool?.duration_type ? singleTool?.duration_type : durationTypes[0],
    })
    const [toolImage, setToolImage] = useState({
        img: singleTool?.image,
        image: null
    })
    const imgRef = useRef()

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)

    const handleUpload = (event) => {
        const file = event.target.files[0]
        if (!file.type.startsWith('image/')) {
            imgRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setToolImage({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const removeCategory = (ele) => {
        const newCategory = form.category.filter(item => item !== ele)
        setForm({
            ...form,
            category: newCategory
        })
    }

    const copyFunction = (content) => {
        navigator.clipboard.writeText(content)
        SuccessAlert('Text copied successfully')
    }

    const Submit = (e) => {
        e.preventDefault()

        if (form.category.length === 0) return ErrorAlert('Add a category')
        if (!form.title || !form.price || !form.about || !form.feature1 || !form.feature2) return ErrorAlert('Enter all required fields')
        if (isNaN(form.price) || isNaN(form.discount) || isNaN(form.discount_duration)) return ErrorAlert('Price, discount and discount duration must be valid numbers')
    }

    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
                {loading &&
                    <ModalLayout clas={`w-11/12 mx-auto`}>
                        <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                            <Loader />
                            <div>...submitting</div>
                        </div>
                    </ModalLayout>
                }
                <Link to='/admin/profit_tools/all_tools' className="w-fit rounded-md px-5 py-2 bg-ash text-white cursor-pointer">
                    back to all tools
                </Link>
                {dataLoading ?
                    <div className='mt-10 grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                        <div className='w-full h-72 bg-slate-400 animate-pulse'></div>
                        <div className='flex flex-col gap-6'>
                            {new Array(3).fill(0).map((_, i) => (
                                <div key={i} className='flex flex-col gap-3'>
                                    <div className='w-28 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                    <div className='w-full h-12 bg-slate-400 animate-pulse rounded-xl'></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <form className='mt-10 flex flex-col gap-10' onSubmit={Submit}>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                            <label className='cursor-pointer w-full'>
                                {toolImage.img ?
                                    <div className='relative'>
                                        <img src={toolImage.img} className='w-full h-72 object-cover object-center'></img>
                                        <div className="absolute top-0 -right-3 main font-bold">
                                            <FaEdit className='text-2xl text-lightgreen' />
                                        </div>
                                    </div>
                                    :
                                    <div className='w-full h-72 border border-dashed rounded-xl flex flex-col gap-2 items-center justify-center'>
                                        <div className='bg-primary rounded-full p-4'><FiUploadCloud /></div>
                                        <span>click to add image</span>
                                    </div>
                                }
                                <input ref={imgRef} type="file" onChange={handleUpload} hidden />
                            </label>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>title:</div>
                                    <FormInput placeholder='Title' name='title' value={form.title} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-lightgreen capitalize font-medium'>category:</div>
                                    <div className='flex flex-wrap gap-2'>
                                        {form.category.map((item, i) => (
                                            <div key={i} className='w-fit h-fit p-3 bg-gray-300 text-black rounded-xl flex gap-2 items-center'>
                                                <div>{item}</div>
                                                <div className='text-black hover:text-red-600 text-xs p-1 cursor-pointer rounded-full bg-gray-600' onClick={() => removeCategory(item)}>
                                                    <FaXmark />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>price ({currencySign[1]}):</div>
                                    <FormInput placeholder='Price' name='price' value={form.price} onChange={formHandler} />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='text-lightgreen capitalize font-medium'>about:</div>
                                <FormInput formtype='textarea' placeholder='About tool' name='about' value={form.about} onChange={formHandler} />
                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>feature 1:</div>
                                    <FormInput formtype='textarea' placeholder='Enter tool feature' name='feature1' value={form.feature1} onChange={formHandler} className='!h-16' />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>feature 2:</div>
                                    <FormInput formtype='textarea' placeholder='Enter tool feature' name='feature2' value={form.feature2} onChange={formHandler} className='!h-16' />
                                </div>
                            </div>
                            <div className="w-full h-fit px-5 text-dark py-5 bg-[#fafafa] rounded-md flex items-center justify-between flex-col gap-4">
                                <div className='flex flex-col gap-1 w-full'>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="">Bank Name:</div>
                                        <div className="">{singleTool.bank}</div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="">Account number:</div>
                                        <div className="flex items-center gap-2">
                                            <div className="">{singleTool.account_number}</div>
                                            <FaCopy onClick={() => copyFunction(singleTool.account_number)} className='text-ash text-sm cursor-pointer' />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="">Account name:</div>
                                        <div className="">{singleTool.account_name}</div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 w-full border-t pt-2'>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="">Video link:</div>
                                        <a href={singleTool.link} className="text-ash hover:text-lightgreen cursor-pointer">{singleTool.link}</a>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="">Contact Details:</div>
                                        <div className="flex items-center gap-2">
                                            <div className="">{singleTool.contact_details}</div>
                                            <FaCopy onClick={() => copyFunction(singleTool.contact_details)} className='text-ash text-sm cursor-pointer' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>status:</div>
                                    <SelectComp options={statuses} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.status} handleChange={(e) => setForm({ ...form, status: e.target.value })} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>list product for purchase:</div>
                                    <SelectComp options={listOptions} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.listed} handleChange={(e) => setForm({ ...form, listed: e.target.value })} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-1 items-center text-lightgreen '>
                                        <div className='capitalize font-medium'>add a discount</div>
                                        <RiDiscountPercentFill />
                                    </div>
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 items-center'>
                                        <div className='flex flex-col'>
                                            <div className='text-lightgreen capitalize font-medium'>discount (%):</div>
                                            <FormInput placeholder='Discount' name='discount' value={form.discount} onChange={formHandler} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='text-lightgreen capitalize font-medium'>duration:</div>
                                            <div className='flex items-center'>
                                                <FormInput name='discount_duration' value={form.discount_duration} onChange={formHandler} className='!w-14 !py-2 !px-4 !rounded-md -mt-2' />
                                                <SelectComp options={durationTypes} width={150} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.duration_type} handleChange={(e) => setForm({ ...form, duration_type: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FormButton title='Save Changes' className='md:!w-1/2 w-full mx-auto' />
                    </form>
                }
            </div>
        </AdminPageLayout>
    )
}

export default AdminSingleTool