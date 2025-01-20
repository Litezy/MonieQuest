import React, { useState } from 'react'
import { TbSwitch2 } from 'react-icons/tb'
import FormInput from '../utils/FormInput'
import { currencies } from './AuthUtils'

const BuyGiftcard = () => {

    const [cards, setCards] = useState({
        type: '',
        amount: '',
        method: ''
    })
    const handleChange = (e) => {
        setCards({
            ...cards,
            [e.target.name]: e.target.value
        })
    }
    const handleAmount = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (!isNaN(rawValue)) {
            const numericValue = Number(rawValue);
            setCards({
                ...cards,
                amount: numericValue.toLocaleString(),
            });
        }
    }

    const [selectedCurr, setSelectedCurr] = useState({
        name: currencies[0].name,
        symbol: currencies[0].symbol
    })
    const rate = 1370
    const changeCurrency = () => {
        if (selectedCurr.name === 'USD' && selectedCurr.symbol === '$') {
            setSelectedCurr({
                name: currencies[1].name,
                symbol: currencies[1].symbol
            })
            const amt = cards.amount.replace(/,/g, '')
            const newAmnt = amt * rate
            setCards({ ...cards, amount: newAmnt.toLocaleString() })
            console.log(cards.amount)
        } else {
            setSelectedCurr({
                name: currencies[0].name,
                symbol: currencies[0].symbol
            })
            const amt = cards.amount.replace(/,/g, '')
            const newAmnt = amt / rate
            console.log(cards.amount)
            setCards({ ...cards, amount: newAmnt.toLocaleString() })
        }
    }
    return (
        <div className='w-full mt-5 lg:mt-10'>
            <div className="w-11/12 lg:w-2/3  mx-auto">

                <div className="w-full flex items-start flex-col gap-4">
                    <div className="flex items-start gap-2 flex-col w-full">
                        <div className="">Giftcard type</div>
                        <select className='w-full bg-secondary' name="" id="">
                            <option value="amazon" >amazon</option>
                        </select>
                        <div className="text-xs text-red-500">Please Note: you can only buy a minimum of $5 and maximum of $2000 and
                            an additional fee of $2 (₦3400) is added</div>
                    </div>
                    <div className="flex w-full items-start gap-2 flex-col  ">
                        <div className="font-bold text-lg">Amount:</div>
                        <div className="w-full items-center flex px-2 gap-2 border border-gray-400 rounded-lg">
                            <div className="w-full">
                                <FormInput name={`amount`} border={false} value={cards.amount} onChange={handleAmount} placeholder={selectedCurr.symbol} />
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
                </div>
            </div>
        </div>
    )
}

export default BuyGiftcard