import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { Link } from 'react-router-dom'
import PasswordInputField from '../../utils/PasswordInputField'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { ErrorAlert } from '../../utils/pageUtils'
import Loading from '../../GeneralComponents/Loading'

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
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
    setLoading(true)

  }

  return (
    <PageLayout>
      <div className='w-11/12 mx-auto py-28'>
        <div className='flex items-center justify-center max-w-md mx-auto relative'>
          {loading && <Loading />}
          <div className='w-full h-full flex flex-col'>
            <div className='text-3xl font-bold text-center'>Welcome back!</div>
            <div className='text-sm mt-2 text-center'>New to MonieQuest? <Link to='/signup' className='text-ash cursor-pointer'>Create account</Link></div>
            <form className='flex flex-col gap-4 mt-10' onSubmit={LoginAccount}>
              <FormInput label='Email address' placeholder='example@gmail.com' name='email' value={form.email} onChange={formHandler} type='email' />
              <PasswordInputField label='Password' placeholder='*********' name='password' value={form.password} onChange={formHandler} />
              <div className='flex flex-col gap-4'>
                <Link to='/forgot-password' className='text-ash text-sm ml-auto cursor-pointer'>Can't remember password?</Link>
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