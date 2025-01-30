import React, { useState } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import FormInput from '../utils/FormInput';
import FormButton from '../utils/FormButton';
import Loader from '../GeneralComponents/Loader';
import ModalLayout from '../utils/ModalLayout';

const CreateUsers = ({ setActive }) => {
    const [forms, setForms] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        confirm_password: '',
    });
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className='w-full '>
            {loading &&
                <ModalLayout setModal={setLoading} clas={`w-11/12 mx-auto lg:w-[60%]`}>
                    <div className="absolute left-1/2 bg-white p-5 rounded-md -translate-x-1/2 top-1/2">
                        <Loader />
                    </div>
                </ModalLayout>
            }
            <div className="w-full flex items-center  justify-between">
                <div onClick={() => setActive(0)} className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                    <IoReturnUpBackOutline className='text-2xl' />
                </div>
                <div className="text-lg font-semibold">Create Users</div>
            </div>
            <div className="my-5 text-center poppins font-semibold">Create new user by entering the following details</div>
            <form className='shadow-xl w-full p-2 rounded-lg relative'>
                <div className="flex items-start flex-col   lg:flex-row gap-10">
                    <div className="flex flex-col items-start lg:w-3/4  w-full gap-3">
                        <div className="flex items-start gap-1 flex-col w-full ">
                            <div className="">First Name:</div>
                            <div className="w-full">
                            <FormInput name={`firstname`} value={forms.firstname} onchange={handleChange} />
                            </div>
                        </div>
                        <div className="flex items-start gap-1 flex-col w-full">
                            <div className="">Last Name:</div>
                            <div className="w-full">
                            <FormInput name={`lastname`} value={forms.lastname} onchange={handleChange} />
                            </div>
                        </div>

                        <div className="flex items-start gap-1 flex-col w-full">
                            <div className="">Phone No:</div>
                            <div className="w-full">
                            <FormInput type='phone' name={`phone`} value={forms.phone} onchange={handleChange} />
                            </div>
                        </div>



                    </div>
                    <div className="flex flex-col items-start lg:w-3/4  w-full gap-3">
                        <div className="flex items-start gap-1 flex-col w-full ">
                            <div className="">Email Address:</div>
                            <div className="w-full">
                            <FormInput type='email' name={`email`} value={forms.email} onchange={handleChange} />
                            </div>
                        </div>
                        <div className="flex items-start gap-1 flex-col w-full">
                            <div className="">Password:</div>
                            <div className="w-full">
                            <FormInput type='password' name={`password`} value={forms.password} onchange={handleChange} />
                            </div>
                        </div>
                        <div className="flex items-start gap-1 flex-col w-full">
                            <div className="">Confirm Password:</div>
                            <div className="w-full">
                            <FormInput className={`w-full`}  formtype='password' name={`confirm_password`} value={forms.confirm_password} onchange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 mx-auto mt-10">
                    <FormButton title={`Create User`} bg={`text-white bg-primary h-12 rounded-md`} />
                </div>
            </form>
        </div>
    )
}

export default CreateUsers