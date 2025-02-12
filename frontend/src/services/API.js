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
    create_update_bank: user + 'create-update-bank',
    wallet_bank_utils: user + 'wallet-bank-utils',
    create_update_kyc: user + 'create-update-kyc',
    user_kyc: user + 'user-kyc',
    get_leaderboard: user + 'get_leader'
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
    single_history: transaction + 'single_order_history',
    complete_payment: transaction + 'single_paid_order',
    cancel_order: transaction + 'cancel_order',
    giftcard_orders: transaction + 'giftcard_order_history',
    single_giftcard_order: transaction + 'single_giftcard_history',
    request_withdrawal: transaction + 'request_withdrawal',
    latest_withdrawals: transaction + 'latest_withdrawals',
    all_trans: transaction + 'get_alltrans'
}

const admin = 'api/admin/'
const admin_urls = {
    update_utils: admin + 'update-utils',
    get_utils: admin + 'get-utils',
    create_airdrop: admin + 'create-airdrop',
    all_airdrops: admin + 'all-airdrops',
    single_airdrop: admin + 'single-airdrop',
    update_airdrop: admin + 'update-airdrop',
    category_airdrops: admin + 'category-airdrops',
    all_tools: admin + 'all-profit_tools',
    single_tool: admin + 'single-profit_tool',
    update_tool: admin + 'update-profit_tool',
    listed_tools: admin + 'listed-profit_tools',
    all_tools_orders: admin + 'all-tools_orders',
    get_dashboard: admin + 'dashboard',
    update_kyc: admin + 'update-kyc',
    user_details: admin+'get_users_details',
    create_user: admin +'create_user',
    create_blog: admin + 'create-blog',
    update_blog: admin + 'update-blog',
    all_blogs: admin + 'all-blogs',
    single_blog: admin + 'single-blog',
    feature_blogs: admin + 'feature-blogs',
    cryptobuy_orders: admin +'get_buy_orders',
    cryptosell_orders: admin +'get_sell_orders',
    single_buy:admin +'get_single_buy',
    single_sell:admin +'get_single_sell',
    confirm_buy: admin + 'confirm_buy',
    confirm_sell: admin + 'confirm_sell',
    get_giftcard_orders: admin + 'get_giftcard_orders',
    get_single_giftcard_order: admin + 'get_single_giftcard_order',
    credit_gift_customer: admin + 'credit_gift_customer'
}

const profitTools = 'api/profit_tools/'
const profit_tools_urls = {
    submit_tool: profitTools + 'submit-profit_tool',
    user_tools: profitTools + 'user-profit_tools',
    add_rating: profitTools + 'add-rating',
    get_admin_bank: profitTools + 'get-admin-bank',
    place_tool_order: profitTools + 'place-tool-order'
}

export const Apis = {
    user: user_urls,
    notification: notification_urls,
    transaction: trans_url,
    admin: admin_urls,
    profitTools: profit_tools_urls
}


export const GetApi = async (endpoint) => {
    const response = await axios.get(`${URL}/${endpoint}`)
    return response.data
}

export const PostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}

export const PutApi = async (endpoint, data) => {
    const response = await axios.put(`${URL}/${endpoint}`, data)
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

