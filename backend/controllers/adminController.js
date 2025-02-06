const User = require('../models').users
const Util = require('../models').utils
const Airdrop = require('../models').airdrops
const ProfitTool = require('../models').profitTools
const Notification = require('../models').notifications
const { webName, webShort, webURL } = require('../utils/utils')
const Mailing = require('../config/emailDesign')
const otpGenerator = require('otp-generator')
const slug = require('slug')
const fs = require('fs')


exports.UpdateUtils = async (req, res) => {
    try {
        const { exchange_buy_rate, buy_min, bank_withdraw_min, buy_max, sell_min, sell_max, exchange_sell_rate, giftcard_rate } = req.body
        const utils = await Util.findOne({})
        if (!utils) {
            if (isNaN(exchange_buy_rate) || isNaN(buy_min) || isNaN(bank_withdraw_min) || isNaN(buy_max) || isNaN(sell_min) || isNaN(sell_max) || isNaN(exchange_sell_rate) || isNaN(giftcard_rate)) return res.json({ status: 404, msg: `Enter valid numbers` })

            const newUtils = await Util.create({
                exchange_buy_rate, exchange_sell_rate, buy_max, buy_min, sell_max, sell_min, giftcard_rate
            })

            return res.json({ status: 200, msg: 'Rate(s) created successfully', utils: newUtils })
        }
        else if (utils) {
            if (exchange_buy_rate) {
                if (isNaN(exchange_buy_rate)) return res.json({ status: 404, msg: `Enter a valid number` })
                utils.exchange_buy_rate = exchange_buy_rate
            }

            if (exchange_sell_rate) {
                if (isNaN(exchange_sell_rate)) return res.json({ status: 404, msg: `Enter a valid number` })
                utils.exchange_sell_rate = exchange_sell_rate
            }
            if (bank_withdraw_min) {
                if (isNaN(bank_withdraw_min)) return res.json({ status: 404, msg: `Enter a valid number` })
                utils.bank_withdraw_min = bank_withdraw_min
            }

            if (giftcard_rate) {
                if (isNaN(giftcard_rate)) return res.json({ status: 404, msg: `Enter a valid number` })
                utils.giftcard_rate = giftcard_rate
            }
            if (buy_min) {
                if (isNaN(buy_min)) return res.json({ status: 404, msg: `Enter a valid number` })
                utils.buy_min = buy_min
            }
            if (buy_max) {
                if (isNaN(buy_max)) return res.json({ status: 404, msg: `Enter a valid number` })
                utils.buy_max = buy_max
            }
            if (sell_max) {
                if (isNaN(sell_max)) return res.json({ status: 404, msg: `Enter a valid number` })
                utils.sell_max = sell_max
            }
            if (sell_min) {
                if (isNaN(sell_min)) return res.json({ status: 404, msg: `Enter a valid number` })
                utils.sell_min = sell_min
            }

            await utils.save()

            return res.json({ status: 200, msg: 'Rate(s) updated successfully', utils: utils })
        }

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

exports.CreateAirdrop = async (req, res) => {
    try {
        const { title, category, kyc, blockchain, type, referral_link, about, video_guide_link, twitter_link, telegram_link, website_link } = req.body
        if (!title || !category || !blockchain || !type || !referral_link || !about || !video_guide_link) return res.json({ status: 404, msg: `Incomplete request found` })

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
            airdrop.category = category
        }
        if (kyc) {
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
            profitTool.listing = listing
        }
        if (discount_percentage) {
            if (isNaN(discount_percentage)) return res.json({ status: 404, msg: `Discount percentage must be a number` })
            profitTool.discount_percentage = discount_percentage
        } else {
            profitTool.discount_percentage = null
        }
        if (discount_duration) {
            if (isNaN(discount_duration)) return res.json({ status: 404, msg: `Discount duration must be a number` })
            profitTool.discount_duration = discount_duration
        } else {
            profitTool.discount_duration = null
        }
        if (discount_duration_type) {
            profitTool.discount_duration_type = discount_duration_type
        } else {
            profitTool.discount_duration_type = null
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