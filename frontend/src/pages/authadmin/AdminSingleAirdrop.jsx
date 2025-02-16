import React, { useCallback, useEffect, useRef, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import Loader from '../../GeneralComponents/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { FiUploadCloud } from 'react-icons/fi'
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import FormInput from '../../utils/FormInput'
import SelectComp from '../../GeneralComponents/SelectComp'
import FormButton from '../../utils/FormButton'
import { Apis, AuthGetApi, AuthPostApi, AuthPutApi, imageurl } from '../../services/API'
import ModalLayout from '../../utils/ModalLayout'

const statuses = [
    "open", "closed"
]
const categories = [
    "deFi", "featured", "new", "NFT", "potential", "earn_crypto"
]
const kyces = [
    "true", "false"
]
const blockchains = ['Abstract', 'Algorand', 'ApeChain', 'Abitrum', 'Avalanche', 'Base', 'Berachain', 'Binance', 'Bitcoin', 'Blast', 'Cardano', 'Celestia', 'Cosmos', 'Dogechain', 'Ethereum', 'Filecoin', 'Immutable', 'Injective', 'IoTeX', 'Linea', 'Manta Network', 'Near Protocol', 'Optimism', 'Other', 'Polkadot', 'Polygon', 'Ronin', 'Scroll', 'Solana', 'Sui', 'Tesnet', 'TON', 'Tron', 'zkSync']


const AdminSingleAirdrop = () => {
    const { id } = useParams()
    const [dataLoading, setDataLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [singleAirdrop, setSingleAirdrop] = useState({})
    const [modal, setModal] = useState(false)
    const [form, setForm] = useState({
        title: '',
        category: '',
        blockchain: '',
        kyc: '',
        type: '',
        about: '',
        video_guide_link: '',
        referral_link: '',
        twitter_link: '',
        telegram_link: '',
        website_link: '',
        status: '',
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
    const navigate = useNavigate()

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const FetchSingleAirdrop = useCallback(async () => {
        try {
            const response = await AuthGetApi(`${Apis.admin.single_airdrop}/${id}`)
            if (response.status === 200) {
                setSingleAirdrop(response.msg)
                setForm({
                    title: response.msg.title || '',
                    category: response.msg.category || categories[0],
                    blockchain: response.msg.blockchain || blockchains[0],
                    kyc: response.msg.kyc || kyces[0],
                    type: response.msg.type || '',
                    about: response.msg.about || '',
                    status: response.msg.status || statuses[0],
                    referral_link: response.msg.referral_link || '',
                    video_guide_link: response.msg.video_guide_link || '',
                    twitter_link: response.msg.twitter_link || '',
                    telegram_link: response.msg.telegram_link || '',
                    website_link: response.msg.website_link || '',
                })
                setLogo({
                    ...logo,
                    img: `${imageurl}/airdrops/${response.msg.logo_image}`
                })
                setBanner({
                    ...banner,
                    img: `${imageurl}/airdrops/${response.msg.banner_image}`
                })
            }
        } catch (error) {
            //
        } finally {
            setDataLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchSingleAirdrop()
    }, [FetchSingleAirdrop])

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

    const Submit = async (e) => {
        e.preventDefault()

        if (!form.title || !form.category || !form.about || !form.blockchain || !form.type || !form.video_guide_link || !form.referral_link) return ErrorAlert('Enter all required fields')

        const formbody = new FormData()
        formbody.append('airdrop_id', singleAirdrop.id)
        formbody.append('logo_image', logo.image)
        formbody.append('banner_image', banner.image)
        formbody.append('title', form.title)
        formbody.append('category', form.category)
        formbody.append('about', form.about)
        formbody.append('blockchain', form.blockchain)
        formbody.append('kyc', form.kyc)
        formbody.append('type', form.type)
        formbody.append('video_guide_link', form.video_guide_link)
        formbody.append('referral_link', form.referral_link)
        formbody.append('status', form.status)
        formbody.append('telegram_link', form.telegram_link)
        formbody.append('twitter_link', form.twitter_link)
        formbody.append('website_link', form.website_link)

        setLoading(true)
        try {
            const response = await AuthPutApi(Apis.admin.update_airdrop, formbody)
            if (response.status === 200) {
                SuccessAlert(response.msg)
                FetchSingleAirdrop()
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const DeleteAirdrop = async () => {
        setLoading(true)
        try {
            const response = await AuthPostApi(Apis.admin.delete_closed_airdrop, { airdrop_id: singleAirdrop.id })
            if (response.status === 200) {
                SuccessAlert(response.msg)
                navigate(`/admin/airdrops/all`)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
                {loading && <Loader title={`submitting`} />}
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
                                <div className='w-full h-72 bg-slate-400 animate-pulse'></div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            {new Array(5).fill(0).map((_, i) => (
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
                                    <div className='text-lightgreen capitalize font-medium'>*logo:</div>
                                    <label className='cursor-pointer'>
                                        {logo.img ?
                                            <div className='relative w-fit'>
                                                <img src={logo.img} alt={logo.img} className='md:size-20 size-16 rounded-full object-cover'></img>
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
                                                <img src={banner.img} alt={banner.img} className='w-full h-72 object-cover object-center'></img>
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
                                    <div className='text-lightgreen capitalize font-medium'>*KYC:</div>
                                    <SelectComp options={kyces} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.kyc} handleChange={(e) => setForm({ ...form, kyc: e.target.value })} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*blockchain:</div>
                                    <SelectComp options={blockchains} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.blockchain} handleChange={(e) => setForm({ ...form, blockchain: e.target.value })} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*type</div>
                                    <FormInput placeholder='Airdrop type' name='type' value={form.type} onChange={formHandler} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*referral link:</div>
                                    <FormInput placeholder='Referral link' name='referral_link' value={form.referral_link} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*about:</div>
                                    <FormInput formtype='textarea' placeholder='About airdrop' name='about' value={form.about} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*video guide link:</div>
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
                        {singleAirdrop.status === 'closed' && <FormButton title='Delete Airdrop' type='button' className='md:!w-1/2 w-full mx-auto !bg-red-700' onClick={() => setModal(true)} />}
                        {modal &&
                            <ModalLayout setModal={setModal} clas={`lg:w-[50%] w-10/12 mx-auto`}>
                                <div className="p-5 bg-primary rounded-md">
                                    <div className="text-base text-center mb-3 text-white">Are you sure you want to delete airdrop</div>
                                    <div className="flex items-center justify-between">
                                        <button onClick={() => setModal(false)} className='px-4 py-2 bg-red-700 text-white rounded-md' type='button'>Cancel</button>
                                        <button className='px-4 py-2 bg-ash text-white rounded-md' type='button' onClick={DeleteAirdrop}>Confirm delete</button>
                                    </div>

                                </div>
                            </ModalLayout>
                        }
                    </form>
                }
            </div>
        </AdminPageLayout>
    )
}

export default AdminSingleAirdrop