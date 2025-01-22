import React, { useEffect, useState } from 'react'
import { TbSwitch2 } from "react-icons/tb";
import { ErrorAlert, SuccessAlert } from '../utils/pageUtils';
import FormInput from '../utils/FormInput';
import { BankAcc, blockchainNetworks, coins, currencies, instructions } from './AuthUtils';
import ModalLayout from '../utils/ModalLayout';
import { BsInfoCircleFill } from "react-icons/bs";
import { FaCopy } from 'react-icons/fa';
import { TfiTimer } from "react-icons/tfi";
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../GeneralComponents/Loading';


const Crypto = () => {
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const rate = 1715
    const [forms, setForms] = useState({
        amount: '',
        type: coins[0],
        network: '',
        wallet_add: '',
        isExpired: 'No'
    })

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const handleAmount = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (!isNaN(rawValue)) {
            const numericValue = Number(rawValue);
            setForms({
                ...forms,
                amount: numericValue.toLocaleString(),
            });
        }
    }



    const [selectedCurr, setSelectedCurr] = useState({
        name: currencies[0].name,
        symbol: currencies[0].symbol
    })

    const changeCurrency = () => {
        if (selectedCurr.name === 'USD' && selectedCurr.symbol === '$') {
            setSelectedCurr({
                name: currencies[1].name,
                symbol: currencies[1].symbol
            })
            const amt = forms.amount.replace(/,/g, '')
            const newAmnt = amt * rate
            setForms({ ...forms, amount: newAmnt.toLocaleString() })
        } else {
            setSelectedCurr({
                name: currencies[0].name,
                symbol: currencies[0].symbol
            })
            const amt = forms.amount.replace(/,/g, '')
            const newAmnt = amt / rate
            setForms({ ...forms, amount: newAmnt.toLocaleString() })
        }
    }

    const limit = 2000
    const nairaLimit = limit * rate
    const minimum = 10
    const submit = (e) => {
        e.preventDefault()
        if (!forms.amount) return ErrorAlert('amount is required')
        if (forms.amount < minimum) return ErrorAlert('amount is too small')
        if (!forms.type) return ErrorAlert('coin type is required')
        if (selectedCurr.name !== 'USD' && selectedCurr.symbol !== '$') {
            const amt = forms.amount.replace(/,/g, '')
            const newamt = amt * rate
            console.log(`new Amout :${newamt},currency : ${selectedCurr}`)
            if (newamt > nairaLimit) return ErrorAlert(`Sorry, you can't buy above ${currencies[1].symbol}${nairaLimit.toLocaleString()}`)
        }
        if (selectedCurr.name === 'USD' && selectedCurr.symbol === '$') {
            const amt = forms.amount.replace(/,/g, '')
            console.log(`newamt: ${amt},currency : ${selectedCurr.symbol}`)
            if (amt > limit) return ErrorAlert(`Sorry, you can't buy above $2,000`)
        }

        setScreen(2)
    }


    const [inNaira, setInNaira] = useState('')
    useEffect(() => {
        if (forms.amount) {
            const naira = parseInt(forms.amount.replace(/,/g, '')) * rate
            setInNaira(naira.toLocaleString())
        }
    }, [forms.amount, rate])


    const submitToBuy = (e) => {
        e.preventDefault()
        console.log(forms, selectedOption)

    }

    const copyToClip = () => {
        navigator.clipboard.writeText(BankAcc.accountNumber)
            .then(() => { SuccessAlert('account number copied successfully') })
            .catch(() => { console.log(`failed to copy account number`) })
    }

    const navigate = useNavigate()
    return (
        <div className='w-full'>
            {loading &&
                <ModalLayout>
                    <div className="flex gap-5 flex-col mx-auto">
                        <Loading />
                        <div className="mt-20 text-white">...Submitting</div>
                    </div>
                </ModalLayout>
            }
            <div className="w-11/12 mx-auto lg:w-full">
                {screen === 1 &&
                    <div className="w-full  lg:w-2/3 mx-auto flex items-center justify-center">
                        <div className="flex w-full  mx-auto mt-5 items-start gap-5 flex-col">
                            {/* <div className="text-center font-bold text-green-500 w-full">Buy Crypto</div> */}
                            <div className="flex items-start gap-2 flex-col w-full">
                                <div className="font-bold text-lg">Coin Type:</div>
                                <select onChange={(e) => setForms({ ...forms, type: e.target.value })} className="bg-dark w-full text-white border border-gray-300 rounded-md py-2 px-4">
                                    {coins.map((coin, i) => {
                                        return (
                                            <option value={coin} key={i} className="outline-none">{coin}</option>
                                        )
                                    })}
                                </select>
                                <div className="text-red-500 text-sm">Please Note: you can only buy a minimum of $5 a nd maximum of $2,000 and an additional
                                    fee of $2 (₦3,400) is added</div>
                            </div>
                            <div className="flex w-full items-start gap-2 flex-col  ">
                                <div className="font-bold text-lg">Amount:</div>
                                <div className="w-full items-center flex px-2 gap-2 border border-gray-400 rounded-lg">
                                    <div className="w-full">
                                        <FormInput name={`amount`} border={false} value={forms.amount} onChange={handleAmount} placeholder={selectedCurr.symbol} />
                                    </div>
                                    <div className="">{selectedCurr.name}</div>
                                </div>

                            </div>
                            <div className="flex item-center justify-between w-full">
                                <div className="text-sm">Amount in Naira</div>
                                <div onClick={changeCurrency} className="flex items-center gap-1 cursor-pointer">
                                    <div className="text-sm">set by {selectedCurr.name === 'USD' ? 'naira' : 'usd'}</div>
                                    <TbSwitch2 className='text-lightgreen ' />
                                </div>
                            </div>
                            <div className="flex w-full item-center text-base lg:text-sm justify-between">
                                <div className="text-sm">Buying rate</div>
                                <div className="">{rate}/$</div>
                            </div>
                            <button onClick={submit} className={`bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-full h-fit py-3.5 text-lg rounded-xl`}>Buy Crypto</button>

                        </div>
                    </div>
                }
                {screen === 2 &&
                    <div className="w-full  flex items-center justify-center">
                        <div className="flex w-11/12 lg:w-2/3  mx-auto mt-5 items-start gap-5 flex-col">
                            {modal &&

                                <ModalLayout setModal={setModal} clas={`w-11/12 lg:w-1/2 mx-auto`}>
                                    <div className="w-full flex flex-col items-center gap-5 bg-white text-dark py-10 rounded-md px-10  ">
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <BsInfoCircleFill className='text-2xl lg:text-3xl ' />
                                            <div className="text-xl font-bold">Please read the instructions below</div>
                                        </div>
                                        <div className="flex flex-col items-start gap-2 mt-2">
                                            {instructions.map((inst, i) => {
                                                return (
                                                    <ul key={i} className=" list-disc text-sm">
                                                        <li>{inst}</li>
                                                    </ul>
                                                )
                                            })}
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <input type="checkbox" />
                                            <p>I agree to the instructions above and want to proceed to the payment window.</p>
                                        </div>
                                        <button onClick={() => setScreen(3)} className='mt-10 w-full rounded-md bg-ash hover:bg-lightgreen text-white py-3'>Confirm</button>
                                    </div>
                                </ModalLayout>
                            }
                            <div className="flex items-start gap-2 flex-col w-full">
                                <div className="text-center  w-full text-2xl">Buying <span className='text-lightgreen font-bold'>{currencies[0].symbol}{forms.amount}</span> worth of {forms.type} at <br /> <span className='text-lightgreen font-bold'>{currencies[1].symbol}{inNaira}</span></div>
                            </div>
                            <div className="text-sm text-center w-full">kindly provide your wallet address</div>

                            <div className="flex w-full items-start gap-2 flex-col  ">
                                <div className="font-bold text-lg">Network</div>
                                <div className="w-full ">
                                    <select className='w-full bg-dark rounded-md'>
                                        {blockchainNetworks.map((network) => (
                                            <option className='bg-' key={network.value} value={network.value}>
                                                {network.label}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <FormInput name={`network`} value={forms.network} onChange={handleChange} /> */}

                                </div>
                            </div>
                            <div className="flex w-full items-start gap-2 flex-col  ">
                                <div className="font-bold text-lg">Wallet Address</div>
                                <div className="w-full flex items-center gap-1 border rounded-md  px-2">
                                    <div className="w-full">
                                        <FormInput name={`wallet_add`} border={false} value={forms.wallet_add} onChange={handleChange} />
                                    </div>
                                    <div
                                        onClick={() =>
                                            navigator.clipboard.readText().then((text) => {
                                                setForms((prevForms) => ({
                                                    ...prevForms,
                                                    wallet_add: text,
                                                }));
                                                // console.log('Pasted data:', text);
                                            })

                                        }
                                        className="text-sm cursor-pointer text-lightgreen">paste</div>
                                </div>
                            </div>
                            <div className="flex w-full items-start gap-2 flex-col  ">
                                <div className="font-bold text-lg">Does this wallet expire?</div>
                                <div className="w-full ">
                                    {/* <Select
                                        options={options}
                                        value={selectedOption}
                                        onChange={handleOption}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                backgroundColor: 'white', // Custom control background color
                                                color: 'white',
                                                boxShadow: state.isFocused ? 'none' : base.boxShadow, 
                                                borderColor: state.isFocused ? '#10b981' : base.borderColor,
                                                outline: 'none',
                                                '&:hover': {
                                                    borderColor: '#10b981', 
                                                },
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                backgroundColor: '#141523'// Custom menu background
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isFocused ? '#141523' : '#171828',
                                                color: 'white',
                                            }),
                                        }}
                                    /> */}
                                    <select onChange={(e) => setForms({ ...forms, isExpired: e.target.value })} className=" border-gray-300 bg-dark   
                                    w-full text-white border   rounded-md py-2 px-4">
                                        <option value={`no`} className="outline-none">No</option>
                                        <option value={`yes`} className="outline-none bg-transparent">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full gap-10">
                                <button onClick={() => setScreen(1)} className='w-1/2 bg-dark text-lg rounded-xl py-3'>back</button>
                                <button onClick={() => setModal(true)} className={`bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-1/2 h-fit py-3 text-lg rounded-xl`}>Confirm</button>
                            </div>

                        </div>
                    </div>
                }

                {screen === 3 &&
                    <div className="w-full min-h-[70dvh] flex items-center justify-center">
                        <div className="w-full flex items-center gap-5 flex-col">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center text-lightgreen font-bold text-2xl">
                                    <div className="">{currencies[1].symbol}</div>
                                    <div className="">{inNaira.toLocaleString()}</div>
                                </div>
                                <div className="text-sm text-lightgreen">bank transfer</div>
                            </div>

                            <div className="">Kindly pay the above amount to the payment details below</div>
                            <div className=" w-8/12 px-5 text-dark py-5 bg-[#fafafa] rounded-md lg:w-2/3 mx-auto flex items-center justify-between flex-col ">
                                <div className="flex items-center justify-between w-full">
                                    <div className="">Bank Name</div>
                                    <div className="">{BankAcc.name}</div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="">Account number</div>
                                    <div className="flex items-center gap-2">
                                        <div className="">{BankAcc.accountNumber}</div>
                                        <FaCopy onClick={copyToClip} className='text-ash text-xs cursor-pointer' />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="">Account name</div>
                                    <div className="">{BankAcc.accountName}</div>
                                </div>
                            </div>
                            <button onClick={() => setScreen(4)} className={`bg-green-500 mt-10 hover:bg-lightgreen text-white hover:text-ash lg:w-2/3 py-2 w-8/12 text-lg rounded-xl`}>I have made the payment</button>
                        </div>
                    </div>
                }

                {screen === 4 &&
                    <div className="">
                        <div className="w-11/12 mx-auto min-h-[80dvh] flex items-center justify-center">

                            <div className="w-full flex items-center  flex-col">
                                <div className="rounded-full h-20 w-20 flex items-center justify-center border border-lightgreen">
                                    <TfiTimer className='text-2xl text-lightgreen' />
                                </div>
                                <div className="mt-10 flex flex-col items-center gap-2">
                                    <div className="">Your transaction is being processed, keep an eye on your dashboard.
                                    </div>
                                    <button onClick={() => navigate('/dashboard')} className={`bg-green-500  mt-10 hover:bg-lightgreen text-white hover:text-ash py-2 text-center rounded-md w-full`}>
                                        Go back to dashboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>

        </div>
    )
}

export default Crypto