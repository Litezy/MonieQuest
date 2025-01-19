import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInputField from '../../utils/PasswordInputField'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { ErrorAlert, MoveToTop } from '../../utils/pageUtils'
import Loading from '../../GeneralComponents/Loading'
import logo from '../../assets/images/logo.png'

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
  const navigate = useNavigate()

  const LoginAccount = (e) => {
    e.preventDefault()
   navigate('/user/dashboard')
    // if (!form.email) return ErrorAlert('Enter email address')
    // if (!form.password) return ErrorAlert('Enter password')
    // setLoading(true)

  }

  return (
      <div className="w-full bg-dark h-[110dvh]">
        <div className='w-11/12 mx-auto pt-20 pb-10 '>
          <div className='flex items-center justify-center max-w-md mx-auto relative'>
            {loading && <Loading />}
            <div className='w-full h-full flex flex-col text-white'>
              <div className="flex items-center justify-center w-full">
                <img src={logo} className='w-52' alt="logo alt" />
              </div>
              <div className='text-3xl font-bold text-center text-white'>Welcome back!</div>
              <div className='text-sm mt-2 text-center text-zinc-300'>New to MonieQuest? <Link to='/signup' onClick={MoveToTop} className='text-lightgreen cursor-pointer'>Create account</Link></div>
              <form className='flex flex-col gap-5 mt-10' onSubmit={LoginAccount}>
                <FormInput label='Email address' placeholder='example@gmail.com' name='email' value={form.email} onChange={formHandler} type='email' />
                <PasswordInputField label='Password' placeholder='*********' name='password' value={form.password} onChange={formHandler} />
                <Link to='/forgot-password' onClick={MoveToTop} className='text-lightgreen text-sm cursor-pointer ml-auto'>Forgot password?</Link>
                <FormButton title='Sign in' />
                <Link className='text-sm text-center text-lightgreen underline' to={'/'}>Go Back Home</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LoginPage