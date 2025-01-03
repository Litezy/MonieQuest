import React, { useEffect, useState } from 'react'
import { TbSwitch2 } from "react-icons/tb";
import FormButton from '../utils/FormButton';
import { errorMessage } from '../utils/pageUtils';


const Crypto = () => {
    const [screen, setScreen] = useState(2)
    const tags = ['BUY', 'SELL']
    const rate = 1715
    const coins = ['Bitcoin', 'Ethereum', 'USDT', 'TRON', 'BNB']
    const currencies = [
        { name: 'USD', symbol: '$' },
        { name: 'NGN', symbol: '₦' },
    ]
    const [forms, setForms] = useState({
        amount: '',
        type: coins[0],
        network: '',
        wallet_add: '',
        isExpired: 'No'
    })

    const [active, setActive] = useState(tags[0])
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
        } else {
            setSelectedCurr({
                name: currencies[0].name,
                symbol: currencies[0].symbol
            })
        }
    }

    const submitToBuy = (e) => {
        e.preventDefault()
        if (!forms.amount) return errorMessage('amount is required')
        if (!forms.type) return errorMessage('coin type is required')
        setScreen(2)
    }

    const [inNaira, setInNaira] = useState('')
    useEffect(() => {
        if (forms.amount) {
            const naira = parseInt(forms.amount) * rate
            setInNaira(naira.toLocaleString())

        }
    }, [forms.amount, rate])

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('text');
        // const fieldName = e.target.name;
        const fieldValue = pastedData.trim();
        setForms({
            ...forms,
            wallet_add: fieldValue,
        })

        console.log('Pasted data:', pastedData);
    };

    return (
        <div className='w-full'>

            <div className="w-full ">
                <div className="mt-5 w-10/12 mx-auto  gap-10 flex items-center justify-center">
                    {tags.map((tag, i) => {
                        return (
                            <div onClick={() => setActive(tag)} className={`cursor-pointer w-full py-3 ${tag === active && tag === 'BUY' ? 'bg-green-600 text-white' : tag === active && tag === 'SELL' ? 'bg-red-600 text-white' : 'text-dark bg-white'} text-center `} key={i}>{tag}</div>
                        )
                    })}
                </div>

                {screen === 1 && active === 'BUY' &&
                    <div className="w-full flex items-center justify-center">
                        <div className="flex w-1/2  mx-auto mt-5 items-start gap-5 flex-col">
                            <div className="flex items-start gap-2 flex-col w-full">
                                <div className="font-bold text-lg">Coin Type:</div>
                                <select onChange={(e) => setForms({ ...forms, type: e.target.value })} className="bg-white w-full text-dark border border-gray-300 rounded-md py-2 px-4">
                                    {coins.map((coin, i) => {
                                        return (
                                            <option value={coin} key={i} className="outline-none">{coin}</option>
                                        )
                                    })}
                                </select>
                                <div className="w- text-red-500 text-sm">Please Note: you can only buy a minimum of $5 a nd maximum of $2,000 and an additional
                                    fee of $2 (₦3,400) is added</div>
                            </div>
                            <div className="flex w-full items-start gap-2 flex-col  ">
                                <div className="font-bold text-lg">Amount:</div>
                                <div className="w-full items-center flex border border-gray-400 rounded-lg">
                                    <input
                                        min={0}
                                        className={`outline-none bg-transparent w-[80%] input-off py-3 px-4 lg:text-sm text-base  `} onChange={handleAmount} name='amount' value={forms.amount} placeholder={`${selectedCurr.symbol} amount`} type={'text'}
                                    ></input>
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
                            <button onClick={submitToBuy} className={`bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-full h-fit py-3.5 text-lg rounded-xl`}>Buy Crypto</button>

                        </div>
                    </div>
                }
                {screen === 2 && active === 'BUY' &&
                    <div className="w-full flex items-center justify-center">
                        <div className="flex w-1/2  mx-auto mt-5 items-start gap-5 flex-col">
                            <div className="flex items-start gap-2 flex-col w-full">
                                <div className="text-center  w-full text-2xl">Buying <span className='text-lightgreen font-bold'>{currencies[0].symbol} {forms.amount}</span> worth of {forms.type} at <br /> <span className='text-lightgreen font-bold'>{currencies[1].symbol} {inNaira}</span></div>
                            </div>

                            <div className="flex w-full items-start gap-2 flex-col  ">
                                <div className="font-bold text-lg">Network</div>
                                <div className="w-full ">
                                    <input
                                        className={`outline-none border w-full bg-transparent  rounded-md  py-3 px-4 lg:text-sm text-base  `} onChange={handleChange} onPaste={handlePaste} name='network' value={forms.network} placeholder={`network`} type={'text'}
                                    ></input>

                                </div>
                            </div>
                            <div className="flex w-full items-start gap-2 flex-col  ">
                                <div className="font-bold text-lg">Wallet Address</div>
                                <div className="w-full flex items-center gap-1 border rounded-md py-3 px-2">
                                    <input
                                        className={`outline-none  w-full bg-transparent    lg:text-sm text-base  `} onChange={handleChange} name='wallet_add' value={forms.wallet_add} placeholder={`wallet address`} type={'text'}
                                    ></input>
                                    <div
                                        onClick={() =>
                                            navigator.clipboard.readText().then((text) => {
                                                setForms((prevForms) => ({
                                                    ...prevForms,
                                                    wallet_add: text,
                                                }));
                                                console.log('Pasted data:', text);
                                            })

                                        }
                                        className="text-sm cursor-pointer text-lightgreen">paste</div>
                                </div>
                            </div>
                            <div className="flex w-full items-start gap-2 flex-col  ">
                                <div className="font-bold text-lg">Does this wallet expire?</div>
                                <div className="w-full ">
                                    <select onChange={(e) => setForms({ ...forms, isExpired: e.target.value })} className="bg-white w-full text-dark border border-gray-300 rounded-md py-2 px-4">
                                        <option value={`no`} className="outline-none">No</option>
                                        <option value={`yes`} className="outline-none">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={submitToBuy} className={`bg-green-500 hover:bg-lightgreen text-white hover:text-ash w-full h-fit py-3.5 text-lg rounded-xl`}>Confirm</button>

                        </div>
                    </div>
                }

            </div>

        </div>
    )
}

export default Crypto