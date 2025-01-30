import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../GeneralComponents/Loader'
import ModalLayout from '../utils/ModalLayout'


const KycModal = ({data,setModal}) => {
    const refdiv = useRef(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [approve, setApprove] = useState(false)
    const [decline, setDecline] = useState(false)

   

    


    // const DeclineKyc = async () => {
    //     const formdata = {
    //         id: user.id
    //     }
    //     setLoading(true)
    //     try {
    //         const response = await PostApi(Apis.admin.overturn_kyc, formdata)
    //         if (response.status !== 200) return errorMessage(response.msg)
    //             successMessage(response.msg)
    //             setDecline(false)
    //            setTimeout(()=>{
    //             navigate(`/admin/kycs`)
    //            },200)
    //     } catch (error) {
    //         errorMessage(error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    // const ApproveKyc = async () => {
    //     const formdata = {
    //         id: user.id
    //     }
    //     setLoading(true)
    //     try {
    //         const response = await PostApi(Apis.admin.approve_kyc, formdata)
    //         if (response.status !== 200) return errorMessage(response.msg)
    //             successMessage(response.msg)
    //             setDecline(false)
    //            setTimeout(()=>{
    //             navigate(`/admin/kycs/verified`)
    //            },200)
    //     } catch (error) {
    //         errorMessage(error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    return (
        <div className="w-full mx-auto mt-5 relative">
            <div ref={refdiv}

                className={`  shadow-xl bg-white text-dark rounded-md py-5`}>
                <div className="flex items-center justify-center w-10/12 mx-auto mb-4">
                    <button onClick={()=> setModal(false)}
                        className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                        <IoReturnUpBackOutline className='text-2xl' />
                    </button>
                    <h1 className='text-center py-4 font-bold '>KYC submission from </h1>
                </div>



                {loading &&
                    <div className="absolute top-0  backdrop-blur-sm w-full h-full rounded-md left-1/2 -translate-x-1/2">
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-fit p-5 rounded-md bg-white"><Loader /></div>
                    </div>
                }
                <div className="flex w-11/12 mx-auto items-baseline">
                    <div className="flex flex-col gap-2 w-1/2">
                        <div className="">
                            <h1 className='text-sm'>First Name:</h1>
                            <h1 className='font-bold text-md'>{data?.userkycs?.firstname}</h1>
                        </div>
                        <div className=" text-md">
                            <h1 className='text-sm'>Last Name:</h1>
                            <h1 className='font-bold '>{data?.userkycs?.lastname}</h1>
                        </div>
                        <div className="text-md">
                            <h1 className='text-sm'>Date Of Birth:</h1>
                            <h1 className='font-bold '>{data.dob}</h1>
                        </div>

                    </div>
                    <div className="">
                        
                        <div className="">
                            <h1>ID Card Type</h1>
                            <h1 className='capitalize font-bold '>{data.id_type}</h1>
                        </div>
                        <div className="">
                            <h1>ID Card No</h1>
                            <h1 className='font-bold '>{data.id_number}</h1>
                        </div>
                        
                    </div>
                </div>
                <div className="w-11/12 items-center flex-col lg:flex-row gap-10 mx-auto mt-6  flex ">
                    <div className="lg:w-1/2 ">
                        <h1>ID Front Photo</h1>
                        {/* <img src={`${profileImg}/kycs/${user?.userkycs?.firstname} ${user?.userkycs?.lastname}'s kyc/${user.frontimg}`} className='w-full md:h-96 object-contain' alt="" /> */}
                    </div>
                    <div className="lg:w-1/2">
                        <h1>ID Back Photo</h1>
                        {/* <img src={`${profileImg}/kycs/${user?.userkycs?.firstname} ${user?.userkycs?.lastname}'s kyc/${user.backimg}`} className='w-full md:h-96 object-contain' alt="" /> */}
                    </div>
                </div>
                {/* {user?.status === 'pending' && <div className="w-11/12 mt-10 mb-5 mx-auto flex items-center justify-between">
                    <button onClick={() => setDecline(prev => !prev)} className='px-4 py-2 bg-red-500 text-white rounded-md'>Decline Kyc</button>
                    <button onClick={() => setApprove(prev => !prev)} className='px-4 py-2 bg-green-500 text-white rounded-md'>Approve Kyc</button>
                </div>
                } */}
                {decline &&
                    <ModalLayout setModal={setDecline} clas={`lg:w-[50%] w-10/12 mx-auto`}>
                        <div className="p-5  bg-white shadow-xl rounded-md">
                            <div className="text-base text-center mb-3">Are you sure you want to decline</div>
                            <div className="flex items-center justify-between">
                                <button onClick={() => setDecline(false)} className='px-4 py-2 bg-red-500 text-white rounded-md'>Cancel</button>
                                <button  className='px-4 py-2 bg-green-500 text-white rounded-md'>Confirm Decline</button>
                            </div>

                        </div>
                    </ModalLayout>
                }
                {approve &&
                    <ModalLayout setModal={setApprove} clas={`lg:w-[50%] w-10/12 mx-auto`}>
                        <div className="p-5  bg-white shadow-xl rounded-md">
                            <div className="text-base text-center mb-3">Are you sure you want to approve</div>
                            <div className="flex items-center justify-between">
                                <button onClick={() => setApprove(false)} className='px-4 py-2 bg-red-500 text-white rounded-md'>Cancel</button>
                                <button  className='px-4 py-2 bg-green-500 text-white rounded-md'>Confirm Approval</button>
                            </div>

                        </div>
                    </ModalLayout>
                }
                
            </div>
        </div>
    )
}


export default KycModal