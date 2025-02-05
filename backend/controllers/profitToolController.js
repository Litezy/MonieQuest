const ProfitTool = require('../models').profitTools
const otpGenerator = require('otp-generator')
const slug = require('slug')
const fs = require('fs')


exports.SubmitProfitTool = async (req, res) => {
    try {
        const { title, category, price, about, feature1, feature2, video_link, contact_detail, bank_name, account_number, account_name } = req.body
        const categoryArray = JSON.parse(category)
        console.log(categoryArray)

        if (!title || categoryArray.length < 1 || !price || !about || !feature1 || !feature2 || !video_link || !contact_detail | !bank_name || !account_number || !account_name) return res.json({ status: 404, msg: `Incomplete request found` })
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
            category: categoryArray,
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
        const profitTools = await ProfitTool.findAll({
            where: { user: req.user },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: profitTools })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}