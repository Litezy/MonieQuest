const Product = require('../models').products
const User = require('../models').users
const Notification = require('../models').notifications
const Bank = require('../models').banks
const ProductOrder = require('../models').productOrders
const Mailing = require('../config/emailDesign')
const otpGenerator = require('otp-generator')
const slug = require('slug')
const fs = require('fs')
const { webURL, nairaSign } = require('../utils/utils')
const moment = require('moment')
const blockAndNum = 'abcdefghijklmnopqrstuvwxyz0123456789'
const { customAlphabet } = require('nanoid')


exports.SubmitProduct = async (req, res) => {
    try {
        const { title, category, price, about, feature1, feature2, video_link, contact_detail, bank_name, account_number, account_name } = req.body

        if (!title || category.length < 1 || !price || !about || !feature1 || !feature2 || !video_link || !contact_detail | !bank_name || !account_number || !account_name) return res.json({ status: 404, msg: `Incomplete request found` })
        if (isNaN(price)) return res.json({ status: 404, msg: `Price amount must be a number` })
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 404, msg: 'User not found' })

        const gen_id = `01` + otpGenerator.generate(9, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, })
        const slugData = slug(title, '-')
        const filePath = './public/products'
        const date = new Date()
        let imageName;

        if (!req.files) return res.json({ status: 404, msg: `Upload product image` })
        const productImage = req.files.image
        if (!productImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        imageName = `${slugData}-${date.getTime()}.jpg`
        await productImage.mv(`${filePath}/${imageName}`)

        const product = await Product.create({
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
            title: `Product submitted`,
            content: `Your product submitted with the id (#${product.gen_id}) has been successfully submitted. Our team will go through it and check if it meets our requirements, you'll get a response from us soon.`,
            url: '/user/products/all',
        })

        const admins = await User.findAll({ where: { role: 'admin' } })
        if (admins) {
            admins.map(async ele => {

                await Notification.create({
                    user: ele.id,
                    title: `Product submission alert`,
                    content: `Hello Admin, ${user.first_name} ${user.surname} just submitted a product with the id (#${product.gen_id}), please confirm if it meets the requirements.`,
                    url: '/admin/products/all',
                })

                Mailing({
                    subject: 'Product Submission Alert',
                    eTitle: `New product submitted`,
                    eBody: `
                     <div>Hello Admin, ${user.first_name} ${user.surname} just submitted a product with the id (#${product.gen_id}), today ${moment(product.createdAt).format('DD-MM-yyyy')} / ${moment(product.createdAt).format('h:mm')}. Confirm if it meets the requirements <a href='${webURL}/admin/products/all' style="text-decoration: underline; color: #00fe5e">here</a></div> 
                    `,
                    account: ele
                })

            })
        }

        return res.json({ status: 200, msg: 'Product created successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.AllUserProducts = async (req, res) => {
    try {
        const userProducts = await Product.findAll({
            where: { user: req.user },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: userProducts })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.AddRating = async (req, res) => {
    try {
        const { product_id, rating } = req.body
        if (!product_id, !rating) return res.json({ status: 404, msg: 'Incomplete request found' })

        const product = await Product.findOne({ where: { id: product_id } })
        if (!product) return res.json({ status: 404, msg: 'Product not found' })

        product.total_ratings += parseFloat(rating)
        product.total_rate_persons += 1
        await product.save()

        const ratingData = {
            id: product.id,
            rating: rating,
            submit: true
        }

        return res.json({ status: 200, msg: ratingData })
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

exports.ProductOrder = async (req, res) => {
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

        const productOrder = await ProductOrder.create({
            gen_id: gen_id,
            email_address,
            total_price,
            total_discount,
            amount_paid,
            products: products,
            status: 'paid'
        })

        const buyer = {
            email: productOrder.email_address
        }
        Mailing({
            subject: 'New Order Placed',
            eTitle: `Order placed`,
            eBody: `
             <div>You have successfully placed an order with the id (#${productOrder.gen_id}) for ${products.length} product(s) purchase, a total amount of ${nairaSign}${productOrder.total_price} payment made via bank transfer, today ${moment(productOrder.createdAt).format('DD-MM-yyyy')} / ${moment(productOrder.createdAt).format('h:mm')}. Payment is being verified, keep an eye on your email as we'll contact you from here.</div> 
            `,
            account: buyer
        })

        const admins = await User.findAll({ where: { role: 'admin' } })
        if (admins) {
            admins.map(async ele => {

                await Notification.create({
                    user: ele.id,
                    title: `Product order alert`,
                    content: `Hello Admin, a new product order with the id (#${productOrder.gen_id} has been placed for ${products.length} product(s) purchase, a total amount of ${nairaSign}${productOrder.total_price} payment made via bank transfer, kindly confirm this transaction.`,
                    url: '/admin/products/orders',
                })

                Mailing({
                    subject: 'Product Order Alert',
                    eTitle: `Product order placed`,
                    eBody: `
                     <div style="font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">order ID:</span><span style="padding-left: 1rem">#${productOrder.gen_id}</span></div>
                     <div style="font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">product(s) purchased:</span><span style="padding-left: 1rem">$${products.length}</span></div>
                     <div style="font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">amount paid:</span><span style="padding-left: 1rem">${nairaSign}${productOrder.total_price}</span></div>
                     <div style="font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">payment method:</span><span style="padding-left: 1rem">bank transfer</span></div>
                     <div style="font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">payment status:</span><span style="padding-left: 1rem">${productOrder.status}</span></div>
                     <div style="font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">buyer's email:</span><span style="padding-left: 1rem">${productOrder.email_address}</span></div>
                     <div style="font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">date:</span><span style="padding-left: 1rem">${moment(productOrder.createdAt).format('DD-MM-yyyy')}</span></div>
                     <div style="font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">time:</span><span style="padding-left: 1rem">${moment(productOrder.createdAt).format('h:mm A')}</span></div>
                     <div style="margin-top: 1rem">See more details of this transaction <a href='${webURL}/admin/products/orders' style="text-decoration: underline; color: #00fe5e">here</a></div>
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