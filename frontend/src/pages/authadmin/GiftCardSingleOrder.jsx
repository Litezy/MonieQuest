import React, { useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { currencies } from '../../AuthComponents/AuthUtils'
import SelectComp from '../../GeneralComponents/SelectComp'
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import Loader from '../../GeneralComponents/Loader'
import ModalLayout from '../../utils/ModalLayout'
import Lottie from 'react-lottie'
import animationData from '../../utils/lottie.json'

const GiftCardSingleOrder = () => {
    const [forms, setForms] = useState({
        amount: '', valid: '', error: ''
    })

    const [screen, setScreen] = useState(1)
    const [confirmBad, setConfirmBad] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState(false)
    const [loading, setLoading] = useState({
        status: false, param: ''
    })
    const [credited, setCredited] = useState(false)
    const [applyAmt, setApplyAmt] = useState(false)
    const green = `text-lightgreen`

    const statuses = [`Yes`, `No`]
    const { id } = useParams()
    const navigate = useNavigate()
    const handleChange = () => {
        const amt = '1,500'
        const formatVal = amt.replace(/,/g, '')
        setForms({ ...forms, amount: formatVal })
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const applyamount = () => {
        setApplyAmt(true)
        handleChange()
    }

    const creditUser = (e) => {
        e.preventDefault()
        if (forms.valid !== 'Yes') return ErrorAlert(`Please confirm if Giftcard is valid`)
        setLoading({ status: true, param: 'credit' })
        setCredited(true)
        setForms({ ...forms, amount: '' })
        return setTimeout(() => {
            setLoading({ status: false, param: '' })
            SuccessAlert(`Customer credited successfully.`)
        }, 5000)
    }

    const afterLoad = () => {
        setLoading({ status: false, param: '' })
        SuccessAlert(`Order closed successfully`)
        setScreen(2)
    }

    const submitOrder = (e) => {
        e.preventDefault()
        if (!credited) return ErrorAlert('Please credit customer before closing the order')
        setLoading({ status: true, param: 'close' })
        return setTimeout(() => {
            afterLoad()
        }, 5000)
    }
    const handleErr = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }

    const submitErrorMsg = () => {
        if (forms.error.length < 1) return ErrorAlert(`Please enter an error message to customer`)
        setConfirmMsg(true)
    }

    const closeAndExit = () => {
        setLoading({ status: true, param: 'exit' })
        setConfirmBad(false)
        setConfirmMsg(false)
        setCredited(false)
        setApplyAmt(false)
        setForms({ amount: '', valid: '', error: '' })
        return setTimeout(() => {
            setLoading({ status: false, param: '' })
            SuccessAlert(`Error message sent to user`)
            navigate('/admin/giftcards/orders')
        }, 5000)
    }
    return (
        <AdminPageLayout>
            {
                confirmBad &&
                <ModalLayout clas={`w-11/12 md:w-1/2 mx-auto`} setModal={setConfirmBad}>
                    <div className="w-full rounded-xl bg-dark relative p-5 text-white">

                        {confirmMsg &&
                            <div className="w-11/12 px-5 py-4 bg-primary/80 h-1/2 backdrop-blur-md left-1/2 -translate-x-1/2 rounded-md absolute top-1 flex items-center flex-col ">
                                <div className="w-full text-center">Are you sure you to proceed</div>
                                <div className="mt-5 justify-between flex items-center w-11/12 lg:w-2/4">
                                    <button onClick={() => setConfirmMsg(false)} className='px-4 rounded-md bg-red-600 py-1.5'>cancel</button>
                                    <button onClick={closeAndExit} className='px-4 rounded-md bg-green-600 py-1.5'>proceed</button>
                                </div>
                            </div>
                        }
                        <div className="w-full text-center font-bold">Enter message to customer</div>
                        <div className="mt-3 flex items-center flex-col gap-3">
                            <div className="w-full">
                                <FormInput formtype='textarea' name={`error`} value={forms.error} onChange={handleErr} />
                            </div>
                            <button disabled={confirmMsg ? true : false} type='button' onClick={submitErrorMsg} className='px-4 rounded-md bg-red-600 py-1.5'>confirm message</button>
                        </div>
                    </div>
                </ModalLayout>
            }
            {loading.status && loading.param === 'close' &&
                <ModalLayout clas={`w-11/12 mx-auto`}>
                    <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                        <Loader />
                        <div>...closing order</div>
                    </div>
                </ModalLayout>
            }
            {loading.status && loading.param === 'exit' &&
                <ModalLayout clas={`w-11/12 mx-auto`}>
                    <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                        <Loader />
                        <div>...sending error message to user</div>
                    </div>
                </ModalLayout>
            }
            {loading.status && loading.param === 'credit' &&
                <ModalLayout clas={`w-11/12 mx-auto`}>
                    <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                        <Loader />
                        <div>...crediting customer</div>
                    </div>
                </ModalLayout>
            }
            <div className="w-11/12 mx-auto">
                {screen === 1 &&
                    <>
                        <div className="">
                            <Link to={`/admin/exchange/buy_orders`} className="w-fit px-4 py-1.5 rounded-md bg-ash">back to orders</Link>
                        </div>
                        <div className="mt-5 md:mt-10 mont">

                            <div className="w-full text-center capitalize font-bold poppins">Review Order Number <span className={`${green}`}>GY8343</span></div>

                            <form onSubmit={submitOrder} className="bg-primary p-3 rounded-md  mx-auto mt-5 md:mt-10 mb-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5   ">
                                    <div className="flex flex-col gap-3 w-full">
                                        <div className="flex flex-col items-start">
                                            <div className="text-sm">Customer ID:</div>
                                            <div className="w-full">
                                                <FormInput value={id} className={`${green}`} />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="text-sm">GiftCard Brand:</div>
                                            <div className="w-full">
                                                <FormInput value={`Amazon`} className={`${green}`} />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="text-sm">Amount:</div>
                                            <div className="w-full">
                                                <FormInput value={`${currencies[1].symbol}1000`} className={`${green}`} />

                                            </div>
                                        </div>

                                    </div>
                                    <div className=" flex flex-col gap-3 w-full">
                                        <div className="">
                                            <div className="text-sm">FullName:</div>
                                            <FormInput value={`Basit Money`} className={`${green}`} />
                                        </div>
                                        <div className="">
                                            <div className="text-sm">GitfCard Code:</div>
                                            <FormInput value={`TRC9-HDBH-4477-4HFHF`} className={`${green}`} />
                                        </div>
                                        <div className="">
                                            <div className="text-sm">GitfCard PIN:</div>
                                            <FormInput value={`4858`} className={`${green}`} />
                                        </div>

                                    </div>


                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center mt-5 ">
                                    {!credited && <div className="flex items-start flex-col w-full  ">
                                        <div className=" lowercase">Confirm Valid Card</div>
                                        <div className="">
                                            <SelectComp options={statuses} value={forms.sent_crypto} width={200} style={{ bg: '#212134', color: 'lightgreen', font: '0.8rem' }}
                                                handleChange={(e) => setForms({ ...forms, valid: e.target.value })}
                                            />
                                        </div>
                                    </div>}
                                    {forms.valid === 'Yes' && !credited && <div className="flex items-start flex-col gap-2 w-full ">
                                        <div className="l">Credit Customer Balance:</div>
                                        <div className="">
                                            <input onChange={handleChange} name='amount' value={forms.amount} type="text" className='input-off w-1/2 bg-primary text-white font-bold' />
                                        </div>
                                        <button type='button' onClick={applyAmt ? creditUser : applyamount} className='px-3 py-1 rounded-md bg-ash'>{applyAmt ? 'credit customer' : 'apply amount'}</button>
                                    </div>}

                                    {forms.valid === 'No' &&
                                        <div className="">
                                            <button type='button' onClick={() => setConfirmBad(true)} className='px-4 rounded-md bg-red-600 py-1.5'>confirm card is bad</button>
                                        </div>
                                    }
                                </div>
                                {forms.valid !== 'No' && <div className="w-11/12 mt-5 mx-auto md:w-5/6">
                                    <FormButton title={`Confirm & Close Order`} />
                                </div>}
                            </form>


                        </div></>}
                {screen === 2 && <div className="">
                    <div className="w-11/12 mx-auto min-h-[70dvh] flex items-center justify-center">
                        <div className="w-full flex items-center  flex-col">
                            <Lottie options={defaultOptions} height={250} width={300} />
                            <div className="mt-10 flex flex-col items-center ">
                                <div className="capitalize">Thank You for confirming this order.
                                </div>
                                <Link to={`/admin/giftcards/orders`} className={`bg-green-500  mt-10 hover:bg-lightgreen text-white hover:text-ash py-2 text-center rounded-md w-full`}>
                                    Go back to orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </AdminPageLayout>
    )
}

export default GiftCardSingleOrder