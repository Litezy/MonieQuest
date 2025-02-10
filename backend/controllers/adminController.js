const User = require('../models').users
const Util = require('../models').utils
const Airdrop = require('../models').airdrops
const ProfitTool = require('../models').profitTools
const ToolOrder = require('../models').toolsOrders
const Notification = require('../models').notifications
const Blogs = require('../models').blogs
const BuyCrypto = require('../models').exchangeBuys
const Wallet = require('../models').wallets
const SellCrypto = require('../models').exchangeSells
const Kyc = require('../models').kyc
const GiftCard = require('../models').giftCards
const Bank_Withdrawals = require('../models').withdrawals
const { webName, webShort, webURL, ServerError } = require('../utils/utils')
const Mailing = require('../config/emailDesign')
const otpGenerator = require('otp-generator')
const slug = require('slug')
const fs = require('fs')
const moment = require('moment')
// const { sequelize } = require('../models')


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
        const categoryArray = ["featured", "deFi", "new", "NFT", "other"]
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

exports.AllAirdrops = async (req, res) => {
    try {
        const airdrops = await Airdrop.findAll({
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
            const categoryArray = ["featured", "deFi", "new", "NFT", "other"]
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
            const statusArray = ["active", "finished"]
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

exports.UpdateProfitTool = async (req, res) => {
    try {
        const { tool_id, title, category, price, about, feature1, feature2, status, listing, discount_percentage, discount_duration, discount_duration_type } = req.body
        if (!tool_id) return res.json({ status: 404, msg: `Profit tool id is required` })

        const profitTool = await ProfitTool.findOne({ where: { id: tool_id } })
        if (!profitTool) return res.json({ status: 404, msg: 'Profit tool not found' })
        const user = await User.findOne({ where: { id: profitTool.user } })
        if (!user) return res.json({ status: 404, msg: 'User not found' })

        const slugData = slug(title ? title : profitTool.title, '-')
        const filePath = './public/tools'
        const date = new Date()
        let imageName;
        const toolImage = req?.files?.image

        if (toolImage) {
            if (!toolImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            const currentImagePath = `${filePath}/${profitTool.image}`
            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            imageName = `${slugData}-${date.getTime()}.jpg`
            await toolImage.mv(`${filePath}/${imageName}`)
            profitTool.image = imageName
        }
        if (title) {
            profitTool.title = title
        }
        if (category) {
            profitTool.category = category
        }
        if (price) {
            if (isNaN(price)) return res.json({ status: 404, msg: `Price amount must be a number` })
            profitTool.price = price
        }
        if (about) {
            profitTool.about = about
        }
        if (feature1) {
            profitTool.feature1 = feature1
        }
        if (feature2) {
            profitTool.feature2 = feature2
        }
        if (status) {
            const statusArray = ["pending", "approved", "declined"]
            if (!statusArray.includes(status)) return res.json({ status: 404, msg: `Invalid status provided` })

            if (profitTool.status !== 'approved') {
                if (status === 'approved') {
                    await Notification.create({
                        user: profitTool.user,
                        title: `Profit tool approved`,
                        content: `After thorough review by our admins your profit tool submitted with the id (#${profitTool.gen_id}) has been approved, you'll be contacted soon for payment.`,
                        url: '/user/profit_tools/all_tools',
                    })
                    await Mailing({
                        subject: `Profit Tool Approved`,
                        eTitle: `Profit tool approved`,
                        eBody: `
                          <div>Hello ${user.first_name}, After thorough review by our admins your profit tool submitted with the id (#${profitTool.gen_id}) has been approved, you'll be contacted soon for payment. You can check current status <a href='${webURL}/profit_tools/all_tools' style="text-decoration: underline; color: #00fe5e">here</a></div>
                        `,
                        account: user
                    })
                }
            }
            if (profitTool.status !== 'declined') {
                if (status === 'declined') {
                    await Notification.create({
                        user: profitTool.user,
                        title: `Profit tool declined`,
                        content: `After review by our admins, your profit tool submitted with the id (#${profitTool.gen_id}) has been declined, reasons for disapproval would be sent to you via your contact detail.`,
                        url: '/user/profit_tools/all_tools',
                        status: 'failed'
                    })
                    await Mailing({
                        subject: `Profit Tool Declined`,
                        eTitle: `Profit tool declined`,
                        eBody: `
                          <div>Hello ${user.first_name}, After thorough review by our admins your profit tool submitted with the id (#${profitTool.gen_id}) has been declined, reasons for disapproval would be sent to you via your contact detail. You can check current status <a href='${webURL}/profit_tools/all_tools' style="text-decoration: underline; color: #00fe5e">here</a></div>
                        `,
                        account: user
                    })
                }
            }
            profitTool.status = status
        }
        if (listing) {
            const listingArray = ["listed", "unlisted"]
            if (!listingArray.includes(listing)) return res.json({ status: 404, msg: `Invalid listing value provided` })
            profitTool.listing = listing
        }
        if (discount_percentage) {
            if (isNaN(discount_percentage)) return res.json({ status: 404, msg: `Discount percentage must be a number` })
            profitTool.discount_percentage = discount_percentage
        } else {
            profitTool.discount_percentage = null
        }
        if (discount_duration && discount_duration_type) {
            if (isNaN(discount_duration)) return res.json({ status: 404, msg: `Discount duration must be a number` })
            const endDate = moment().add(parseFloat(discount_duration), `${discount_duration_type}`)
            profitTool.discount_duration = discount_duration
            profitTool.discount_duration_type = discount_duration_type
            profitTool.discount_endDate = `${endDate}`
        } else {
            profitTool.discount_duration = null
            profitTool.discount_duration_type = null
            profitTool.discount_endDate = null
        }

        await profitTool.save()

        return res.json({ status: 200, msg: 'Profit tool updated successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.AllProfitTools = async (req, res) => {
    try {
        const allProfitTools = await ProfitTool.findAll({
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: allProfitTools })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AllListedProfitTools = async (req, res) => {
    try {
        const allProfitTools = await ProfitTool.findAll({
            where: { listing: 'listed' },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: allProfitTools })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.SingleProfitTool = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 404, msg: `Profit tool id is required` })

        const profitTool = await ProfitTool.findOne({ where: { id } })
        if (!profitTool) return res.json({ status: 404, msg: 'Profit tool not found' })

        return res.json({ status: 200, msg: profitTool })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AllProfitToolsOrders = async (req, res) => {
    try {
        const allToolOrders = await ToolOrder.findAll({
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: allToolOrders })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}



exports.getDashboardInfos = async (req, res) => {
  try {
    const totalProfitTools = await ProfitTool.count();
    const totalCryptobuys = await BuyCrypto.count();
    const totalCryptosells = await SellCrypto.count();
    const totalAirdrops = await Airdrop.count();
    const totalBlogs = await Blogs.count();
    const totalUsers = await User.count();
    const totalGiftcardSells = await GiftCard.count();
    const totalWithdrawals = await Bank_Withdrawals.count();
    const totalCryptoBuysAmount = await BuyCrypto.sum('amount');
    const totalCryptoSellsAmount = await SellCrypto.sum('amount');
    const totalWithdrawalAmt = await Bank_Withdrawals.sum('amount');
    const totalGiftcardsAmt = await GiftCard.sum('amount');
    const totalToolsOrders = await ToolOrder.sum('amount_paid');
    const data = [
      { title: 'total Users', value: totalUsers, color: 'red' },
      { title: 'total Airdrops', value: totalAirdrops, color: 'green' },
      { title: 'total Crypto Buys', value: totalCryptobuys, color: 'yellow' },
      { title: 'total Crypto Sells', value: totalCryptosells, color: 'blue' },
      { title: 'total Crypto Buys Amount', value: totalCryptoBuysAmount, color: 'orange',cur:true },
      { title: 'total Giftcards Sells Amount', value: totalGiftcardsAmt, color: 'purple',cur:true },
      { title: 'total Crypto Sells Amount', value: totalCryptoSellsAmount, color: 'indigo',cur:true },
      { title: 'total Giftcard Sells', value: totalGiftcardSells, color: 'orange' },
      { title: 'total Withdrawals', value: totalWithdrawals, color: 'teal' },
      { title: 'total Amount Withdrawn', value: totalWithdrawalAmt, color: 'amber',cur:true },
      { title: 'total Blogs', value: totalBlogs, color: 'pink' },
      { title: 'total Profit Tools', value: totalProfitTools, color: 'red' },
      { title: 'total Profit Tools Orders', value: totalToolsOrders ? totalToolsOrders  : 0 , color: 'lime',cur:true },
    ];

    return res.json({ status: 200, msg: 'fetch success', data });
  } catch (error) {
    ServerError(res, error);
  }
};


exports.getUserDetails = async (req,res) =>{
    try {
        const all_users = await User.findAll({ where:{role:'user'},
            attributes:[`id`,`first_name`,'surname','email','createdAt'],
            include:[
                {
                    model: Wallet,as :'user_wallets',
                    attributes:[`balance`]
                }
            ]
        })
        return res.json({status:200, msg:'fetch success',data:all_users})
    } catch (error) {
        ServerError(res,error)
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

        return res.json({ status: 200, msg: 'KYC updated successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}