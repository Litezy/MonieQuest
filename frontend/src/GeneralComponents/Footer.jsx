import React, { useState } from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagram, FaXTwitter, FaLinkedin, FaTiktok, FaPinterestP } from "react-icons/fa6";
import { FaTelegramPlane, FaSnapchatGhost, FaYoutube, FaRedditAlien, FaQuora } from "react-icons/fa";
import { Link } from 'react-router-dom';
import FormInput from '../utils/FormInput';
import FormButton from '../utils/FormButton';
import { ErrorAlert, MoveToTop } from '../utils/pageUtils';
import Loading from './Loading';

const Socials = [
  { href: 'https://www.facebook.com/profile.php?id=61571510583455', icon: RiFacebookFill },
  { href: 'https://www.instagram.com/official_moniequest', icon: FaInstagram },
  { href: 'https://x.com/TheMonieQuest', icon: FaXTwitter },
  { href: 'https://www.youtube.com/@Official_MonieQuest', icon: FaYoutube },
  { href: 'http://t.me/Officialmoniequest', icon: FaTelegramPlane },
  { href: 'https://www.tiktok.com/@official_moniequest', icon: FaTiktok },
  { href: 'https://www.linkedin.com/in/MonieQuest/', icon: FaLinkedin },
  { href: 'https://www.reddit.com/u/TimeConversation6102/s/fg3X4zMJht', icon: FaRedditAlien },
  { href: 'https://www.snapchat.com/add/moniequest?share_id=DmZEmXUC8rk&locale=en-US', icon: FaSnapchatGhost },
  { href: 'http://www.pinterest.com/moniequest', icon: FaPinterestP },
  { href: 'https://www.quora.com/profile/Monie-Quest?ch=10&oid=2912302513&share=0b0a5353&srid=36peXp&target_type=user', icon: FaQuora },
]

const pageLinks = [
  { path: 'about us', url: '/about' },
  { path: 'contact us', url: '/contact' },
  { path: 'FAQS', url: '/faqs' },
  { path: 'terms & conditions', url: '/terms_of_service' },
  { path: 'privacy policy', url: '/privacy_policy' },
  { path: 'we are hiring', url: '/we_are_hiring' },
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
              <div className='grid md:grid-cols-6 grid-cols-2 gap-4'>
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