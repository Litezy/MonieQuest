import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { Link } from 'react-router-dom'
import PasswordInputField from '../../utils/PasswordInputField'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { ErrorAlert } from '../../utils/pageUtils'

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const formHandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const LoginAccount = (e) => {
    e.preventDefault()

    if (!form.email) return ErrorAlert('Enter email address')
    if (!form.password) return ErrorAlert('Enter password')
  }

  return (
    <PageLayout>
      <div className='w-11/12 mx-auto py-20'>
        <div className='flex items-center justify-center max-w-md mx-auto'>
          <div className='w-full h-full flex flex-col'>
            <div className='uppercase text-2xl font-extrabold italic text-center'>velo<span className='text-orange'>x</span>
            </div>
            <div className='text-3xl font-bold text-center mt-8'>Welcome back!</div>
            <div className='text-sm mt-2 text-center'>New to Velox? <Link to='/signup' className='text-orange cursor-pointer'>Create account</Link></div>
            <form className='flex flex-col gap-4 mt-10' onSubmit={LoginAccount}>
              <FormInput label='Email address' placeholder='example@gmail.com' name='email' value={form.email} onChange={formHandler} type='email' />
              <PasswordInputField label='Password' placeholder='*********' name='password' value={form.password} onChange={formHandler} />
              <div className='flex flex-col gap-4'>
                <div className='text-orange text-sm ml-auto cursor-pointer'>Can't remember password?</div>
                <FormButton title='Sign in' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default LoginPage