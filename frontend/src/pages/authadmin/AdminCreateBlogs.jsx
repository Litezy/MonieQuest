import React, { useRef, useState } from 'react'
import BlogsLayout from '../../AdminComponents/BlogsLayout'
import { FiUploadCloud } from 'react-icons/fi'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { FaEdit } from 'react-icons/fa'
import Lottie from 'react-lottie'
import { defaultOptions, ErrorAlert } from '../../utils/pageUtils'
import { Link } from 'react-router-dom'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'
import SelectComp from '../../GeneralComponents/SelectComp'
import { Apis, AuthPostApi } from '../../services/API'

const features = [
    "airdrop", "trading", "personal_finance"
]

const AdminCreateBlogs = () => {
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        feature: features[0],
        main_header: '',
        first_paragraph: '',
        second_paragraph: '',
        extras: '',
        conclusion: ''
    })
    const [blogImage, setBlogImage] = useState({
        img: null,
        image: null
    })
    const imgRef = useRef()

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleUpload = (event) => {
        const file = event.target.files[0]
        if (!file.type.startsWith('image/')) {
            imgRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setBlogImage({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const Submit = async (e) => {
        e.preventDefault()

        if (!form.title || !form.feature || !form.main_header || !form.first_paragraph || !form.second_paragraph || !form.extras || !form.conclusion) return ErrorAlert('Enter all required fields')
        if (!blogImage.image) return ErrorAlert('Upload blog image')

        const formbody = new FormData()
        formbody.append('image', blogImage.image)
        formbody.append('title', form.title)
        formbody.append('feature', form.feature)
        formbody.append('main_header', form.main_header)
        formbody.append('first_paragraph', form.first_paragraph)
        formbody.append('second_paragraph', form.second_paragraph)
        formbody.append('extras', form.extras)
        formbody.append('conclusion', form.conclusion)

        setLoading(true)
        try {
            const response = await AuthPostApi(Apis.admin.create_blog, formbody)
            if (response.status === 200) {
                setScreen(2)
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
        <BlogsLayout>
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
                            <div className='md:text-4xl text-3xl font-bold text-center'>Create and Upload Blog</div>
                            <div className='text-center'>Required fields are marked.</div>
                        </div>
                        <form className='flex flex-col gap-10' onSubmit={Submit}>
                            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                                <label className='cursor-pointer w-full'>
                                    {blogImage.img ?
                                        <div className='relative'>
                                            <img src={blogImage.img} className='w-full h-72 object-cover object-center'></img>
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
                                        <div className='text-lightgreen capitalize font-medium'>*title:</div>
                                        <FormInput placeholder='Title' name='title' value={form.title} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='text-lightgreen capitalize font-medium'>*feature:</div>
                                        <SelectComp options={features} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.feature} handleChange={(e) => setForm({ ...form, feature: e.target.value })} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*main header:</div>
                                        <FormInput formtype='textarea' placeholder='Main header' name='main_header' value={form.main_header} onChange={formHandler} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*first paragraph:</div>
                                        <FormInput formtype='textarea' placeholder='First paragraph' name='first_paragraph' value={form.first_paragraph} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*second paragraph:</div>
                                        <FormInput formtype='textarea' placeholder='Second paragraph' name='second_paragraph' value={form.second_paragraph} onChange={formHandler} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*extras:</div>
                                        <FormInput formtype='textarea' placeholder='Extra paragraph' name='extras' value={form.extras} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*conclusion:</div>
                                        <FormInput formtype='textarea' placeholder='Conclusion' name='conclusion' value={form.conclusion} onChange={formHandler} />
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
                                    <div className="capitalize">Blog successfully Created
                                    </div>
                                    <Link to={`/admin/blogs/all`} className={`bg-green-500 mt-10 hover:bg-lightgreen text-white hover:text-ash py-2 text-center rounded-md w-full`}>
                                        Go to all blogs
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>}

            </div>
        </BlogsLayout>
    )
}

export default AdminCreateBlogs