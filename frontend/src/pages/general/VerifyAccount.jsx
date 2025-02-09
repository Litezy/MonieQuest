import React, { useEffect, useState } from 'react'
import PinForm from '../../utils/PinForm';
import FormButton from '../../utils/FormButton';
import { ErrorAlert, MoveToTop, SuccessAlert } from '../../utils/pageUtils';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SuccessCheck from '../../utils/SuccessCheck';
import logo from '../../assets/images/logo.png'
import { Apis, AuthPostApi, PostApi } from '../../services/API';
import ModalLayout from '../../utils/ModalLayout';
import Loader from '../../GeneralComponents/Loader';



const VerifyAccount = () => {
    const [loading, setLoading] = useState({status:false,val:""})
    const [search, setSearch] = useSearchParams()
    const [resend, setResend] = useState(true)
    const navigate = useNavigate()
    const [countdown, setCountDown] = useState(40)
    const userEmail = search.get('v')
    const [screen, setScreen] = useState(1)
    const [pins, setPins] = useState(['', '', '', '', '', '']);
    const checkPins = pins.join('')

    const VerifyEmail = async (e) => {
        e.preventDefault()
        if (checkPins.length < 6) return ErrorAlert('Enter code sent to email')
        const formbody = {
            email: userEmail ? userEmail : profile?.email,
            code: checkPins
        }
        setLoading({status:true, val:'verifying'})
        try {
            const response = await PostApi(Apis.user.verify_email, formbody)
            if (response.status === 200) {
                await new Promise((resolve) => setTimeout(resolve, 2000))
                return setScreen(2)
            } else {
                ErrorAlert(response.msg)
            }
        } catch (error) {
            ErrorAlert(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let timer;
        if (resend) {
            timer = setInterval(() => {
                setCountDown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        setResend(false)
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000)
        }

        return () => clearInterval(timer)
    }, [resend])


    const resendPin = async (e) => {
        e.preventDefault()
        const formbody = {
            email: userEmail ,
        }
        setLoading({status:true, val:'resending'})
        try {
            const res = await AuthPostApi(Apis.user.send_otp, formbody)
            if (res.status !== 200) return ErrorAlert(res.msg)
            setCountDown(40)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            SuccessAlert(`Otp resent successfully`)
            setResend(true)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }

    }

    const gotoDashboard = () => {
        setCountDown(null)
        navigate(`/login`)
        MoveToTop()
    }
    return (
        <div className='bg-dark h-screen overflow-y-auto w-full'>
            {loading.status &&
                <ModalLayout>
                    <div className="w-full p-5 flex-col flex items-center justify-center">
                        <Loader />
                        <div className="text-white">...{loading.val}</div>
                    </div>
                </ModalLayout>
            }
            <div className='w-11/12 mx-auto pt-40 pb-20'>
                <div className='flex items-center justify-center max-w-md mx-auto relative'>
                    <div className='w-full h-full flex flex-col'>
                        <div className="flex items-center justify-center w-full ">
                            <img src={logo} className='w-52' alt="logo alt" />
                        </div>
                        <div className='text-3xl font-bold text-center text-zinc-200'>Verify Email</div>
                        {screen === 1 &&
                            <>
                                <div className='text-lg font-bold text-center mt-6 text-lightgreen'>Enter the 6 digit code sent to {userEmail}</div>
                                <form className='mt-6 flex flex-col gap-10 items-center' onSubmit={VerifyEmail}>
                                    <PinForm
                                        pins={pins}
                                        setPins={setPins}
                                    />

                                    {!resend ?
                                        <div className="w-fit ml-auto text-white flex flex-col items-end gap-1">
                                            <div className="">didn't get code?</div>
                                            <button type='button' onClick={resendPin} className='rounded-md text-dark w-fit px-4 py-1.5 bg-lightgreen'>resend</button>
                                        </div> :
                                        <div className="w-fit ml-auto text-white">resend in <span className='text-lightgreen'>{countdown}s</span></div>
                                    }
                                    <FormButton  title='Verify' className={`${checkPins.length < 6 ? '!bg-zinc-400 !hover:bg-none' : '!bg-ash hover:!bg-lightgreen'}`} />
                                </form>
                            </>
                        }
                        {screen === 2 &&
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-4 items-center justify-center mt-6'>
                                    <SuccessCheck />
                                    <div className='text-3xl font-bold text-center text-lightgreen'>Email Verification <br></br>Succcessful</div>
                                    <div className='text-center text-sm text-zinc-300'>Your email address has been successfully verified</div>
                                </div>
                                {/* <Link to='/login' onClick={MoveToTop}> */}
                                <FormButton type='button' onClick={gotoDashboard} title='Continue to sign in' />
                                {/* </Link> */}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount