const User = require('../models').users
const Wallet = require('../models').wallets
const Notification = require('../models').notifications
const Util = require('../models').utils
const Bank = require('../models').banks
const Kyc = require('../models').kyc
const Subscriber = require('../models').subscribers
const CarouselImage = require('../models').carouselImages
const moment = require('moment')
const BuyCrypto = require('../models').exchangeBuys
const SellCrypto = require('../models').exchangeSells
const GiftCard = require('../models').giftCards
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const { webName, webShort, webURL, ServerError, GlobalDeleteImage, GlobalImageUploads, GlobalDeleteSingleImage, GoogleImageUpload, formatToUserTimezone } = require('../utils/utils')
const Mailing = require('../config/emailDesign')
const slug = require('slug')
const path = require('path');
const { Op } = require('sequelize')
const verifyBankAccount = require('../utils/verifyAccount')


exports.CreateAccount = async (req, res) => {
    try {
        const { first_name, surname, email, phone_number, password, confirm_password } = req.body
        if (!first_name || !surname || !email || !phone_number || !password || !confirm_password) return res.json({ status: 404, msg: `Incomplete request found` })
        if (password.length < 6) return res.json({ status: 404, msg: `Password must be at least 6 characters long` })
        if (confirm_password !== password) return res.json({ status: 404, msg: `Passwords mismatch` })

        const findEmail = await User.findOne({ where: { email } })
        if (findEmail) return res.json({ status: 404, msg: `Email address already exists` })
        const findPhone = await User.findOne({ where: { phone_number } })
        if (findPhone) return res.json({ status: 404, msg: `Phone number used, try a different one` })
        const uniqueId = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false })
        const user = await User.create({
            first_name,
            surname,
            unique_Id: uniqueId,
            email,
            phone_number,
            password,
        })

        await Wallet.create({
            user: user.id
        })

        await Notification.create({
            user: user.id,
            title: `welcome ${first_name}`,
            content: `Welcome to ${webName} family, get ready for some amazing deals and updates from us.`,
            url: '/user/dashboard',
        })

        const utils = await Util.findOne({})
        if (!utils) {
            await Util.create({})
        }

        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
        const formattedTime = formatToUserTimezone(user.createdAt)

        if (admins) {
            admins.map(async ele => {

                await Notification.create({
                    user: ele.id,
                    title: `${user.first_name} ${user.surname} joins ${webShort}`,
                    content: `Hello Admin, you have a new user as ${user.first_name} ${user.surname} joins the platform.`,
                    url: '/admin/all_users',
                })

                await Mailing({
                    subject: 'New User Alert',
                    eTitle: `New user joins ${webShort}`,
                    eBody: `
                     <div>Hello Admin, you have a new user as ${user.first_name} ${user.surname} joins ${webName} today; ${moment(user.createdAt).format('DD-MM-yyyy')} / ${formattedTime}.</div> 
                    `,
                    account: ele,
                })

            })
        }

        const otp = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })

        await Mailing({
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

exports.continueWithGoogle = async (req, res) => {
    try {
        const { email, first_name, surname, image } = req.body;
        if (!email) return res.json({ status: 400, msg: "Email is missing" });
        const findUser = await User.findOne({ where: { email } });
        if (!findUser) {
            const reqFields = [email, first_name, surname];
            if (reqFields.some((field) => !field)) return res.json({ status: 400, msg: "All fields are required" });

            const gen_id = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false });
            let uploadImage;
            if (image) {
                uploadImage = await GoogleImageUpload(image, 'profiles', gen_id);
            }

            const newUser = await User.create({
                first_name,
                surname,
                email,
                image: uploadImage ? uploadImage : null,
                unique_Id: gen_id,
                email_verified: 'true',
                role: 'user',
                google: 'true'
            });

            await Wallet.create({ user: newUser.id });
            await Notification.create({
                user: newUser.id,
                title: `Welcome ${first_name}`,
                content: `Welcome to ${webName} family, get ready for some amazing deals and updates from us.`,
                url: '/user/dashboard',
            });

            const utils = await Util.findOne({});
            if (!utils) {
                await Util.create({});
            }

            await Mailing({
                subject: `Welcome To ${webName}`,
                eTitle: `Welcome ${first_name}`,
                eBody: `
                    <div>Welcome to ${webName} family, get ready for some amazing deals and updates with us right <a href='${webURL}/user/dashboard' style="text-decoration: underline; color: #00fe5e">here</a>.</div>
                `,
                account: newUser,
            });

            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            const formattedTime = formatToUserTimezone(newUser.createdAt)

            if (admins) {
                admins.map(async (ele) => {
                    await Notification.create({
                        user: ele.id,
                        title: `${newUser.first_name} ${newUser.surname} joins ${webShort}`,
                        content: `Hello Admin, you have a new user as ${newUser.first_name} ${newUser.surname} joins the platform via Google sign up.`,
                        url: '/admin/all_users',
                    });

                    await Mailing({
                        subject: 'New User Alert',
                        eTitle: `New user joins ${webShort}`,
                        eBody: `
                            <div>Hello Admin, you have a new user as ${newUser.first_name} ${newUser.surname} joins ${webName} today via Google sign up; ${moment(newUser.createdAt).format('DD-MM-yyyy')} / ${formattedTime}.</div>
                        `,
                        account: ele,
                    });
                });
            }

            const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '15h' });
            return res.json({ status: 201, msg: 'User created successfully', token });
        } else {
            if(findUser.suspend === 'true'){
                return res.json({status:401, msg:"sorry your account has been suspended"})
            }
            const token = jwt.sign({ id: findUser.id, role: findUser.role }, process.env.JWT_SECRET, { expiresIn: '15h' });
            return res.json({ status: 200, msg: 'User logged in successfully', token });
        }
    } catch (error) {
        ServerError(res, error);
    }
};

exports.VerifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body
        if (!email || !code) return res.json({ status: 404, msg: 'Incomplete request found' })

        const findAccount = await User.findOne({ where: { email } })
        if (!findAccount) return res.json({ status: 404, msg: `No account belongs to this email` })
        if (code !== findAccount.resetcode) return res.json({ status: 404, msg: 'Invalid code entered' })

        findAccount.resetcode = null
        findAccount.email_verified = 'true'
        await findAccount.save()

        await Mailing({
            subject: `Welcome To ${webName}`,
            eTitle: `Welcome ${findAccount.first_name}`,
            eBody: `
             <div>Welcome to ${webName} family, get ready for some amazing deals and updates with us right <a href='${webURL}/user/dashboard' style="text-decoration: underline; color: #00fe5e">here</a>.</div>
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

        const findEmail = await User.findOne({ where: { email } })
        if (!findEmail) return res.json({ status: 400, msg: `Email not found` })
        if (password !== findEmail.password) return res.json({ status: 404, msg: `Incorrect password entered` })

        const findIfSuspended = await User.findOne({ where: { id: findEmail.id, suspend: 'true' } })
        if (findIfSuspended) return res.json({ status: 400, msg: `Your account has been suspended, kindly contact support team for possible reactivation` })

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

        const findAccount = await User.findOne({ where: { email } })
        if (!findAccount) return res.json({ status: 404, msg: `No account belongs to this email` })

        const otp = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })

        await Mailing({
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

        const findAccount = await User.findOne({ where: { email } })
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

        const findAccount = await User.findOne({ where: { email } })
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

        const admin = {
            email: 'officialmoniequest@gmail.com'
        }

        await Mailing({
            subject: `Contact From ${webName} User`,
            eTitle: `${webName} user sends message`,
            eBody: `
                 <div style="margin-top: 0.5rem"><span style="font-style: italic; font-size: 0.85rem;">full name:</span><span style="padding-left: 1rem">${full_name ? full_name : 'no name provided'}</span></div>
                 <div><span style="font-style: italic; font-size: 0.85rem">from:</span><span style="padding-left: 1rem">${email}</span></div>
                 <div style="margin-top: 1rem; font-style: italic; font-size: 0.85rem">message:</div>
                 <div style="margin-top: 0.5rem">${message}</div>
                `,
            account: admin,
        })

        return res.json({ status: 200, msg: 'Message delivered successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.SubscribeToPlatform = async (req, res) => {
    try {
        const { email, phone_number } = req.body
        if (!email || !phone_number) return res.json({ status: 404, msg: `Incomplete request found` })
        const subscriber = await Subscriber.findOne({ where: { email } })
        if (subscriber) return res.json({ status: 404, msg: `Email entered is already subscribed to our platform` })

        await Subscriber.create({
            email,
            phone_number,
        })

        return res.json({ status: 200, msg: `You've successfully subscribed to our platform` })
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
                const matchedSomeoneElse = await User.findOne({ where: { email } })
                if (matchedSomeoneElse) return res.json({ status: 404, msg: 'Email entered already exists' })
                user.email = email
                user.email_verified = 'false'
            }
        }
        if (phone_number) {
            if (phone_number !== user.phone_number) {
                const matchedSomeoneElse = await User.findOne({ where: { phone_number } })
                if (matchedSomeoneElse) return res.json({ status: 404, msg: `Phone number used, try a different one` })
                user.phone_number = phone_number
            }
        }
        if (old_password) {
            if (user.password !== old_password) return res.json({ status: 404, msg: 'Incorrect old password' })
            if (!new_password) return res.json({ status: 404, msg: `Create a new password` })
        }
        if (new_password) {
            if (!old_password && user.password !== null) return res.json({ status: 404, msg: `Enter your old password` })
            if (new_password.length < 6) return res.json({ status: 404, msg: `New Password must be at least six characters long` })
            user.password = new_password
        }
        if (first_name) {
            user.first_name = first_name
        }
        if (surname) {
            user.surname = surname
        }

        const profileImage = req?.files?.image
        if (profileImage) {
            if (profileImage.size >= 1000000) res.json({ status: 404, msg: `Image size too large, file must not exceed 1mb` })
            if (!profileImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            if (user.image) {
                await GlobalDeleteImage(user.image)
            }
            const imageToUpload = [{ field: 'profile_avatar', file: profileImage }]
            const newProfileImage = await GlobalImageUploads(imageToUpload, 'profiles', user.unique_Id)
            user.image = newProfileImage.profile_avatar

        }

        await user.save()

        return res.json({ status: 200, msg: 'Profile updated successfully', user: user })
    } catch (error) {
        res.json({ status: 500, msg: error.message })
    }
}

exports.CreateUpdateBankAccount = async (req, res) => {
    try {
        const { bank_name, account_number } = req.body;

        // Check required fields
        if (!bank_name || !account_number) {
            return res.json({ status: 404, msg: `Incomplete request found` });
        }

        // ✅ Verify account via Paystack
        const result = await verifyBankAccount(account_number, bank_name);
        if (!result.success) {
            return res.json({ status: 400, msg: result.msg, error: result.error });
        }

        const { account_name } = result.data; // Paystack verified name

        // Check if user already has a bank record
        let bank = await Bank.findOne({ where: { user: req.user } });

        if (!bank) {
            // Create new bank record
            bank = await Bank.create({
                user: req.user,
                bank_name,
                account_number,
                account_name
            });
        } else {
            // Update existing record
            bank.bank_name = bank_name;
            bank.account_number = account_number;
            bank.account_name = account_name;
            await bank.save();
        }

        return res.json({ status: 200, msg: 'Bank account updated', bank });

    } catch (error) {
        console.error("Bank save error:", error.message);
        return res.json({ status: 500, msg: error.message });
    }
};

exports.GetWalletBankAndUtils = async (req, res) => {
    try {
        let userwallet = {}
        let userbank = {}
        let adminUtils = {}

        const wallet = await Wallet.findOne({ where: { user: req.user } })
        if (wallet) {
            userwallet = wallet
        }
        const bank = await Bank.findOne({ where: { user: req.user } })
        if (bank) {
            userbank = bank
        }
        const utils = await Util.findOne({})
        if (utils) {
            adminUtils = utils
        }

        return res.json({ status: 200, wallet: userwallet, bank: userbank, utils: adminUtils })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.CreateUpdateKYC = async (req, res) => {
    try {
        const { id_type, id_number, date_of_birth, address } = req.body
        if (!id_type || !id_number || !date_of_birth || !address) return res.json({ status: 404, msg: `Incomplete request found` })

        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 404, msg: 'User not found' })
        const gen_id = `01` + otpGenerator.generate(8, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, })

        const kyc = await Kyc.findOne({ where: { user: req.user } })
        if (!kyc) {

            if (!req.files || !req.files.front_image || !req.files.back_image) return res.json({ status: 404, msg: `Attach both front and back of valid ID` })
            const frontImage = req.files.front_image
            const backImage = req.files.back_image
            if (!frontImage.mimetype.startsWith('image/') || !backImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload valid images format (jpg, jpeg, png, svg)` })
            const imagesToUpload = [
                { field: 'front_image', file: frontImage },
                { field: 'back_image', file: backImage },
            ]
            const UploadedImages = await GlobalImageUploads(imagesToUpload, 'identities', gen_id)

            const kyc = await Kyc.create({
                user: req.user,
                gen_id: gen_id,
                front_image: UploadedImages.front_image,
                back_image: UploadedImages.back_image,
                id_type,
                id_number,
                address,
                date_of_birth,
            })

            await Notification.create({
                user: req.user,
                title: `KYC submitted`,
                content: `Your kyc details received and processing for verification.`,
                url: '/user/profile/kyc',
            })

            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            const formattedTime = formatToUserTimezone(kyc.createdAt)

            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `KYC submission alert`,
                        content: `Hello Admin, ${user.first_name} ${user.surname} just submitted KYC details, verify authenticity.`,
                        url: '/admin/all_users',
                    })

                    await Mailing({
                        subject: `KYC Submission Alert`,
                        eTitle: `New KYC uploaded`,
                        eBody: `
                          <div>Hello Admin, ${user.first_name} ${user.surname} just submitted KYC details today ${moment(kyc.createdAt).format('DD-MM-yyyy')} / ${formattedTime} verify authenticity <a href='${webURL}/admin/all_users' style="text-decoration: underline; color: #00fe5e">here</a></div>
                        `,
                        account: ele
                    })
                })
            }
        }
        else {
            if (kyc.status === 'processing') return res.json({ status: 404, msg: `You can't re-upload while KYC details is still processing` })
            if (kyc.status === 'verified') return res.json({ status: 404, msg: 'KYC details is verified' })

            const frontImage = req?.files?.front_image
            const backImage = req?.files?.back_image
            if (frontImage) {
                if (!frontImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
                if (kyc.front_image) {
                    await GlobalDeleteImage(kyc.front_image)
                }
                const imageToUpload = [{ field: 'front_image', file: frontImage }]
                const newUpload = await GlobalImageUploads(imageToUpload, 'identities', kyc.gen_id)
                kyc.front_image = newUpload.front_image
            }
            if (backImage) {
                if (!backImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
                if (kyc.back_image) {
                    await GlobalDeleteImage(kyc.back_image)
                }
                const imageToUpload = [{ field: 'back_image', file: backImage }]
                const newUpload = await GlobalImageUploads(imageToUpload, 'identities', kyc.gen_id)
                kyc.back_image = newUpload.back_image
            }

            kyc.id_type = id_type
            kyc.id_number = id_number
            kyc.date_of_birth = date_of_birth
            kyc.address = address
            kyc.status = 'processing'
            await kyc.save()

            await Notification.create({
                user: req.user,
                title: `KYC re-uploaded`,
                content: `Your updated kyc details received and processing for verification.`,
                url: '/user/profile/kyc',
            })

            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            const formattedTime = formatToUserTimezone(kyc.updatedAt)

            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `KYC re-upload alert`,
                        content: `Hello Admin, ${user.first_name} ${user.surname} re-uploaded KYC details, verify authenticity.`,
                        url: '/admin/all_users',
                    })

                    await Mailing({
                        subject: `KYC Re-upload Alert`,
                        eTitle: `KYC re-uploaded`,
                        eBody: `
                          <div>Hello Admin, ${user.first_name} ${user.surname} re-uploaded KYC details today ${moment(kyc.updatedAt).format('DD-MM-yyyy')} / ${formattedTime}  verify authenticity <a href='${webURL}/admin-controls/users' style="text-decoration: underline; color: #00fe5e">here</a></div>
                        `,
                        account: ele
                    })
                })
            }
        }

        return res.json({ status: 200, msg: 'Details submitted' })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.UserKYC = async (req, res) => {
    try {
        const kyc = await Kyc.findOne({ where: { user: req.user } })
        if (!kyc) return res.json({ status: 400, msg: 'User kyc not found' })

        return res.json({ status: 200, msg: kyc })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.getLeaderboard = async (req, res) => {
    try {
        const all_users = await User.findAll({
            where: { role: 'user' },
            attributes: ['id', 'first_name', 'createdAt', 'unique_Id'],
            include: { model: Wallet, as: 'user_wallets', attributes: ['total_deposit'], },
            order: [[{ model: Wallet, as: 'user_wallets' }, 'total_deposit', 'DESC']]
        })
        return res.json({ status: 200, msg: 'fetch success', data: all_users })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getUserData = async (req, res) => {
    try {
        let allTrades = []

        const buys = await BuyCrypto.findAll({
            where: { userid: req.user, status: 'completed' },
            attributes: [`amount`, 'tag', 'type', 'createdAt']
        })
        const sells = await SellCrypto.findAll({
            where: { userid: req.user, status: 'completed' },
            attributes: [`amount`, 'tag', 'type', 'createdAt']
        })
        const gifts = await GiftCard.findAll({
            where: { userid: req.user, status: 'completed' },
            attributes: [`amount`, 'tag', 'createdAt']
        })

        allTrades = [...buys, ...sells, ...gifts]
        const allcoins = [...buys, ...sells]

        // Get highest and lowest amount
        const amounts = allTrades.map(trade => trade.amount).filter(amount => amount > 0)
        const highestAmount = Math.max(...amounts)
        const lowestAmount = Math.min(...amounts)

        // Determine step size dynamically 
        const rangeDiff = highestAmount - lowestAmount
        const stepSize = Math.ceil(rangeDiff / 5) || 10  // Ensures at least 5 intervals

        // Generate y-axis range
        const yAxisRange = []
        for (let i = lowestAmount; i <= highestAmount; i += stepSize) {
            yAxisRange.push(i)
        }

        return res.json({
            status: 200,
            msg: 'fetch success',
            data: [
                { yaxis: yAxisRange },
                { allcoins },
                { allTrades },
                { buys },
                { sells },
                { gifts }
            ]
        })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.AddCarouselImage = async (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseURI = `http://localhost:${process.env.PORT}`;

    try {
        if (!req.files || !req.files.image) return res.json({ status: 400, msg: 'Upload an image' });
        const image = req.files.image;
        if (!image.mimetype.startsWith('image/')) return res.json({ status: 400, msg: 'File error, upload a valid image format (jpg, jpeg, png, svg)' });

        const date = new Date();
        const fileName = `file_${date.getTime()}`;
        let url;

        if (isProduction) {
            const folder = 'moniequest/carousels';
            try {
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: folder, public_id: fileName, resource_type: 'image' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(image.data);
                });
                url = result.secure_url;
                console.log(`Uploaded to Cloudinary: ${url}`);
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                throw error;
            }
        } else {
            const filePath = path.join('public', 'carousels');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            const fullPath = path.join(filePath, `${fileName}.jpg`);
            await image.mv(fullPath);
            url = `${baseURI}/carousels/${fileName}.jpg`;
            console.log(`Uploaded locally: ${url}`);
        }

        await CarouselImage.create({ image: url });
        return res.json({ status: 200, msg: 'Carousel image added successfully', image: url });
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
};

exports.GetCarouselImages = async (req, res) => {
    try {
        const allCarouselImages = await CarouselImage.findAll({
            order: [['createdAt', 'ASC']]
        })

        return res.json({ status: 200, msg: allCarouselImages })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.DeleteCarouselImage = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.json({ status: 404, msg: `Provide a carousel image id` })
        const singleCarousel = await CarouselImage.findOne({ where: { id } })
        if (!singleCarousel) return res.json({ status: 404, msg: 'Carousel Image not found' })
        await GlobalDeleteSingleImage(singleCarousel.image)
        await singleCarousel.destroy()
        return res.json({ status: 200, msg: 'Carousel image deleted successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}




