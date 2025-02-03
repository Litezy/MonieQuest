import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthPageLayout from '../../AuthComponents/AuthPageLayout';
import Loader from '../../GeneralComponents/Loader';
import ModalLayout from '../../utils/ModalLayout';
import { ErrorAlert } from '../../utils/pageUtils';
import { TfiTimer } from 'react-icons/tfi';
import { Apis, AuthGetApi, AuthPostApi, imageurl } from '../../services/API';


const UserKYC = () => {
    const [kyc, setKyc] = useState({})
    const [loading, setLoading] = useState(false)
    const [screen, setScreen] = useState(1)
    const frontRef = useRef()
    const backRef = useRef()
    const [forms, setForms] = useState({
        address: '',
        date_of_birth: '',
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

    const FetchKYC = useCallback(async () => {
        try {
            const response = await AuthGetApi(Apis.user.user_kyc)
            if (response.status === 200) {
                setKyc(response.msg)
                setForms({
                    address: response.msg.address,
                    date_of_birth: response.msg.date_of_birth,
                    id_type: response.msg.id_type,
                    id_number: response.msg.id_number,
                })
                setfrontImg({
                    ...frontimg,
                    img: `${imageurl}/identities/${response.msg.front_image}`
                })
                setbackImg({
                    ...backimg,
                    img: `${imageurl}/identities/${response.msg.back_image}`
                })
            }
        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchKYC()
    }, [FetchKYC])

    const handleImageFront = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith(`image/`)) {
            frontRef.current.value = null
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
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
            return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
        }
        setbackImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const Submit = async (e) => {
        e.preventDefault()
        if (!forms.date_of_birth) return ErrorAlert('Date of birth is required')
        if (!forms.id_type) return ErrorAlert('ID type field is required')
        if (!forms.address) return ErrorAlert('Address field is required')
        if (!forms.id_number) return ErrorAlert('ID number field is required')
        if (Object.values(kyc).length === 0) {
            if (!frontimg.image) return ErrorAlert('ID front image is missing')
            if (!backimg.image) return ErrorAlert('ID back image is missing')
        }

        const formbody = new FormData()
        formbody.append('front_image', frontimg.image)
        formbody.append('back_image', backimg.image)
        formbody.append('date_of_birth', forms.date_of_birth)
        formbody.append('address', forms.address)
        formbody.append('id_type', forms.id_type)
        formbody.append('id_number', forms.id_number)

        setLoading(true)
        try {
            const response = await AuthPostApi(Apis.user.create_update_kyc, formbody)
            if (response.status === 200) {
                FetchKYC()
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

    const text = 'text-lightgreen'
    return (

        <AuthPageLayout>
            <div className=' w-11/12 mx-auto'>
                {screen === 1 && <div className="w-full">
                    <Link to={'/user/profile'} className="w-fit  rounded-md px-5 py-2 bg-ash text-white mr-auto cursor-pointer ">
                        back to profile
                    </Link>
                </div>}
                {screen === 1 &&
                    <form onSubmit={Submit} className=" h-fit relative   rounded-md text-sm  md:pt-3 ">

                        {loading &&
                            <ModalLayout clas={`w-11/12 mx-auto`}>
                                <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                                    <Loader />
                                    <div>...submitting</div>
                                </div>
                            </ModalLayout>
                        }
                        <div className='text-center text-lg bg-ash flex justify-between px-4 mt-4'>
                            <span>KYC status:</span>
                            {Object.values(kyc).length === 0 ?
                                <div className='w-24 h-2 rounded-full bg-slate-400 animate-pulse'></div>
                                :
                                <div className={`italic ${kyc?.status === 'verified' ? 'text-green-400' : kyc?.status === 'processing' ? 'text-yellow-300' : 'text-red-500'}`}>{kyc?.status}</div>
                            }
                        </div>
                        <div className="md:flex md:items-baseline gap-5 w-full">
                            <div className="md:w-1/2">
                                <div className="flex flex-col w-full mt-5  ">
                                    <h1 className={`${text}`} >Date of Birth</h1>
                                    <div class="relative max-w-sm w-1/2">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input name='date_of_birth' value={forms.date_of_birth} onChange={handleChange} datepicker datepicker-buttons datepicker-autoselect-today type="date" class="bg-white mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        <div className="grid md:grid-cols-2 grid-cols-1 w-full items-center gap-4 lg:gap-20 mt-5">
                            <div className="w-full">
                                <h1 className={`${text} text-center text-lg font-bold`}>Upload Front ID Image</h1>
                                <div className="md:h-64 h-48 w-full mt-5">
                                    <label className={`${frontimg.img ? '' : 'border-2 border-black'} w-full  h-full border-dashed flex cursor-pointer items-center justify-center `}>
                                        {frontimg.img ?
                                            <div className="relative w-full h-full">
                                                <div className="absolute top-0 -right-3 main font-bold">
                                                    <FaEdit className='text-2xl' />
                                                </div>
                                                <img src={frontimg.img} className='w-full h-full' />
                                            </div>
                                            : <FaPlus className='text-2xl' />
                                        }
                                        <input type="file" onChange={handleImageFront} hidden ref={frontRef} />
                                    </label>
                                </div>
                            </div>
                            <div className="w-full">
                                <h1 className={`${text} text-center text-lg font-bold`}>Upload Back ID Image</h1>
                                <div className="md:h-64 h-48 w-full mt-5">
                                    <label className={`${backimg.img ? '' : 'border-2 border-black border-dashed'} w-full h-full flex cursor-pointer items-center justify-center `}>
                                        {backimg.img ?
                                            <div className="relative w-full h-full">
                                                <div className="absolute top-0 -right-3 main font-bold">
                                                    <FaEdit className='text-2xl' />
                                                </div>
                                                <img src={backimg.img} className='w-full h-full' />
                                            </div>
                                            : <FaPlus className='text-2xl' />
                                        }
                                        <input type="file" onChange={handleImageBack} hidden ref={backRef} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 w-full flex items-center justify-center">
                            <button className='w-3/4 md:w-1/2 mx-auto bg-ash py-3 hover:bg-ash/90 rounded-md'>Submit</button>
                        </div>

                    </form>
                }
                {screen === 2 &&
                    <div className='w-full'>
                        <div className="w-11/12 lg:w-1/2 min-h-[70vh] mx-auto flex items-center justify-center">
                            <div className="flex items-center flex-col">
                                <div className="rounded-full h-20 w-20 flex items-center justify-center border border-lightgreen">
                                    <TfiTimer className='text-2xl text-lightgreen' />
                                </div>
                                <div className="mt-10 flex flex-col items-center gap-2">
                                    <div className="poppins">Your KYC has been uploaded, please note review takes upto 48hrs. Look out for an email from our team regarding the results of your submission. Thanks
                                    </div>
                                    <Link to={`/user/profile`} className={`bg-green-500  mt-10 hover:bg-lightgreen text-white hover:text-ash py-2 text-center rounded-md w-full`}>
                                        Go back to profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div >
        </AuthPageLayout>
    )
}

export default UserKYC