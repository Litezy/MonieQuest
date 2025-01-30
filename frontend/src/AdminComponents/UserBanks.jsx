import React, {  useState } from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";
import FormInput from '../utils/FormInput';


const UserBanks = ({ setActive }) => {
  
    const [banksArr, setBanksArr] = useState( [
                { bank_name: 'Moniepoint', account_name: 'Basit Monie', account_number: 147588488433, },
                { bank_name: 'Moniepoint', account_name: 'Basit Monie', account_number: 147588488433, },
                ])
    return (
        <div className='w-full'>
            <div className="w-full flex items-center justify-between">
                <div onClick={() => setActive(0)} className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                    <IoReturnUpBackOutline className='text-2xl' />
                </div>
                <div className="text-lg font-semibold">User Banks</div>
            </div>

            <div className="my-5 bg-white text-dark w-full h-fit p-5 rounded-md shadow-md">
                <div className="text-center text-xl font-semibold" >{banksArr.length === 0 ? `${banksArr.length} bank`:`${banksArr.length} banks`} submitted    </div>


            </div>

            <div className="">
                {banksArr.map((item, i) => {
                    return (
                        <form className="h-fit w-full relative bg-white rounded-lg mb-3 p-2" key={i}>

                            <div className="w-full text-primary flex items-start gap-2 flex-col ">
                                <div className="self-center md:text-2xl text-lg  font-semibold">{item.account_name}'s {item.bank_name} Bank Details</div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Holder's Fullname:</div>
                                    <FormInput value={item.account_name} />
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Bank Name:</div>
                                    <FormInput value={item.bank_name} />
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Bank Account No:</div>
                                    <FormInput value={item.account_number} />
                                </div>
                                
                            </div>
                        </form>
                    )
                })}
            </div>
        </div>
    )
}

export default UserBanks