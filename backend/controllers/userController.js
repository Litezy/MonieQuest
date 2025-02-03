const User = require('../models').users
const Wallet = require('../models').wallets
const Notification = require('../models').notifications
const Util = require('../models').utils
const Bank = require('../models').banks
const moment = require('moment')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const { webName, webShort, webURL } = require('../utils/utils')
const Mailing = require('../config/emailDesign')
const slug = require('slug')


exports.CreateAccount = async (req, res) => {
    try {
        const { first_name, surname, email, phone_number, password, confirm_password } = req.body
        if (!first_name || !surname || !email || !phone_number || !password || !confirm_password) return res.json({ status: 404, msg: `Incomplete request found` })
        if (password.length < 6) return res.json({ status: 404, msg: `Password must be at least 6 characters long` })
        if (confirm_password !== password) return res.json({ status: 404, msg: `Passwords mismatch` })

        const findEmail = await User.findOne({ where: {email } })
        if (findEmail) return res.json({ status: 404, msg: `Email address already exists` })

        const profileImage = req?.files?.image
        const filePath = './public/profiles'
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        let imageName;
        if (profileImage) {
            if (profileImage.size >= 1000000) return res.json({ status: 404, msg: `Image size too large, file must not exceed 1mb` })
            if (!profileImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            imageName = `${slug(first_name, '-')}.jpg`
            await profileImage.mv(`${filePath}/${imageName}`)
        }

        const user = await User.create({
            image: profileImage ? imageName : null,
            first_name,
            surname,
            email,
            phone_number,
            password,
        })

        if (user.id !== 1) {
            await Wallet.create({
                user: user.id
            })

            await Notification.create({
                user: user.id,
                title: `welcome ${first_name}`,
                content: `Welcome to ${webName} family, get ready for some amazing deals and updates with us.`,
                url: '/user/dashboard',
            })
        } else {
            await Util.create({
            })

            await Notification.create({
                user: user.id,
                title: `welcome admin`,
                content: `Getting started? how about a quick look around.`,
                url: '/admin/dashboard',
            })
        }

        const admins = await User.findAll({ where: { role: 'admin' } })
        if (admins) {
            admins.map(async ele => {

                await Notification.create({
                    user: ele.id,
                    title: `${user.first_name} joins ${webShort}`,
                    content: `Hello Admin, you have a new user as ${user.first_name} joins the platform.`,
                    url: '/admin/all_users',
                })

                Mailing({
                    subject: 'New User Alert',
                    eTitle: `New user joins ${webShort}`,
                    eBody: `
                     <div>Hello admin, you have a new user as ${user.first_name} joins ${webName} today ${moment(user.createdAt).format('DD-MM-yyyy')} / ${moment(user.createdAt).format('h:mm')}.</div> 
                    `,
                    account: ele,
                })

            })
        }

        const otp = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })

        Mailing({
            subject: 'Email Verification Code',
            eTitle: `Your email verification code`,
            eBody: `
             <div style="font-size: 2rem">${otp}</div>
             <div style="margin-top: 1.5rem">This code can only be used once. If you didn't request a code, please ignore this email. Never share this code with anyone else.</div>
            `,
            account: user,
        })

        user.resetcode = otp
        await user.save()

        return res.json({ status: 200, msg: 'Account created successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.VerifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body
        if (!email || !code) return res.json({ status: 404, msg: 'Incomplete request found' })

        const findAccount = await User.findOne({ where: {email } })
        if (!findAccount) return res.json({ status: 404, msg: `No account belongs to this email` })
        if (code !== findAccount.resetcode) return res.json({ status: 404, msg: 'Invalid code entered' })

        findAccount.resetcode = null
        findAccount.email_verified = 'true'
        await findAccount.save()

        Mailing({
            subject: `Welcome To ${webName}`,
            eTitle: `Welcome ${findAccount.first_name}`,
            eBody: `
             <div>Welcome to ${webName} family, Welcome to ${webName} family, get ready for some amazing deals and updates with us right <a href='${webURL}/user/dashboard' style="text-decoration: underline; color: #E96E28">here</a>.</div>
            `,
            account: findAccount,
        })

        return res.json({ status: 200, msg: 'Email address verified successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.LoginAccount = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({ status: 404, msg: `Incomplete request` })

        const findEmail = await User.findOne({ where: {email } })
        if (!findEmail) return res.json({ status: 400, msg: `No account belongs to the email` })
        if (password !== findEmail.password) return res.json({ status: 404, msg: `Incorrect password entered` })

        const token = jwt.sign({ id: findEmail.id, role: findEmail.role }, process.env.JWT_SECRET, { expiresIn: '10h' })

        return res.json({ status: 200, msg: `Login successfully`, token })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.GetProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user)
        if (!user) return res.json({ status: 404, msg: `Account not found` })

        return res.json({ status: 200, msg: user })
    } catch (error) {
        res.json({ status: 500, msg: error.message })
    }
}

exports.SendOTP = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.json({ status: 404, msg: `Provide your email address` })

        const findAccount = await User.findOne({ where: {email } })
        if (!findAccount) return res.json({ status: 404, msg: `No account belongs to this email` })

        const otp = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })

        Mailing({
            subject: 'Email Verification Code',
            eTitle: `Your email verification code`,
            eBody: `
             <div style="font-size: 2rem">${otp}</div>
             <div style="margin-top: 1.5rem">This code can only be used once. If you didn't request a code, please ignore this email. Never share this code with anyone else.</div>
            `,
            account: findAccount,
        })

        findAccount.resetcode = otp
        await findAccount.save()

        return res.json({ status: 200, msg: 'Verification code sent to email address' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.VerifyOtp = async (req, res) => {
    try {
        const { email, code } = req.body
        if (!email || !code) return res.json({ status: 404, msg: 'Incomplete request found' })

        const findAccount = await User.findOne({ where: {email } })
        if (!findAccount) return res.json({ status: 404, msg: `Account does not exists with us` })
        if (code !== findAccount.resetcode) return res.json({ status: 404, msg: 'Invalid code entered' })

        findAccount.resetcode = null
        findAccount.email_verified = 'true'
        await findAccount.save()

        return res.json({ status: 200, msg: 'Verification success' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.ChangePasswordOnRequest = async (req, res) => {
    try {
        const { email, password, confirm_password } = req.body
        if (!email || !password || !confirm_password) return res.json({ status: 404, msg: 'Incomplete request found' })

        if (confirm_password !== password) return res.json({ status: 400, msg: 'Passwords mismatch' })
        if (password.length < 6) return res.json({ status: 404, msg: `New Password must be at least six characters long` })

        const findAccount = await User.findOne({ where: {email } })
        if (!findAccount) return res.json({ status: 404, msg: `Account does not exists with us` })

        findAccount.password = password
        await findAccount.save()

        return res.json({ status: 200, msg: 'Password changed successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.Contacts = async (req, res) => {
    try {
        const { full_name, email, message } = req.body
        if (!email || !message) return res.json({ status: 404, msg: `Incomplete request found` })

        const admins = await User.findAll({ where: { role: 'admin' } })
        if (admins) {
            admins.map(async ele => {

                Mailing({
                    subject: `Contact From ${webName} User`,
                    eTitle: `${webName} user sends message`,
                    eBody: `
                     <div style="margin-top: 0.5rem"><span style="font-style: italic; font-size: 0.85rem;">full name:</span><span style="padding-left: 1rem">${full_name ? full_name : 'no name provided'}</span></div>
                     <div><span style="font-style: italic; font-size: 0.85rem">from:</span><span style="padding-left: 1rem">${email}</span></div>
                     <div style="margin-top: 1rem; font-style: italic; font-size: 0.85rem">message:</div>
                     <div style="margin-top: 0.5rem">${message}</div>
                    `,
                    account: ele,
                })
            })
        }

        return res.json({ status: 200, msg: 'Message delivered successfully', admins: admins })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.UpdateProfile = async (req, res) => {
    try {
        const { first_name, surname, email, phone_number, old_password, new_password } = req.body

        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 404, msg: 'Account not found' })

        if (email) {
            if (email !== user.email) {
                const matchedSomeoneElse = await User.findOne({ where: {email } })
                if (matchedSomeoneElse) return res.json({ status: 404, msg: 'Email entered already exists' })
                user.email = email
            }
        }

        if (old_password) {
            if (user.password !== old_password) return res.json({ status: 404, msg: 'Incorrect old password' })
            if (!new_password) return res.json({ status: 404, msg: `Create a new password` })
        }

        if (new_password) {
            if (!old_password) return res.json({ status: 404, msg: `Enter your old password` })
            if (new_password.length < 6) return res.json({ status: 404, msg: `New Password must be at least six characters long` })
            user.password = new_password
        }

        if (first_name) {
            user.first_name = first_name
        }
        if (surname) {
            user.surname = surname
        }
        if (phone_number) {
            user.phone_number = phone_number
        }

        const image = req?.files?.image
        let imageName;
        const filePath = './public/profiles'
        const currentImagePath = `${filePath}/${user.image}`

        if (image) {
            if (image.size >= 1000000) res.json({ status: 404, msg: `Image size too large, file must not exceed 1mb` })
            if (!image.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })

            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            if (first_name) {
                imageName = `${slug(first_name, '-')}.jpg`
            } else {
                imageName = `${slug(user.first_name, '-')}.jpg`
            }

            await image.mv(`${filePath}/${imageName}`)
            user.image = imageName
        }

        await user.save()

        return res.json({ status: 200, msg: 'Profile updated successfully', user: user })
    } catch (error) {
        res.json({ status: 500, msg: error.message })
    }
}

exports.GetUserWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ where: { user: req.user } })
        if (!wallet) return res.json({ status: 404, msg: 'User wallet not found' })

        return res.json({ status: 200, msg: wallet })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.CreateUpdateBankAccount = async (req, res) => {
    try {
        const { bank_name, account_number, account_name } = req.body
        const bank = await Bank.findOne({ where: { user: req.user } })

        if (!bank) {
            if (!bank_name || !account_number || !account_name) return res.json({ status: 404, msg: `Incomplete request found` })

            await Bank.create({
                user: req.user,
                bank_name,
                account_number,
                account_name
            })
        }
        else {
            if (bank_name) {
                bank.bank_name = bank_name
            }
            if (account_number) {
                bank.account_number = account_number
            }
            if (account_name) {
                bank.account_name = account_name
            }
            await bank.save()
        }

        const updated = await Bank.findOne({ where: { user: req.user } })

        return res.json({ status: 200, msg: 'Bank account updated', bank: updated })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.GetUserBankAccount = async (req, res) => {
    try {
        const bank = await Bank.findOne({ where: { user: req.user } })
        if (!bank) return res.json({ status: 404, msg: 'User bank account not found' })

        return res.json({ status: 200, msg: bank })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.UpdateUtils = async (req, res) => {
    try {
        const { exchange_rate, giftcard_rate } = req.body
        const utils = await Util.findOne({})
        if (!utils) return res.json({ status: 404, msg: 'Utils not found' })

        if (exchange_rate) {
            if (isNaN(exchange_rate)) return res.json({ status: 404, msg: `Enter a valid number` })
            utils.exchange_rate = exchange_rate
        }

        if (giftcard_rate) {
            if (isNaN(giftcard_rate)) return res.json({ status: 404, msg: `Enter a valid number` })
            utils.giftcard_rate = giftcard_rate
        }

        await utils.save()

        return res.json({ status: 200, msg: 'Rate(s) updated successfully', utils: utils })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.GetUtils = async (req, res) => {
    try {
        const utils = await Util.findOne({})
        if (!utils) return res.json({ status: 404, msg: 'Utils not found' })

        return res.json({ status: 200, msg: utils })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}