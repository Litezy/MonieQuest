const User = require('../models').users
const Util = require('../models').utils
const Airdrop = require('../models').airdrops
const Product = require('../models').products
const ProductOrder = require('../models').productOrders
const Notification = require('../models').notifications
const Bank = require('../models').banks
const Blog = require('../models').blogs
const BuyCrypto = require('../models').exchangeBuys
const Wallet = require('../models').wallets
const SellCrypto = require('../models').exchangeSells
const Kyc = require('../models').kyc
const GiftCard = require('../models').giftCards
const Bank_Withdrawals = require('../models').withdrawals
const Comment = require('../models').comments
const { webName, webURL, ServerError, nairaSign, dollarSign } = require('../utils/utils')
const Mailing = require('../config/emailDesign')
const otpGenerator = require('otp-generator')
const slug = require('slug')
const fs = require('fs')
const moment = require('moment')
const { Op } = require('sequelize')


exports.UpdateUtils = async (req, res) => {
    try {
        const { exchange_buy_rate, exchange_sell_rate, kyc_threshold, bank_withdraw_min, giftcard_rate, buy_min, buy_max, sell_min, sell_max } = req.body
        const utils = await Util.findOne({})
        if (!utils) {
            if (isNaN(exchange_buy_rate) || isNaN(exchange_sell_rate) || isNaN(kyc_threshold) || isNaN(bank_withdraw_min) || isNaN(giftcard_rate) || isNaN(buy_min) || isNaN(buy_max) || isNaN(sell_min) || isNaN(sell_max)) return res.json({ status: 404, msg: `Enter valid numbers` })

            const newUtils = await Util.create({
                exchange_buy_rate, exchange_sell_rate, kyc_threshold, bank_withdraw_min, giftcard_rate, buy_min, buy_max, sell_min, sell_max
            })

            return res.json({ status: 200, msg: 'Rate(s) created successfully', utils: newUtils })
        }
        else if (utils) {
            if (isNaN(exchange_buy_rate) || isNaN(exchange_sell_rate) || isNaN(kyc_threshold) || isNaN(bank_withdraw_min) || isNaN(giftcard_rate) || isNaN(buy_min) || isNaN(buy_max) || isNaN(sell_min) || isNaN(sell_max)) return res.json({ status: 404, msg: `Enter valid numbers` })
            if (exchange_buy_rate) {
                utils.exchange_buy_rate = exchange_buy_rate
            }
            if (exchange_sell_rate) {
                utils.exchange_sell_rate = exchange_sell_rate
            }
            if (kyc_threshold) {
                utils.kyc_threshold = kyc_threshold
            }
            if (bank_withdraw_min) {
                utils.bank_withdraw_min = bank_withdraw_min
            }
            if (giftcard_rate) {
                utils.giftcard_rate = giftcard_rate
            }
            if (buy_min) {
                utils.buy_min = buy_min
            }
            if (buy_max) {
                utils.buy_max = buy_max
            }
            if (sell_min) {
                utils.sell_min = sell_min
            }
            if (sell_max) {
                utils.sell_max = sell_max
            }

            await utils.save()

            return res.json({ status: 200, msg: 'Rate(s) updated successfully', utils: utils })
        }

    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.CreateAirdrop = async (req, res) => {
    try {
        const { title, category, kyc, blockchain, type, referral_link, about, video_guide_link, twitter_link, telegram_link, website_link } = req.body
        if (!title || !category || !blockchain || !type || !referral_link || !about || !video_guide_link) return res.json({ status: 404, msg: `Incomplete request found` })
        const categoryArray = ["featured", "deFi", "new", "NFT", "potential", "earn_crypto"]
        if (!categoryArray.includes(category)) return res.json({ status: 404, msg: `Invalid category provided` })
        const kycArray = ['false', "true"]
        if (!kycArray.includes(kyc)) return res.json({ status: 404, msg: `Invalid kyc value provided` })

        const gen_id = `01` + otpGenerator.generate(9, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, })
        const slugData = slug(title, '-')
        const filePath = './public/airdrops'
        const date = new Date()
        let logoImageName;
        let bannerImageName;

        if (!req.files || !req.files.logo_image || !req.files.banner_image) return res.json({ status: 404, msg: `Upload airdrop logo and banner images` })
        const logoImage = req.files.logo_image
        const bannerImage = req.files.banner_image
        if (!logoImage.mimetype.startsWith('image/') || !bannerImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload valid images format (jpg, jpeg, png, svg)` })
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        logoImageName = `${slugData + 'logo'}-${date.getTime()}.jpg`
        await logoImage.mv(`${filePath}/${logoImageName}`)
        bannerImageName = `${slugData + 'banner'}-${date.getTime()}.jpg`
        await bannerImage.mv(`${filePath}/${bannerImageName}`)

        await Airdrop.create({
            user: req.user,
            slug: slugData,
            gen_id: gen_id,
            logo_image: logoImageName,
            banner_image: bannerImageName,
            title,
            category,
            kyc,
            blockchain,
            type,
            referral_link,
            about,
            video_guide_link,
            twitter_link: twitter_link ? twitter_link : null,
            telegram_link: telegram_link ? telegram_link : null,
            website_link: website_link ? website_link : null
        })

        return res.json({ status: 200, msg: 'Airdrop created successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.AllOpenAirdrops = async (req, res) => {
    try {
        const airdrops = await Airdrop.findAll({
            where: { status: ['open'] },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: airdrops })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.SingleAirdrop = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 404, msg: `Airdrop id is required` })

        const airdrop = await Airdrop.findOne({ where: { id } })
        if (!airdrop) return res.json({ status: 404, msg: 'Airdrop not found' })

        return res.json({ status: 200, msg: airdrop })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.UpdateAirdrop = async (req, res) => {
    try {
        const { airdrop_id, status, title, category, kyc, blockchain, type, referral_link, about, video_guide_link, twitter_link, telegram_link, website_link } = req.body
        if (!airdrop_id) return res.json({ status: 404, msg: `Airdrop id is required` })

        const airdrop = await Airdrop.findOne({ where: { id: airdrop_id } })
        if (!airdrop) return res.json({ status: 404, msg: 'Airdrop not found' })

        const slugData = slug(title ? title : airdrop.title, '-')
        const filePath = './public/airdrops'
        const date = new Date()
        let logoImageName;
        let bannerImageName;
        const logoImage = req?.files?.logo_image
        const bannerImage = req?.files?.banner_image

        if (logoImage) {
            if (!logoImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            const currentImagePath = `${filePath}/${airdrop.logo_image}`
            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            logoImageName = `${slugData + 'logo'}-${date.getTime()}.jpg`
            await logoImage.mv(`${filePath}/${logoImageName}`)
            airdrop.logo_image = logoImageName
        }
        if (bannerImage) {
            if (!bannerImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            const currentImagePath = `${filePath}/${airdrop.banner_image}`
            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            bannerImageName = `${slugData + 'banner'}-${date.getTime()}.jpg`
            await bannerImage.mv(`${filePath}/${bannerImageName}`)
            airdrop.banner_image = bannerImageName
        }
        if (title) {
            airdrop.title = title
        }
        if (category) {
            const categoryArray = ["featured", "deFi", "new", "NFT", "potential", "earn_crypto"]
            if (!categoryArray.includes(category)) return res.json({ status: 404, msg: `Invalid category provided` })
            airdrop.category = category
        }
        if (kyc) {
            const kycArray = ['false', "true"]
            if (!kycArray.includes(kyc)) return res.json({ status: 404, msg: `Invalid KYC value provided` })
            airdrop.kyc = kyc
        }
        if (blockchain) {
            airdrop.blockchain = blockchain
        }
        if (type) {
            airdrop.type = type
        }
        if (about) {
            airdrop.about = about
        }
        if (referral_link) {
            airdrop.referral_link = referral_link
        }
        if (video_guide_link) {
            airdrop.video_guide_link = video_guide_link
        }
        if (status) {
            const statusArray = ["open", "closed"]
            if (!statusArray.includes(status)) return res.json({ status: 404, msg: `Invalid status provided` })
            airdrop.status = status
        }
        airdrop.twitter_link = twitter_link ? twitter_link : null
        airdrop.telegram_link = telegram_link ? telegram_link : null
        airdrop.website_link = website_link ? website_link : null

        await airdrop.save()

        return res.json({ status: 200, msg: 'Airdrop updated successfully' })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.CategoryAirdrops = async (req, res) => {
    try {
        const { category } = req.params
        if (!category) return res.json({ status: 404, msg: `Airdrops category is required` })

        const airdrop = await Airdrop.findAll({
            where: { category },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: airdrop })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.UpdateProduct = async (req, res) => {
    try {
        const { product_id, title, category, price, about, feature1, feature2, status, listing, discount_percentage, discount_duration, discount_duration_type } = req.body
        if (!product_id) return res.json({ status: 404, msg: `Product id is required` })

        const product = await Product.findOne({ where: { id: product_id } })
        if (!product) return res.json({ status: 404, msg: 'Product not found' })
        const user = await User.findOne({ where: { id: product.user } })
        if (!user) return res.json({ status: 404, msg: 'User not found' })

        const slugData = slug(title ? title : product.title, '-')
        const filePath = './public/products'
        const date = new Date()
        let imageName;
        const productImage = req?.files?.image

        if (productImage) {
            if (!productImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            const currentImagePath = `${filePath}/${product.image}`
            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            imageName = `${slugData}-${date.getTime()}.jpg`
            await productImage.mv(`${filePath}/${imageName}`)
            product.image = imageName
        }
        if (title) {
            product.title = title
        }
        if (category) {
            product.category = category
        }
        if (price) {
            if (isNaN(price)) return res.json({ status: 404, msg: `Price amount must be a number` })
            product.price = price
        }
        if (about) {
            product.about = about
        }
        if (feature1) {
            product.feature1 = feature1
        }
        if (feature2) {
            product.feature2 = feature2
        }
        if (status) {
            const statusArray = ["pending", "approved", "declined"]
            if (!statusArray.includes(status)) return res.json({ status: 404, msg: `Invalid status provided` })

            if (product.status !== 'approved') {
                if (status === 'approved') {
                    await Notification.create({
                        user: product.user,
                        title: `Product submitted approved`,
                        content: `After thorough review by our admins your product submitted with the id (#${product.gen_id}) has been approved, you'll be contacted soon for payment.`,
                        url: '/user/products/all',
                    })
                    await Mailing({
                        subject: `Product submitted Approved`,
                        eTitle: `Product submitted approved`,
                        eBody: `
                          <div>Hello ${user.first_name}, After thorough review by our admins your product submitted with the id (#${product.gen_id}) has been approved, you'll be contacted soon for payment. You can check current status <a href='${webURL}/user/products/all' style="text-decoration: underline; color: #00fe5e">here</a></div>
                        `,
                        account: user
                    })
                }
            }
            if (product.status !== 'declined') {
                if (status === 'declined') {
                    await Notification.create({
                        user: product.user,
                        title: `Product submitted declined`,
                        content: `After review by our admins, your product submitted with the id (#${product.gen_id}) has been declined, reasons for disapproval would be sent to you via your contact detail.`,
                        url: '/user/products/all',
                        status: 'failed'
                    })
                    await Mailing({
                        subject: `Product submitted Declined`,
                        eTitle: `Product submitted declined`,
                        eBody: `
                          <div>Hello ${user.first_name}, After thorough review by our admins your product submitted with the id (#${product.gen_id}) has been declined, reasons for disapproval would be sent to you via your contact detail. You can check current status <a href='${webURL}/user/products/all' style="text-decoration: underline; color: #00fe5e">here</a></div>
                        `,
                        account: user
                    })
                }
            }
            product.status = status
        }
        if (listing) {
            const listingArray = ["listed", "unlisted"]
            if (!listingArray.includes(listing)) return res.json({ status: 404, msg: `Invalid listing value provided` })
            product.listing = listing
        }
        if (discount_percentage) {
            if (isNaN(discount_percentage)) return res.json({ status: 404, msg: `Discount percentage must be a number` })
            product.discount_percentage = discount_percentage
        } else {
            product.discount_percentage = null
        }
        if (discount_duration && discount_duration_type) {
            if (isNaN(discount_duration)) return res.json({ status: 404, msg: `Discount duration must be a number` })
            const endDate = moment().add(parseFloat(discount_duration), `${discount_duration_type}`)
            product.discount_duration = discount_duration
            product.discount_duration_type = discount_duration_type
            product.discount_endDate = `${endDate}`
        } else {
            product.discount_duration = null
            product.discount_duration_type = null
            product.discount_endDate = null
        }

        await product.save()

        return res.json({ status: 200, msg: 'Product updated successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.AllProducts = async (req, res) => {
    try {
        const allproducts = await Product.findAll({
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: allproducts })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AllListedProducts = async (req, res) => {
    try {
        const allListedProducts = await Product.findAll({
            where: { listing: 'listed' },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: allListedProducts })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.SingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 404, msg: `Product id is required` })

        const product = await Product.findOne({ where: { id } })
        if (!product) return res.json({ status: 404, msg: 'Product not found' })

        return res.json({ status: 200, msg: product })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AllProductOrders = async (req, res) => {
    try {
        const allProductOrders = await ProductOrder.findAll({
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: allProductOrders })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.getDashboardInfos = async (req, res) => {
    try {
        const totalUsers = await User.findAll({ where: { role: 'user' } });
        const totalAirdrops = await Airdrop.count();
        const totalBlogs = await Blog.count();
        const totalProducts = await Product.count();
        const totalProductOrders = await ProductOrder.count();
        const totalProductsRevenue = await ProductOrder.sum('amount_paid', { where: { status: 'paid' } });
        const totalCryptoBuys = await BuyCrypto.count();
        const totalCryptoBuysPaidAmount = await BuyCrypto.sum('amount', { where: { status: 'paid' } });
        const totalCryptoBuysUnpaidAmount = await BuyCrypto.sum('amount', { where: { status: 'unpaid' } });
        const totalCryptoSells = await SellCrypto.count();
        const totalCryptoSellsCompleted = await SellCrypto.sum('amount', { where: { status: 'completed' } });
        const totalCryptoSellsPending = await SellCrypto.sum('amount', { where: { status: 'pending' } });
        const totalGiftcardSells = await GiftCard.count();
        const totalGiftcardsSellsCompleted = await GiftCard.sum('amount', { where: { status: 'completed' } });
        const totalGiftcardsSellsPending = await GiftCard.sum('amount', { where: { status: 'pending' } });
        const totalWithdrawals = await Bank_Withdrawals.count();
        const totalWithdrawalCompletedAmount = await Bank_Withdrawals.sum('amount', { where: { status: 'completed' } });
        const totalWithdrawalPendingAmount = await Bank_Withdrawals.sum('amount', { where: { status: 'pending' } });
        const data = [
            { title: 'Total Users', value: totalUsers.length, color: 'red' },
            { title: 'Total Blogs', value: totalBlogs, color: 'pink' },
            { title: 'Total Airdrops', value: totalAirdrops, color: 'green' },
            { title: 'Total Products', value: totalProducts, color: 'red' },
            { title: 'Total Products Orders', value: totalProductOrders, color: 'lime', },
            { title: 'Total Products Orders Revenue', value: totalProductsRevenue ? totalProductsRevenue : 0, color: 'gray', naira: true },
            { title: 'Total Crypto Buys', value: totalCryptoBuys, color: 'yellow' },
            { title: 'Paid Crypto Buys Amount', value: totalCryptoBuysPaidAmount || 0, color: 'blue', cur: true },
            { title: 'Unpaid Crypto Buys Amount', value: totalCryptoBuysUnpaidAmount || 0, color: 'amber', cur: true },
            { title: 'Total Crypto Sells', value: totalCryptoSells, color: 'red' },
            { title: 'Completed Crypto Sells Amount', value: totalCryptoSellsCompleted || 0, color: 'orange' },
            { title: 'Pending Crypto Sells Amount', value: totalCryptoSellsPending || 0, color: 'purple', cur: true },
            { title: 'Total Giftcard Sells', value: totalGiftcardSells, color: 'pink' },
            { title: 'Pending Giftcards Sells Amount ', value: totalGiftcardsSellsPending || 0, color: 'orange', cur: true },
            { title: 'Completed Giftcards Sells Amount', value: totalGiftcardsSellsCompleted || 0, color: 'lime', cur: true },
            { title: 'total Withdrawals', value: totalWithdrawals, color: 'teal' },
            { title: 'Pending Bank Withdrawals Amount', value: totalWithdrawalPendingAmount || 0, color: 'teal', naira: true },
            { title: 'Completed bank withdrawals Amount', value: totalWithdrawalCompletedAmount || 0, color: 'amber', naira: true },
        ];

        return res.json({ status: 200, msg: 'fetch success', data });
    } catch (error) {
        ServerError(res, error);
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const all_users = await User.findAll({
            where: { role: 'user' },
            attributes: [`id`, `first_name`, 'surname', `kyc_verified`, 'email', 'role', 'createdAt'],
            include: [
                {
                    model: Wallet, as: 'user_wallets',
                    attributes: [`balance`]
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        const all_user_banks = await Bank.findAll({
            attributes: [`id`, `user`, `bank_name`, 'account_number', 'account_name'],
            include: [
                {
                    model: User, as: 'user_bank',
                    attributes: [`first_name`, 'surname']
                }
            ]
        })
        const submittedUsers = await Kyc.findAll({
            where: { status: 'processing' },
            include: [
                {
                    model: User, as: 'user_kyc',
                    attributes: [`id`, `first_name`, 'surname']
                },
            ]
        })
        const verifiedUsers = await Kyc.findAll({
            where: { status: 'verified' },
            include: [
                {
                    model: User, as: 'user_kyc',
                    attributes: [`id`, `first_name`, 'surname']
                },
            ]
        })
        const data = [
            { label: 'All Users', data: all_users },
            { label: 'All User Banks', data: all_user_banks },
            { label: 'Submitted KYC Users', data: submittedUsers },
            { label: 'Verified KYC Users', data: verifiedUsers },
        ]
        return res.json({ status: 200, msg: 'fetch success', data })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.UpdateKyc = async (req, res) => {
    try {
        const { kyc_id, status, message } = req.body
        if (!kyc_id) return res.json({ status: 404, msg: 'KYC id is required' })
        const kyc = await Kyc.findOne({ where: { id: kyc_id } })
        if (!kyc) return res.json({ status: 404, msg: 'User KYC not found' })
        const kycUser = await User.findOne({ where: { id: kyc.user } })
        if (!kycUser) return res.json({ status: 404, msg: 'KYC user not found' })

        if (status === 'verified') {
            kycUser.kyc_verified = 'true'
            await kycUser.save()

            await Notification.create({
                user: kyc.user,
                title: `KYC verified`,
                content: `Your KYC details submitted has been successfully verified after review.`,
                url: '/user/profile/kyc',
            })

            await Mailing({
                subject: `KYC Verification Success`,
                eTitle: `KYC details verified`,
                eBody: `
                      <div>Hello ${kycUser.first_name} ${kycUser.surname} , Your KYC details submitted has been successfully verified after review.</div>
                    `,
                account: kycUser
            })
        }
        if (status === 'failed') {

            if (!message) return res.json({ status: 400, msg: 'Provide a reason for failed verification' })
            kycUser.kyc_verified = 'false'
            await kycUser.save()

            await Notification.create({
                user: kyc.user,
                title: `KYC verification failed`,
                content: message,
                status: 'failed',
                url: '/user/profile/kyc',
            })

            await Mailing({
                subject: `KYC Verification Failed`,
                eTitle: `KYC details rejected`,
                eBody: `
                      <div>${message}</div>
                    `,
                account: kycUser
            })
        }

        if (status) {
            kyc.status = status
            await kyc.save()
        }

        const submitted = await Kyc.findAll({ where: { status: 'processing' } })
        const verified = await Kyc.findAll({ where: { status: 'verified' } })

        return res.json({
            status: 200, msg: 'KYC updated successfully', data: {
                submitted, verified
            }
        })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.CreateUser = async (req, res) => {
    try {
        const { first_name, surname, email, phone_number, password, confirm_password } = req.body
        if (!first_name || !surname || !email || !phone_number || !password || !confirm_password) return res.json({ status: 404, msg: `Incomplete request found` })
        if (password.length < 6) return res.json({ status: 404, msg: `Password must be at least 6 characters long` })
        if (confirm_password !== password) return res.json({ status: 404, msg: `Passwords mismatch` })

        const findEmail = await User.findOne({ where: { email } })
        if (findEmail) return res.json({ status: 404, msg: `Email address already exists` })
        const findPhone = await User.findOne({ where: { phone_number } })
        if (findPhone) return res.json({ status: 404, msg: `Phone number used, try a different one` })

        const user = await User.create({
            first_name,
            surname,
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
            content: `Welcome to ${webName} family, get ready for some amazing deals and updates with us.`,
            url: '/user/dashboard',
        })

        const allUsers = await User.findAll({ where: { role: 'user' } })
        return res.json({ status: 201, msg: 'Account created successfully', data: allUsers })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.CreateBlog = async (req, res) => {
    try {
        const { title, feature, main_header, first_paragraph, second_paragraph, extras, conclusion } = req.body
        if (!title || !feature || !main_header || !first_paragraph || !second_paragraph || !extras || !conclusion) return res.json({ status: 404, msg: `Incomplete request found` })
        const featureArray = ["airdrop", "trading", "personal_finance"]
        if (!featureArray.includes(feature)) return res.json({ status: 404, msg: `Invalid blog feature provided` })

        const gen_id = `01` + otpGenerator.generate(9, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, })
        const slugData = slug(title, '-')
        const filePath = './public/blogs'
        const date = new Date()
        let blogImageName;

        if (!req.files) return res.json({ status: 404, msg: `Upload airdrop logo and banner images` })
        const blogImage = req.files.image
        if (!blogImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload valid images format (jpg, jpeg, png, svg)` })
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        blogImageName = `${slugData + 'logo'}-${date.getTime()}.jpg`
        await blogImage.mv(`${filePath}/${blogImageName}`)

        await Blog.create({
            user: req.user,
            slug: slugData,
            gen_id: gen_id,
            image: blogImageName,
            title,
            feature,
            main_header,
            first_paragraph,
            second_paragraph,
            extras,
            conclusion
        })

        return res.json({ status: 200, msg: 'Blog created successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.UpdateBlog = async (req, res) => {
    try {
        const { blog_id, title, feature, main_header, first_paragraph, second_paragraph, extras, conclusion } = req.body
        if (!blog_id) return res.json({ status: 404, msg: `Blog id is required` })
        const blog = await Blog.findOne({ where: { id: blog_id } })
        if (!blog) return res.json({ status: 404, msg: 'Blog not found' })

        const slugData = slug(title ? title : blog.title, '-')
        const filePath = './public/blogs'
        const date = new Date()
        let blogImageName;
        const blogImage = req?.files?.image

        if (blogImage) {
            if (!blogImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            const currentImagePath = `${filePath}/${blog.image}`
            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            blogImageName = `${slugData}-${date.getTime()}.jpg`
            await blogImage.mv(`${filePath}/${blogImageName}`)
            blog.image = blogImageName
        }
        if (title) {
            blog.title = title
        }
        if (feature) {
            const featureArray = ["airdrop", "trading", "personal_finance"]
            if (!featureArray.includes(feature)) return res.json({ status: 404, msg: `Invalid blog feature provided` })
            blog.feature = feature
        }
        if (main_header) {
            blog.main_header = main_header
        }
        if (first_paragraph) {
            blog.first_paragraph = first_paragraph
        }
        if (second_paragraph) {
            blog.second_paragraph = second_paragraph
        }
        if (extras) {
            blog.extras = extras
        }
        if (conclusion) {
            blog.conclusion = conclusion
        }

        await blog.save()

        return res.json({ status: 200, msg: 'Blog updated successfully' })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [
                {
                    model: User,
                    as: 'blog_user',
                    attributes: ['id', 'image', 'first_name', 'surname', 'email']
                },
            ],
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: blogs })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.SingleBlog = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 404, msg: `Blog id is required` })

        const blog = await Blog.findOne({
            where: { id },
            include: [
                {
                    model: User, as: 'blog_user',
                    attributes: ['id', 'image', 'first_name', 'surname', 'email']
                },
                { model: Comment, as: 'blog_comments' },
            ]
        })
        if (!blog) return res.json({ status: 404, msg: 'Blog not found' })

        return res.json({ status: 200, msg: blog })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.FeatureBlogs = async (req, res) => {
    try {
        const { feature } = req.params
        if (!feature) return res.json({ status: 404, msg: `Provide a blog feature` })

        const featureBlogs = await Blog.findAll({
            where: { feature },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: featureBlogs })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AllRelatedBlogsExceptCurrent = async (req, res) => {
    try {
        const { feature, id } = req.params
        if (!feature || !id) return res.json({ status: 404, msg: `Provide a blog feature and ID` })

        const relatedBlogs = await Blog.findAll({
            where: { feature, id: { [Op.ne]: id } },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: relatedBlogs })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.CommentOnBlog = async (req, res) => {
    try {
        const { blog_id, content, email_address, username, phone_number } = req.body
        if (!blog_id || !username || !email_address || !content) return res.json({ status: 404, msg: 'Incomplete request found' })
        await Comment.create({
            blog: blog_id,
            username,
            email_address,
            phone_number: phone_number || null,
            content,
        })
        return res.json({ status: 200, msg: 'Comment sent' })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AllBlogComments = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 404, msg: `Provide a blog ID` })

        const allBlogComments = await Comment.findAll({
            where: { blog: id },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: allBlogComments })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}



exports.getCryptoBuysOrders = async (req, res) => {
    try {
        const allbuys = await BuyCrypto.findAll({
            where: { status: [`unpaid`, `paid`] },
            include: [
                {
                    model: User, as: 'crypto_buyer',
                    attributes: [`id`, `first_name`, 'surname']
                }
            ],
            order: [[`createdAt`, 'DESC']]
        })
        return res.json({ status: 200, msg: 'fetch success', data: allbuys })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getSingleBuyOrder = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 400, msg: "ID is missing" })
        const findBuy = await BuyCrypto.findOne({
            where: { id },
            include: [
                {
                    model: User, as: 'crypto_buyer',
                    attributes: [`id`, `first_name`, 'surname']
                }
            ]
        })
        if (!findBuy) return res.json({ status: 404, msg: 'Buy order not found' })
        return res.json({ status: 200, msg: 'fetch success', data: findBuy })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getSingleSellOrder = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 400, msg: "ID is missing" })
        const findSell = await SellCrypto.findOne({
            where: { id },
            include: [
                {
                    model: User, as: 'crypto_seller',
                    attributes: [`id`, `first_name`, 'surname']
                }
            ]
        })
        if (!findSell) return res.json({ status: 404, msg: 'Buy order not found' })
        return res.json({ status: 200, msg: 'fetch success', data: findSell })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getCryptoSellsOrders = async (req, res) => {
    try {
        const allsells = await SellCrypto.findAll({
            where: { status: 'pending' },
            include: [
                {
                    model: User, as: 'crypto_seller',
                    attributes: [`id`, `first_name`, 'surname']
                }
            ]
        })
        return res.json({ status: 200, msg: 'fetch success', data: allsells })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.closeAndConfirmBuyOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { tag, message } = req.body
        if (!id || !tag) return res.json({ status: 400, msg: 'ID or Tag missing from request' })
        const findBuy = await BuyCrypto.findOne({
            where: { id },
            include: [{ model: User, as: "crypto_buyer", attributes: [`first_name`] }]
        })
        if (!findBuy) return res.json({ status: 404, msg: 'Buy order ID not found' })
        if (findBuy.status === 'completed') return res.json({ status: 400, msg: 'Order already completed' })
        const user = await User.findOne({ where: { id: findBuy.userid } })
        if (!user) return res.json({ status: 401, msg: 'Account owner not found' })


        //if successful
        if (tag === 'success') {
            findBuy.status = 'completed'
            await findBuy.save()
            await Notification.create({
                user: user.id,
                title: `Balance Credit`,
                content: `Hi dear, Your crypto buy order with the ID of ${findBuy?.order_no} has been marked paid. Kindly check your  new balance in your provided wallet.`,
                url: '/user/dashboard',
            })
            await Mailing({
                subject: `Crypto buy Credit Alert`,
                eTitle: `Credit Alert`,
                eBody: `
                  <div>Hello ${user.first_name}, Your crypto buy order with the ID of ${findBuy?.order_no} has been marked paid with ${dollarSign}${findBuy.amount?.toLocaleString()}} worth of ${findBuy.crypto_currency} sent to the wallet address ending in ****${findBuy?.wallet_address.slice(-5)}. Kindly verify this transaction by checking your wallet. Thank you for trading with us ' style="text-decoration: underline; color: #00fe5e">here</a></div>
                `,
                account: user
            })

            const admins = await User.findAll({ where: { role: 'admin' } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Crypto Buy Order Completed`,
                        content: `You have completed the crypto buy order payment  with the ID of ${findBuy?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    Mailing({
                        subject: 'Order Completed',
                        eTitle: `Crypto Buy Order `,
                        eBody: `
                     <div>Hello Admin, you have completed the crypto buy order payment  with the ID of ${findBuy?.order_no} today; ${moment(findBuy.updatedAt).format('DD-MM-yyyy')} / ${moment(findBuy.updatedAt).format('h:mm')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }
            return res.json({ status: 200, msg: 'Buy order closed and confirmed' })
        }
        else if (tag === 'failed') {
            if (!message) return res.json({ status: 400, msg: "Failed message is required" })
            findBuy.status = 'failed'
            await findBuy.save()

            await Notification.create({
                user: user.id,
                title: `Credit Failed`,
                content: `Hi dear, Your crypto buy order with the ID of ${findBuy?.order_no} has been marked failed. Kindly check your email to learn more.`,
                url: '/user/transactions_history',
            })
            await Mailing({
                subject: `Crypto Buy Failed`,
                eTitle: `Failed Transaction`,
                eBody: `
                  <div>Hello ${user.first_name}, Your Crypto Sell order with the ID of ${findBuy?.order_no} has been marked failed with the following reason(s) '${message}'. Kindly get back to your account to and try again. Thank you for trading with us ' style="text-decoration: underline; color: #00fe5e">here</a></div>
                `,
                account: user
            })

            const admins = await User.findAll({ where: { role: 'admin' } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Crypto Buy Order Failed`,
                        content: `You have failed the crypto buy order payment  with the ID of ${findBuy?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    Mailing({
                        subject: 'Order Failed',
                        eTitle: `Crypto Buy Order Failed `,
                        eBody: `
                     <div>Hello Admin, you have failed the crypto buy order payment  with the ID of ${findBuy?.order_no} today; ${moment(findBuy.updatedAt).format('DD-MM-yyyy')} / ${moment(findBuy.updatedAt).format('h:mm')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }
            return res.json({ status: 200, msg: 'Buy order closed and marked as failed' })
        }
        else {
            return res.json({ status: 404, msg: 'Invalid Tag' })
        }
    } catch (error) {
        ServerError(res, error)
    }
}

exports.closeAndConfirmSellOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { tag, amount, message } = req.body
        if (!id || !tag) return res.json({ status: 400, msg: 'ID or Tag missing from request' })
        const findSell = await SellCrypto.findOne({
            where: { id },
            include: [{ model: User, as: "crypto_seller", attributes: [`first_name`] }]
        })
        if (!findSell) return res.json({ status: 404, msg: 'Buy order ID not found' })
        if (findSell.status === 'completed') return res.json({ status: 400, msg: 'Order already completed' })
        const user = await User.findOne({ where: { id: findSell.userid } })
        if (!user) return res.json({ status: 401, msg: 'Account owner not found' })
        const admins = await User.findAll({ where: { role: 'admin' } })
        const findUserWallet = await Wallet.findOne({ where: { user: user.id } })
        if (!findUserWallet) {
            await Wallet.create({ user: user.id })
        }

        if (tag === 'success') {
            if (!amount) return res.json({ status: 400, msg: "Amount is missing" })
            findUserWallet.balance = parseFloat(findUserWallet.balance) + parseFloat(amount)
            findSell.status = 'completed'
            await findSell.save()
            await Notification.create({
                user: user.id,
                title: `Balance Credit`,
                content: `Hi dear, Your Crypto Sell order with the ID of ${findSell?.order_no} has been marked paid. Kindly check your  new balance.`,
                url: '/user/dashboard',
            })
            await Mailing({
                subject: `Crypto Credit Alert`,
                eTitle: `Credit Alert`,
                eBody: `
                  <div>Hello ${user.first_name}, Your Crypto Sell order with the ID of ${findSell?.order_no} has been marked paid with the sum of ${nairaSign}${findSell?.amount?.toLocaleString()}} credited to your balance. Kindly get back to your account to see your new balance. Thank you for trading with us ' style="text-decoration: underline; color: #00fe5e">here</a></div>
                `,
                account: user
            })


            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Crypto Sell Order Completed`,
                        content: `You have completed the crypto sell order payment  with the ID of ${findSell?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    Mailing({
                        subject: 'Order Completed',
                        eTitle: `Crypto Sell Order `,
                        eBody: `
                     <div>Hello Admin, you have completed the crypto sell order payment  with the ID of ${findSell?.order_no} today; ${moment(findSell.updatedAt).format('DD-MM-yyyy')} / ${moment(findSell.updatedAt).format('h:mm')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }
            return res.json({ status: 200, msg: 'Buy order closed and successfully confirmed' })
        }

        else if (tag === 'failed') {
            if (!message) return res.json({ status: 400, msg: 'Message is required for failed transactions' })
            findSell.status = 'failed'
            await findSell.save()
            await Notification.create({
                user: user.id,
                title: `Crypto Credit Failed`,
                content: `Hi dear, Your Crypto Sell order with the ID of ${findSell?.order_no} has been marked failed. Kindly check email to learn more.`,
                url: '/user/transactions_history',
            })
            await Mailing({
                subject: `Crypto Credit Failed`,
                eTitle: `Failed Transaction`,
                eBody: `
                  <div>Hello ${user.first_name}, Your Crypto Sell order with the ID of ${findSell?.order_no} has been marked failed with the following reason(s) '${message}'. Kindly get back to your account to and try again. Thank you for trading with us ' style="text-decoration: underline; color: #00fe5e">here</a></div>
                `,
                account: user
            })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Crypto Sell Order Failed`,
                        content: `You have marked the crypto sell order payment  with the ID of ${findSell?.order_no} as failed and user has been notified.`,
                        url: '/admin/transactions_history',
                    })

                    Mailing({
                        subject: 'Order Failed',
                        eTitle: `Crypto Sell Order Failed`,
                        eBody: `
                     <div>Hello Admin, you have marked the crypto sell order payment  with the ID of ${findSell?.order_no} as failed today; ${moment(findSell.updatedAt).format('DD-MM-yyyy')} / ${moment(findSell.updateddAt).format('h:mm')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }
            return res.json({ status: 200, msg: 'Buy order closed and successfully marked as failed' })
        }
        else {
            return res.json({ status: 404, msg: 'Invalid Tag' })
        }
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getGiftCardOrders = async (req, res) => {
    try {
        const all_orders = await GiftCard.findAll({
            where: { status: 'pending' },
            include: [
                {
                    model: User, as: 'gift_seller',
                    attributes: [`id`, `first_name`, `surname`]
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        return res.json({ status: 200, msg: "fetch success", data: all_orders })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getSingleGiftCardOrder = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 400, msg: "ID not found" })
        const order = await GiftCard.findOne({
            where: { id },
            include: [
                {
                    model: User, as: 'gift_seller',
                    attributes: [`id`, `first_name`, `surname`]
                }
            ]
        })
        return res.json({ status: 200, msg: "fetch success", data: order })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.creditGiftCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const { amount, tag, message } = req.body
        if (!id || !tag) return res.json({ status: 400, msg: "ID, Amount or Tag missing from request" })
        const order = await GiftCard.findOne({
            where: { id },
            include: [
                {
                    model: User, as: 'gift_seller',
                    attributes: [`id`, `first_name`, `surname`]
                }
            ]
        })
        if (!order) return res.json({ status: 404, msg: "Order not found" })
        if (order.status === 'completed') return res.json({ status: 400, msg: 'Order already completed' })
        const findUser = await User.findOne({ where: { id: order?.gift_seller.id } })
        if (!findUser) return res.json({ status: 404, msg: "User not found" })
        const findUserWallet = await Wallet.findOne({ where: { user: findUser.id } })
        if (!findUserWallet) {
            await Wallet.create({ user: findUser.id })
        }

        if (tag === 'success') {
            //credit the customer
            findUserWallet.balance = parseFloat(findUserWallet.balance) + parseFloat(amount)
            order.status = 'completed'
            await order.save()
            await findUserWallet.save()

            await Notification.create({
                user: findUser.id,
                title: `Balance Credit`,
                content: `Hi dear, Your Gift-Card order with the ID of ${order?.order_no} has been marked paid. Kindly check your  new balance.`,
                url: '/user/dashboard',
            })
            await Mailing({
                subject: `Gift-Card Credit Alert`,
                eTitle: `Credit Alert`,
                eBody: `
                  <div>Hello ${findUser.first_name}, Your Gift-Card order with the ID of ${order?.order_no} has been marked paid with the sum of ${nairaSign}${amount?.toLocaleString()}} credited to your balance. Kindly get back to your account to see your new balance. Thank you for trading with us ' style="text-decoration: underline; color: #00fe5e">here</a></div>
                `,
                account: findUser
            })
            const admins = await User.findAll({ where: { role: 'admin' } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Gift-Card Order Paid`,
                        content: `You have completed the giftcard order payment with the ID of ${order?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    Mailing({
                        subject: 'Order Completed',
                        eTitle: `Gift-Card Order`,
                        eBody: `
                     <div>Hello Admin, you have completed the giftcard order payment with the ID of ${order?.order_no} and the sum of ${nairaSign}${amount?.toLocaleString()}} today; ${moment(order.updatedAt).format('DD-MM-yyyy')} / ${moment(order.updateddAt).format('h:mm')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }

            return res.json({ status: 200, msg: 'customer credited successfully' })
        }
        else if (tag === 'failed') {
            if (!message) return res.json({ status: 400, msg: "Failed message is required" })

            order.status = 'failed'
            await order.save()


            await Notification.create({
                user: findUser.id,
                title: `Credit Failed`,
                content: `Hi dear, Your Gift-Card order with the ID of ${order?.order_no} has been marked as failed. Kindly check your email to learn more.`,
                url: '/user/transactions_history',
            })
            await Mailing({
                subject: `Gift-Card Failed Transaction`,
                eTitle: `Failed Transaction`,
                eBody: `
                  <div>Hello ${findUser.first_name}, Your Gift-Card order with the ID of ${order?.order_no} has been marked failed with the following as reason(s) '${message}'. Thank you for trading with us ' style="text-decoration: underline; color: #00fe5e">here</a></div>
                `,
                account: findUser
            })
            const admins = await User.findAll({ where: { role: 'admin' } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Gift-Card Order Failed`,
                        content: `You have marked failed to the giftcard order payment with the ID of ${order?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    Mailing({
                        subject: 'Order Completed',
                        eTitle: `Gift-Card Order`,
                        eBody: `
                     <div>Hello Admin, you have marked failed to the giftcard order payment with the ID of ${order?.order_no}  today; ${moment(order.updatedAt).format('DD-MM-yyyy')} / ${moment(order.updateddAt).format('h:mm')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }

            return res.json({ status: 200, msg: 'transaction marked as failed successfully' })
        } else {
            return res.json({ status: 404, msg: "Invalid Tag" })
        }
    } catch (error) {
        ServerError(res, error)
    }
}
