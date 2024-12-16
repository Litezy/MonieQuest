import React, { useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { ErrorAlert, MoveToTop } from '../../utils/pageUtils'
import PinForm from '../../utils/PinForm'
import PasswordInputField from '../../utils/PasswordInputField'
import { Link } from 'react-router-dom'
import SuccessCheck from '../../utils/SuccessCheck'
import Header from '../../GeneralComponents/Header';

const ForgotPassword = () => {
  const [screen, setScreen] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(['', '', '', '', '', '']);
  const checkPins = pins.join('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm_password: ''
  })

  const formHandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const SendOTP = (e) => {
    e.preventDefault()

    if (!form.email) return ErrorAlert('Enter email address')
    setScreen(2)
  }

  const VerifyOTP = (e) => {
    e.preventDefault()

    if (checkPins.length < 6) return ErrorAlert('Enter code sent to email')
    setScreen(3)
  }

  const ChangePassword = (e) => {
    e.preventDefault()

    if (!form.password) return ErrorAlert('Create new password')
    if (!form.confirm_password) return ErrorAlert('Confirm password')
    if (form.password !== form.confirm_password) return ErrorAlert('Password(s) mismatch')
    setScreen(4)
  }


  return (
    <>
      <Header />
      <div className='w-11/12 mx-auto pt-40 pb-20'>
        <div className='flex items-center justify-center max-w-md mx-auto relative'>
          {loading && <Loading />}
          <div className='w-full h-full flex flex-col'>
            <div className='text-3xl font-bold text-center'>Forgot password</div>
            {screen === 1 &&
              <form onSubmit={SendOTP}>
                <div className='flex justify-center flex-col gap-2 items-center mt-6'>
                  <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                    <IoLockClosedOutline className='text-2xl' />
                  </div>
                  <div className='font-bold'>Trouble signing in?</div>
                  <div className='text-center text-sm font-[600]'>Enter your email address to find your account and reset password</div>
                </div>
                <div className='flex flex-col gap-5 mt-10'>
                  <FormInput label='Email address' type='email' placeholder='E.g: john14@gmail.com' name='email' value={form.email} onChange={formHandler} />
                  <FormButton title='Find account' />
                </div>
              </form>
            }
            {screen === 2 &&
              <form onSubmit={VerifyOTP}>
                <div className='flex justify-center flex-col gap-2 items-center mt-6'>
                  <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                    <MdVerified className='text-2xl' />
                  </div>
                  <div className='font-bold'>Verify your email address</div>
                  <div className='text-center text-sm'>A verification code was sent to your email address, enter the code below</div>
                </div>
                <div className='flex flex-col gap-5 items-center mt-10'>
                  <PinForm
                    pins={pins}
                    setPins={setPins}
                  />
                  <FormButton title='Verify email' className={`${checkPins.length < 6 ? '!bg-zinc-200 !hover:bg-none' : '!bg-ash hover:!bg-lightgreen'}`} />
                </div>
              </form>
            }
            {screen === 3 &&
              <form onSubmit={ChangePassword}>
                <div className='flex justify-center flex-col gap-2 items-center mt-6'>
                  <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                    <IoLockOpenOutline className='text-2xl' />
                  </div>
                  <div className='font-bold'>Password re-set</div>
                  <div className='text-center text-sm'>Set a new password for your account by filling the password fields below</div>
                </div>
                <div className='flex flex-col gap-5 mt-10'>
                  <PasswordInputField label='Password' placeholder='Create new password' name='password' value={form.password} onChange={formHandler} />
                  <PasswordInputField label='Confirm password' placeholder='Confirm password' name='confirm_password' value={form.confirm_password} onChange={formHandler} />
                  <FormButton title='Change password' />
                </div>
              </form>
            }
            {screen === 4 &&
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4 items-center justify-center mt-6'>
                  <SuccessCheck />
                  <div className='text-3xl font-bold text-center'>Password Reset <br></br>Succcessful</div>
                  <div className='text-center text-sm'>Password change successful, you can now sign in with new password created</div>
                </div>
                <Link to='/login' onClick={MoveToTop}>
                  <FormButton title='Continue to sign in' />
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword