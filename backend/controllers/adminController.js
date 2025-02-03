const Util = require('../models').utils
const Airdrop = require('../models').airdrops
const { webName, webShort, webURL } = require('../utils/utils')
const Mailing = require('../config/emailDesign')
const slug = require('slug')


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

exports.CreateAirdrop = async (req, res) => {
    try {
        const { title, category, blockchain, type, referral_link, about, video_guide_link, twitter_link, telegram_link, website_link } = req.body
        if (!title || !category || !blockchain || !type || !referral_link || !about || !video_guide_link) return res.json({ status: 404, msg: `Incomplete request found` })

        const slugData = slug(title, '-')
        const filePath = './public/airdrops'
        const date = new Date()
        let logoName;
        let bannerName;

        if (!req.files || !req.files.logo_image || !req.files.banner_image) return res.json({ status: 404, msg: `Upload airdrop logo and banner images` })
        const logo_image = req.files.logo_image
        const banner_image = req.files.banner_image
        if (!logo_image.mimetype.startsWith('image/') || !banner_image.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload valid images format (jpg, jpeg, png, svg)` })
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        logoName = `${slugData + 'logo'}-${date.getTime()}.jpg`
        await logo_image.mv(`${filePath}/${logoName}`)
        bannerName = `${slugData + 'banner'}-${date.getTime()}.jpg`
        await banner_image.mv(`${filePath}/${bannerName}`)

        await Airdrop.create({
            user: req.user,
            slug: slugData,
            title,
            category,
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
        const { airdrop_id } = req.body
        if (!airdrop_id) return res.json({ status: 404, msg: `Airdrop id is required` })

        const airdrop = await Airdrop.findOne({ where: { id: airdrop_id } })
        if (!airdrop) return res.json({ status: 404, msg: 'Airdrop not found' })

        return res.json({ status: 200, msg: airdrop })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.UpdateAirdrop = async (req, res) => {
    try {
        const { airdrop_id } = req.body
        if (!airdrop_id) return res.json({ status: 404, msg: `Airdrop id is required` })

        const airdrop = await Airdrop.findOne({ where: { id: airdrop_id } })
        if (!airdrop) return res.json({ status: 404, msg: 'Airdrop not found' })

        return res.json({ status: 200, msg: airdrop })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}