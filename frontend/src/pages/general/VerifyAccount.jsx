import React, { useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import PinForm from '../../utils/PinForm';
import FormButton from '../../utils/FormButton';
import { ErrorAlert } from '../../utils/pageUtils';
import { LuCheck } from "react-icons/lu";
import { useSearchParams } from 'react-router-dom';
import Loading from '../../GeneralComponents/Loading';

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
        <PageLayout>
            <div className='w-11/12 mx-auto py-28'>
                <div className='flex items-center justify-center max-w-lg mx-auto relative'>
                    {loading && <Loading />}
                    <div className='w-full h-full flex flex-col'>
                        <div className='text-3xl font-bold text-center'>Verify Email</div>
                        {screen === 1 &&
                            <>
                                <div className='text-lg font-bold text-center mt-8'>Enter the 6 digit code sent to {userEmail}</div>
                                <form className='mt-6 flex flex-col gap-10 items-center' onSubmit={VerifyEmail}>
                                    <PinForm
                                        pins={pins}
                                        setPins={setPins}
                                    />
                                    <FormButton title='Verify' className={`${checkPins.length < 6 ? '!bg-zinc-200 !hover:bg-none' : '!bg-ash hover:!bg-lightgreen'} !w-fit px-36`} />
                                </form>
                            </>
                        }
                        {screen === 2 &&
                            <form className='flex flex-col items-center justify-center mt-6'>
                                <div className='w-16 h-16 rounded-full flex items-center justify-center border border-ash text-ash text-lg bg-gradient-to-br from-[#5a8b94] from-55% to-white'><LuCheck /></div>
                                <div className='text-3xl font-bold text-center mt-6'>Email Verification <br></br>Succcessful</div>
                                <div className='text-center mt-4 text-sm'>Your email has been verified</div>
                                <FormButton title='Continue to sign in' className='!w-fit px-28 mt-10' />
                            </form>
                        }
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default VerifyAccount