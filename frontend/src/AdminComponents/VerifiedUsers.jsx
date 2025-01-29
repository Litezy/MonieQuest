import React, { useState } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import KycModal from './KycModal'
import moment from 'moment'
import ModalLayout from '../utils/ModalLayout'

const VerifiedUsers = ({setActive}) => { 
        const [modal, setModal] = useState()
        const [selected, setSelected] = useState({})
        const [users, setUsers] = useState([
            {
                "status": 200,
                "msg": "fetch success",
                "data": {
                    "id": 4,
                    "dob": "1969-09-11",
                    "id_type": "driver's license/state ID",
                    "id_number": "Bunce659119GH9YS10",
                    "frontimg": "gillian-front-id.png",
                    "backimg": "gillian-back-id.png",
                    "status": "verified",
                    "createdAt": "2024-09-26T04:59:26.000Z",
                    "updatedAt": "2024-09-26T05:00:21.000Z",
                    "userid": 14,
                    "userkycs": {
                        "id": 14,
                        "firstname": "Gillian ",
                        "lastname": "Bunce ",
                        "kyc": "verified",
                        "email": "Slinkymushubunce69@gmail.com",
                        "role": "user",
                        "balance": 61457,
                        "currency": "£",
                        "phone": "07813534038",
                    }
                }
            },
            {
                "status": 200,
                "msg": "fetch success",
                "data": {
                    "id": 3,
                    "dob": "1969-09-11",
                    "id_type": "driver's license/state ID",
                    "id_number": "Bunce659119GH9YS10",
                    "frontimg": "gillian-front-id.png",
                    "backimg": "gillian-back-id.png",
                    "status": "verified",
                    "createdAt": "2024-09-26T04:59:26.000Z",
                    "updatedAt": "2024-09-26T05:00:21.000Z",
                    "userid": 13,
                    "userkycs": {
                        "id": 13,
                        "firstname": "Gillian ",
                        "lastname": "Bunce ",
                        "kyc": "verified",
                        "email": "Slinkymushubunce69@gmail.com",
                        "role": "user",
                        "balance": 61457,
                        "currency": "£",
                        "phone": "07813534038",
                    }
                }
            },
        ])
    
    
        const TableHeaders = [
            "User ID",
            "Full Name",
            "Date Submitted",
            "Date Verified",
            "View details",
        ]
    
        const filterSelect = (val) => {
            setSelected(val)
            setModal(true)
        }
    
        // useEffect(()=>{if(modal)return console.log(selected.data)},[modal])
        return (
            <div className="w-full ">
    
                {modal &&
                   <ModalLayout setModal={setModal} clas={`w-11/12 mx-auto lg:w-3/4`}>
                     <KycModal data={selected.data} setModal={setModal}/>
                   </ModalLayout>
                }
                <div className="w-full flex items-center justify-between">
                    <button onClick={()=> setActive(0)}
                        className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                        <IoReturnUpBackOutline className='text-2xl' />
                    </button>
                    <div className="text-lg font-semibold">Verified Kycs</div>
                </div>
    
                <div className="relative overflow-x-auto rounded-md mt-10">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className=" bg-primary lg:text-xl text-base text-white">
                            <tr >
                                {TableHeaders.map((item, index) => (
                                    <th scope="col" key={index} className="px-3 py-3 text-sm truncate">
                                        {item}
                                    </th>
                                ))}
                            </tr>
    
    
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((item, i) => (
                                <tr className=" border-b " key={i}>
                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap ">
                                        {item?.data?.id}
                                    </th>
    
                                    <td className="px-3 truncate py-3">
                                        {item?.data?.userkycs?.firstname} {item?.data?.userkycs?.lastname}
                                    </td>
                                    <td className="px-3 truncate py-3">
                                        {moment(item?.data?.createdAt).format(`DD-MM-YYYY hh:mm A`)}
                                    </td>
                                    <td className="px-3 truncate py-3">
                                        {moment(item?.data?.updatedAt).format(`DD-MM-YYYY hh:mm A`)}
                                    </td>
                                    <td className="px-3 py-3">
                                        <button onClick={() => filterSelect(item)}
                                            className="bg-gradient-to-tr from-primary to-sec text-white px-5 rounded-lg py-2">view details</button>
                                    </td>
                                </tr>
                            )) :
                                <tr className=" w-full truncate text-lg font-semibold flex items-center justify-center">
                                    <td>No pending Kyc's found</td>
                                </tr>
                            }
    
                        </tbody>
                    </table>
    
    
                </div>
            </div>
    
        )
    }
    
    


export default VerifiedUsers