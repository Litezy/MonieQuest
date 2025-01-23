import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import user from '../../assets/images/customer1.jfif'
import { MdVerified, MdOutlineDateRange, MdEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { HiUser } from "react-icons/hi2";
import { BiSolidEditAlt, BiSolidPhoneCall } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import moment from 'moment';
import FormInput from '../../utils/FormInput';
import PasswordInputField from '../../utils/PasswordInputField';
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils';
import FormButton from '../../utils/FormButton';

const Profile = () => {
  const [form, setForm] = useState({
    first_name: '',
    surname: '',
    email: '',
    username: '',
    phone: '',
    old_password: '',
    new_password: '',
    bank: '',
    account_number: '',
    account_name: ''
  })
  const [profile, setProfile] = useState({
    img: user,
    image: null
  })
  const imgref = useRef()
  const navigate = useNavigate()

  const logoutAccount = () => {
    // Cookies.remove(CookieName)
    navigate('/')
  }

  const formHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleProfileUpload = (event) => {
    const file = event.target.files[0]
    if (file.size >= 1000000) {
      imgref.current.value = null
      return ErrorAlert('Image size too large, file must not exceed 1mb')
    }
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      return ErrorAlert('File error, upload a valid image format (jpg, jpeg, png, svg)')
    }
    setProfile({
      img: URL.createObjectURL(file),
      image: file
    })
  }



  return (
    <div>
      <div className='h-36 w-full -mt-6 py-8 bg-gradient-to-br from-ash to-primary'>
        <div className='w-11/12 mx-auto flex gap-2 justify-end items-center text-2xl font-bold uppercase mt-14'>
          <span>profile</span>
          <FaRegUserCircle className='text-lightgreen' />
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <div className='flex md:flex-row flex-col justify-between'>
          <div className='flex flex-col gap-4 -mt-20'>
            <div className='relative w-fit'>
              <img src={profile.img} className='h-44 w-44 object-cover border-8 border-[#141523] rounded-full'></img>
              <label>
                <div className='bg-primary rounded-full w-fit h-fit p-2 text-xl absolute bottom-4 right-0 border border-secondary cursor-pointer text-lightgreen'>
                  <BiSolidEditAlt />
                </div>
                <input ref={imgref} type="file" onChange={handleProfileUpload} hidden />
              </label>
            </div>
            <div className='text-2xl font-bold capitalize'>allen williams</div>
            <div className='flex items-center gap-2 capitalize text-sm'>
              <div className='flex gap-1 items-center'>
                <span>verified</span>
                <MdVerified className='text-lightgreen' />
              </div>
              <div className='pl-2 border-l flex gap-1 items-center'>
                <span>joined:</span>
                <span>{moment().format('DD-MM-yyyy')}</span>
                <MdOutlineDateRange className='text-lightgreen' />
              </div>
            </div>
          </div>
          <div className='bg-primary w-fit h-fit py-1.5 px-5 rounded-lg md:text-base text-sm text-red-600 font-medium flex gap-1 items-center mt-4 cursor-pointer hover:bg-[#2f2f47]' onClick={logoutAccount}>
            <IoLogOut />
            <span>Log out</span>
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-6 mt-16'>
            <div className='text-xl capitalize font-medium text-lightgreen'>personal details</div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
              <div className='relative'>
                <FormInput label='First name' placeholder='Your first name' name='first_name' value={form.first_name} onChange={formHandler} className='!pl-4 !pr-10' />
                <HiUser className='absolute top-10 right-3 text-xl text-gray-400' />
              </div>
              <div className='relative'>
                <FormInput label='Surname' placeholder='Your surname' name='surname' value={form.surname} onChange={formHandler} className='!pl-4 !pr-10' />
                <HiUser className='absolute top-10 right-3 text-xl text-gray-400' />
              </div>
              <div className='relative'>
                <FormInput label='Email address' placeholder='example@gmail.com' name='email' value={form.email} onChange={formHandler} type='email' className='!pl-4 !pr-10' />
                <MdEmail className='absolute top-10 right-3 text-xl text-gray-400' />
              </div>
              <div className='relative'>
                <FormInput label='Phone number' placeholder='Phone number' name='phone' value={form.phone} onChange={formHandler} className='!pl-4 !pr-10' />
                <BiSolidPhoneCall className='absolute top-10 right-3 text-xl text-gray-400' />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='text-xl capitalize font-medium text-lightgreen'>password & security</div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
              <PasswordInputField label='Old password' placeholder='Enter old password' name='old_password' value={form.old_password} onChange={formHandler} className={{ icon: '!text-gray-400' }} />
              <PasswordInputField label='New password' placeholder='Create new password' name='new_password' value={form.new_password} onChange={formHandler} className={{ icon: '!text-gray-400' }} />
            </div>
          </div>
          <div>
            <FormButton title='Save changes' className='!max-w-sm' />
          </div>
          <div className='flex flex-col gap-6'>
            <div className='text-xl capitalize font-medium text-lightgreen'>add a bank account</div>
            <div className='w-fit h-fit bg-primary rounded-2xl p-4 flex flex-col gap-1'>
              <FormInput placeholder='Bank name' name='bank' value={form.bank} onChange={formHandler} className='!bg-secondary !w-60' border={false} />
              <FormInput placeholder='Account number' name='account_number' value={form.account_number} onChange={formHandler} className='!bg-secondary !w-60' border={false} />
              <FormInput placeholder='Account name' name='account_name' value={form.account_name} onChange={formHandler} className='!bg-secondary !w-60' border={false} />
              <FormButton title='Save' className='!py-3 !text-base mt-2' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile