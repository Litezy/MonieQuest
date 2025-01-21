import React from 'react'
import { currencies } from './AuthUtils'

const TransModal = ({ selected }) => {
    // tag: 'withdrawal',
    // amount: '1000',
    // date: '20 Feb 2024',
    // status: 'pending',
    // account_number: '274774783827',
    // bank_acount: 'Moniepoint',
    // account_name: 'Moniequest Basit',
    // trans_id:'7583ndjfiufuf0r9994',
    // reference_id:'7583ndjfiufuf0r9994222',
    return (
        <div className="flex w-full items-start gap-2 flex-col ">
            {/* <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Transaction ID</div>
                <div className="capitalize ">{selected?.id}</div>
            </div> */}
            <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Transaction</div>
                <div className="capitalize ">{selected?.tag === 'withdrawal' ? 'Bank withdrawal' : selected?.tag}</div>
            </div>
            {selected?.type && <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Transaction Type</div>
                <div className="capitalize ">{selected?.type}</div>
            </div>}
            <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Transaction Date</div>
                <div className="capitalize ">{selected?.date}</div>
            </div>
            <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Transaction Amount</div>
                <div className="capitalize ">{currencies[1].symbol}{selected?.amount}</div>
            </div>
            <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Transaction ID</div>
                <div className="capitalize ">{selected?.trans_id}</div>
            </div>
            {selected?.reference_id && <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Transaction Reference</div>
                <div className="">{selected?.trans_id}</div>
            </div>}
            {selected?.bank_account && <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Bank Name</div>
                <div className="">{selected?.bank_account}</div>
            </div>}
            {selected?.account_number && <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Withdrawal Account Number</div>
                <div className="">{selected?.account_number}</div>
            </div>}

            {selected?.account_name && <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Account Name</div>
                <div className="">{selected?.account_name}</div>
            </div>}
            <div className="flex items-center border-b pb-2 border-zinc-600 w-full justify-between">
                <div className="">Transaction Status</div>
                <div className="">{selected?.status}</div>
            </div>
            
        </div>
    )
}

export default TransModal