import React, { useCallback, useEffect, useRef, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import Loader from '../../GeneralComponents/Loader'
import { Link, useParams } from 'react-router-dom'
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import { FiUploadCloud } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import SelectComp from '../../GeneralComponents/SelectComp'
import { Apis, AuthGetApi, AuthPutApi, imageurl } from '../../services/API'


const features = [
    "airdrop", "trading", "personal_finance"
]

const AdminSingleBlog = () => {
    const { id } = useParams()
    const [dataLoading, setDataLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [singleBlog, setSingleBlog] = useState({})
    const [form, setForm] = useState({
        title: '',
        feature: '',
        main_header_title: '',
        main_header_content: '',
        first_paragraph_title: '',
        first_paragraph_content: '',
        second_paragraph_title: '',
        second_paragraph_content: '',
        extras_title: '',
        extras_content: '',
        conclusion: ''
    })
    const [secondImg, setSecondImg] = useState({
        img: null,
        image: null,
    })
    const [extrasImg, setExtrasImg] = useState({
        img: null,
        image: null
    })
    const [blogImage, setBlogImage] = useState({
        img: null,
        image: null,
    })
    console.log(extrasImg)

    const imgRef = useRef()
    const imgSecondRef = useRef()
    const imgExtrasRef = useRef()

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }


    const FetchSingleBlog = useCallback(async () => {
        try {
            const response = await AuthGetApi(`${Apis.admin.single_blog}/${id}`)
            if (response.status === 200) {
                setSingleBlog(response.msg)
                setForm({
                    title: response.msg.title || '',
                    feature: response.msg.feature || features[0],
                    main_header_title: response.msg.main_header_title || '',
                    main_header_content: response.msg.main_header_content || '',
                    first_paragraph_title: response.msg.first_paragraph_title || '',
                    first_paragraph_content: response.msg.first_paragraph_content || '',
                    second_paragraph_title: response.msg.second_paragraph_title || '',
                    second_paragraph_content: response.msg.second_paragraph_content || '',
                    extras_title: response.msg.extras_title || '',
                    extras_content: response.msg.extras_content || '',
                    conclusion: response.msg.conclusion || ''
                })
                
                setBlogImage({
                    img: response.msg.image ? `${imageurl}/blogs/${response.msg.gen_id}/${response.msg.image}` : null
                })
                setSecondImg({
                    img: response.msg.second_paragraph_image ? `${imageurl}/blogs/${response.msg.gen_id}/${response.msg.second_paragraph_image}` : null,
                })
                setExtrasImg({
                    img: response.msg.extras_image ? `${imageurl}/blogs/${response.msg.gen_id}/${response.msg.extras_image}` : null
                })

            }
        } catch (error) {
            console.log(error)
        } finally {
            setDataLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchSingleBlog()
    }, [FetchSingleBlog])

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

    const handleSecondImgUpload = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) {
            imgSecondRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setSecondImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const handleExtasImgUpload = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) {
            imgExtrasRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setExtrasImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const Submit = async (e) => {
        e.preventDefault()

        if (!form.title || !form.feature || !form.main_header_title || !form.main_header_content ||
            !form.first_paragraph_title || !form.first_paragraph_content || !form.second_paragraph_title || !form.second_paragraph_content || !form.extras_title ||
            !form.extras_content || !form.conclusion) return ErrorAlert('Enter all required fields')

        const formbody = new FormData()
        formbody.append('blog_id', singleBlog.id)
        formbody.append('image', blogImage.image)
        formbody.append('title', form.title)
        formbody.append('feature', form.feature)
        formbody.append('main_header_title', form.main_header_title)
        formbody.append('main_header_content', form.main_header_content)
        formbody.append('first_paragraph_title', form.first_paragraph_title)
        formbody.append('first_paragraph_content', form.first_paragraph_content)
        formbody.append('second_paragraph_title', form.second_paragraph_title)
        formbody.append('second_paragraph_content', form.second_paragraph_content)
        formbody.append('extras_title', form.extras_title)
        formbody.append('extras_content', form.extras_content)
        formbody.append('conclusion', form.conclusion)
        formbody.append('second_paragraph_image', secondImg.image)
        formbody.append('extras_image', extrasImg.image)

        setLoading(true)
        try {
            const response = await AuthPutApi(Apis.admin.update_blog, formbody)
            if (response.status === 200) {
                FetchSingleBlog()
                SuccessAlert(response.msg)
                // await new Promise((resolve) => setTimeout(resolve, 2000))
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const deleteImg = async (val) => {
        const data = { tag: val }
        setLoading(true)
        try {
            const res = await AuthPutApi(`${Apis.admin.delete_blog_img}/${id}`, data)
            if (res.status !== 200) return ErrorAlert(res.msg)
            if (val === 'paragraph') {
                setSecondImg({ img: null, image: null });
            }
            else if (val === 'extras') {
                setExtrasImg({ img: null, image: null });
            }
            FetchSingleBlog()
            SuccessAlert(res.msg)
            // await new Promise((resolve) => setTimeout(resolve, 2000))
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
                <Link to='/admin/blogs/all' className="w-fit rounded-md px-5 py-2 bg-ash text-white cursor-pointer">
                    back to all blogs
                </Link>
                {dataLoading ?
                    <div className='mt-10 grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                        <div className='w-full h-72 bg-slate-400 animate-pulse'></div>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-3'>
                                <div className='w-28 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                <div className='w-full h-12 bg-slate-400 animate-pulse rounded-xl'></div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='w-28 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                <div className='w-52 h-10 bg-slate-400 animate-pulse'></div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='w-28 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                <div className='w-full h-32 bg-slate-400 animate-pulse rounded-xl'></div>
                            </div>
                        </div>
                    </div>
                    :
                    <form className='flex flex-col gap-10 mt-10' onSubmit={Submit}>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
                            <div className="">
                                <label className='cursor-pointer w-full'>
                                    {blogImage.img ?
                                        <div className='relative'>
                                            <img src={blogImage.img} className='w-full h-72 object-cover object-center'></img>
                                            <div className="absolute -top-3 -right-3 main font-bold">
                                                <FaEdit className='text-2xl text-lightgreen' />
                                            </div>

                                        </div>
                                        :
                                        <div className='w-full h-72 border border-dashed rounded-xl flex flex-col gap-2 items-center justify-center'>
                                            <div className='bg-primary rounded-full p-4'><FiUploadCloud /></div>
                                            <span>click to add blog image</span>
                                        </div>
                                    }
                                    <input ref={imgRef} type="file" onChange={(e) => handleUpload(e, 'main')} hidden />
                                </label>

                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*blog title:</div>
                                    <FormInput placeholder='Blog Title' name='title' value={form.title} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-lightgreen capitalize font-medium'>*feature:</div>
                                    <SelectComp options={features} width={200} style={{ bg: '#212134', color: 'lightgrey', font: '0.85rem' }} value={form.feature} handleChange={(e) => setForm({ ...form, feature: e.target.value })} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*main header title:</div>
                                    <FormInput placeholder='Main header title' name='main_header_title' value={form.main_header_title} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*main header content:</div>
                                    <FormInput formtype='textarea' placeholder='Main header content' name='main_header_content' value={form.main_header_content} onChange={formHandler} />
                                </div>
                            </div>
                            <div className='flex  flex-col gap-6'>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*first paragraph title:</div>
                                    <FormInput placeholder='First paragraph title' name='first_paragraph_title' value={form.first_paragraph_title} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*first paragraph content:</div>
                                    <FormInput formtype='textarea' placeholder='First paragraph content' name='first_paragraph_content' value={form.first_paragraph_content} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*second paragraph title:</div>
                                    <FormInput placeholder='Second paragraph title' name='second_paragraph_title' value={form.second_paragraph_title} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*second paragraph content:</div>
                                    <FormInput formtype='textarea' placeholder='Second paragraph content' name='second_paragraph_content' value={form.second_paragraph_content} onChange={formHandler} />
                                </div>

                                <div className="w-full">
                                    <label className='cursor-pointer w-full'>
                                        {secondImg.img ?
                                            <div className='relative'>
                                                <img src={secondImg.img} className='w-full h-72 object-cover object-center'></img>
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
                                        <input ref={imgSecondRef} type="file" onChange={handleSecondImgUpload} hidden />
                                    </label>
                                    {singleBlog.second_paragraph_image &&
                                        <div className=" mt-5 main font-bold">
                                            <button type='button' onClick={() => deleteImg(`paragraph`)} className='px-4 py-1.5 rounded-md bg-red-700'>delete paragraph image</button>
                                        </div>
                                    }
                                </div>

                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*extras title:</div>
                                    <FormInput placeholder='Extra paragraph title' name='extras_title' value={form.extras_title} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*extras content:</div>
                                    <FormInput formtype='textarea' placeholder='Extra paragraph content' name='extras_content' value={form.extras_content} onChange={formHandler} />
                                </div>
                                <div className="w-full">
                                    <label className='cursor-pointer w-full'>
                                        {extrasImg.img ?
                                            <div className='relative'>
                                                <img src={extrasImg.img} className='w-full h-72 object-cover object-center'></img>
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
                                        <input ref={imgExtrasRef} type="file" onChange={handleExtasImgUpload} hidden />
                                    </label>
                                    {singleBlog.extras_image &&
                                        <div className="mt-5 main font-bold">
                                            <button type='button' onClick={() => deleteImg(`extras`)} className='px-4 py-1.5 rounded-md bg-red-700'>delete extras image</button>
                                        </div>
                                    }
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>*conclusion:</div>
                                    <FormInput formtype='textarea' placeholder='Conclusion' name='conclusion' value={form.conclusion} onChange={formHandler} />
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

export default AdminSingleBlog