const { ServerError, nairaSign } = require('../utils/utils')
const User = require('../models').users
const CryptoBuyModel = require(`../models`).exchangeBuys
const CryptoSellModel = require(`../models`).exchangeSells
const Notify = require(`../models`).notifications
const { customAlphabet } = require('nanoid');
const otp = require('otp-generator')
const Mailing = require('../config/emailDesign')
const blockAndNum = 'abcdefghijklmnopqrstuvwxyz0123456789'
const moment = require('moment')
const { Op } = require('sequelize')
const GiftCardSell = require('../models').giftCards
const BankWithdrawal = require('../models').withdrawals
const Wallet = require('../models').wallets


exports.BuyCrypto = async (req, res) => {
    try {
        const { crypto_currency, type, rate, amount, gas_fee, wallet_address, network, wallet_exp } = req.body
        if (!crypto_currency || !type || !amount || !gas_fee || !rate || !wallet_address || !network) return res.json({ status: 400, msg: 'Incomplete request, make sure all fields are filled.' })
        const findUser = await User.findOne({ where: { id: req.user } })
        if (!findUser) return res.json({ status: 401, msg: 'Account not authorized' })
        const orderId = otp.generate(6, { specialChars: false, lowerCaseAlphabets: false })
        const newbuy = await CryptoBuyModel.create({
            crypto_currency,
            type,
            amount,
            gas_fee,
            network,
            rate,
            wallet_address,
            wallet_exp,
            userid: req.user,
            order_no: orderId
        })
        await Notify.create({
            user: req.user, title: 'crypto buy order', content: `Your crypto buy order of ${orderId} has been created, kindly proceed with making payments to the bank details made available on the order.  `, url: `/user/transactions_history`
        })
        await Mailing({
            subject: 'Crypto Buy Order',
            eTitle: `Order ID: ${orderId} Created`,
            eBody: `
             <div style="font-size: 2rem">Hi ${findUser.first_name},</div>
             <div style="margin-top: 1.5rem">Your crypto buy order with the ID: ${orderId} has been created, kindly proceed with making payments to the bank details made available on the order. Thank you for choosing us.</div>
            `,
            account: findUser,
        })
        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
        if (admins.length > 0) {
            admins.map(async admin => {

                await Notify.create({
                    user: admin.id,
                    title: `New Crypto Buy Order`,
                    content: `Hi Admin, You have a crypto buy order with the ID: ${orderId}. pending payments`,
                    url: '/admin/exchange/buy_orders',
                })
                await Mailing({
                    subject: 'New Crypto Buy Order',
                    eTitle: `From User ${findUser.first_name}`,
                    eBody: `
                     <div>Hi Admin, You have a crypto buy order with the ID: ${orderId}, from user ${findUser.first_name} pending payments from user. ${moment(newbuy.createdAt).format('DD-MM-yyyy')} / ${moment(newbuy.createdAt).format('h:mm')}.</div> 
                    `,
                    account: admin,
                })
            })

        }
        return res.json({ status: 201, msg: 'Buy Order created successfully', data: newbuy })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.SellCrypto = async (req, res) => {
    try {
        const { crypto_currency, type, rate, amount, trans_hash, network } = req.body
        if (!crypto_currency || !type || !amount || !rate || !trans_hash || !network) return res.json({ status: 400, msg: 'Incomplete request, make sure all fields are filled.' })
        const findUser = await User.findOne({ where: { id: req.user } })
        if (!findUser) return res.json({ status: 401, msg: 'Account not authorized' })
        const orderId = otp.generate(6, { specialChars: false, lowerCaseAlphabets: false })
        const newsell = await CryptoSellModel.create({
            crypto_currency,
            type,
            amount,
            network,
            rate,
            trans_hash,
            userid: req.user,
            order_no: orderId
        })
        await Notify.create({
            user: req.user, title: 'crypto sell order', content: `Your crypto sell order of ${orderId} is being processed. Please keep an eye on your dashboard and email for futher details.  `, url: `/user/transactions_history`
        })
        await Mailing({
            subject: 'Crypto Sell Order',
            eTitle: `Order ID: ${orderId} Processing`,
            eBody: `
             <div style="font-size: 2rem">Hi ${findUser.first_name},</div>
             <div style="margin-top: 1.5rem">Your crypto sell order with the ID: ${orderId} is currently being processed. Once the transaction is confirmed, your account balance will be updated accordingly. Thank you for choosing us.</div>
            `,
            account: findUser,
        })
        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
        if (admins.length > 0) {
            admins.map(async admin => {

                await Notify.create({
                    user: admin.id,
                    title: `New Crypto Sell Order`,
                    content: `Hi Admin, You have a crypto sell order with the ID: ${orderId}.`,
                    url: '/admin/exchange/sell_orders',
                })
                await Mailing({
                    subject: 'New Crypto Sell Order',
                    eTitle: `From User ${findUser.first_name}`,
                    eBody: `
                     <div>Hi Admin, You have a crypto sell order with the ID: ${orderId}, from user ${findUser.first_name}. ${moment(newsell.createdAt).format('DD-MM-yyyy')} / ${moment(newsell.createdAt).format('h:mm')}.</div> 
                    `,
                    account: admin,
                })
            })

        }
        return res.json({ status: 201, msg: 'Sell Order created successfully' })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.SellGift = async (req, res) => {
    try {
        const { brand, amount, code, pin, rate, country } = req.body
        if (!brand || !amount || !code || !rate || !country) return res.json({ status: 400, msg: "Incomplete request, fill all required fields." })
        const findUser = await User.findOne({ where: { id: req.user } })
        if (!findUser) return res.json({ status: 401, msg: 'Account not authorized' })
        const orderId = otp.generate(6, { specialChars: false, lowerCaseAlphabets: false })
       if(isNaN(amount)) return res.json({status:400, msg:"Amount must be a number"})
        const newsell = await GiftCardSell.create({
            brand, amount, code, pin, userid: req.user, country, order_no: orderId, rate
        })
        await Notify.create({
            user: req.user, title: 'giftcard sell order', content: `Your giftcard sell order of ${orderId} is being processed. Please keep an eye on your dashboard and email for futher details.  `, url: `/user/transactions_history`
        })
        await Mailing({
            subject: 'Giftcard Sell Order',
            eTitle: `Order ID: ${orderId} Processing`,
            eBody: `
             <div style="font-size: 2rem">Hi ${findUser.first_name},</div>
             <div style="margin-top: 1.5rem">Your giftcard sell order with the ID: ${orderId} is currently being processed. Once the transaction is confirmed, your account balance will be updated accordingly. Thank you for trading with us.</div>
            `,
            account: findUser,
        })
        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
        if (admins.length > 0) {
            admins.map(async admin => {

                await Notify.create({
                    user: admin.id,
                    title: `New Giftcard Sell Order`,
                    content: `Hi Admin, You have a giftcard sell order with the ID: ${orderId}.`,
                    url: '/admin/giftcards/orders',
                })
                await Mailing({
                    subject: 'New Crypto Buy Order',
                    eTitle: `From User ${findUser.first_name}`,
                    eBody: `
                     <div>Hi Admin, You have a crypto sell order with the ID: ${orderId}, from user ${findUser.first_name}. ${moment(newsell.createdAt).format('DD-MM-yyyy')} / ${moment(newsell.createdAt).format('h:mm')}.</div> 
                    `,
                    account: admin,
                })
            })

        }
        return res.json({ status: 201, msg: 'Giftcard sell order created successfully', data: newsell, user: findUser })

    } catch (error) {
        ServerError(res, error)
    }
}

exports.getGiftCardTransactions = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 401, msg: 'User not auntorized' })
        const alltrans = await GiftCardSell.findAll({
            where: { userid: user ? user.id : req.user, status: 'pending' },
            order: [['createdAt', 'DESC']]
        })
        if (!alltrans) return res.json({ status: 404, msg: 'No order history found' })
        return res.json({ status: 200, msg: "fetch success", data: alltrans })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getUserCryptoOrderHistory = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 401, msg: 'User not auntorized' })
        const buytrans = await CryptoBuyModel.findAll({ where: { userid: user ? user.id : req.user, status: [`unpaid`, `paid`] } })
        const selltrans = await CryptoSellModel.findAll({ where: { userid: user ? user.id : req.user, status: 'pending' } })
        if (!buytrans && !selltrans) return res.json({ status: 404, msg: 'No crypto oder history found' })
        const alltrans = [...buytrans, ...selltrans]
        const sortedTransactions = alltrans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return res.json({ status: 200, msg: "fetch success", data: sortedTransactions })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getSingleOrderHistory = async (req, res) => {
    try {
        const { id, tag } = req.params
        if (!id || !tag) return res.json({ status: 400, msg: 'Incomplete request' })
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 401, msg: 'User not auntorized' })
        if (tag) {
            if (tag === 'buy') {
                const trans = await CryptoBuyModel.findAll({ where: { userid: user ? user.id : req.user, id } })
                if (!trans) return res.json({ status: 404, msg: "Transaction record not found" })
                return res.json({ status: 200, msg: "fetch success", data: trans })
            } else if (tag === 'sell') {
                const trans = await CryptoSellModel.findAll({ where: { userid: user ? user.id : req.user, id } })
                if (!trans) return res.json({ status: 404, msg: "Transaction record not found" })
                return res.json({ status: 200, msg: "fetch success", data: trans })
            }
        }
        return res.json({ status: 404, msg: 'Invalid Tag or ID' })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getSingleGiftcardOrderHistory = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 400, msg: 'Incomplete request' })
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 401, msg: 'User not auntorized' })
        const trans = await GiftCardSell.findAll({ where: { userid: user ? user.id : req.user, id } })
        if (!trans) return res.json({ status: 404, msg: "Transaction record not found" })
        return res.json({ status: 200, msg: "fetch success", data: trans })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.completeABuyPayment = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.json({ status: 400, msg: `ID missing, try again` })
        const findBuyId = await CryptoBuyModel.findOne({ where: { id } })
        if (!findBuyId) return res.json({ status: 404, msg: "ID not found" })
        const findUser = await User.findOne({ where: { id: findBuyId.userid } })
        if (!findUser) return res.json({ status: 404, msg: 'Account owner not found' })
        findBuyId.status = 'paid'
        await findBuyId.save()
        await Notify.create({
            user: req.user, title: 'Buy order marked paid', content: `Your crypto buy order of ${findBuyId.order_no} has been marked paid. Please keep an eye on your dashboard and email as we confirm and update your balance.  `, url: `/user/exchange/orders`
        })
        await Mailing({
            subject: 'Crypto Buy Order Updated',
            eTitle: `Order ID: ${findBuyId.order_no} Marked as Paid`,
            eBody: `
             <div style="font-size: 2rem">Hi ${findUser.first_name},</div>
             <div style="margin-top: 1.5rem">Your crypto buy order with the ID: ${findBuyId.order_no} is currently marked paid. Once the transaction is confirmed, your account balance will be updated accordingly. Thank you for trading with us.</div>
            `,
            account: findUser,
        })

        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
        if (admins.length > 0) {
            admins.map(async admin => {

                await Notify.create({
                    user: admin.id,
                    title: `Crypto buy Order marked paid`,
                    content: `Hi Admin, The crypto buy order with the ID: ${findBuyId.order_no} has been marked paid, kindly confirm from your bank and release crypto for user ${findUser.first_name}.`,
                    url: '/admin/exchange/buy_orders',
                })
                await Mailing({
                    subject: 'Crypto Buy Order Marked as Paid',
                    eTitle: `From User ${findUser.first_name}`,
                    eBody: `
                     <div>Hi Admin, The crypto buy order with the ID: ${findBuyId.order_no} has been marked paid, kindly confirm from your bank and release crypto for user ${findUser.first_name}. ${moment(findBuyId.createdAt).format('DD-MM-yyyy')} / ${moment(findBuyId.createdAt).format('h:mm')}.</div> 
                    `,
                    account: admin,
                })
            })
        }

        return res.json({ status: 200, msg: "payment status updated successfully" })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.cancelOrder = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.json({ status: 400, msg: `ID missing, try again` })
        const findBuyId = await CryptoBuyModel.findOne({ where: { id } })
        if (!findBuyId) return res.json({ status: 404, msg: "ID not found" })
        const findUser = await User.findOne({ where: { id: findBuyId.userid } })
        if (!findUser) return res.json({ status: 404, msg: 'Account owner not found' })
        findBuyId.status = 'canceled'
        await findBuyId.save()
        await Notify.create({
            user: req.user, title: 'Buy order canceled', content: `Your crypto buy order of ${findBuyId.order_no} has been canceled.  `, url: `/user/transactions_history`
        })
        await Mailing({
            subject: 'Crypto Buy Order canceled',
            eTitle: `Order ID: ${findBuyId.order_no} canceled`,
            eBody: `
             <div style="font-size: 2rem">Hi ${findUser.first_name},</div>
             <div style="margin-top: 1.5rem">Your crypto buy order with the ID: ${findBuyId.order_no} has been canceled. If you feel this was done by a mistake, kindly place another order as we are here to serve you better. Thank you for trading with us.</div>
            `,
            account: findUser,
        })

        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
        if (admins.length > 0) {
            admins.map(async admin => {

                await Notify.create({
                    user: admin.id,
                    title: `Crypto buy Order canceled`,
                    content: `Hi Admin, The crypto buy order with the ID: ${findBuyId.order_no} has been canceled by the user ${findUser.first_name}.`,
                    url: '/admin/exchange/buy_orders',
                })
                await Mailing({
                    subject: 'Crypto Buy Order canceled',
                    eTitle: `From User ${findUser.first_name}`,
                    eBody: `
                     <div>Hi Admin, The crypto buy order with the ID: ${findBuyId.order_no} has been canceled by user. ${moment(findBuyId.createdAt).format('DD-MM-yyyy')} / ${moment(findBuyId.createdAt).format('h:mm')}.</div> 
                    `,
                    account: admin,
                })
            })
        }


        return res.json({ status: 200, msg: "Order successfully canceled" })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.requestWithdrawal = async (req, res) => {
    try {
        const { bank_name, account_number, bank_user, amount } = req.body
        if (!bank_name || !account_number || !bank_user || !amount) return res.json({ status: 400, msg: "Incomplete request, fill all fields" })
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 401, msg: 'User not auntorized' })
        const findUserWallet = await Wallet.findOne({ where: { user: user ? user.id : req.user } })
        if (!findUserWallet) {
            await Wallet.create({
                user: req.user
            })
        }
        if (amount > findUserWallet.balance) return res.json({ status: 400, msg: `Insufficient funds` })
        if (isNaN(amount)) return res.json({ status: 400, msg: 'Please input a valid number' })
        findUserWallet.balance = parseFloat(findUserWallet.balance) - parseFloat(amount)
        findUserWallet.total_outflow = parseFloat(findUserWallet.total_outflow || 0) + parseFloat(amount)
        await findUserWallet.save()
        const nanoid = customAlphabet(blockAndNum, 15)
        const transId = nanoid()
        const withdrawal = await BankWithdrawal.create({ bank_name, trans_id: transId, userid: req.user, account_number, bank_user, amount })

        const formattedAmt = amount.toLocaleString()

        await Notify.create({
            user: req.user, title: 'Withdrawal Request', content: `You placed a bank withdrawal of NGN${formattedAmt}. The team is currently reviewing your request and soon your funds will arrive in your local account. `, url: `/user/bank_withdrawal`
        })
        await Mailing({
            subject: 'Bank Withdrawal ',
            eTitle: `Withdrawal of ${nairaSign}${formattedAmt} processing`,
            eBody: `
             <div style="font-size: 2rem">Hi ${user.first_name},</div>
             <div style="margin-top: 1.5rem">We have received your withdrawal request submitted  for the amount of ${nairaSign}${formattedAmt} to be transferred to your account ending in ******${account_number.slice(-4)}. Our team is currently reviewing your request and will process it within a short period.</div>
             <div style="margin-top: 1.5rem; color: #ffff">Thank you for choosing our services.</div>
            `,
            account: user,
        })

        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
        if (admins.length > 0) {
            admins.map(async admin => {

                await Notify.create({
                    user: admin.id,
                    title: `Bank withdrawal Request`,
                    content: `Hi Admin, A bank withdrawal request with the transaction ID of: ${transId} has been made, kindly review and credit customer ${user.first_name}.`,
                    url: '/admin/exchange/buy_orders',
                })
                await Mailing({
                    subject: 'Bank Withdrawal Request',
                    eTitle: `From User ${user.first_name}`,
                    eBody: `
                     <div>Hi Admin, A bank withdrawal request with the transaction ID of: ${transId} has been made, kindly review and credit customer ${user.first_name}. ${moment(withdrawal.createdAt).format('DD-MM-yyyy')} / ${moment(withdrawal.createdAt).format('h:mm')}.</div> 
                    `,
                    account: admin,
                })
            })
        }

        const updatedWallet = await Wallet.findOne({ where: { user: req.user } })

        return res.json({ status: 200, msg: "Withdrawal placed successfully", wallet: updatedWallet })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getUserLatestWithdrawals = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 401, msg: 'User not auntorized' })
        const getWithdrawals = await BankWithdrawal.findAll({
            where: { userid: req.user, status: 'pending' },
            limit: 5,
            order: [['createdAt', 'DESC']]
        })
        if (!getWithdrawals) return res.json({ status: 404, msg: 'Transactions not found' })
        return res.json({ status: 200, msg: 'fetch success', data: getWithdrawals })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getAllTransactions = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 401, msg: 'User not auntorized' })
        const giftcardsTrans = await GiftCardSell.findAll({ where: { userid: user ? user.id : req.user } })
        const cryptobuysTrans = await CryptoBuyModel.findAll({ where: { userid: user ? user.id : req.user, status: ['failed', 'completed'] } })
        const cryptosellsTrans = await CryptoSellModel.findAll({ where: { userid: user ? user.id : req.user, status: ['failed', 'completed'] } })
        const bankWithdrawals = await BankWithdrawal.findAll({ where: { userid: user ? user.id : req.user } })
        const alltrans = [...giftcardsTrans, ...cryptobuysTrans, ...cryptosellsTrans, ...bankWithdrawals]
        //sort by created At
        const sortedArr = alltrans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return res.json({ status: 200, msg: "fetch success", data: sortedArr })
    } catch (error) {
        ServerError(res, error)
    }
}