import React, { useRef, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'
import { Link } from 'react-router-dom'
import banner from '../../assets/images/testimg.webp'
import airdropLogo from '../../assets/images/testimage.jfif'
import { FaEdit } from 'react-icons/fa'
import { FiUploadCloud } from 'react-icons/fi'
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import FormInput from '../../utils/FormInput'
import SelectComp from '../../GeneralComponents/SelectComp'
import FormButton from '../../utils/FormButton'

const fetchedData = {
    id: 1,
    gen_id: '123456789',
    logo: airdropLogo,
    banner: banner,
    title: 'ape express',
    category: 'featured',
    about: 'Ape express blends ancient traditions with cutting-edge blockchain technology, creating a seamless platform of trust and innovation. With AI-driven insights and decentralized solutions, it transforms spiritual guidance into an advanced digital experience.',
    referral_link: 'https://app.gradient.network',
    twitter_link: 'https://x.com/i/flow/login?lang=en&mx=2',
    telegram_link: 'https://web.telegram.org/a/',
    website_link: 'https://app.gradient.network',
    video_guide_link: 'https://youtube.com/guide',
    blockchain: 'binance',
    status: 'active'
}

const statuses = [
    "active", "finished"
]

const AdminSingleAirdrop = () => {
    const [dataLoading, setDataLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [singleAirdrop, setSingleAirdrop] = useState(fetchedData)
    const [form, setForm] = useState({
        title: singleAirdrop?.title,
        category: singleAirdrop?.category,
        blockchain: singleAirdrop?.blockchain,
        about: singleAirdrop?.about,
        video_guide_link: singleAirdrop?.video_guide_link,
        referral_link: singleAirdrop?.referral_link,
        twitter_link: singleAirdrop?.twitter_link,
        telegram_link: singleAirdrop?.telegram_link,
        website_link: singleAirdrop?.website_link,
        status: singleAirdrop?.status,
    })
    const [banner, setBanner] = useState({
        img: singleAirdrop?.banner,
        image: null
    })
    const [logo, setLogo] = useState({
        img: singleAirdrop?.logo,
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

    setTimeout(() => {
        setDataLoading(false)
    }, 2000)

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

        if (!form.title || !form.category || !form.about || !form.blockchain || !form.video_guide_link || !form.referral_link || !form.twitter_link || !form.telegram_link || !form.website_link) return ErrorAlert('Enter all fields')
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
                <Link to='/admin/airdrops/all' className="w-fit rounded-md px-5 py-2 bg-ash text-white cursor-pointer">
                    back to all airdrops
                </Link>
                {dataLoading ?
                    <div className='mt-10 grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex justify-between gap-4 items-center'>
                                <div className='w-24 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                <div className='md:size-20 size-16 bg-slate-400 rounded-full animate-pulse'></div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='w-24 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                <div className='w-full md:h-64 h-52 bg-slate-400 animate-pulse'></div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            {new Array(4).fill(0).map((_, i) => (
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
                            <div className='flex flex-col gap-6'>
                                <div className='flex justify-between gap-4 items-center'>
                                    <div className='text-lightgreen capitalize font-medium'>logo:</div>
                                    <label className='cursor-pointer'>
                                        {logo.img ?
                                            <div className='relative w-fit'>
                                                <img src={logo.img} className='md:size-20 size-16 rounded-full object-cover'></img>
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
                                    <div className='text-lightgreen capitalize font-medium'>banner:</div>
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
                                    <div className='text-lightgreen capitalize font-medium'>title:</div>
                                    <FormInput placeholder='Title' name='title' value={form.title} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>category:</div>
                                    <FormInput placeholder='Category' name='category' value={form.category} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>blockchain:</div>
                                    <FormInput placeholder='Blockchain' name='blockchain' value={form.blockchain} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>referral link:</div>
                                    <FormInput placeholder='Referral link' name='referral_link' value={form.referral_link} onChange={formHandler} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>about:</div>
                                    <FormInput formtype='textarea' placeholder='About airdrop' name='about' value={form.about} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>video guide link:</div>
                                    <FormInput placeholder='Video guide link' name='video_guide_link' value={form.video_guide_link} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>status:</div>
                                    <SelectComp options={statuses} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.status} handleChange={(e) => setForm({ ...form, status: e.target.value })} />
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
                        <FormButton title='Save Changes' className='md:!w-1/2 w-full mx-auto' />
                    </form>
                }
            </div>
        </AdminPageLayout>
    )
}

export default AdminSingleAirdrop