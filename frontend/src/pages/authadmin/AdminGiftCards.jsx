import React from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link } from 'react-router-dom'
import { currencies } from '../../AuthComponents/AuthUtils'

const AdminGiftCards = () => {
    const Topheaders = [ 'FullName', 'Gift-Brand', 'Code', 'Pin',`Amount`, 'Details']

    const dummy = [
        {
            id: 1,
            fullname: 'Basit Money',
            gift_brand: 'Amazon',
            code: '748B-74FF-FJUR3....',
            pin: 1748,
            amount: 1000
        },
        {
            id: 2,
            fullname: 'Basit Money',
            gift_brand:'Apple',
            code: '748B-74FF-FJUR3....',
            pin: '',
            amount: 4000
        },
    ]
    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
            <div className=" text-lg font-bold w-full text-center my-5 capitalize">See Latest Giftcards Sell Orders below</div>
            <table className="w-full text-sm text-left rtl:text-right">
                        <thead className=" bg-primary text-base poppins ">
                            <tr>
                                {Topheaders.map((item, i) => (
                                    <th key={i} scope="col" className="px-3 text-lightgreen py-3">{item}</th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(dummy) ? dummy.map((item, i) => (
                                <tr className=" border-b " key={i}>
                                    <th scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                        {item.fullname}
                                    </th>
                                    <td className="px-3 py-3">
                                        {item.gift_brand}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item.code}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item.pin}
                                    </td>

                                    <td className="px-3 py-3">
                                        {currencies[1].symbol}{item.amount.toLocaleString()}
                                    </td>
                                    <td className="px-3 py-3">
                                        <Link to={`${item.id}`}
                                        className="bg-primary to-sec truncate text-white px-5 rounded-lg py-2">view details</Link>
                                    </td>

                                </tr>
                            )) :
                                <div className=" w-full text-lg font-semibold flex items-center justify-center">No Buy Orders  </div>
                            }

                        </tbody>
                    </table>
            </div>
        </AdminPageLayout>
    )
}

export default AdminGiftCards