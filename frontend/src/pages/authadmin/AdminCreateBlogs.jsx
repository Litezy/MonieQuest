import React, { useRef, useState } from 'react'
import BlogsLayout from '../../AdminComponents/BlogsLayout'
import { FiUploadCloud } from 'react-icons/fi'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { FaEdit } from 'react-icons/fa'
import Lottie from 'react-lottie'
import { defaultOptions, ErrorAlert } from '../../utils/pageUtils'
import { Link } from 'react-router-dom'
import Loader from '../../GeneralComponents/Loader'
import SelectComp from '../../GeneralComponents/SelectComp'
import { Apis, AuthPostApi } from '../../services/API'

const features = [
    "airdrop", "trading", "personal_finance"
]

const AdminCreateBlogs = () => {
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        title: '',
        feature: features[0],
        main_header_subtitle: '',
        main_header_content: '',
        first_paragraph_subtitle: '',
        first_paragraph_content: '',
        second_paragraph_subtitle: '',
        second_paragraph_content: '',
        extras_subtitle: '',
        extras_content: '',
        conclusion: ''
    })
    const [secondImg, setSecondImg] = useState({
        second_img: null,
        second_image: null,
    })
    const [extrasImg, setExtrasImg] = useState({
        extras_img: null,
        extras_image: null
    })
    const [blogImage, setBlogImage] = useState({
        img: null,
        image: null,
    })

    const imgRef = useRef()
    const imgSecondRef = useRef()
    const imgExtrasRef = useRef()

    const formHandler = (event) => {
        setForms({
            ...forms,
            [event.target.name]: event.target.value
        })
    }

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) {
            imgRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setBlogImage({
            img: URL.createObjectURL(file),
            image: file
        })
    }
    const handleSecondImg = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) {
            imgSecondRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setSecondImg({
            second_img: URL.createObjectURL(file),
            second_image: file
        })
    }


    const handleExtasImg = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) {
            imgExtrasRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setExtrasImg({
            extras_img: URL.createObjectURL(file),
            extras_image: file
        })
    }

    const Submit = async (e) => {
        e.preventDefault()

        if (!forms.title || !forms.feature || !forms.main_header_subtitle || !forms.main_header_content ||
            !forms.first_paragraph_subtitle || !forms.first_paragraph_content || !forms.second_paragraph_subtitle || !forms.second_paragraph_content || !forms.extras_subtitle ||
            !forms.extras_content || !forms.conclusion) return ErrorAlert('Enter all required fields')
        if (!blogImage.image) return ErrorAlert('Upload blog image')

        const formbody = new FormData()
        formbody.append('image', blogImage.image)
        formbody.append('title', forms.title)
        formbody.append('feature', forms.feature)
        formbody.append('main_header_title', forms.main_header_subtitle)
        formbody.append('main_header_content', forms.main_header_content)
        formbody.append('first_paragraph_subtitle', forms.first_paragraph_subtitle)
        formbody.append('first_paragraph_content', forms.first_paragraph_content)
        formbody.append('second_paragraph_subtitle', forms.second_paragraph_subtitle)
        formbody.append('second_paragraph_content', forms.second_paragraph_content)
        formbody.append('extras_title', forms.extras_subtitle)
        formbody.append('extras_content', forms.extras_content)
        formbody.append('conclusion', forms.conclusion)
        formbody.append('second_paragraph_image', secondImg.second_image)
        formbody.append('extras_image', extrasImg.extras_image)

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
                {loading && <Loader title={`submitting`} />}
                {screen === 1 &&
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col gap-2'>
                            <div className='md:text-4xl text-3xl font-bold text-center'>Create and Upload Blog</div>
                            <div className='text-center'>Required fields are marked.</div>
                        </div>
                        <form className='flex flex-col gap-10' onSubmit={Submit}>
                            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                                <label className='cursor-pointer w-full h-fit'>
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
                                            <span>click to add blog image</span>
                                        </div>
                                    }
                                    <input ref={imgRef} type="file" onChange={handleUpload} hidden />
                                </label>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*blog title:</div>
                                        <FormInput placeholder='Title' name='title' value={forms.title} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='text-lightgreen capitalize font-medium'>*feature:</div>
                                        <SelectComp options={features} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={forms.feature} handleChange={(e) => setForms({ ...forms, feature: e.target.value })} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*main header subtitle:</div>
                                        <FormInput placeholder='Main header subtitle' name='main_header_subtitle' value={forms.main_header_subtitle} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*main header content:</div>
                                        <FormInput formtype='textarea' placeholder='Main header content' name='main_header_content' value={forms.main_header_content} onChange={formHandler} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*first paragraph subtitle:</div>
                                        <FormInput placeholder='First paragraph subtitle' name='first_paragraph_subtitle' value={forms.first_paragraph_subtitle} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*first paragraph content:</div>
                                        <FormInput formtype='textarea' placeholder='First paragraph content' name='first_paragraph_content' value={forms.first_paragraph_content} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*second paragraph subtitle:</div>
                                        <FormInput placeholder='Second paragraph subtitle' name='second_paragraph_subtitle' value={forms.second_paragraph_subtitle} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*second paragraph content:</div>
                                        <FormInput formtype='textarea' placeholder='Second paragraph content' name='second_paragraph_content' value={forms.second_paragraph_content} onChange={formHandler} />
                                    </div>
                                    <label className='cursor-pointer w-full'>
                                        {secondImg.second_img ?
                                            <div className='relative'>
                                                <img src={secondImg.second_img} className='w-full h-72 object-cover object-center'></img>
                                                <div className="absolute top-0 -right-3 main font-bold">
                                                    <FaEdit className='text-2xl text-lightgreen' />
                                                </div>
                                            </div>
                                            :
                                            <div className='w-full h-72 border border-dashed rounded-xl flex flex-col gap-2 items-center justify-center'>
                                                <div className='bg-primary rounded-full p-4'><FiUploadCloud /></div>
                                                <span>click to add second paragraph image</span>
                                            </div>
                                        }
                                        <input ref={imgSecondRef} type="file" onChange={handleSecondImg} hidden />
                                    </label>
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*extras subtitle:</div>
                                        <FormInput placeholder='Extras paragraph subtitle' name='extras_subtitle' value={forms.extras_subtitle} onChange={formHandler} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*extras content:</div>
                                        <FormInput formtype='textarea' placeholder='Extras paragraph content' name='extras_content' value={forms.extras_content} onChange={formHandler} />
                                    </div>
                                    <label className='cursor-pointer w-full'>
                                        {extrasImg.extras_img ?
                                            <div className='relative'>
                                                <img src={extrasImg.extras_img} className='w-full h-72 object-cover object-center'></img>
                                                <div className="absolute top-0 -right-3 main font-bold">
                                                    <FaEdit className='text-2xl text-lightgreen' />
                                                </div>
                                            </div>
                                            :
                                            <div className='w-full h-72 border border-dashed rounded-xl flex flex-col gap-2 items-center justify-center'>
                                                <div className='bg-primary rounded-full p-4'><FiUploadCloud /></div>
                                                <span>click to add extras paragraph image</span>
                                            </div>
                                        }
                                        <input ref={imgExtrasRef} type="file" onChange={handleExtasImg} hidden />
                                    </label>
                                    <div className='flex flex-col'>
                                        <div className='text-lightgreen capitalize font-medium'>*conclusion:</div>
                                        <FormInput formtype='textarea' placeholder='Conclusion' name='conclusion' value={forms.conclusion} onChange={formHandler} />
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