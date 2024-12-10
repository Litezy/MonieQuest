import React, { useState } from 'react'
import PinForm from '../../utils/PinForm';
import FormButton from '../../utils/FormButton';
import { ErrorAlert, MoveToTop } from '../../utils/pageUtils';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from '../../GeneralComponents/Loading';
import SuccessCheck from '../../utils/SuccessCheck';

const VerifyAccount = () => {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useSearchParams()
    const userEmail = search.get('v')
    const [screen, setScreen] = useState(1)
    const [pins, setPins] = useState(['', '', '', '', '', '']);
    const checkPins = pins.join('')

    const VerifyEmail = (e) => {
        e.preventDefault()
        if (checkPins.length < 6) return ErrorAlert('Enter code sent to email')
        // console.log(checkPins)
        setScreen(2)
    }

    return (
            <div className='w-11/12 mx-auto py-20'>
                <div className='flex items-center justify-center max-w-md mx-auto relative'>
                    {loading && <Loading />}
                    <div className='w-full h-full flex flex-col'>
                        <div className='text-3xl font-bold text-center'>Verify Email</div>
                        {screen === 1 &&
                            <>
                                <div className='text-lg font-bold text-center mt-6'>Enter the 6 digit code sent to {userEmail}</div>
                                <form className='mt-6 flex flex-col gap-10 items-center' onSubmit={VerifyEmail}>
                                    <PinForm
                                        pins={pins}
                                        setPins={setPins}
                                    />
                                    <FormButton title='Verify' className={`${checkPins.length < 6 ? '!bg-zinc-200 !hover:bg-none' : '!bg-ash hover:!bg-lightgreen'}`} />
                                </form>
                            </>
                        }
                        {screen === 2 &&
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-4 items-center justify-center mt-6'>
                                    <SuccessCheck />
                                    <div className='text-3xl font-bold text-center'>Email Verification <br></br>Succcessful</div>
                                    <div className='text-center text-sm'>Your email address has been successfully verified</div>
                                </div>
                                <Link to='/login' onClick={MoveToTop}>
                                    <FormButton title='Continue to sign in' />
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
    )
}

export default VerifyAccount