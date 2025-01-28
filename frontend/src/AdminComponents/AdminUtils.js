import { BiMoneyWithdraw } from "react-icons/bi";
import { BsGiftFill } from "react-icons/bs";
import { CgToolbox } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdCurrencyExchange, MdLeaderboard } from "react-icons/md";
import { RiSettings5Fill } from 'react-icons/ri'


export const pagelinks = [
    { label: 'crypto exchange', url: '/admin/exchange', icon: MdCurrencyExchange, last: false },
    { label: 'gift cards', url: '/admin/giftcards', icon: BsGiftFill, last: false },
    { label: 'profit tools', main: 'admin/profit_tools', url: '/admin/profit_tools', icon: CgToolbox, last: false },
    { label: 'bank withdrawals', url: '/admin/bank_withdrawals', icon: BiMoneyWithdraw, last: false },
    { label: 'settings', url: '/admin/settings', icon: RiSettings5Fill, last: false },
    { label: 'profile', url: '/admin/profile', icon: FaUser, last: false },
    { label: 'notifications', url: '/admin/notifications', icon: IoNotificationsSharp, last: true },
    { label: 'leaderboard', url: '/admin/leaderboard', icon: MdLeaderboard, last: false },
]