import { BiMoneyWithdraw } from "react-icons/bi";
import { HiGift } from "react-icons/hi2";
import { AiFillDollarCircle } from "react-icons/ai";
import { CgToolbox } from "react-icons/cg";
import { FaUsers, FaBloggerB } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdCurrencyExchange, MdDashboard, MdLeaderboard } from "react-icons/md";
import { RiUserFill } from 'react-icons/ri'
import { GoHistory } from "react-icons/go";



export const pagelinks = [
    { label: 'dashboard', url: '/admin/dashboard', icon: MdDashboard},
    { label: 'users', url: '/admin/all_users', icon: FaUsers},
    { label: 'crypto exchange', main: '/exchange', url: '/admin/exchange/buy_orders', icon: MdCurrencyExchange},
    { label: 'gift cards', url: '/admin/giftcards/orders',main:'/giftcards', icon: HiGift},
    { label: 'profit tools', main: '/profit_tools', url: '/admin/profit_tools/orders', icon: CgToolbox},
    { label: 'airdrops', main: '/airdrops', url: '/admin/airdrops/create', icon: AiFillDollarCircle},
    { label: 'blogs', main: '/blogs', url: '/admin/blogs/create', icon: FaBloggerB},
    { label: 'bank withdrawals', url: '/admin/bank_withdrawals', main:'/bank_withdrawals', icon: BiMoneyWithdraw},
    { label: 'transaction history', url: '/admin/transactions_history', icon: GoHistory},
    { label: 'profile', url: '/admin/profile', icon: RiUserFill},
    { label: 'notifications', url: '/admin/notifications', icon: IoNotificationsSharp },
    { label: 'leaderboard', url: '/admin/leaderboard', icon: MdLeaderboard},
]

export const dummy = [
    {
        id: 1,
        fullname: 'Basit Money',
        crypto: 'USDT',
        network: 'TRC-20',
        amount: 1000
    },
    {
        id: 2,
        fullname: 'Basit Money',
        crypto: 'Binance BNB',
        network: 'BNB',
        amount: 1000
    },
]