import React, { useRef, useState } from 'react'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'
import { FaEdit } from 'react-icons/fa'
import { FiUploadCloud } from 'react-icons/fi'
import { defaultOptions, ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import FormInput from '../../utils/FormInput'
import SelectComp from '../../GeneralComponents/SelectComp'
import FormButton from '../../utils/FormButton'
import AirdropsLayout from '../../AdminComponents/AirdropsLayout'
import Lottie from 'react-lottie'
import { Link } from 'react-router-dom'

const categories = [
    "featured", "deFi", "new", "NFT", "others"
]

const AdminCreateAirdrops = () => {
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        category: categories[0],
        blockchain: '',
        about: '',
        video_guide_link: '',
        referral_link: '',
        twitter_link: '',
        telegram_link: '',
        website_link: '',
    })
    const [banner, setBanner] = useState({
        img: null,
        image: null
    })
    const [logo, setLogo] = useState({
        img: null,
        image: null
    })
    const bannerRef = useRef()
    const logoRef = useRef()

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleUpload = (event) => {
        const file = event.target.files[0]
        if (!file.type.startsWith('image/')) {
            bannerRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setBanner({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const handleUpload2 = (event) => {
        const file = event.target.files[0]
        if (!file.type.startsWith('image/')) {
            logoRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setLogo({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const Submit = (e) => {
        e.preventDefault()

        if (!form.title || !form.category || !form.about || !form.blockchain || !form.video_guide_link || !form.referral_link) return ErrorAlert('Enter all required fields')
        if (!logo.image || !banner.image) return ErrorAlert('Upload airdrop logo and banner images')
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setScreen(2)
        }, 2000)
    }

    return (
        <AirdropsLayout>
            <div className='w-11/12 mx-auto'>
                {loading &&
                    <ModalLayout clas={`w-11/12 mx-auto`}>
                        <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                            <Loader />
                            <div>...submitting</div>
                        </div>
                    </ModalLayout>
                }
                {screen === 1 &&
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col gap-2'>
                            <div className='md:text-4xl text-3xl font-bold text-center'>Create and Upload Airdrop</div>
                            <div className='text-center'>Required fields are marked.</div>
                        </div>
                        <form className='flex flex-col gap-10' onSubmit={Submit}>
                            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex justify-between gap-4 items-center'>
                                        <div className='text-lightgreen capitalize font-medium'>*logo:</div>
                                        <label className='cursor-pointer'>
                                            {logo.img ?
                                                <div className='relative w-fit'>
                                                    <img src={logo.img} className='w-20 h-20 rounded-full object-cover'></img>
                                                    <div className="absolute top-0 -right-2 main font-bold">
                                                        <FaEdit className='text-xl text-lightgreen' />
                                                    </div>
                                                </div>
                                                :
                                                <div className='w-20 h-20 border border-dashed rounded-full flex flex-col gap-2 items-center justify-center'>
                                                    <div className='bg-primary rounded-full p-4'><FiUploadCloud /></div>
                                                </div>
                                            }
                                            <input ref={logoRef} type="file" onChange={handleUpload2} hidden />
                                        </label>
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <div className='text-lightgreen capitalize font-medium'>*banner:</div>
                                        <label className='cursor-pointer w-full'>
                                            {banner.img ?
                                                <div className='relative'>
                                                    <img src={banner.img} className='w-full h-auto object-cover'></img>
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
                                            <input ref={bannerRef} type="file" onChange={handleUpload} hidden />
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*title:</div>
                                        <FormInput placeholder='Title' name='title' value={form.title} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*category:</div>
                                        <SelectComp options={categories} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.category} handleChange={(e) => setForm({ ...form, category: e.target.value })} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*blockchain:</div>
                                        <FormInput placeholder='Blockchain' name='blockchain' value={form.blockchain} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*referral link:</div>
                                        <FormInput placeholder='Referral link' name='referral_link' value={form.referral_link} onChange={formHandler} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*about:</div>
                                        <FormInput formtype='textarea' placeholder='About airdrop' name='about' value={form.about} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*video guide link:</div>
                                        <FormInput placeholder='Video guide link' name='video_guide_link' value={form.video_guide_link} onChange={formHandler} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>twitter link:</div>
                                        <FormInput placeholder='Twitter link' name='twitter_link' value={form.twitter_link} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>telegram link:</div>
                                        <FormInput placeholder='Telegram link' name='telegram_link' value={form.telegram_link} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>website link:</div>
                                        <FormInput placeholder='Website link' name='website_link' value={form.website_link} onChange={formHandler} />
                                    </div>
                                </div>
                            </div>
                            <FormButton title='Create' className='md:!w-1/2 w-full mx-auto' />
                        </form>
                    </div>
                }
                {screen === 2 &&
                    <div className="">
                        <div className="w-11/12 mx-auto min-h-[70dvh] flex items-center justify-center">
                            <div className="w-full flex items-center  flex-col">
                                <Lottie options={defaultOptions} height={250} width={300} />
                                <div className="mt-10 flex flex-col items-center">
                                    <div className="capitalize">Airdrop successfully Created
                                    </div>
                                    <Link to={`/admin/airdrops/all`} className={`bg-green-500 mt-10 hover:bg-lightgreen text-white hover:text-ash py-2 text-center rounded-md w-full`}>
                                        Go to all airdrops
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </AirdropsLayout>
    )
}

export default AdminCreateAirdrops