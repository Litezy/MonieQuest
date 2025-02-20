import React, { useEffect } from 'react'
import AuthFooter from './AuthFooter'
import { links } from './AuthUtils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatar.svg'
import { ErrorAlert, MoveToTop, SuccessAlert } from '../utils/pageUtils'
import { Apis, AuthGetApi, AuthPostApi, imageurl } from '../services/API'
import { useAtom } from 'jotai'
import { BANK, PROFILE, UTILS, WALLET } from '../services/store'



const AuthPageLayout = ({ children }) => {
  const [user] = useAtom(PROFILE)
  const [, setWallet] = useAtom(WALLET)
  const [, setBank] = useAtom(BANK)
  const [, setUtils] = useAtom(UTILS)
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname
  const active = 'text-lightgreen rounded-sm bg-[#1e333c]'
  const nonactive = 'hover:bg-primary rounded-sm text-[#9696b5]'

  useEffect(() => {
    const FetchWalletBankAndUtils = async () => {
      try {
        const response = await AuthGetApi(Apis.user.wallet_bank_utils)
        if (response.status === 200) {
          setBank(response.bank)
          setWallet(response.wallet)
          setUtils(response.utils)
        } else {
          console.log(response.msg)
        }
      } catch (error) {
        //
      }
    }
    FetchWalletBankAndUtils()
  }, [])

  const SendOTP = async () => {
    try {
      const res = await AuthPostApi(Apis.user.send_otp, { email: user.email })
      if (res.status === 200) {
        SuccessAlert(res.msg)
      } else {
        ErrorAlert(res.msg)
      }
    } catch (error) {
      ErrorAlert(`${error.message}`)
    }
  }
  useEffect(() => {
    if (user.email_verified === 'false') {
      SendOTP()
      navigate(`/verify-account?v=${user?.email}`)
    }
  }, [user.email_verified, navigate])

  return (
    <div className='w-full'>

      <div className="flex w-full bg-[#1d1e30]">
        <div
          className="h-screen z-30 hidden lg:block lg:w-[20%] pt-10 overflow-hidden">
          <div>
            <img src={logo} alt='moniequest-logo' className='h-14 w-auto mx-auto'></img>
          </div>
          <div onClick={() => navigate(`/user/profile`)} className='flex cursor-pointer gap-2 items-center justify-center mt-6 bg-primary p-4 rounded-lg w-11/12 h-fit mx-auto'>
            <img src={user.image ? `${imageurl}/profiles/${user.image}` : avatar} alt='user_profile' className='size-14 object-cover rounded-full border-2 border-ash'></img>
            <div className='text-xl text-center font-bold capitalize text-gray-200'>{user?.surname} {user?.first_name}</div>
          </div>
          <div className="flex mt-10 pb-10 flex-col items-start px-5 gap-4 h-[65vh] overflow-y-auto scroll">
            {links.map((link, i) => {
              return (
                <Link onClick={MoveToTop} to={link.url}
                  className={` py-2 group text-base flex items-center gap-2 px-5 w-full capitalize ${pathName === link.url || pathName.includes(link.main) ? active : nonactive} `} key={i}>
                  <div className="relative">
                    {link.label === 'notifications' && <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-red-600 z-40"></div>}
                    <link.icon className="transform group-hover:rotate-180 text-xl duration-300" />
                  </div>
                  <div>{link.label}</div>
                </Link>
              )
            })}
            <a
              target="_blank"
              href="mailto:officialmoniequest@gmail.com?subject=Hello&body=I%20am%20looking%20to%20contact%20support."
              className="text-sm px-3 py-2 mb-2 rounded-md bg-ash text-white"
            >
              Not Seeing What You Need? Tap and Contact Support Now!
            </a>
          </div>
        </div>
        <div className='lg:w-[80%] w-full h-screen bg-[#141523] pb-20 pt-5 lg:pb-5   overflow-y-auto overflow-x-hidden text-white'>
          {children}
        </div>
      </div>

      {user.email_verified !== 'false' && <div className="lg:hidden">
        <AuthFooter />
      </div>}
    </div>
  )
}

export default AuthPageLayout