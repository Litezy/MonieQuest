import React from 'react'
import AdminPageLayout from './AdminPageLayout'
import { Link } from 'react-router-dom'

const GiftCardSingleOrder = () => {
    return (
        <AdminPageLayout>
            <div className="w-11/12 mx-auto">
                <div className=" mt-2">
                    <Link to={`/admin/giftcards/orders`} className="w-fit px-4 py-1.5 rounded-md bg-ash">back to orders</Link>
                </div>
            </div>
        </AdminPageLayout>
    )
}

export default GiftCardSingleOrder