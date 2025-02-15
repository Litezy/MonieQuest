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

    const FetchSingleBlog = useCallback(async () => {
        try {
            const response = await AuthGetApi(`${Apis.admin.single_blog}/${id}`)
            if (response.status === 200) {
                setSingleBlog(response.msg)
                setForm({
                    title: response.msg.title || '',
                    feature: response.msg.feature || features[0],
                    main_header: response.msg.main_header || '',
                    first_paragraph: response.msg.first_paragraph || '',
                    second_paragraph: response.msg.second_paragraph || '',
                    extras: response.msg.extras || '',
                    conclusion: response.msg.conclusion || '',
                })
                setBlogImage({
                    ...blogImage,
                    img: `${imageurl}/blogs/${response.msg.image}` || null
                })
                console.log(response.msg)
            }
        } catch (error) {
            //
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

    const Submit = async (e) => {
        e.preventDefault()

        if (!form.title || !form.feature || !form.main_header || !form.first_paragraph || !form.second_paragraph || !form.extras || !form.conclusion) return ErrorAlert('Enter all required fields')

        const formbody = new FormData()
        formbody.append('blog_id', singleBlog.id)
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
            const response = await AuthPutApi(Apis.admin.update_blog, formbody)
            if (response.status === 200) {
                FetchSingleBlog()
                SuccessAlert(response.msg)
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
                            <label className='cursor-pointer w-full'>
                                {blogImage.img ?
                                    <div className='relative'>
                                        <img src={blogImage.img} alt={blogImage.img} className='w-full h-72 object-cover object-center'></img>
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
                                <div className='flex flex-col'>
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
                                    <div className='text-lightgreen capitalize font-medium'>extras:</div>
                                    <FormInput formtype='textarea' placeholder='Extra paragraph' name='extras' value={form.extras} onChange={formHandler} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='text-lightgreen capitalize font-medium'>conclusion:</div>
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