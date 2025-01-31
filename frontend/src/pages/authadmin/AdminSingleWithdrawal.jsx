import React, { useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link, useParams } from 'react-router-dom'
import FormInput from '../../utils/FormInput'
import { FaRegCopy } from 'react-icons/fa'
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import FormButton from '../../utils/FormButton'
import SelectComp from '../../GeneralComponents/SelectComp'
import Lottie from 'react-lottie'
import animationData from '../../utils/lottie.json'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'

const AdminSingleWithdrawal = () => {

    const [forms, setForms] = useState({ sent_money: '', ref: '' })
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const green = `text-lightgreen`
    const handleCopy = () => {
        navigator.clipboard.writeText(`0123456789`)
            .then(() => { return SuccessAlert(`Bank account copied successfully`) })
            .catch((error) => { console.log(`failed to copy account number`, error) })
    }

    const { id } = useParams()
    const handleChange = (e) => { setForms({ ...forms, [e.target.name]: e.target.value }) }
    const options = [`Yes`, 'No']
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const submitOrder = (e) => {
        e.preventDefault()
        if (forms.sent_money === 'No' || !forms.sent_money) return ErrorAlert(`Please confirm money have been paid`)
        if (!forms.ref || forms.ref.length < 10) return ErrorAlert(`Please input a valid transfer reference`)
        setLoading(true)
       return setTimeout(()=>{
        setForms({ref:'',sent_money:''})
        setLoading(false)
        setScreen(2)
       },5000)
    }
    return (
        <AdminPageLayout>

            {loading &&
                <ModalLayout>
                    <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                        <Loader />
                        <div>...closing order</div>
                    </div>
                </ModalLayout>
            }
            {screen === 1 && <div className="w-11/12 mx-auto">
                <div className=" mt-2">
                    <Link to={`/admin/bank_withdrawals  `} className="w-fit px-4 py-1.5 rounded-md bg-ash">back</Link>
                </div>
                <div className="w-full text-center capitalize font-bold poppins">Withdrawal Review Number <span className={`${green}`}>GY8343</span></div>
                <form onSubmit={submitOrder} className="bg-primary p-5 rounded-md  mx-auto mt-5 md:mt-10 mb-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5   ">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="w-full">
                                <div className="text-sm">Customer ID:</div>
                                <FormInput value={id} className={`${green}`} />
                            </div>
                            <div className="w-full">
                                <div className="text-sm">FullName:</div>
                                <FormInput value={`Basit Money`} className={`${green}`} />
                            </div>
                            <div className="w-full">
                                <div className="text-sm">Amount:</div>
                                <FormInput value={`1,500`} className={`${green}`} />
                            </div>
                        </div>
                        <div className=" flex flex-col gap-3 w-full">

                            <div className="">
                                <div className="text-sm">Bank Name:</div>
                                <FormInput value={`Moniepoint`} className={`${green}`} />
                            </div>
                            <div className="w-full">
                                <div className="text-sm">Bank Name:</div>
                                <FormInput value={`Basit Money`} className={`${green}`} />
                            </div>
                            <div className="">
                                <div className="text-sm">Bank Account :</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-full">
                                        <FormInput value={`0x958847473888383`} className={`${green}`} />
                                    </div>
                                    <FaRegCopy onClick={handleCopy} className={`${green} cursor-pointer`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-5">
                        <div className="flex items-start flex-col w-full  ">
                            <div className=" lowercase">Confirm You have paid</div>
                            <div className="">
                                <SelectComp options={options} value={forms.sent_money} width={200} style={{ bg: '#212134', color: 'lightgreen', font: '0.8rem' }}
                                    handleChange={(e) => setForms({ ...forms, sent_money: e.target.value })}
                                />
                            </div>
                        </div>
                        {forms.sent_money === 'Yes' &&
                            <div className="">
                                <div className="text-sm">Bank Transfer Reference :</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-full">
                                        <FormInput value={forms.ref} name={`ref`} onChange={handleChange} className={`${green}`} />
                                    </div>
                                    <p className={`${green} cursor-pointer`}>paste</p>
                                </div>
                            </div>
                        }


                    </div>
                    <div className="w-11/12 mt-5 mx-auto md:w-5/6">
                        <FormButton title={`Confirm & Close Order`} />
                    </div>
                </form>
            </div>}

            {screen === 2 && <div className="">
                <div className="w-11/12 mx-auto min-h-[70dvh] flex items-center justify-center">
                    <div className="w-full flex items-center  flex-col">
                        <Lottie options={defaultOptions} height={250} width={300} />
                        <div className="mt-10 flex flex-col items-center ">
                            <div className="capitalize">Thank You for confirming this order.
                            </div>
                            <Link to={`/admin/bank_withdrawals`} className={`bg-green-500  mt-10 hover:bg-lightgreen text-white hover:text-ash py-2 text-center rounded-md w-full`}>
                                Go back to orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>}
        </AdminPageLayout>
    )
}

export default AdminSingleWithdrawal