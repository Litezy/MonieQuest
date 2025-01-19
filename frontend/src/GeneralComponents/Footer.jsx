import React, { useState } from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import FormInput from '../utils/FormInput';
import FormButton from '../utils/FormButton';
import { ErrorAlert, MoveToTop } from '../utils/pageUtils';
import Loading from './Loading';

const Socials = [
  { href: '', icon: RiFacebookFill },
  { href: '', icon: FaInstagram },
  { href: '', icon: FaXTwitter },
  { href: '', icon: FaLinkedin }
]

const pageLinks = [
  { path: 'about us', url: '/about' },
  { path: 'contact us', url: '/contact' },
  { path: 'terms & conditions', url: '/terms' },
  { path: 'privacy policy', url: '/privacy-policy' },
]

const Footer = () => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    phone: '',
  })
  const formHandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const SubmitForm = (e) => {
    e.preventDefault()

    if (!form.email || !form.phone) return ErrorAlert('Enter email address and phone number')
    setLoading(true)
  }

  return (
    <div className="w-full bg-dark">
      <div className='w-11/12 mx-auto border-t border-t-ash py-5'>
        <div className='flex flex-col gap-2 pb-4'>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='w-full h-fit p-5 bg-slate-100 border-b flex flex-col gap-2 text-sm'>
                <div className='font-[600] text-primary'>Please feel free to contact our Corporate team on:</div>
                <div className='flex items-center gap-2'>
                  <AiOutlineMail />
                  <span className='text-ash'>corporate@moniequest.com</span>
                </div>
                <div className='flex items-center gap-2'>
                  <LuPhone />
                  <span className='text-ash'>09087654327</span>
                </div>
              </div>
              <div className='flex flex-col gap-4 mt-4 text-sm text-white font-medium'>
                <span>Follow us!</span>
                <span>Stay tuned and access latest deals and discounts with:</span>
                <div className='flex items-center gap-4 mt-2'>
                  {Socials.map((item, i) => (
                    <a href={item.href} className='w-fit h-fit bg-ash hover:bg-primary rounded-md text-lg p-2' key={i}><item.icon /></a>
                  ))}
                </div>
              </div>
            </div>
            <div className='py-3 lg:px-4 text-gray-200 text-sm relative'>
              {loading && <Loading />}
              <div className="flex gap-2 flex-col">
                <div className='text-lightgreen md:text-base text-sm text-center'>Don't miss out on the latest Airdrops</div>
                <div className='md:text-4xl text-2xl text-center'>Be the first to know</div>
                <div className='text-base text-center'>Join our 2.5k MQ Squad and gain access to the latest
                  Contact our Nigerian Local Team @08186890156 Airdrops, best Crypto rewards and must know tips
                  To stay ahead in the crypto world!</div>
              </div>
              <form className='flex flex-col gap-3 mt-6' onSubmit={SubmitForm}>
                <FormInput placeholder='Email address' type='email' name='email' value={form.email} onChange={formHandler} className='text-white !rounded-md' />
                <div className='relative'>
                  <FormInput placeholder='Phone number' name='phone' value={form.phone} onChange={formHandler} className='text-white !rounded-md' />
                  <div className='absolute top-2 right-0'>
                    <FormButton title='Subscribe' className='!py-3.5 !px-8 !text-ash text-sm !rounded-md !font-semibold !bg-lightgreen' />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='w-full border-b border-b-ash h-fit py-4 text-white'>
            <div className='w-11/12 mx-auto'>
              <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
                {pageLinks.map((item, i) => (
                  <Link to={item.url} key={i} className='hover:text-lightgreen text-sm w-fit capitalize' onClick={MoveToTop}>{item.path}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer