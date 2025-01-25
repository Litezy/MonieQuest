import React, { useState } from 'react'
import { alltransactions, bankacc, banksArr, currencies } from '../../AuthComponents/AuthUtils'
import TransComp from '../../AuthComponents/TransComp'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { ErrorAlert } from '../../utils/pageUtils'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'
import Lottie from 'react-lottie'
import animationData from '../../utils/lottie.json'
import WithdrawComp from '../../GeneralComponents/WithdrawComp'


const formsal = () => {

    const [value, setValue] = useState('')
    const bal = Number(10500)
    const thresh = Number(10000)
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        bank: '', amount: '', accountNumber: '', accountName: '',
    })

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const [showModal, setShowModal] = useState(false)
    const handleBankName = (value) => {
        setValue(value)
        setForms({
            ...forms,
            bank: value
        })
    }
    const [prefillAcc, setPrefillAcc] = useState({ status: false, value: '' })

    const handleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }

    const prefillBank = () => {
        setPrefillAcc({ ...prefillAcc, status: true, value: bankacc.bank })
        setForms({
            ...forms,
            bank: bankacc.bank, accountNumber: bankacc.account_number, accountName: bankacc.account_name
        })
    }

    const handleAmount = (e) => {
        const input = e.target;
        const rawValue = input.value.replace(/,/g, '');
        const cursorPosition = input.selectionStart;

        if (!isNaN(rawValue)) {
            const numericValue = Number(rawValue);
            const formattedValue = numericValue.toLocaleString();
            // Update the state with the formatted value
            setForms({
                ...forms,
                amount: formattedValue,
            });
            // Restore the cursor position
            setTimeout(() => {
                const commasBeforeCursor = (input.value.slice(0, cursorPosition).match(/,/g) || []).length;
                const newCursorPosition = cursorPosition + (formattedValue.split(',').length - 1) - commasBeforeCursor;
                input.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 0);
        }
    };

    const afterSub = () => {
        setShowModal(true)
         setLoading(false) 
    }

    const submitRequest = (e) => {
        e.preventDefault()
        const convertAmt = forms.amount.replace(/,/g, '')
        if (convertAmt < thresh) return ErrorAlert(`minimum of ${currencies[1].symbol}${bal.toLocaleString()} is required to withdraw`)
        if (convertAmt > bal) return ErrorAlert('Insufficient balance')
        setLoading(true)
        setForms({ accountName: "", accountNumber: '', amount: '', bank: "" })
        setPrefillAcc({ status: false, value: '' })
        return setTimeout(()=>{afterSub()},4000)
    }
    return (
        <div className='w-full mx-auto '>
            {loading &&
                <ModalLayout clas={`w-11/12 mx-auto lg:w-1/2 min-h-20`}>
                    <div className="w-full flex-col h-fit flex items-center justify-center">
                        <Loader />
                        <div className="">...submitting</div>
                    </div>
                </ModalLayout>

            }
            {showModal &&
                <ModalLayout clas={`w-11/12 mx-auto lg:w-1/2 min-h-20`}>
                    <div className="w-full flex-col h-fit flex items-center justify-center">
                        <Lottie options={defaultOptions} height={250} width={300} />
                        <div className="text-base">Your withdrawal is successful</div>
                        <button onClick={() => setShowModal(false)} className="mt-10 w-fit px-8 py-2 rounded-md bg-red-600">close</button>
                    </div>
                </ModalLayout>

            }
            {!showModal && <><div className=' w-11/12 mx-auto flex items-center justify-center'>
                <div className='rounded-xl bg-primary flex-col gap-3 p-5 flex items-center w-full lg:w-[75%]'>
                    <div className='text-lightgreen capitalize'>available balance</div>
                    <div className='md:text-5xl text-4xl font-bold'>{currencies[1].symbol}{bal.toLocaleString()}</div>
                    <div className='flex md:gap-10 gap-6 items-center mt-2'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-1 items-center'>
                                <div className='w-3.5 h-3.5 bg-lightgreen rounded-full'></div>
                                <div className='md:text-sm text-xs capitalize font-medium'>total deposit</div>
                            </div>
                            <div className='font-bold'>{currencies[1].symbol}238,224.60</div>
                        </div>
                        <div className='flex flex-col gap-1 border-l-2 md:pl-10 pl-6'>
                            <div className='flex gap-1 items-center'>
                                <div className='w-3.5 h-3.5 bg-red-600 rounded-full'></div>
                                <div className='md:text-sm text-xs capitalize font-medium'>outflow</div>
                            </div>
                            <div className='font-bold'>{currencies[1].symbol}160,000.01</div>
                        </div>
                    </div>
                </div>

            </div>
                <div className="w-full mt-10">
                    <form onSubmit={submitRequest} className="w-full bg-primary p-5">
                        <div className="flex items-center flex-col lg:flex-row w-full justify-between  mb-5">
                            <div className="text-xl lg:text-3xl font-bold text-gray-300  ">Request Withdrawal</div>
                            <div className="text-sm text-red-600">minimum of {currencies[1].symbol}10,000 to initiate withdrawal</div>
                        </div>
                        <div onClick={prefillBank} className="mb-5 w-fit px-5 py-2 rounded-md cursor-pointer bg-ash text-white">Use linked account</div>
                        <div className="flex items-start flex-col lg:flex-row w-full gap-5 lg:gap-10 mb-5">
                            <div className="w-full lg:w-1/2 flex items-start flex-col gap-4 ">
                                <div className="flex w-full flex-col items-start gap-">
                                    <div className="text-lightgreen">Account Name</div>
                                    <div className="w-full">
                                        <FormInput placeholder={`account name`} name={`accountName`} value={forms.accountName} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-start gap-">
                                    <div className="text-lightgreen">Amount ({currencies[1].symbol})</div>
                                    <div className="w-full">
                                        <FormInput placeholder={`amount`} name={`amounnt`} value={forms.amount} onChange={handleAmount} />
                                    </div>
                                </div>

                            </div>
                            <div className="w-full lg:w-1/2 flex items-start flex-col gap-4">
                                <div className="flex w-full flex-col items-start gap-">
                                    <div className="text-lightgreen">Account Number</div>
                                    <div className="w-full">
                                        <FormInput placeholder={`account number`} name={`accountNumber`} value={forms.accountNumber} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="">
                                    <div className="text-lightgreen">Bank Name</div>
                                    <div className="w-full">
                                        <WithdrawComp
                                            options={banksArr}
                                            prefillVal={prefillAcc.status}
                                            preVal={prefillAcc.value}
                                            onChange={handleBankName}
                                            min={false} max={450} size={false} style={{ bg: '#212134', color: 'lightgrey', font: '0.8rem', rounded: '5%' }} />

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 mx-auto mb-10">
                            <FormButton disabled={bal < thresh ? true : false} title={`Request Withdrawal`} />
                        </div>

                    </form>



                    <div className="text-xl w-11/12 mx-auto mt-5  lg:text-3xl font-bold text-gray-300 ">Latest Bank Transactions</div>
                    <div className="mt-5 w-11/12 mx-auto">
                        {alltransactions.filter((trnx) => trnx.tag === 'bank withdrawal').map((trans, i) => {
                            return (
                                <TransComp key={i} trans={trans} />
                            )
                        })}
                    </div>
                </div></>}
        </div>
    )
}

export default formsal