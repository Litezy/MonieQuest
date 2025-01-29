import { BiMoneyWithdraw } from "react-icons/bi";
import { HiGift } from "react-icons/hi2";
import { CgToolbox } from "react-icons/cg";
import { FaUsers  } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdCurrencyExchange, MdDashboard, MdLeaderboard } from "react-icons/md";
import { RiSettings5Fill, RiUserFill } from 'react-icons/ri'


export const pagelinks = [
    { label: 'dashboard', url: '/admin/dashboard', icon: MdDashboard, last: false },
    { label: 'users', url: '/admin/all_users', icon: FaUsers, last: false },
    { label: 'crypto exchange', url: '/admin/exchange', icon: MdCurrencyExchange, last: false },
    { label: 'gift cards', url: '/admin/giftcards', icon: HiGift, last: false },
    { label: 'profit tools', url: '/admin/profit_tools', icon: CgToolbox, last: false },
    { label: 'bank withdrawals', url: '/admin/bank_withdrawals', icon: BiMoneyWithdraw, last: false },
    { label: 'settings', url: '/admin/settings', icon: RiSettings5Fill, last: false },
    { label: 'profile', url: '/admin/profile', icon: RiUserFill, last: false },
    { label: 'notifications', url: '/admin/notifications', icon: IoNotificationsSharp, last: true },
    { label: 'leaderboard', url: '/admin/leaderboard', icon: MdLeaderboard, last: false },
]