import React, { useEffect, useState } from 'react'
import { alltransactions, banksArr, currencies } from '../../AuthComponents/AuthUtils'
import TransComp from '../../AuthComponents/TransComp'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { defaultOptions, ErrorAlert } from '../../utils/pageUtils'
import ModalLayout from '../../utils/ModalLayout'
import Loader from '../../GeneralComponents/Loader'
import Lottie from 'react-lottie'
import AuthPageLayout from '../../AuthComponents/AuthPageLayout'
import SelectComp from '../../GeneralComponents/SelectComp'
import { useAtom } from 'jotai'
import { BANK, UTILS, WALLET } from '../../services/store'
import { Apis, AuthGetApi, AuthPostApi } from '../../services/API'


const formsal = () => {
    const [bank] = useAtom(BANK)
    const [wallet,setWallet] = useAtom(WALLET)
    const [utils] = useAtom(UTILS)
    const [bankAcc] = useAtom(BANK)
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        bank: '', amount: '', accountNumber: '', accountName: '',
    })

        const FetchUtils = async () => {
          try {
            const response = await AuthGetApi(Apis.user.get_user_utils)
            if (response.status === 200) {
              const data = response.data
              setWallet(data.wallet)
            }
          } catch (error) {
            console.log(error)
          }
        }
       
    
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const handleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }

    const prefillBank = () => {
        setShow(true)
        setForms({
            ...forms,
            bank: bankAcc.account_name, accountNumber: bankAcc.account_number, accountName: bankAcc.bank_name
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


    const submitRequest = async (e) => {
        e.preventDefault()
        const convertAmt = forms.amount.replace(/,/g, '')
        if (convertAmt < utils.bank_withdraw_min) return ErrorAlert(`minimum of ${currencies[1].symbol}${utils.bank_withdraw_min?.toLocaleString()} is required to withdraw`)
        if (convertAmt > wallet.balance) return ErrorAlert('Insufficient balance')
        const formdata = {
            bank_name: forms.bank,
            account_number: forms.accountNumber,
            bank_user: forms.accountName,
            amount: convertAmt
        }
        setLoading(true)
        try {
            const res = await AuthPostApi(Apis.transaction.request_withdrawal, formdata)
            if (res.status !== 200) {
                console.log(res)
                return ErrorAlert(res.msg)
            }
            setForms({ accountName: "", accountNumber: '', amount: '', bank: "" })
            FetchUtils()
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setShowModal(true)
            setLoading(false)
        } catch (error) {
            ErrorAlert(`failed to place withdrawal, try again!`)
            console.log(error.message)
        }finally{
            setLoading(false)
        }

    }

    // console.log(utils)
    return (
        <AuthPageLayout>
            <div className='w-full'>
                {loading &&
                    <ModalLayout clas={`w-11/12 mx-auto`}>
                        <div className="w-full flex-col gap-2 h-fit flex items-center justify-center">
                            <Loader />
                            <div>...submitting</div>
                        </div>
                    </ModalLayout>
                }
                {showModal &&
                    <ModalLayout clas={`w-11/12 mx-auto lg:w-1/2 min-h-20`}>
                        <div className="w-full flex-col h-fit flex items-center justify-center">
                            <Lottie options={defaultOptions} height={250} width={300} />
                            <div className="text-base">Your withdrawal request is successful</div>
                            <button onClick={() => setShowModal(false)} className="mt-10 w-fit px-8 py-2 rounded-md bg-red-600">close</button>
                        </div>
                    </ModalLayout>
                }
                {!showModal && <><div className=' w-11/12 mx-auto flex items-center justify-center'>
                    <div className='rounded-xl bg-primary flex-col gap-3 p-5 flex items-center w-full lg:w-[75%]'>
                        <div className='text-lightgreen capitalize'>available balance</div>
                        <div className='md:text-5xl text-4xl font-bold'>{currencies[1].symbol}{wallet.balance?.toLocaleString()}</div>
                        <div className='flex md:gap-10 gap-6 items-center mt-2'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-1 items-center'>
                                    <div className='md:size-3.5 size-3 bg-lightgreen rounded-full'></div>
                                    <div className='md:text-sm text-xs capitalize font-medium'>total deposit</div>
                                </div>
                                <div className='font-bold'>{currencies[1].symbol}{Object.values(wallet).length !== 0 ? <span>{wallet.total_deposit.toFixed(2).toLocaleString()} </span> : <span>0.00</span>}</div>
                            </div>
                            <div className='flex flex-col gap-1 border-l-2 md:pl-10 pl-6'>
                                <div className='flex gap-1 items-center'>
                                    <div className='md:size-3.5 size-3 bg-red-600 rounded-full'></div>
                                    <div className='md:text-sm text-xs capitalize font-medium'>outflow</div>
                                </div>
                                <div className='font-bold'>{currencies[1].symbol}
                                    {Object.values(wallet).length !== 0 ? <span>{wallet.total_outflow.toFixed(2).toLocaleString()} </span> : <span>0.00</span>}</div>
                            </div>
                        </div>
                    </div>

                </div>
                    <div className="w-full mt-10">
                        <form onSubmit={submitRequest} className="w-full bg-primary p-5">
                            <div className="flex items-center flex-col lg:flex-row w-full justify-between  mb-5">
                                <div className="text-xl lg:text-3xl font-bold text-gray-300  ">Request Withdrawal</div>
                                <div className="text-sm text-red-600">minimum of {currencies[1].symbol}{utils.bank_withdraw_min} to initiate withdrawal</div>
                            </div>
                            <div onClick={prefillBank} className="mb-5 w-fit px-5 py-2 rounded-md cursor-pointer bg-ash text-white">Use linked account</div>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 lg:gap-10 mb-5">
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
                                <div className="flex w-full flex-col items-start gap-">
                                    <div className="text-lightgreen">Account Number</div>
                                    <div className="w-full">
                                        <FormInput placeholder={`account number`} name={`accountNumber`} value={forms.accountNumber} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="">
                                    <div className="text-lightgreen">Bank Name</div>
                                    {show ?
                                        <div className="w-full">
                                            <FormInput value={bankAcc.account_name} />
                                        </div> :
                                        <div className="w-full">
                                            <SelectComp
                                                value={forms.bank}
                                                options={banksArr}
                                                width={450} size={false}
                                                style={{ bg: '#212134', color: 'lightgrey', font: '0.8rem' }} handleChange={(e) => setForms({ ...forms, bank: e.target.value })} />

                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 mx-auto mb-10">
                                <FormButton disabled={wallet.balance < utils.bank_withdraw_min ? true : false} title={`Request Withdrawal`} />
                            </div>

                        </form>

                        <div className="text-xl w-11/12 mx-auto mt-5 md:text-3xl font-bold text-gray-300 ">Latest Bank Transactions</div>
                        <div className="mt-5 w-11/12 mx-auto">
                            {alltransactions.filter((trnx) => trnx.tag === 'bank withdrawal').map((trans, i) => {
                                return (
                                    <TransComp key={i} trans={trans} />
                                )
                            })}
                        </div>
                    </div></>}
            </div>
        </AuthPageLayout>
    )
}

export default formsal