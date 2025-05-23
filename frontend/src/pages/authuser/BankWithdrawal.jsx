import React, { useCallback, useEffect, useState } from 'react'
import { currencies } from '../../AuthComponents/AuthUtils'
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
import WithdrawComp from '../../AuthComponents/WithdrawComp'
import { Link } from 'react-router-dom'
import { NigerianBanks } from '../../utils/banks'


const formsal = () => {
    const [wallet, setWallet] = useAtom(WALLET)
    const [utils] = useAtom(UTILS)
    const [bankAcc] = useAtom(BANK)
    const [loading, setLoading] = useState(false)
    const [dataLoading, setDataLoading] = useState(true)
    const [records, setRecords] = useState([])
    const [confirm, setConfirm] = useState(false)
    const [selectedBank, setSelectedBank] = useState({})
    const [forms, setForms] = useState({
        bank: '', amount: '', accountNumber: '', accountName: '',
    })

    const FetchLatestTrans = useCallback(async () => {
        try {
            const response = await AuthGetApi(Apis.transaction.latest_withdrawals)
            if (response.status !== 200) {
                return ErrorAlert(res.msg)
            }
            const data = response.data
            // console.log(data)
            setRecords(data)

        } catch (error) {
            console.log(error)
        } finally {
            setDataLoading(false)
        }
    })

    useEffect(() => {
        FetchLatestTrans()
    }, [])


    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const handleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }

    const prefillBank = () => {
        if (Object.keys(bankAcc).length > 0) {
            setShow(true)
            setForms({
                ...forms,
                accountName: bankAcc.account_name, accountNumber: bankAcc.account_number, bank: bankAcc.bank_name
            })
            console.log(bankAcc, forms)
        } else {
            return ErrorAlert('No bank account added')
        }

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
           
        }
    };

    const confirmRequest = (e) => {
        e.preventDefault()
        if (!forms.amount || !forms.accountName || !forms.bank || !forms.accountNumber) return ErrorAlert(`Please fill out all fields`)
        const convertAmt = forms.amount.replace(/,/g, '')
        if (isNaN(convertAmt)) return ErrorAlert(`Please input a valid number`)
        if (convertAmt < utils.bank_withdraw_min) return ErrorAlert(`minimum of ${currencies[1].symbol}${utils.bank_withdraw_min?.toLocaleString()} is required to withdraw`)
        if (convertAmt > wallet.balance) return ErrorAlert('Insufficient balance')
        setConfirm(true)
    }

    useEffect(() => {
        if (forms.bank) {
            const findBank = NigerianBanks.filter((name) => name.name === forms.bank)
            setSelectedBank(findBank[0])
        }
    }, [forms.bank])

    const submitRequest = async (e) => {
        e.preventDefault()
        // return console.log(selectedBank)
        setConfirm(false)
        const convertAmt = forms.amount.replace(/,/g, '')
        const formdata = {
            bank_name: selectedBank?.name,
            account_number: forms.accountNumber,
            bank_holder: forms.accountName,
            amount: convertAmt,
            bank_code: selectedBank?.code
        }
        // return console.log(formdata)
        setLoading(true)
        try {
            const res = await AuthPostApi(Apis.transaction.request_withdrawal, formdata)
            if (res.status !== 200) {
                console.log(res)
                return ErrorAlert(res.msg)
            }
            setForms({ accountName: "", accountNumber: '', amount: '', bank: "" })
            setWallet(res.wallet)
            FetchLatestTrans()
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setShowModal(true)
            setShow(false)
            setLoading(false)
        } catch (error) {
            ErrorAlert(`failed to place withdrawal, try again!`)
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const [bankNames, setBankNames] = useState([]);

    useEffect(() => {
        if (NigerianBanks && NigerianBanks.length > 0) {
            // Extract just the names and sort alphabetically
            const names = NigerianBanks
                .map(bank => bank.name)
                .sort((a, b) => a.localeCompare(b));

            setBankNames(names);
        }
    }, []);



    return (
        <AuthPageLayout>
            <div className='w-full'>
                {loading &&
                    <Loader title={`submitting`} />
                }

                {confirm &&
                    <ModalLayout setModal={setConfirm} clas={`w-11/12 mx-auto lg:w-1/2`}>
                        <div className="w-full p-5 bg-white text-dark rounded-md flex items-center flex-col justify-center">
                            <div className="flex flex-col gap-4 w-full">
                                <div className="font-semibold text-center">Cofirm Withdrawal</div>
                                <div className="flex w-full items-center justify-between ">
                                    <button onClick={() => setConfirm(false)} className='px-4 py-1.5 rounded-md bg-red-600 text-white'>cancel</button>
                                    <button onClick={submitRequest} className='px-4 py-1.5 rounded-md bg-green-600 text-white'>confirm</button>
                                </div>
                            </div>
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
                        <div className='md:text-5xl text-4xl font-bold'>{currencies[1].symbol}{wallet.balance ? wallet.balance?.toLocaleString() : <span>0.00</span>}</div>
                        <div className='flex md:gap-10 gap-6 items-center mt-2'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-1 items-center'>
                                    <div className='md:size-3.5 size-3 bg-lightgreen rounded-full'></div>
                                    <div className='md:text-sm text-xs capitalize font-medium'>total inflow</div>
                                </div>
                                <div className='font-bold'>{currencies[1].symbol}{Object.values(wallet).length !== 0 ? <span>{wallet.total_deposit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </span> : <span>0.00</span>}</div>
                            </div>
                            <div className='flex flex-col gap-1 border-l-2 md:pl-10 pl-6'>
                                <div className='flex gap-1 items-center'>
                                    <div className='md:size-3.5 size-3 bg-red-600 rounded-full'></div>
                                    <div className='md:text-sm text-xs capitalize font-medium'>total outflow</div>
                                </div>
                                <div className='font-bold'>{currencies[1].symbol}{Object.values(wallet).length !== 0 ? <span>{wallet.total_outflow.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </span> : <span>0.00</span>}</div>
                            </div>
                        </div>
                    </div>

                </div>
                    <div className="w-full mt-10">
                        <div className="w-full bg-primary p-5">
                            <div className="flex items-center flex-col lg:flex-row w-full justify-between  mb-5">
                                <div className="text-xl lg:text-3xl font-bold text-gray-300  ">Request Withdrawal</div>
                                <div className="text-sm text-red-600">minimum of {currencies[1].symbol}{Object.values(utils).length !== 0 && utils.bank_withdraw_min.toLocaleString()} to initiate withdrawal</div>
                            </div>
                            <div onClick={prefillBank} className="mb-5 w-fit px-5 py-2 rounded-md cursor-pointer bg-ash text-white">Use linked account</div>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 lg:gap-10 mb-5">
                                <div className="flex w-full flex-col items-start gap-2">
                                    <div className="text-lightgreen">Amount ({currencies[1].symbol})</div>
                                    <div className="w-full">
                                        <FormInput placeholder={`amount`} name={`amounnt`} value={forms.amount} onChange={handleAmount} />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-start gap-2">
                                    <div className="text-lightgreen">Account Name</div>
                                    <div className="w-full">
                                        <FormInput placeholder={`account name`} name={`accountName`} value={forms.accountName} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-start gap-2">
                                    <div className="text-lightgreen">Account Number</div>
                                    <div className="w-full">
                                        <FormInput placeholder={`account number`} name={`accountNumber`} value={forms.accountNumber} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="">
                                    <div className="text-lightgreen">Bank Name</div>
                                    {show ?
                                        <div className="w-full mt-2">
                                            <FormInput read={true} value={bankAcc.bank_name} />
                                        </div> :
                                        <div className="w-11/12">
                                            <SelectComp
                                                title={`Select bank`}
                                                value={forms.bank}
                                                options={bankNames}
                                                fullWidth size={false}
                                                style={{ bg: '#212134', color: 'lightgrey', font: '0.8rem' }} handleChange={(e) => setForms({ ...forms, bank: e.target.value })} />

                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={`w-full cursor-pointer lg:w-1/2 mx-auto mb-10`}>
                                <FormButton type='button' onClick={confirmRequest} disabled={wallet.balance < utils.bank_withdraw_min ? true : false} className={`${wallet.balance < utils.bank_withdraw_min && 'hover:!bg-none !bg-[#2b4347] hover:!text-white !cursor-default'}`} title={`Request Withdrawal`} />
                            </div>
                        </div>

                        <div className="text-xl w-11/12 mx-auto mt-5 md:text-2xl font-bold text-gray-300 ">Latest Bank Transactions <span className='text-yellow-300'>(On Hold)</span></div>
                        <div className="w-11/12 mx-auto text-sm ">NB: on hold and transactions can be found in <Link to={`/user/transactions_history`} className='text-blue-600'>Transactions History</Link></div>
                        <div className="mt-5 w-11/12 mx-auto">
                            {dataLoading ?
                                <div className='flex items-center lg:grid lg:grid-cols-3 justify-between border-b border-slate-400 pb-2 w-full animate-pulse'>
                                    <div className='flex lg:gap-5 gap-2 items-start'>
                                        <div className='w-12 h-12 rounded-full bg-slate-400'></div>
                                        <div className='flex flex-col gap-4'>
                                            <div className='w-32 h-3 rounded-full bg-slate-400'></div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='md:w-28 w-24 h-2 rounded-full bg-slate-400'></div>
                                                <div className='md:w-16 w-12 h-2 rounded-full bg-slate-400'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div className='md:w-16 w-12 h-2 rounded-full bg-slate-400'></div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div className='md:w-16 w-12 h-2 rounded-full bg-slate-400'></div>
                                    </div>
                                </div>
                                :
                                <>
                                    {records && records.length > 0 ?
                                        records.map((trans, i) => {
                                            return (
                                                <WithdrawComp key={i} trans={trans} />
                                            )
                                        })
                                        :
                                        <div className="">No transations on hold!</div>
                                    }
                                </>
                            }
                        </div>
                    </div></>}
            </div>
        </AuthPageLayout>
    )
}

export default formsal