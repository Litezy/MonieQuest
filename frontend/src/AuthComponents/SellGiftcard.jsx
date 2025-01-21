import React, { useEffect, useState } from 'react'
import { TbSwitch2 } from 'react-icons/tb'
import FormInput from '../utils/FormInput'
import { currencies, giftCardValidations } from './AuthUtils'
import { errorMessage, SuccessAlert } from '../utils/pageUtils'

const SellGiftcard = () => {

    //defining states
    const [cards, setCards] = useState({
        type: '',
        amount: '',
        code: ''
    })
    const rate = 1370
    const [carderror, setCarderror] = useState({
        status: false,
        msg: ''
    })
    const [proceed,setProceed] = useState(false)
    const [selectedCard, setSelectedCard] = useState({
        brand: '', length: '', regex: '', codelength: ''
    })
    const [selectedCurr, setSelectedCurr] = useState({
        name: currencies[0].name,
        symbol: currencies[0].symbol
    })


    //defining functions
    const handleChange = (e) => {
        setCards({ ...cards,[e.target.name]: e.target.value})
    }

    const handleType = (e) => {
        setCards({...cards, code: '',type: e.target.value,amount:''})
        setProceed(false)
    }
    useEffect(() => {
        const findcard = () => {
            if (cards.type) {
                const findBrand = giftCardValidations.filter((b) => b.brand === cards.type)
                setSelectedCard(findBrand[0])
                // console.log(findBrand)
            }
        }

        findcard()
    }, [cards.type])

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

    const checkCode = () => {
        if (!selectedCard || !selectedCard.brand){
            return errorMessage("Please select a gift card brand ");
        }
            if( !selectedCard.codelength ) {
            return errorMessage(`Please enter a valid ${selectedCard.brand} code or re-enter last digits of your code.`);
        }
        if(!cards.amount) return errorMessage('Please input a valid amount')
        const selectedBrand = giftCardValidations.find(item => item.brand === selectedCard.brand)
        if (!selectedBrand) return errorMessage("Invalid brand selected");
        if (parseInt(selectedCard.codelength) !== selectedBrand.length) {
            setCarderror({
                status: true,
                msg: 'code too short'
            });
            errorMessage(`Code must be ${selectedCard.length} characters long`);
            return setTimeout(()=>{
                setCarderror({status: false,msg: '' })},4000)
        }
        if (selectedCard.regex.test(selectedCard.regex)) {
            console.log("Invalid code")
            return setCarderror({status: true,msg: 'Invalid code'});
        }
        // If all validations pass
        setCarderror({status: false,msg: ""});
        SuccessAlert('valid code')
        setProceed(true)
    }

    const handleCode = (e) => {
        let value = e.target.value.replace(/[^A-Za-z0-9]/g, '');
        const selectedBrand = selectedCard.brand
        if (!selectedBrand) errorMessage('please select a giftcard brand')
        value = value.substring(0, selectedCard.length);
        const formattedValue = value.match(/.{1,4}/g)?.join('-') || value;
        const newval = formattedValue.replace(/-/g, '')
        setCards({
            ...cards,
            code: formattedValue
        });
        setSelectedCard({
            ...selectedCard,
            codelength: newval.length
        })
    };


    const sellCard = (e)=>{
        e.preventDefault()
        console.log(cards)
    }


    return (
        <div className='w-full mt-5 lg:mt-10'>
            <div className="w-11/12 lg:w-2/3  mx-auto">

                <div className="w-full flex items-start flex-col gap-4">
                    <div className="flex items-start gap-2 flex-col w-full">
                        <div className="">Giftcard type</div>

                        <select onChange={handleType} value={cards.type} name={`type`} className='w-full bg-secondary' id="">
                            {giftCardValidations.map((gift, i) => {
                                return (
                                    <option key={i} value={gift.brand}>{gift.brand}</option>
                                )
                            })}
                        </select>

                        <div className="text-xs text-red-500">Please Note: you can only buy a minimum of $5 and maximum of $2000 and
                            an additional fee of $2 (₦3400) is added</div>
                    </div>
                    <div className="flex w-full items-start gap-2 flex-col  ">
                        <div className="font-bold text-lg">Amount:</div>
                        <div className="w-full items-center flex px-2 justify-center py-1 gap-2 border border-gray-400 rounded-lg">
                            <div className="w-full ">
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
                    <div className="flex items-start gap-2 w-full flex-col">
                        <div className="">Giftcard Code</div>
                        <div className="w-full">
                            <input
                                className={`outline-none focus-within:outline-none focus:outline-none focus:ring-0 focus:border-gray-400 uppercase focus:border ${carderror.status ? 'border-2 border-red-500' : 'border border-gray-400'} bg-transparent w-full h-fit  px-4 lg:text-sm text-base rounded-md `}
                                placeholder={`XXXX-XXXX-XXXX-XXXX`}
                                onKeyUp={() => setProceed(false)}
                                type={`text`}
                                onChange={handleCode}
                                name='code'
                                value={cards.code}
                            >
                            </input>
                            {carderror.status && <div className="text-red-500 text-sm">{carderror.msg}</div>}
                        </div>
                    </div>
                    <div className="mt-5 w-full">
                        <button onClick={proceed ? sellCard :checkCode} className={`w-full ${proceed ? 'bg-red-600' :'bg-ash'}  py-3 font-bold rounded-md`}>{proceed ?'Sell': 'Check Code'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellGiftcard