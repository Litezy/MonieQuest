import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthPageLayout from '../../AuthComponents/AuthPageLayout';
import Loading from '../../GeneralComponents/Loading';
import Loader from '../../GeneralComponents/Loader';
import ModalLayout from '../../utils/ModalLayout';


const UserKYC = ({ }) => {
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)
    const [data, setData] = useState({})
    const [confirm, setConfirm] = useState(false)



    const frontRef = useRef()
    const navigate = useNavigate()
    const backRef = useRef()
    const [forms, setForms] = useState({
        address: '',
        dob: '',
        id_type: '',
        id_number: '',
    })
    const [frontimg, setfrontImg] = useState({
        img: null,
        image: null
    })
    const [backimg, setbackImg] = useState({
        img: null,
        image: null
    })


    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const checkdob = () => {
        console.log(
            forms.dob
        )
    }

    const handleImageFront = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith(`image/`)) {
            frontRef.current.value = null
            // return errorMessage('Invalid file format detected, try with a different photo')
        }
        setfrontImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }
    const handleImageBack = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith(`image/`)) {
            backRef.current.value = null
            // return errorMessage('Invalid file format detected, try with a different photo')
        }
        setbackImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const changeImageback = (e) => {
        setbackImg({
            img: e.target.src,
            image: null
        })
    }
    const changeImagefront = (e) => {
        setfrontImg({
            img: e.target.src,
            image: null
        })
    }

    const submit = (e)=>{
        e.preventDefault()
        setLoading(true)
        return setTimeout(()=>{
            setLoading(false)
        },5000)
    }

    const text = 'text-lightgreen'
    return (

        <AuthPageLayout>
            <div className=' w-11/12 mx-auto   '>
                <div className="w-full  ">
                    <Link to={'/user/profile'} className="w-fit  rounded-md px-5 py-1 bg-ash  text-white mr-auto cursor-pointer ">
                        back to profile
                    </Link>

                </div>

                <form onSubmit={submit} className=" h-fit relative   rounded-md text-sm  pt-3 ">

                    {loading &&
                       <ModalLayout setModal={setLoading} clas={``}>
                         <div className="absolute top-0  backdrop-blur-sm w-full z-40 h-full rounded-md left-1/2 -translate-x-1/2">
                            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-fit p-5 rounded-md"><Loader />
                            </div>
                        </div>
                       </ModalLayout>
                    }
                    <div className="md:flex md:items-baseline gap-5 w-full ">
                        <div className="md:w-1/2">
                            <div className="flex flex-col w-full mt-5  ">
                                <h1 className={`${text}`} onClick={checkdob}>Date of Birth</h1>
                                <div class="relative max-w-sm w-1/2">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input name='dob' value={forms.dob} onChange={handleChange} datepicker datepicker-buttons datepicker-autoselect-today type="date" class="bg-white mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Select date" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-3  ">
                                <h1 className={`${text}`}> Address:</h1>
                                <input name='address' value={forms.address} onChange={handleChange} type="text" className='w-full text-dark outline-none border-b h-10 overflow-x-auto' placeholder='enter your address' />
                            </div>


                        </div>
                        <div className="md:w-1/2  h-full">
                            <div className="flex flex-col w-full  ">
                                <h1 className={`${text}`}>Government Issued ID:</h1>
                                <select name="id_type" onChange={handleChange} value={forms.id_type} className='border-b bg-dark w-full outline-none mt-3'>
                                    <option >--select--</option>
                                    <option value="driver's license">Driver's License/State ID</option>
                                    <option value="Nin">NIN</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full mt-3  ">
                                <h1 className={`${text} capitalize`}>{forms.id_type && forms.id_type} ID Number:</h1>
                                <input name='id_number' value={forms.id_number} onChange={handleChange} type="text" className='w-full text-dark outline-none border-b h-10 overflow-x-auto' />
                            </div>


                        </div>

                    </div>
                    <div className="flex flex-col lg:flex-row w-full items-center gap-3 lg:gap-20">
                        <div className="mt-5 w-full lg:w-1/2 ">
                            <h1 className={`${text} text-center text-lg font-bold`}>Upload Front ID Image</h1>

                            <div className="md:h-60 h-48  w-11/12 mx-auto relative">
                                <label className={`${frontimg.img ? '' : 'border-2 border-black'} mt-5 w-full  h-full border-dashed flex cursor-pointer items-center justify-center `}>
                                    {frontimg.img ? <div className="">
                                        <div onChange={changeImagefront} className="absolute top-0 right-3 main font-bold ">
                                            <FaEdit className='text-2xl' />
                                        </div>
                                        <img src={frontimg.img} className='w-full h-48' />
                                    </div> : <FaPlus className='text-2xl' />}
                                    <input type="file" onChange={handleImageFront} hidden ref={frontRef} />
                                </label>
                            </div>
                        </div>
                        <div className="mt-5 w-full lg:w-1/2 ">
                            <h1 className={`${text} text-center text-lg font-bold`}>Upload Back ID Image</h1>

                            <div className="md:h-60 h-48 w-11/12 mx-auto relative ">
                                <label className={`${backimg.img ? '' : 'border-2 border-black border-dashed'} mt-5 w-full h-full  flex cursor-pointer items-center justify-center `}>
                                    {backimg.img ? <div className="">
                                        <div r onChange={changeImageback} className="absolute top-0 right-3 main font-bold ">
                                            <FaEdit className='text-2xl' />
                                        </div>
                                        <img src={backimg.img} className='w-full h-48' />
                                    </div> : <FaPlus className='text-2xl' />}
                                    <input type="file" onChange={handleImageBack} hidden ref={backRef} />
                                </label>
                            </div>
                        </div>
                    </div>
                   <div className="mt-5 w-full flex items-center justify-center">
                   <button className='w-3/4 md:w-1/2 mx-auto bg-ash py-3 hover:bg-ash/90 rounded-md'>Submit</button>
                   </div>

                </form>

            </div >


        </AuthPageLayout>
    )
}

export default UserKYC