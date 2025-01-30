import React, { useState } from 'react'
import { FaRegCopy } from "react-icons/fa";
import AdminPageLayout from './AdminPageLayout'
import { Link, useParams } from 'react-router-dom'
import FormInput from '../utils/FormInput'
import { currencies } from '../AuthComponents/AuthUtils'
import { ErrorAlert, SuccessAlert } from '../utils/pageUtils';
import SelectComp from '../GeneralComponents/SelectComp';
import FormButton from '../utils/FormButton';
import { TfiTimer } from 'react-icons/tfi';
import ModalLayout from '../utils/ModalLayout';
import Loader from '../GeneralComponents/Loader';



const SingleSellOrder = () => {

    const { id } = useParams()
    const green = 'text-lightgreen'

    const handleCopy = (type, val) => {
        navigator.clipboard.writeText(type)
            .then(() => { SuccessAlert(`${val} copied successfully'`) })
            .catch(() => { console.log(`failed to copy ${val}`) })
    }
    const [forms, setForms] = useState({
        confirmed: '',
        sent_crypto: '',
        amount: ''
    })

    const [applyAmt, setApplyAmt] = useState(false)
    const statuses = ["Yes", "No"]
    const [screen, setScreen] = useState(1)
    const [credited, setCredited] = useState(false)
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)

    const afterLoad = () => {
        setLoading(false)
        SuccessAlert(`Order closed successfully`)
        setScreen(2)
    }
    const submitOrder = (e) => {
        e.preventDefault()
        if(!credited) return ErrorAlert('Please credit customer before closing the order')
        setLoading(true)
        return setTimeout(() => {
            afterLoad()
        }, 5000)
    }
    const handleChange = () => {
        const amt = '1,500'
        const formatVal = amt.replace(/,/g, '')
        setForms({ ...forms, amount: formatVal })
    }

    const applyamount = () => {
        setApplyAmt(true)
        handleChange()
    }

    const creditUser = (e) => {
        e.preventDefault()
        if (forms.sent_crypto !== 'Yes') return ErrorAlert(`Please confirm if you have received crypto currency`)
        setLoad(true)
        setCredited(true)
        setForms({ ...forms, amount: '' })
        return setTimeout(() => {
            setLoad(false)
            SuccessAlert(`Customer credited successfully.`)
        }, 5000)
    }
    return (
        <AdminPageLayout>

            {loading &&
                <ModalLayout clas={`w-11/12 mx-auto`}>
                    <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                        <Loader />
                        <div>...closing order</div>
                    </div>
                </ModalLayout>
            }
            {load &&
                <ModalLayout clas={`w-11/12 mx-auto`}>
                    <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                        <Loader />
                        <div>...crediting customer</div>
                    </div>
                </ModalLayout>
            }
            {screen === 1 &&
                <>
                    <div className="w-11/12 mx-auto mt-2">
                        <Link to={`/admin/exchange/sell_orders`} className="w-fit px-4 py-1.5 rounded-md bg-ash">back to orders</Link>
                    </div>
                    <div className="mt-5 md:mt-10 w-11/12 mx-auto mont">

                        <div className="w-full text-center capitalize font-bold poppins">Review Order Number <span className={`${green}`}>GY8343</span></div>

                        <form onSubmit={submitOrder} className="bg-primary p-3 rounded-md md:w-5/6 mx-auto mt-5 md:mt-10 mb-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5   ">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="">Customer ID:</div>
                                    <FormInput value={id} className={`${green}`} />
                                    <div className="">FullName:</div>
                                    <FormInput value={`Basit Money`} className={`${green}`} />
                                    <div className="">Amount:</div>
                                    <FormInput value={`1,500`} className={`${green}`} />
                                </div>
                                <div className=" flex flex-col gap-1 w-full">

                                    <div className="">Network Sent Via:</div>
                                    <FormInput value={`TRC-20`} className={`${green}`} />
                                    <div className="">Your Receiving Wallet Address :</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-full">
                                            <FormInput value={`0x958847473888383`} className={`${green}`} />
                                        </div>
                                        <FaRegCopy onClick={() => handleCopy(`88t9389fncjjefj`, 'wallet address')} className={`${green} cursor-pointer`} />
                                    </div>
                                    <div className="">Status:</div>
                                    <FormInput value={`sent`} className={`${green}`} />

                                </div>


                            </div>
                            <div className="flex w-full md:items-center flex-col mt-5 md:flex-row">
                                <div className="flex items-start flex-col w-full  ">
                                    <div className=" lowercase">Confirm You have Received Crypto</div>
                                    <div className="">
                                        <SelectComp options={statuses} value={forms.sent_crypto} width={200} style={{ bg: '#212134', color: 'lightgreen', font: '0.8rem' }}
                                            handleChange={(e) => setForms({ ...forms, sent_crypto: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {!credited && <div className="flex items-start flex-col gap-2 w-full ">
                                    <div className="l">Credit Customer Balance:</div>
                                    <div className="">
                                        <input onChange={handleChange} name='amount' value={forms.amount} type="text" className='input-off w-1/2 bg-primary text-white font-bold' />
                                    </div>
                                    <button type='button' onClick={applyAmt ? creditUser : applyamount} className='px-3 py-1 rounded-md bg-ash'>{applyAmt ? 'credit customer' : 'apply amount'}</button>
                                </div>}

                            </div>
                            <div className="w-11/12 mt-5 mx-auto md:w-5/6">
                                <FormButton title={`Confirm & Close Order`} />
                            </div>
                        </form>


                    </div></>}
            {screen === 2 && <div className="">
                <div className="w-11/12 mx-auto min-h-[70dvh] flex items-center justify-center">

                    <div className="w-full flex items-center  flex-col">
                        <div className="rounded-full h-20 w-20 flex items-center justify-center border border-lightgreen">
                            <TfiTimer className='text-2xl text-lightgreen' />
                        </div>
                        <div className="mt-10 flex flex-col items-center ">
                            <div className="capitalize">Thank You for confirming this order.
                            </div>
                            <Link to={`/admin/exchange/sell_orders`} className={`bg-green-500  mt-10 hover:bg-lightgreen text-white hover:text-ash py-2 text-center rounded-md w-full`}>
                                Go back to orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>}
        </AdminPageLayout>

    )
}

export default SingleSellOrder

