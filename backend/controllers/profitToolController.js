const ProfitTool = require('../models').profitTools
const User = require('../models').users
const Notification = require('../models').notifications
const Bank = require('../models').banks
const ToolOrder = require('../models').toolsOrders
const Mailing = require('../config/emailDesign')
const otpGenerator = require('otp-generator')
const slug = require('slug')
const fs = require('fs')
const { webURL } = require('../utils/utils')
const moment = require('moment')
const blockAndNum = 'abcdefghijklmnopqrstuvwxyz0123456789'
const { customAlphabet } = require('nanoid')


exports.SubmitProfitTool = async (req, res) => {
    try {
        const { title, category, price, about, feature1, feature2, video_link, contact_detail, bank_name, account_number, account_name } = req.body

        if (!title || category.length < 1 || !price || !about || !feature1 || !feature2 || !video_link || !contact_detail | !bank_name || !account_number || !account_name) return res.json({ status: 404, msg: `Incomplete request found` })
        if (isNaN(price)) return res.json({ status: 404, msg: `Price amount must be a number` })
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 404, msg: 'User not found' })

        const gen_id = `01` + otpGenerator.generate(9, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, })
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

        const profitTool = await ProfitTool.create({
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

        await Notification.create({
            user: req.user,
            title: `Profit tool submitted`,
            content: `Your profit tool created with the id (#${profitTool.gen_id}) has been successfully submiited. Our team will go through it and check if it meets our requirements, you'll get a response from us soon.`,
            url: '/user/profit_tools/all_tools',
        })

        const admins = await User.findAll({ where: { role: 'admin' } })
        if (admins) {
            admins.map(async ele => {

                await Notification.create({
                    user: ele.id,
                    title: `Profit tool submission alert`,
                    content: `Hello Admin, ${user.first_name} ${user.surname} just submitted a profit tool with the id (#${profitTool.gen_id}), please confirm if it meets the requirements.`,
                    url: '/admin/profit_tools/all_tools',
                })

                Mailing({
                    subject: 'Profit Tool Submission Alert',
                    eTitle: `New profit tool submitted`,
                    eBody: `
                     <div>Hello Admin, ${user.first_name} ${user.surname} just submitted a profit tool with the id (#${profitTool.gen_id}), today ${moment(profitTool.createdAt).format('DD-MM-yyyy')} / ${moment(profitTool.createdAt).format('h:mm')}. Confirm if it meets the requirements <a href='${webURL}/admin/profit_tools/all_tools' style="text-decoration: underline; color: #00fe5e">here</a></div> 
                    `,
                    account: ele
                })

            })
        }

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

exports.GetAdminBankAccount = async (req, res) => {
    try {
        const mainAdmin = await User.findOne({ where: { role: 'admin', id: 1 } })
        if (!mainAdmin) return res.json({ status: 404, msg: 'Admin not found' })

        const adminBankAccount = await Bank.findOne({ where: { user: mainAdmin.id } })
        if (!adminBankAccount) return res.json({ status: 404, msg: 'Admin Bank account not found' })

        return res.json({ status: 200, msg: adminBankAccount })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.OrderTools = async (req, res) => {
    try {
        const { bank_id, email_address, total_price, total_discount, amount_paid, products } = req.body
        if (!email_address || !total_price || total_discount === '' || !amount_paid || products.length < 1) return res.json({ status: 404, msg: `Incomplete request found` })
        if (isNaN(total_price) || isNaN(total_discount) || isNaN(amount_paid)) return res.json({ status: 404, msg: `Prices must be in numbers` })
        if (!bank_id) return res.json({ status: 404, msg: `Please make payment before continuing` })
        const adminBank = await Bank.findOne({ where: { id: bank_id } })
        if (!adminBank) return res.json({ status: 404, msg: `Please make payment before continuing` })
        if (adminBank.user !== 1) return res.json({ status: 404, msg: `Please pay to the correct bank address provided` })

        const nanoid = customAlphabet(blockAndNum, 15)
        const gen_id = nanoid()

        const toolOrder = await ToolOrder.create({
            gen_id: gen_id,
            email_address,
            total_price,
            total_discount,
            amount_paid,
            products: products,
            status: 'paid'
        })

        const buyer = {
            email: toolOrder.email_address
        }
        Mailing({
            subject: 'New Order Placed',
            eTitle: `Order placed`,
            eBody: `
             <div>You have successfully placed an order with the id (#${toolOrder.gen_id}) for ${products.length} product(s) purchase and payment made via bank transfer, today ${moment(toolOrder.createdAt).format('DD-MM-yyyy')} / ${moment(toolOrder.createdAt).format('h:mm')}. Payment is being verified, keep an eye on your email as we'll contact you from here.</div> 
            `,
            account: buyer
        })

        const admins = await User.findAll({ where: { role: 'admin' } })
        if (admins) {
            admins.map(async ele => {

                await Notification.create({
                    user: ele.id,
                    title: `Profit tool order alert`,
                    content: `Hello Admin, a new profit tool order with the id (${toolOrder.gen_id} has been placed for ${products.length} product(s) purchase and payment made via bank transfer, kindly confirm this transaction.`,
                    url: '/admin/profit_tools/orders',
                })

                Mailing({
                    subject: 'Profit Tool Order Alert',
                    eTitle: `Profit tool order placed`,
                    eBody: `
                     <div>Hello Admin, a new profit tool order with the id (#${toolOrder.gen_id}) has been placed for ${products.length} product(s) purchase and payment made via bank transfer, today ${moment(toolOrder.createdAt).format('DD-MM-yyyy')} / ${moment(toolOrder.createdAt).format('h:mm')}. See more details of this transaction <a href='${webURL}/admin/profit_tools/orders' style="text-decoration: underline; color: #00fe5e">here</a></div> 
                    `,
                    account: ele
                })

            })
        }

        return res.json({ status: 200, msg: 'Your order has been placed' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}