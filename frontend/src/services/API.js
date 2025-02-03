import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from '../utils/pageUtils'

export const URL = import.meta.env.VITE_API_URL
export const imageurl = import.meta.env.VITE_API_URL


const user = 'api/user/'
const user_urls = {
    signup: user + 'create-account',
    verify_email: user + 'verify-email',
    login: user + 'login-account',
    profile: user + 'profile',
    send_otp: user + 'send-otp',
    verify_otp: user + 'verify-otp',
    change_password: user + 'change-password',
    contact: user + 'contacts',
    update_profile: user + 'update-profile',
    get_wallet: user + 'get-wallet',
    create_update_bank: user + 'create-update-bank',
    get_bank_account: user + 'get-bank-account',
    update_utils: user + 'update-utils',
    get_utils: user + 'get-utils',
    create_update_kyc: user + 'create-update-kyc',
    user_kyc: user + 'user-kyc',
}

const notification = 'api/notification/'
const notification_urls = {
    all_notis: notification + 'all-notis',
    update_all_notis: notification + 'update-all-notis',
    update_single_notis: notification + 'update-single-notis',
    delete_notis: notification + 'delete-notis',
}
const transaction = 'api/transactions/'

const trans_url = {
    buy_crypto: transaction + `buy_crypto`,
    sell_crypto: transaction + `sell_crypto`,
    sell_giftcard: transaction + `sell_giftcard`,
    all_user_transactions: transaction + 'get_alltrans',
    crypto_order_history: transaction + 'get_order_history',
    single_history: transaction +'single_order_history',
    complete_payment: transaction +'single_paid_order'
}
export const Apis = {
    user: user_urls,
    notification: notification_urls,
    transaction: trans_url,
}


export const GetApi = async (endpoint) => {
    const response = await axios.get(`${URL}/${endpoint}`)
    return response.data
}

export const PostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}

export const AuthGetApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.get(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const AuthPutApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.put(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const AuthPostApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

