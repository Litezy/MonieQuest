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
  { path: 'terms & conditions', url: '/terms' },
  { path: 'privacy policy', url: '/privacy-policy' },
  { path: 'contact us', url: '/contact' },
  { path: 'blog', url: '' },
]

const Footer = () => {
  const [email, setEmail] = useState('')
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)

  const SubmitForm = (e) => {
    e.preventDefault()

    if (!email) return ErrorAlert('Enter an email address')
    if (!check) return ErrorAlert('Must consent to receiving newsletter')
    setLoading(true)
  }

  return (
    <div className='w-11/12 mx-auto'>
      <div className='flex flex-col gap-2 pb-4'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='w-full h-fit p-5 bg-slate-100 border-b flex flex-col gap-2 text-sm'>
              <div className='font-[600] text-primary'>Please feel free to contact our Corporate team on:</div>
              <div className='flex items-center gap-2'>
                <AiOutlineMail />
                <span className='text-blue-500'>corporate@moniequest.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <LuPhone />
                <span className='text-blue-500'>09087654327</span>
                <button className='bg-primary w-fit h-fit p-2 text-xs rounded-md text-white'>Request a call now</button>
              </div>
            </div>
            <div className='flex flex-col gap-4 mt-4 text-sm text-primary font-medium'>
              <span>Follow us!</span>
              <span>Stay tuned and access latest deals and discounts with:</span>
              <div className='flex items-center gap-4 mt-2'>
                {Socials.map((item, i) => (
                  <a href={item.href} className='w-fit h-fit bg-gray-200 rounded-md text-lg p-2' key={i}><item.icon /></a>
                ))}
              </div>
            </div>
          </div>
          <div className='w-full h-fit bg-primary py-3 px-4 text-gray-200 text-sm relative' id='footer'>
            {loading && <Loading />}
            <div className='text-lightgreen text-center md:text-base text-sm'>Hundreds of Airdrops</div>
            <div className='text-center md:text-4xl text-2xl mt-4'>Be the first to know</div>
            <div className='text-center mt-6'>Join our newsletter and receive the latest giveaways, airdrops and crypto news straight in your inbox.</div>
            <form className='flex flex-col gap-3 mt-6' onSubmit={SubmitForm}>
              <FormInput placeholder='Email address' type='email' value={email} onChange={event => { setEmail(event.target.value) }} className='text-white !rounded-md' />
              <FormButton title='Subscribe' className='py-2 !text-ash text-sm !rounded-md !font-semibold !bg-lightgreen' />
              <div className='flex gap-2'>
                <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className='outline-none'></input>
                <div>I consent to receiving your newsletter and special offers via email.</div>
              </div>
            </form>
          </div>
        </div>
        <div className='w-full bg-primary h-fit py-4 text-white'>
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
  )
}

export default Footer