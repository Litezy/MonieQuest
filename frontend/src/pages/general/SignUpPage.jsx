import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInputField from '../../utils/PasswordInputField'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { ErrorAlert, MoveToTop } from '../../utils/pageUtils'
import Loading from '../../GeneralComponents/Loading'
import logo from '../../assets/images/logo.png'

const SignUpPage = () => {
  const [check, setCheck] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    first_name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    referral_id: ''
  })
  const formHandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const CreateAccount = (e) => {
    e.preventDefault()

    if (!form.first_name) return ErrorAlert('Enter first name')
    if (!form.surname) return ErrorAlert('Enter surname')
    if (!form.email) return ErrorAlert('Enter email address')
    if (!form.phone) return ErrorAlert('Enter phone number')
    if (!form.password) return ErrorAlert('Create a password')
    if (!form.confirm_password) return ErrorAlert('Confirm passsword')
    if (form.password !== form.confirm_password) return ErrorAlert('Password(s) mismatch')
    if (!check) return ErrorAlert('Must agree with terms and privacy policy')
    navigate(`/verify-account?v=${form.email}`)
    MoveToTop()
  }


  return (
    <div className="w-full h-[100dvh] overflow-y-auto bg-dark">
      <div className='w-11/12 mx-auto py-10'>
        <div className='flex items-center justify-center max-w-xl mx-auto relative'>
          {loading && <Loading />}
          <div className='w-full h-full flex flex-col text-zinc-300'>
            <div className="flex items-center justify-center w-full">
              <img src={logo} className='w-52' alt="logo alt" />
            </div>
            <div className='text-3xl font-bold text-center'>Create an account</div>
            <div className='text-sm mt-2 text-center'>Already have an account? <Link to='/login' onClick={MoveToTop} className='text-lightgreen cursor-pointer'>Sign in</Link></div>
            <form className='flex flex-col gap-5 mt-10' onSubmit={CreateAccount}>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                <FormInput label='First name' placeholder='Your first name' name='first_name' value={form.first_name} onChange={formHandler} />
                <FormInput label='Surname' placeholder='Your surname' name='surname' value={form.surname} onChange={formHandler} />
              </div>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                <FormInput label='Email address' placeholder='example@gmail.com' name='email' value={form.email} onChange={formHandler} type='email' />
                <FormInput label='Phone number' placeholder='Phone number' name='phone' value={form.phone} onChange={formHandler} />
              </div>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                <PasswordInputField label='Password' placeholder='password' name='password' value={form.password} onChange={formHandler} />
                <PasswordInputField label='Confirm password' placeholder='Confirm password' name='confirm_password' value={form.confirm_password} onChange={formHandler} />
              </div>
              <div className='flex flex-col gap-5 items-center'>
                <div className='flex gap-2 text-sm'>
                  <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className='outline-none'></input>
                  <span>I agree to MonieQuest <Link to='/terms' onClick={MoveToTop} className='text-lightgreen'>Terms and Conditions</Link> and <Link to='/privacy-policy' onClick={MoveToTop} className='text-lightgreen'>Privacy Policy</Link></span>
                </div>
                <FormButton title='Sign up' className='!w-5/6' />
                <Link className='text-sm text-lightgreen underline' to={'/'}>Go Back Home</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage