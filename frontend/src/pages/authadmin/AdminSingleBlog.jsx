import React, { useRef, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'
import { Link, useParams } from 'react-router-dom'
import testimg from '../../assets/images/blog1.jpg'
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import { FiUploadCloud } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import SelectComp from '../../GeneralComponents/SelectComp'

const lorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed delectus natus ullam laudantium id iste autem unde magni tempora pariatur dolor blanditiis tenetur, porro a repellat nobis quibusdam harum velit eum consequuntur dignissimos consectetur similique excepturi. Magnam rem a quia error eum natus possimus!'

const fetchData = {
    id: 1,
    gen_id: '123456789',
    image: testimg,
    title: 'blum launches memepad for memecoin trading',
    feature: 'airdrop',
    main_header: lorem,
    first_paragraph: lorem,
    second_paragraph: lorem,
    extras: lorem,
    conclusion: lorem
}

const features = [
    "airdrop", "trading", "personal finance"
]

const AdminSingleBlog = () => {
    const { id } = useParams()
    const [dataLoading, setDataLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [singleBlog, setSingleBlog] = useState(fetchData)
    const [form, setForm] = useState({
        title: singleBlog?.title,
        feature: singleBlog?.feature,
        main_header: singleBlog?.main_header,
        first_paragraph: singleBlog?.first_paragraph,
        second_paragraph: singleBlog?.second_paragraph,
        extras: singleBlog?.extras,
        conclusion: singleBlog?.conclusion
    })
    const [blogImage, setBlogImage] = useState({
        img: singleBlog?.image,
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
        setBlogImage({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const Submit = (e) => {
        e.preventDefault()

        if (!form.title || !form.feature || !form.main_header || !form.first_paragraph || !form.second_paragraph) return ErrorAlert('Enter all required fields')
        if (!blogImage.image) return ErrorAlert('Upload blog image')
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
                <Link to='/admin/blogs/all' className="w-fit rounded-md px-5 py-2 bg-ash text-white cursor-pointer">
                    back to all airdrops
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