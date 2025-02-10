import React, { useEffect, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import AdminSummary from '../../AdminComponents/AdminSummary'
import { Apis, AuthGetApi } from '../../services/API'

const AdminDashboard = () => {
    const [totals, setTotals] = useState({})
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        const FetchDashboardTotals = async () => {
            try {
                const response = await AuthGetApi(Apis.admin.dashboard_totals)
                if (response.status === 200) {
                    setTotals(response.msg)
                }
            } catch (error) {
                //
            } finally {
                setDataLoading(false)
            }
        }
        FetchDashboardTotals()
    }, [])

    const data = [
        {
            title: 'Total Users',
            value: Object.values(totals).length !== 0 ? totals?.users : 'n/a',
            color: 'bg-blue-600'
        },
        {
            title: 'Total Crypto Sells',
            value: Object.values(totals).length !== 0 ? totals?.crypto_sells : 'n/a',
            color: 'bg-red-600'
        },
        {
            title: 'Total Crypto Buys',
            value: Object.values(totals).length !== 0 ? totals?.crypto_buys : 'n/a',
            color: 'bg-green-600 '
        },
        {
            title: 'Total Giftcards Traded',
            value: Object.values(totals).length !== 0 ? totals?.giftcards : 'n/a',
            color: 'bg-gray-600'
        },
        {
            title: 'Total Products Ordered',
            value: Object.values(totals).length !== 0 ? totals?.product_orders : 'n/a',
            color: 'bg-blue-600'
        },
        {
            title: 'Total Airdrops Created',
            value: Object.values(totals).length !== 0 ? totals?.airdrops : 'n/a',
            color: 'bg-red-600'
        },
        {
            title: 'Total Blogs Published',
            value: Object.values(totals).length !== 0 ? totals?.blogs : 'n/a',
            color: 'bg-green-600'
        },
        {
            title: 'Total Bank Withdrawals',
            value: Object.values(totals).length !== 0 ? totals?.withdrawals : 'n/a',
            color: 'bg-gray-600'
        },
    ]

    return (
        <AdminPageLayout>
            <div className='w-11/12 mx-auto'>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dataLoading ?
                        <>
                            {new Array(3).fill(0).map((_, i) => (
                                <div key={i} className='h-32 w-full mb-5 bg-slate-400 animate-pulse rounded-e-xl rounded-tl-lg'>
                                    <div className='w-full h-1/2 bg-slate-500 animate-pulse rounded-lg'></div>
                                </div>
                            ))}
                        </>
                        :
                        <>
                            {data.map((item, i) => {
                                return (
                                    <AdminSummary key={i} item={item} />
                                )
                            })}
                        </>
                    }
                </div>
            </div>
        </AdminPageLayout>
    )
}

export default AdminDashboard