import React from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import AdminSummary from '../../AdminComponents/AdminSummary'

const AdminDashboard = () => {
    const data = [
        {
            title:'Total Users',
            value: 1000,
            color:'bg-blue-600'
        },
        {
            title:'Total Crypto Sells',
            value: 1500,
            color:'bg-red-600'
        },
        {
            title:'Total Crypto Buys',
            value: 1000,
            color:'bg-green-600 '
        },
        {
            title:'Total Giftcards Traded',
            value: 100,
            color:'bg-gray-400'
        },
        {
            title:'Total Products Ordered',
            value: 600,
            color:'bg-blue-600'
        },
        {
            title:'Total Airdrops Created',
            value: 400,
            color:'bg-red-600'
        },
        {
            title:'Total Blogs Published',
            value: 1000,
            color:'bg-green-600'
        },
        {
            title:'Total Bank Withdrawals',
            value: 200,
            color:'bg-gray-600'
        },
    ]
    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
               <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
               {data.map((item,i)=>{
                return (
                    <AdminSummary key={i} item={item}/>
                )
               })}
               </div>
            </div>
        </AdminPageLayout>
    )
}

export default AdminDashboard