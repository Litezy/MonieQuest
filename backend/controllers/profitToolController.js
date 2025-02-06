const ProfitTool = require('../models').profitTools
const otpGenerator = require('otp-generator')
const slug = require('slug')
const fs = require('fs')


exports.SubmitProfitTool = async (req, res) => {
    try {
        const { title, category, price, about, feature1, feature2, video_link, contact_detail, bank_name, account_number, account_name } = req.body

        if (!title || category.length < 1 || !price || !about || !feature1 || !feature2 || !video_link || !contact_detail | !bank_name || !account_number || !account_name) return res.json({ status: 404, msg: `Incomplete request found` })
        if (isNaN(price)) return res.json({ status: 404, msg: `Price amount must be a number` })

        const gen_id = otpGenerator.generate(10, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, })
        const slugData = slug(title, '-')
        const filePath = './public/tools'
        const date = new Date()
        let imageName;

        if (!req.files) return res.json({ status: 404, msg: `Upload profit tool image` })
        const toolImage = req.files.image
        if (!toolImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        imageName = `${slugData}-${date.getTime()}.jpg`
        await toolImage.mv(`${filePath}/${imageName}`)

        await ProfitTool.create({
            user: req.user,
            slug: slugData,
            gen_id: gen_id,
            image: imageName,
            title,
            category: category,
            price,
            about,
            feature1,
            feature2,
            video_link,
            contact_detail,
            bank_name,
            account_name,
            account_number
        })

        return res.json({ status: 200, msg: 'Profit Tool created successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.AllUserProfitTools = async (req, res) => {
    try {
        const userProfitTools = await ProfitTool.findAll({
            where: { user: req.user },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: userProfitTools })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AddRating = async (req, res) => {
    try {
        const { tool_id, rating } = req.body
        if (!tool_id, !rating) return res.json({ status: 404, msg: 'Incomplete request found' })

        const profitTool = await ProfitTool.findOne({ where: { id: tool_id } })
        if (!profitTool) return res.json({ status: 404, msg: 'Profit tool not found' })

        profitTool.total_ratings += parseFloat(rating)
        profitTool.total_rate_persons += 1

        await profitTool.save()

        const form = {
            id: tool_id,
            rating: rating,
            submit: true
        }

        return res.json({ status: 200, msg: form })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}