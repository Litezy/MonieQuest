import React, { useEffect, useState } from 'react'
import { FaRegCopy } from "react-icons/fa";
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link, useParams } from 'react-router-dom'
import FormInput from '../../utils/FormInput'
import { defaultOptions, ErrorAlert, SuccessAlert } from '../../utils/pageUtils';
import SelectComp from '../../GeneralComponents/SelectComp';
import FormButton from '../../utils/FormButton';
import ModalLayout from '../../utils/ModalLayout';
import Loader from '../../GeneralComponents/Loader';
import Lottie from 'react-lottie';
import { Apis, AuthGetApi, AuthPostApi } from '../../services/API';
import { currencies } from '../../AuthComponents/AuthUtils';



const SingleSellOrder = () => {

    const { id } = useParams()
    const green = 'text-lightgreen'
    const [data, setData] = useState({})

    const fetchSellID = async () => {
        setLoading(true)
        try {
            const res = await AuthGetApi(`${Apis.admin.single_sell}/${id}`)
            // console.log(res)
            if (res.status !== 200) return ErrorAlert(res.msg)
            const data = res.data
            setData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSellID()
    }, [])

    const fetchSells = async () => {
        try {
            const res = await AuthGetApi(Apis.admin.cryptobuy_orders)
            if (res.status !== 200) return;
        } catch (error) {
            console.log(error)
        }
    }
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
    
    const handleChange = () => {
        const amt = data?.amount
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
        }, 2000)
    }

    const submitOrder = async (e) => {
        e.preventDefault()
        if (!credited) return ErrorAlert('Please credit customer before closing the order')
        setLoading(true)
        try {
            const res = await AuthPostApi(`${Apis.admin.confirm_sell}/${id}`)
            if (res.status !== 200) return ErrorAlert(res.msg)
            SuccessAlert(res.msg)
            fetchSells()
            await new Promise((resolve) => setTimeout(resolve, 2000))
            afterLoad()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
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

                        <div className="w-full text-center capitalize font-bold poppins">Review Order Number <span className={`${green}`}>{data?.order_no}</span></div>

                        <form onSubmit={submitOrder} className="bg-primary p-3 rounded-md  mx-auto mt-5 md:mt-10 mb-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5   ">
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="w-full">
                                        <div className="text-sm">Customer ID:</div>
                                        <FormInput value={data?.crypto_seller?.id} className={`${green}`} />
                                    </div>
                                    <div className="w-full">
                                        <div className="text-sm">FullName:</div>
                                        <FormInput read={true} value={`${data?.crypto_seller?.first_name} ${data?.crypto_seller?.surname}`}
                                            className={`${green}`} />
                                    </div>
                                    <div className="w-full">
                                        <div className="text-sm">Amount:</div>
                                        <FormInput value={`${currencies[0].symbol}${data?.amount?.toLocaleString()}`} className={`${green}`} />
                                    </div>
                                    <div className="w-full">
                                        <div className="text-sm">Status:</div>
                                        <FormInput value={data?.status} className={`${green}`} />
                                    </div>

                                </div>
                                <div className=" flex flex-col gap-3 w-full">
                                    <div className="">
                                        <div className="text-sm">Crypto Currency Sent:</div>
                                        <FormInput value={data?.crypto_currency} className={`${green}`} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Network Sent Via:</div>
                                        <FormInput value={data?.network} className={`${green}`} />
                                    </div>
                                    <div className="text-sm">Transaction Hash:</div>
                                    <div className="flex items-center w-full gap-2">
                                        <div className="w-full">
                                            <FormInput value={data?.trans_hash} className={`${green}`} />
                                        </div>
                                        <FaRegCopy onClick={() => handleCopy(`jmkmkdmkkfk`, 'trans hash')} className={`${green} cursor-pointer`} />
                                    </div>
                                    

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
                        <Lottie options={defaultOptions} height={250} width={300} />
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

