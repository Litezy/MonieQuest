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
const Testimonial = require('../models').testimonials
const Kyc = require('../models').kyc
const GiftCard = require('../models').giftCards
const Bank_Withdrawals = require('../models').withdrawals
const Comment = require('../models').comments
const { webName, webURL, ServerError, nairaSign, dollarSign, UploadBlogImages, GlobalDeleteImage, GlobalImageUploads, GlobalDeleteMultiImages, GlobalDeleteSingleImage } = require('../utils/utils')
const Mailing = require('../config/emailDesign')
const otpGenerator = require('otp-generator')
const slug = require('slug')
const path = require('path');
const fs = require('fs')
const moment = require('moment')
const CryptoModel = require('../models').cryptos
const { Op } = require('sequelize')
const Tools = require('../models').tools
const Card = require('../models').cards
const Subscriber = require('../models').subscribers


exports.UpdateUtils = async (req, res) => {
    try {
        const { exchange_buy_rate, exchange_sell_rate, kyc_threshold, bank_withdraw_min, giftcard_rate, leaderboard_reward } = req.body
        const utils = await Util.findOne({})
        if (!utils) {
            if (!exchange_buy_rate || !exchange_sell_rate || !kyc_threshold || !bank_withdraw_min || !giftcard_rate || !leaderboard_reward) return res.json({ status: 404, msg: `Incomplete request found` })
            if (isNaN(exchange_buy_rate) || isNaN(exchange_sell_rate) || isNaN(kyc_threshold) || isNaN(bank_withdraw_min) || isNaN(giftcard_rate) || isNaN(leaderboard_reward)) return res.json({ status: 404, msg: `Enter valid numbers` })

            const newUtils = await Util.create({
                exchange_buy_rate, exchange_sell_rate, kyc_threshold, bank_withdraw_min, giftcard_rate, leaderboard_reward
            })

            return res.json({ status: 200, msg: 'Rate(s) created successfully', utils: newUtils })
        }
        else {
            if (isNaN(exchange_buy_rate) || isNaN(exchange_sell_rate) || isNaN(kyc_threshold) || isNaN(bank_withdraw_min) || isNaN(giftcard_rate) || isNaN(leaderboard_reward)) return res.json({ status: 404, msg: `Enter valid numbers` })
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
            if (leaderboard_reward) {
                utils.leaderboard_reward = leaderboard_reward
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
        const { title, category, steps, kyc, blockchain, type, format, level, referral_link, about, video_guide_link, twitter_link, telegram_link, website_link } = req.body
        if (!title || !category || !blockchain || !type || !format || !level || !referral_link || !about || !video_guide_link || !steps || steps.length < 1) return res.json({ status: 404, msg: `Incomplete request found` })
        const categoryArray = ["featured", "deFi", "new", "NFT", "potential", "earn_crypto"]
        if (!categoryArray.includes(category)) return res.json({ status: 404, msg: `Invalid category provided` })
        const kycArray = ['required', "unrequired"]
        if (!kycArray.includes(kyc)) return res.json({ status: 404, msg: `Invalid kyc value provided` })

        const stepsArray = Array.isArray(steps) ? steps : [steps]
        const gen_id = `01` + otpGenerator.generate(8, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, })
        const slugData = slug(title, '-')

        if (!req.files || !req.files.logo_image || !req.files.banner_image) return res.json({ status: 404, msg: `Upload airdrop logo and banner images` })
        const logoImage = req?.files?.logo_image
        const bannerImage = req?.files?.banner_image
        if (!logoImage.mimetype.startsWith('image/') || !bannerImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload valid images format (jpg, jpeg, png, svg)` })
        const imagesToUpload = [
            { field: 'logo', file: logoImage },
            { field: 'banner', file: bannerImage },
        ]
        const UploadedImages = await GlobalImageUploads(imagesToUpload, 'airdrops', gen_id)

        const newAirdrop = await Airdrop.create({
            user: req.user,
            slug: slugData,
            gen_id: gen_id,
            logo_image: UploadedImages.logo,
            banner_image: UploadedImages.banner,
            title,
            category,
            kyc,
            steps: stepsArray,
            blockchain,
            type,
            format,
            level,
            referral_link,
            about,
            video_guide_link,
            twitter_link: twitter_link || null,
            telegram_link: telegram_link || null,
            website_link: website_link || null
        })

        const admin = await User.findOne({ where: { id: req.user } })
        if (!admin) return res.json({ status: 400, msg: 'Admin not found' })
        const superAdmin = await User.findOne({ where: { role: 'super admin' } })
        if (superAdmin) {
            await Notification.create({
                user: superAdmin.id,
                title: `Airdrop creation alert`,
                content: admin.role !== 'super admin' ? `A new airdrop (${newAirdrop.title}) with the ID (${newAirdrop.gen_id}) has just been created by the admin ${admin.first_name}.` : `You just created a new airdrop (${newAirdrop.title}) with the ID (${newAirdrop.gen_id}).`,
                url: '/admin/airdrops/all',
            })

            await Mailing({
                subject: 'Airdrop Creation Alert',
                eTitle: `New airdrop created`,
                eBody:
                    `
                     <div>Hello Admin, A new airdrop (${newAirdrop.title}) with the ID (${newAirdrop.gen_id}) has just been created today; ${moment(newAirdrop.createdAt).format('DD-MM-YYYY')} / ${moment(newAirdrop.createdAt).format('h:mm a')}. See more details <a href='${webURL}/admin/airdrops/all' style="text-decoration: underline; color: #00fe5e">here</a></div> 
                    `
                ,
                account: superAdmin,
            })
        }


        return res.json({ status: 200, msg: 'Airdrop created successfully', data: newAirdrop })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.UpdateAirdrop = async (req, res) => {
    try {
        const { airdrop_id, steps, status, title, category, kyc, blockchain, type, format, level, referral_link, about, video_guide_link, twitter_link, telegram_link, website_link } = req.body
        if (!airdrop_id) return res.json({ status: 404, msg: `Airdrop id is required` })

        const airdrop = await Airdrop.findOne({ where: { id: airdrop_id } })
        if (!airdrop) return res.json({ status: 404, msg: 'Airdrop not found' })
        const logoImage = req?.files?.logo_image
        const bannerImage = req?.files?.banner_image

        if (logoImage) {
            if (!logoImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            if (airdrop.logo_image) {
                await GlobalDeleteImage(airdrop.logo_image)
            }
            const imageToUpload = [{ field: 'logo', file: logoImage }]
            const newLogoImage = await GlobalImageUploads(imageToUpload, 'airdrops', airdrop.gen_id)
            airdrop.logo_image = newLogoImage.logo

        }
        if (bannerImage) {
            if (!bannerImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            if (airdrop.banner_image) {
                await GlobalDeleteImage(airdrop.banner_image)
            }
            const imageToUpload = [{ field: 'banner', file: bannerImage }]
            const newBannerImage = await GlobalImageUploads(imageToUpload, 'airdrops', airdrop.gen_id)
            airdrop.banner_image = newBannerImage.banner
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
            const kycArray = ['required', "unrequired"]
            if (!kycArray.includes(kyc)) return res.json({ status: 404, msg: `Invalid KYC value provided` })
            airdrop.kyc = kyc
        }
        if (blockchain) {
            airdrop.blockchain = blockchain
        }
        if (type) {
            airdrop.type = type
        }
        if (format) {
            airdrop.format = format
        }
        if (level) {
            airdrop.level = level
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
        if (steps) {
            const stepsArray = Array.isArray(steps) ? steps : [steps]
            airdrop.steps = stepsArray
        }
        if (status) {
            const statusArray = ["open", "closed"]
            if (!statusArray.includes(status)) return res.json({ status: 404, msg: `Invalid status provided` })
            airdrop.status = status
        }
        airdrop.twitter_link = twitter_link || null
        airdrop.telegram_link = telegram_link || null
        airdrop.website_link = website_link || null

        await airdrop.save()

        const admin = await User.findOne({ where: { id: req.user } })
        if (!admin) return res.json({ status: 400, msg: 'Admin not found' })
        const superAdmin = await User.findOne({ where: { role: 'super admin' } })
        if (superAdmin) {
            await Notification.create({
                user: superAdmin.id,
                title: `Airdrop update alert`,
                content: admin.role !== 'super admin' ? `${airdrop.title} airdrop with the ID (${airdrop.gen_id}) has just been updated by the admin ${admin.first_name}.` : `You just updated ${airdrop.title} airdrop with the ID (${airdrop.gen_id})`,
                url: '/admin/airdrops/all',
            })

            await Mailing({
                subject: 'Airdrop Update Alert',
                eTitle: `${airdrop.title} airdrop updated`,
                eBody:
                    `
                 <div>Hello Admin, ${airdrop.title} airdrop with the ID (${airdrop.gen_id}) has just been updated today; ${moment(airdrop.updatedAt).format('DD-MM-YYYY')} / ${moment(airdrop.updatedAt).format('h:mm a')}. See more details <a href='${webURL}/admin/airdrops/all' style="text-decoration: underline; color: #00fe5e">here</a></div> 
                `,
                account: superAdmin,
            })
        }

        return res.json({ status: 200, msg: 'Airdrop updated successfully' })
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
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

exports.AllOpenAirdrops = async (req, res) => {
    try {
        const openAirdrops = await Airdrop.findAll({
            where: { status: ['open'] },
            order: [['createdAt', 'DESC']]
        })

        return res.json({ status: 200, msg: openAirdrops })
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

exports.DeleteClosedAirdrop = async (req, res) => {
    try {
        const { airdrop_id } = req.body
        if (!airdrop_id) return res.json({ status: 404, msg: `Provide an airdrop id` })

        const airdrop = await Airdrop.findOne({ where: { id: airdrop_id } })
        if (!airdrop) return res.json({ status: 404, msg: 'Airdrop not found' })
        if (airdrop.status !== 'closed') return res.json({ status: 404, msg: 'You can only delete an airdrop with a closed status' })

        const imagesToDelete = [airdrop.logo_image, airdrop.banner_image]
        await GlobalDeleteMultiImages(imagesToDelete, 'airdrops', airdrop.gen_id)

        await airdrop.destroy()

        const admin = await User.findOne({ where: { id: req.user } })
        if (!admin) return res.json({ status: 400, msg: 'Admin not found' })
        const superAdmin = await User.findOne({ where: { role: 'super admin' } })
        if (superAdmin) {
            await Notification.create({
                user: superAdmin.id,
                title: `Airdrop deletion alert`,
                content: admin.role !== 'super admin' ? `${airdrop.title} airdrop with the ID (${airdrop.gen_id}) has just been deleted by the admin ${admin.first_name}.` : `You just deleted ${airdrop.title} airdrop with the ID (${airdrop.gen_id})`,
                url: '/admin/airdrops/all',
            })

            await Mailing({
                subject: 'Airdrop Deletion Alert',
                eTitle: `${airdrop.title} airdrop deleted`,
                eBody:
                    `
                     <div>Hello Admin, ${airdrop.title} airdrop with the ID (${airdrop.gen_id}) has just been deleted today; ${moment(airdrop.updatedAt).format('DD-MM-YYYY')} / ${moment(airdrop.updatedAt).format('h:mm a')}. See more details <a href='${webURL}/admin/airdrops/all' style="text-decoration: underline; color: #00fe5e">here</a></div> 
                    `,
                account: superAdmin,
            })
        }

        return res.json({ status: 200, msg: 'Airdrop deleted successfully' })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.UpdateProduct = async (req, res) => {
    try {
        const { product_id, title, category, price, about, features, status, listing, discount_percentage, discount_duration, discount_duration_type } = req.body
        if (!product_id) return res.json({ status: 404, msg: `Product id is required` })

        const product = await Product.findOne({ where: { id: product_id } })
        if (!product) return res.json({ status: 404, msg: 'Product not found' })
        const user = await User.findOne({ where: { id: product.user } })
        if (!user) return res.json({ status: 404, msg: 'User not found' })

        const productImage = req?.files?.image

        if (productImage) {
            if (!productImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            if (product.image) {
                await GlobalDeleteImage(product.image)
            }
            const imageToUpload = [{ field: 'product_image', file: productImage }]
            const newImage = await GlobalImageUploads(imageToUpload, 'products', product.gen_id)
            product.image = newImage.product_image
        }
        if (title) {
            product.title = title
        }
        if (category) {
            const categoryArray = Array.isArray(category) ? category : [category]
            product.category = categoryArray
        }
        if (price) {
            if (isNaN(price)) return res.json({ status: 404, msg: `Price amount must be a number` })
            product.price = price
        }
        if (about) {
            product.about = about
        }
        if (features) {
            const featuresArray = Array.isArray(features) ? features : [features]
            product.features = featuresArray
        }
        if (status) {
            const statusArray = ["pending", "approved", "declined"]
            if (!statusArray.includes(status)) return res.json({ status: 404, msg: `Invalid status provided` })

            if (product.status !== 'approved') {
                if (status === 'approved') {
                    await Notification.create({
                        user: product.user,
                        title: `Product submitted approved`,
                        content: `After thorough review by our admins your product submitted with the ID (${product.gen_id}) has been approved, you'll be contacted soon for payment.`,
                        url: '/user/products/all',
                    })
                    await Mailing({
                        subject: `Product Submitted Approved`,
                        eTitle: `Product submitted approved`,
                        eBody: `
                          <div>Hello ${user.first_name}, After thorough review by our admins your product submitted (${product.title}) with the ID (${product.gen_id}) has been approved, you'll be contacted soon for payment. You can check current status <a href='${webURL}/user/products/all' style="text-decoration: underline; color: #00fe5e">here</a></div>
                        `,
                        account: user
                    })

                    const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
                    if (admins) {
                        admins.map(async ele => {

                            await Notification.create({
                                user: ele.id,
                                title: `Product submitted approved`,
                                content: `The Product submitted with the ID (${product.gen_id}) have been successfully approved.`,
                                url: '/admin/products/all',
                            })
                            await Mailing({
                                subject: 'Product Submitted Approved',
                                eTitle: `Product Approval`,
                                eBody: `
                                <div>Hello Admin, The Product submitted with the ID (${product.gen_id}) have been successfully approved, today ${moment(product.updatedAt).format('DD-MM-yyyy')} / ${moment(product.updatedAt).format('h:mm A')}. See more details <a href='${webURL}/admin/products/all' style="text-decoration: underline; color: #00fe5e">here</a></div> 
                               `,
                                account: ele
                            })

                        })
                    }
                }
            }
            if (product.status !== 'declined') {
                if (status === 'declined') {
                    await Notification.create({
                        user: product.user,
                        title: `Product submitted declined`,
                        content: `After review by our admins, your product submitted with the ID (${product.gen_id}) has been declined, reasons for disapproval would be sent to you via your contact detail.`,
                        url: '/user/products/all',
                        status: 'failed'
                    })
                    await Mailing({
                        subject: `Product Submitted Declined`,
                        eTitle: `Product submitted declined`,
                        eBody: `
                          <div>Hello ${user.first_name}, After thorough review by our admins your product submitted (${product.title}) with the ID (${product.gen_id}) has been declined, reasons for disapproval would be sent to you via your contact detail. You can check current status <a href='${webURL}/user/products/all' style="text-decoration: underline; color: #00fe5e">here</a></div>
                        `,
                        account: user
                    })

                    const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
                    if (admins) {
                        admins.map(async ele => {

                            await Notification.create({
                                user: ele.id,
                                title: `Product submitted declined`,
                                content: `The Product submitted with the ID (${product.gen_id}) have been successfully declined.`,
                                url: '/admin/products/all',
                            })
                            await Mailing({
                                subject: 'Product Submitted Declined',
                                eTitle: `Product Declined`,
                                eBody: `
                                <div>Hello Admin, The Product submitted with the ID (${product.gen_id}) have been successfully declined, today ${moment(product.updatedAt).format('DD-MM-yyyy')} / ${moment(product.updatedAt).format('h:mm A')}. See more details <a href='${webURL}/admin/products/all' style="text-decoration: underline; color: #00fe5e">here</a></div> 
                               `,
                                account: ele
                            })

                        })
                    }
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
        const productOrderRevenue = await ProductOrder.sum('amount_paid', { where: { status: 'paid' } });
        const totalCryptoBuys = await BuyCrypto.count();
        const paidCryptoBuys = await BuyCrypto.sum('amount', { where: { status: 'paid' } });
        const completedCryptoBuys = await BuyCrypto.sum('amount', { where: { status: 'completed' } });
        const unpaidCryptoBuys = await BuyCrypto.sum('amount', { where: { status: 'unpaid' } });
        const totalCryptoSells = await SellCrypto.count();
        const completedCryptoSells = await SellCrypto.sum('amount', { where: { status: 'completed' } });
        const pendingCryptoSells = await SellCrypto.sum('amount', { where: { status: 'pending' } });
        const totalGiftcardSells = await GiftCard.count();
        const completedGiftcardSells = await GiftCard.sum('amount', { where: { status: 'completed' } });
        const pendingGiftcardSells = await GiftCard.sum('amount', { where: { status: 'pending' } });
        const totalWithdrawals = await Bank_Withdrawals.count();
        const completedWithdrawals = await Bank_Withdrawals.sum('amount', { where: { status: 'completed' } });
        const pendingWithdrawals = await Bank_Withdrawals.sum('amount', { where: { status: 'pending' } });

        const data = [
            { title: 'Total Users', value: totalUsers.length, color: 'red' },
            { title: 'blog Posts', value: totalBlogs, color: 'pink' },
            { title: 'Total Airdrops', value: totalAirdrops, color: 'green' },
            { title: 'Total Products', value: totalProducts, color: 'orange' },
            { title: ' Product Orders', value: totalProductOrders, color: 'lime', },
            { title: 'Product Order Revenue', value: productOrderRevenue ? productOrderRevenue : 0, color: 'gray', naira: true },
            { title: ' Crypto Buy Orders', value: totalCryptoBuys, color: 'green' },
            { title: 'Paid Buys value', value: paidCryptoBuys || 0, color: 'blue', cur: true },
            { title: 'Unpaid Buys value', value: unpaidCryptoBuys || 0, color: 'amber', cur: true },
            { title: 'Completed Buys Value', value: completedCryptoBuys || 0, color: 'teal', cur: true },
            { title: 'Crypto Sell Orders', value: totalCryptoSells, color: 'red' },
            { title: 'Pending Sells value', value: pendingCryptoSells || 0, color: 'purple', cur: true },
            { title: 'Completed Sells value', value: completedCryptoSells || 0, color: 'orange', cur: true },
            { title: 'Giftcard Sell Orders', value: totalGiftcardSells, color: 'pink' },
            { title: 'Pending Giftcard orders value', value: pendingGiftcardSells || 0, color: 'blue', cur: true },
            { title: 'Completed Giftcard orders value', value: completedGiftcardSells || 0, color: 'lime', cur: true },
            { title: 'withdrawal requests', value: totalWithdrawals, color: 'teal' },
            { title: 'Pending withdrawals value', value: pendingWithdrawals || 0, color: 'gray', naira: true },
            { title: 'Completed withdrawals value', value: completedWithdrawals || 0, color: 'amber', naira: true },
        ];

        return res.json({ status: 200, msg: 'fetch success', data });
    } catch (error) {
        ServerError(res, error);
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const all_users = await User.findAll({
            attributes: [`id`, `first_name`, 'surname', `kyc_verified`, 'email', 'role', 'createdAt'],
            include: [
                {
                    model: Wallet, as: 'user_wallets',
                    attributes: [`balance`]
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        const findAdmins = await User.findAll({ where: { role: 'admin' } })
        const adminIds = findAdmins.map(admin => admin.id)
        const all_user_banks = await Bank.findAll({
            where: { user: { [Op.notIn]: adminIds } },
            attributes: [`id`, `user`, `bank_name`, 'account_number', 'account_name'],
            include: [
                {
                    model: User, as: 'user_bank',
                    attributes: [`first_name`, 'surname', 'role']
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
                      <div>Hello ${kycUser.first_name} ${kycUser.surname}, Your KYC details submitted has been successfully verified after review.</div>
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
        const { title, feature, main_header_title, main_header_content, first_paragraph_title, first_paragraph_content, second_paragraph_title, second_paragraph_content, extras_title, extras_content, conclusion } = req.body;
        const requiredFields = [title, feature, main_header_title, main_header_content, first_paragraph_title, first_paragraph_content, second_paragraph_title, second_paragraph_content, extras_title, extras_content, conclusion
        ]
        if (requiredFields.some(field => !field)) {
            return res.json({ status: 400, msg: 'Incomplete request. Please fill all fields.' });
        }
        const featureArray = ["airdrop", "trading", "personal_finance"]
        if (!featureArray.includes(feature)) return res.json({ status: 404, msg: `Invalid blog feature provided` })

        const gen_id = `01` + otpGenerator.generate(8, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })
        const slugData = slug(title, '-')

        if (!req.files || !req.files.image) return res.json({ status: 404, msg: `Upload blog image` })
        const blogImage = req.files?.image
        const secondImage = req.files?.second_paragraph_image
        const extrasImage = req.files?.extras_image
        const isValidImage = (file) => file && !file.mimetype.startsWith('image/')
        if (isValidImage(blogImage) || (secondImage && isValidImage(secondImage)) || (extrasImage && isValidImage(extrasImage))) return res.json({ status: 400, msg: `File error, upload valid images format(jpg, jpeg, png, svg)` })

        const imageUrls = await UploadBlogImages(blogImage, secondImage, extrasImage, 'blogs', gen_id)

        const blog = await Blog.create({
            user: req.user,
            title,
            feature,
            gen_id,
            slug: slugData,
            main_header_title,
            main_header_content,
            first_paragraph_title,
            first_paragraph_content,
            second_paragraph_title,
            second_paragraph_content,
            extras_title,
            extras_content,
            image: imageUrls.first_image,
            second_paragraph_image: imageUrls.second_image || null,
            extras_image: imageUrls.extras_image || null,
            conclusion
        })

        return res.json({ status: 200, msg: 'Blog created successfully', blog })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

exports.UpdateBlog = async (req, res) => {
    try {
        const { title, blog_id, feature, main_header_title, main_header_content, first_paragraph_title, first_paragraph_content, second_paragraph_title, second_paragraph_content, extras_title, extras_content, conclusion } = req.body;

        if (!blog_id) return res.json({ status: 400, msg: 'Blog ID is required' });
        const blog = await Blog.findOne({ where: { id: blog_id } });
        if (!blog) return res.json({ status: 404, msg: 'Blog not found' });

        let image1 = blog?.image;
        let image2 = blog?.second_paragraph_image;
        let image3 = blog?.extras_image;
        let newFeature;

        // Image handling
        const blogImage = req?.files?.image || null;
        const secondImage = req?.files?.second_paragraph_image || null;
        const extrasImage = req?.files?.extras_image || null;

        // Validate feature if provided
        if (feature) {
            const featureArray = ["airdrop", "trading", "personal_finance"];
            if (!featureArray.includes(feature)) return res.json({ status: 400, msg: 'Invalid blog feature provided' });
            newFeature = feature;
        }

        // Handle image updates or removals
        // Image 1 (main image)
        let updatedUrls = {};
        if (blogImage || secondImage || extrasImage) {
            if ((blogImage && !blogImage.mimetype.startsWith('image/')) || (secondImage && !secondImage.mimetype.startsWith('image/')) || (extrasImage && !extrasImage.mimetype.startsWith('image/'))) return res.json({ status: 400, msg: 'Invalid files found, must be valid images (jpg, jpeg, png, svg)' });

            updatedUrls = await UploadBlogImages(blogImage, secondImage, extrasImage, 'blogs', blog.gen_id);
            console.log(updatedUrls)

            if (blogImage) {
                if (blog.image) await GlobalDeleteImage(blog.image);
                image1 = updatedUrls.first_image;
            }

            // Image 2 (second paragraph)
            if (secondImage) {
                if (blog.second_paragraph_image) await GlobalDeleteImage(blog.second_paragraph_image);
                image2 = updatedUrls.second_image;
            }

            // Image 3 (extras)
            if (extrasImage) {
                if (blog.extras_image) await GlobalDeleteImage(blog.extras_image);
                image3 = updatedUrls.extras_image;
            }
        }

        const updateData = {
            title: title || blog.title,
            feature: newFeature || blog.feature,
            main_header_title: main_header_title || blog.main_header_title,
            main_header_content: main_header_content || blog.main_header_content,
            first_paragraph_title: first_paragraph_title || blog.first_paragraph_title,
            first_paragraph_content: first_paragraph_content || blog.first_paragraph_content,
            second_paragraph_title: second_paragraph_title || blog.second_paragraph_title,
            second_paragraph_content: second_paragraph_content || blog.second_paragraph_content,
            extras_title: extras_title || blog.extras_title,
            extras_content: extras_content || blog.extras_content,
            conclusion: conclusion || blog.conclusion,
            image: image1,
            second_paragraph_image: image2,
            extras_image: image3
        };
        // console.log('Updating blog with:', updateData);
        await blog.update(updateData);

        return res.json({ status: 200, msg: 'Blog updated successfully', blog: updateData });
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.json({ status: 500, msg: 'Server error', error: error.message });
    }
};

exports.DeleteBlog = async (req, res) => {
    try {
        const { blog_id } = req.body;
        if (!blog_id) return res.json({ status: 400, msg: 'Provide a blog id' }); // Changed to 400 for bad request
        const blog = await Blog.findOne({ where: { id: blog_id } });
        if (!blog) return res.json({ status: 404, msg: 'Blog not found' });

        const imagesToDelete = [
            blog.image,
            blog.second_paragraph_image,
            blog.extras_image
        ].filter(url => url);
        await GlobalDeleteMultiImages(imagesToDelete, 'blogs', blog.gen_id)

        const blogComments = await Comment.findAll({ where: { blog: blog.id } })
        if (blogComments) {
            for (const ele of blogComments) {
                await ele.destroy()
            }
        }

        await blog.destroy();

        return res.json({ status: 200, msg: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.json({ status: 500, msg: 'Server error', error: error.message });
    }
};

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

exports.DeleteSingleBlogImages = async (req, res) => {
    try {
        const { id } = req.params
        const { tag } = req.body
        if (!id || !tag) return res.json({ status: 400, msg: 'Incomplete request' })
        const tagArray = ["paragraph", "extras"]
        if (!tagArray.includes(tag)) return res.json({ status: 404, msg: `Invalid tag provided` })
        const findImage = await Blog.findOne({ where: { id } })
        if (!findImage) return res.json({ status: 404, msg: 'Blog images not found' })

        if (tag === 'paragraph') {
            await GlobalDeleteImage(findImage.second_paragraph_image)
            findImage.second_paragraph_image = null
            await findImage.save()
            return res.json({ status: 200, msg: "Second paragraph image successfully deleted", data: findImage })

        }
        if (tag === 'extras') {
            await GlobalDeleteImage(findImage.extras_image)
            findImage.extras_image = null
            await findImage.save()
            return res.json({ status: 200, msg: "Extras image successfully deleted", data: findImage })
        }
    } catch (error) {
        ServerError(res, error)
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
                  <div>Hello ${user.first_name}, Your crypto buy order with the ID of ${findBuy?.order_no} has been marked paid with ${dollarSign}${findBuy.amount?.toLocaleString()}} worth of ${findBuy.crypto_currency} sent to the wallet address ending in ****${findBuy?.wallet_address.slice(-5)}. Kindly verify this transaction by checking your <a href='${webURL}/user/dashboard' style="text-decoration: underline; color: #00fe5e">wallet</a>. Thank you for trading with us.
                `,
                account: user
            })

            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Crypto Buy Order Completed`,
                        content: `You have completed the crypto buy order payment  with the ID of ${findBuy?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    await Mailing({
                        subject: 'Order Completed',
                        eTitle: `Crypto Buy Order `,
                        eBody: `
                     <div>Hello Admin, you have completed the crypto buy order payment  with the ID of ${findBuy?.order_no} today; ${moment(findBuy.updatedAt).format('DD-MM-yyyy')} / ${moment(findBuy.updatedAt).format('h:mm a')}.</div> 
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
                  <div>Hello ${user.first_name}, Your crypto buy order with the ID of ${findBuy?.order_no} has been marked failed with the following reason(s) '${message}'. Kindly get back to your account to and try <a href='${webURL}/user/exchange/buy' style="text-decoration: underline; color: #00fe5e">again</a>. Thank you for trading with us.</div>
                `,
                account: user
            })

            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Crypto Buy Order Failed`,
                        content: `You have failed the crypto buy order payment  with the ID of ${findBuy?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    await Mailing({
                        subject: 'Order Failed',
                        eTitle: `Crypto Buy Order Failed `,
                        eBody: `
                     <div>Hello Admin, you have failed the crypto buy order payment  with the ID of ${findBuy?.order_no} today; ${moment(findBuy.updatedAt).format('DD-MM-yyyy')} / ${moment(findBuy.updatedAt).format('h:mm a')}.</div> 
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
        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
        const findUserWallet = await Wallet.findOne({ where: { user: user.id } })
        if (!findUserWallet) {
            await Wallet.create({ user: user.id })
        }

        if (tag === 'success') {
            if (!amount) return res.json({ status: 400, msg: "Amount is missing" })
            findUserWallet.balance = parseFloat(findUserWallet.balance || 0) + parseFloat(amount)
            findUserWallet.total_deposit = parseFloat(findUserWallet.total_deposit || 0) + parseFloat(amount)
            findSell.status = 'completed'
            await findUserWallet.save()
            await findSell.save()
            await Notification.create({
                user: user.id,
                title: `Balance Credit`,
                content: `Hi dear, Your Crypto Sell order with the ID of ${findSell?.order_no} has been marked paid. Kindly check your  new balance.`,
                url: '/user/dashboard',
            })
            const formattedAmount = parseInt(findSell?.amount).toLocaleString("en-US");

            await Mailing({
                subject: `Crypto Credit Alert`,
                eTitle: `Credit Alert`,
                eBody: `
                  <div>Hello ${user.first_name}, Your Crypto Sell order with the ID of ${findSell?.order_no} has been marked paid with the sum of ${nairaSign}${formattedAmount} credited to your balance. Kindly get back to your account to see your new <a href='${webURL}/user/dashboard' style="text-decoration: underline; color: #00fe5e">balance</a>. Thank you for trading with us.</div>
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

                    await Mailing({
                        subject: 'Order Completed',
                        eTitle: `Crypto Sell Order `,
                        eBody: `
                     <div>Hello Admin, you have completed the crypto sell order payment  with the ID of ${findSell?.order_no} and amount of ${nairaSign}${formattedAmount} today; ${moment(findSell.updatedAt).format('DD-MM-yyyy')} / ${moment(findSell.updatedAt).format('h:mm a')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }
            return res.json({ status: 200, msg: 'Sell order closed and successfully confirmed' })
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
                  <div>Hello ${user.first_name}, Your Crypto Sell order with the ID of ${findSell?.order_no} has been marked failed with the following reason(s) '${message}'. Kindly get back to your account to and try <a href='${webURL}/user/exchange/sell' style="text-decoration: underline; color: #00fe5e">again</a>. Thank you for trading with us.</div>
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

                    await Mailing({
                        subject: 'Order Failed',
                        eTitle: `Crypto Sell Order Failed`,
                        eBody: `
                     <div>Hello Admin, you have marked the crypto sell order payment  with the ID of ${findSell?.order_no} as failed today; ${moment(findSell.updatedAt).format('DD-MM-yyyy')} / ${moment(findSell.updateddAt).format('h:mm a')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }
            return res.json({ status: 200, msg: 'Sell order closed and successfully marked as failed' })
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
        const tagsVal = ['success', 'failed']
        if (!tagsVal.includes(tag)) return res.json({ status: 400, msg: "Invalid Tag found" })
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
            findUserWallet.balance = parseFloat(findUserWallet.balance || 0) + parseFloat(amount)
            findUserWallet.total_deposit = parseFloat(findUserWallet.total_deposit || 0) + parseFloat(amount);
            order.status = 'completed'
            await order.save()
            await findUserWallet.save()
            await Notification.create({
                user: findUser.id,
                title: `Balance Credit`,
                content: `Hi dear, Your Gift-Card order with the ID of ${order?.order_no} has been marked paid. Kindly check your  new balance.`,
                url: '/user/dashboard',
            })
            const formattedAmount = parseInt(amount).toLocaleString("en-US");
            await Mailing({
                subject: `Gift-Card Credit Alert`,
                eTitle: `Credit Alert`,
                eBody: `
                  <div>Hello ${findUser.first_name}, Your Gift-Card order with the ID of ${order?.order_no} has been marked paid with the sum of ${nairaSign}${formattedAmount} credited to your balance. Kindly get back to your account to see your new <a href='${webURL}/user/dashboard' style="text-decoration: underline; color: #00fe5e">balance</a>. Thank you for trading with us!</div>
                `,
                account: findUser
            })
            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Gift-Card Order Paid`,
                        content: `You have completed the giftcard order payment with the ID of ${order?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    await Mailing({
                        subject: 'Order Completed',
                        eTitle: `Gift-Card Order`,
                        eBody: `
                     <div>Hello Admin, you have completed the giftcard order payment with the ID of ${order?.order_no} and the sum of ${nairaSign}${formattedAmount} today; ${moment(order.updatedAt).format('DD-MM-yyyy')} / ${moment(order.updateddAt).format('h:mm a')}.</div> 
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
                  <div>Hello ${findUser.first_name}, Your Gift-Card order with the ID of ${order?.order_no} has been marked failed with the following as reason(s) '${message}'. Thank you for trading with us.</div>
                `,
                account: findUser
            })
            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Gift-Card Order Failed`,
                        content: `You have marked failed to the giftcard order payment with the ID of ${order?.order_no}`,
                        url: '/admin/transactions_history',
                    })

                    await Mailing({
                        subject: 'Gift-Card Order Failed`',
                        eTitle: `Gift-Card Order`,
                        eBody: `
                     <div>Hello Admin, you have marked failed to the giftcard order payment with the ID of ${order?.order_no}  today; ${moment(order.updatedAt).format('DD-MM-yyyy')} / ${moment(order.updateddAt).format('h:mm a')}.</div> 
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

exports.getAdminTransHistory = async (req, res) => {
    try {
        const cryptoBuys = await BuyCrypto.findAll({
            where: { status: [`unpaid`, `paid`, 'completed', 'failed'] },
            include: [
                {
                    model: User, as: 'crypto_buyer',
                    attributes: [`id`, 'image', 'first_name', 'surname', 'email']
                }
            ]
        })
        const cryptoSells = await SellCrypto.findAll({
            where: { status: [`pending`, 'completed', 'failed'] },
            include: [
                {
                    model: User, as: 'crypto_seller',
                    attributes: [`id`, 'image', 'first_name', 'surname', 'email']
                }
            ]
        })
        const giftSells = await GiftCard.findAll({
            where: { status: [`pending`, 'completed', 'failed'] },
            include: [
                {
                    model: User, as: 'gift_seller',
                    attributes: [`id`, 'image', 'first_name', 'surname', 'email']
                }
            ]
        })
        const bankWithdrawals = await Bank_Withdrawals.findAll({
            where: { status: [`pending`, 'completed', 'failed'] },
            include: [
                {
                    model: User, as: 'user_withdrawal',
                    attributes: [`id`, 'image', 'first_name', 'surname', 'email']
                }
            ]
        })
        const allArray = [...cryptoBuys, ...cryptoSells, ...giftSells, ...bankWithdrawals]
        const sortArray = allArray.sort((a, b) => b.createdAt - a.createdAt)
        return res.json({ status: 200, msg: 'fetch success', data: sortArray })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getBankWithdrawals = async (req, res) => {
    try {
        const allWithdrawals = await Bank_Withdrawals.findAll({
            where: { status: 'pending' },

            include: [
                {
                    model: User, as: 'user_withdrawal',
                    attributes: [`id`, 'image', 'first_name', 'surname', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        return res.json({ status: 200, msg: 'fetch success', data: allWithdrawals })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getSingleWithdrawal = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 400, msg: "ID missing from request" })
        const findWithdrawal = await Bank_Withdrawals.findOne({
            where: { id },
            include: [
                {
                    model: User, as: 'user_withdrawal',
                    attributes: [`id`, 'image', 'first_name', 'surname', 'email']
                }
            ],
        })
        if (!findWithdrawal) return res.json({ status: 404, msg: "Withdrawal ID not found" })
        return res.json({ status: 200, msg: 'fetch success', data: findWithdrawal })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.closeAndConfirmWithdrawal = async (req, res) => {
    try {
        const { id } = req.params
        const { tag, reference_id, message } = req.body
        if (!id || !tag) return res.json({ status: 400, msg: 'ID or Tag missing from request' })
        const findWithdrawal = await Bank_Withdrawals.findOne({ where: { id } })
        if (!findWithdrawal) return res.json({ status: 404, msg: 'Withdrawal ID not found' })
        if (findWithdrawal.status === 'completed') return res.json({ status: 400, msg: 'Withdrawal already completed' })
        const user = await User.findOne({ where: { id: findWithdrawal.userid } })
        if (!user) return res.json({ status: 401, msg: 'Account owner not found' })

        const tags = ['success', 'failed']
        if (!tags.includes(tag)) return res.json({ status: 400, msg: "Invalid Tag found" })
        if (tag === 'success') {
            if (!reference_id) return res.json({ status: 400, msg: "Transaction refrence/number missing" })
            findWithdrawal.reference_id = reference_id
            findWithdrawal.status = 'completed'
            await findWithdrawal.save()
            await Notification.create({
                user: user.id,
                title: `Withdrawal request completed`,
                content: `Your withdrawal request with the ID of (${findWithdrawal?.trans_id}) has been marked paid. Kindly check your new balance in your provided bank account.`,
                url: '/user/transactions_history',
            })
            await Mailing({
                subject: `Withdrawal Request Completed`,
                eTitle: `Account credited`,
                eBody: `
                  <div>Hello ${user.first_name}, Your withdrawal request of ${nairaSign}${findWithdrawal?.amount?.toLocaleString()} with the ID (${findWithdrawal?.trans_id}) has been marked paid. Kindly check your new balance in your provided bank account. See more details on this transaction <a href='${webURL}/user/transactions_history' style="text-decoration: underline; color: #00fe5e">here</a>
                `,
                account: user
            })

            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Withdrawal request completed`,
                        content: `You have completed the withdrawal requested payment with the ID of (${findWithdrawal?.trans_id})`,
                        url: '/admin/transactions_history',
                    })

                    await Mailing({
                        subject: `Withdrawal Request Completed`,
                        eTitle: `Withdrawal requested completed`,
                        eBody: `
                     <div>Hello Admin, you have completed the withdrawal request payment with the ID of ${findWithdrawal?.trans_id} today; ${moment(findWithdrawal.updatedAt).format('DD-MM-yyyy')} / ${moment(findWithdrawal.updatedAt).format('h:mm a')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }
            return res.json({ status: 200, msg: 'Withdrawal request closed and confirmed' })
        }
        else {
            if (!message) return res.json({ status: 400, msg: "Failed message is required" })
            findWithdrawal.status = 'failed'
            await findWithdrawal.save()

            await Notification.create({
                user: user.id,
                title: `Withdrawal request failed`,
                content: `Your withdrawal request with the ID of (${findWithdrawal?.trans_id}) has been marked failed. Kindly check your email to learn more.`,
                url: '/user/transactions_history',
            })
            await Mailing({
                subject: `Withdrawal Request Failed`,
                eTitle: `Failed Transaction`,
                eBody: `
                  <div>Hello ${user.first_name}, Your withdrawal request of ${nairaSign}${findWithdrawal?.amount?.toLocaleString()} with the ID (${findWithdrawal?.trans_id}) has been marked failed with the following reason(s) '${message}'. Kindly get back to your account to and try <a href='${webURL}/user/bank_withdrawal' style="text-decoration: underline; color: #00fe5e">again</a>. Thank you for trading with us.</div>
                `,
                account: user
            })

            const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } })
            if (admins) {
                admins.map(async ele => {

                    await Notification.create({
                        user: ele.id,
                        title: `Withdrawal request failed`,
                        content: `You have failed the withdrawal request with the ID of (${findWithdrawal?.trans_id})`,
                        url: '/admin/transactions_history',
                    })

                    await Mailing({
                        subject: 'Withdrawal Request Failed',
                        eTitle: `Withdrawal request failed `,
                        eBody: `
                     <div>Hello Admin, you have failed the withdrawal request payment with the ID of (${findWithdrawal?.trans_id}) today; ${moment(findWithdrawal.updatedAt).format('DD-MM-yyyy')} / ${moment(findWithdrawal.updatedAt).format('h:mm a')}.</div> 
                    `,
                        account: ele,
                    })

                })
            }
            return res.json({ status: 200, msg: 'Withdrawal request closed and marked as failed' })
        }
    } catch (error) {
        ServerError(res, error)
    }
}

exports.CreateTestimonial = async (req, res) => {
    try {
        const { firstname, lastname, title, content } = req.body
        const reqFields = [firstname, title, content]
        if (reqFields.some((field) => !field)) return res.json({ status: 400, msg: "All fields are required" })
        const image = req?.files?.image
        if (!image) return res.json({ status: 400, msg: 'Image is required' })
        if (!image.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
        const gen_id = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false })
        const imageToUpload = [{ field: 'testimonial', file: image }]
        const url = await GlobalImageUploads(imageToUpload, 'testimonials', gen_id)
        // console.log(`from controller`,url)
        const newUser = await Testimonial.create({
            firstname,
            lastname: lastname || null,
            title,
            unique_Id: gen_id,
            content,
            image: url.testimonial,
        })
        return res.json({ status: 201, msg: 'Testimonial created successfully', newUser })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.UpdateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, title, content } = req.body;

        const testimonial = await Testimonial.findByPk(id);
        if (!testimonial) return res.json({ status: 404, msg: 'Testimonial not found' });
        const image = req?.files?.image;

        let url = {}
        if (image) {
            if (!image.mimetype.startsWith('image/')) {
                return res.json({ status: 400, msg: 'Invalid image format (jpg, jpeg, png, svg allowed)' });
            }
            if (testimonial.image) {
                await GlobalDeleteImage(testimonial.image)
            }
            const imageToUpload = [{ field: 'testimonial', file: image }]
            url = await GlobalImageUploads(imageToUpload, 'testimonials', testimonial.unique_Id)
        }

        await testimonial.update({
            firstname: firstname ? firstname : testimonial.firstname,
            lastname: lastname ? lastname : lastname === '' ? null : testimonial.lastname,
            title: title ? title : testimonial.title,
            content: content ? content : testimonial.content,
            image: url.testimonial
        });


        return res.json({ status: 200, msg: 'Testimonial updated successfully', data: testimonial });

    } catch (error) {
        ServerError(res, error);
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.json({ status: 400, msg: "ID missing from request" })
        const testimonial = await Testimonial.findByPk(id);
        if (!testimonial) return res.json({ status: 404, msg: 'Testimonial not found' });
        await GlobalDeleteImage(testimonial.image, 'testimonials', testimonial.unique_Id)
        await testimonial.destroy()
        return res.json({ status: 200, msg: 'Testimonial deleted successfully' });
    } catch (error) {
        ServerError(res, error);
    }
};

exports.getTestimonials = async (req, res) => {
    try {
        const testis = await Testimonial.findAll({
            order: [[`createdAt`, 'DESC']]
        })
        if (!testis) return res.json({ status: 404, msg: 'No testimonial found' })
        return res.json({ status: 200, msg: 'fetch success', data: testis })

    } catch (error) {
        ServerError(res, error)
    }
}

exports.getSingleTestimonial = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 400, msg: 'ID missing from request' })
        const testimonial = await Testimonial.findOne({ where: { id } })
        if (!testimonial) return res.json({ status: 404, msg: "Testimonial ID not found" })
        return res.json({ status: 200, msg: "fetch success", data: testimonial })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.addOrUpdateCryptos = async (req, res) => {
    try {
        const { name, network, wallet_add, symbol, buy_min, buy_max, sell_min, sell_max, gas_fee, tag, id } = req.body;
        const reqFields = [name, wallet_add, network, symbol, buy_min, buy_max, sell_min, sell_max, gas_fee];
        const tags = ['create', 'update', 'delete'];

        if (!tag) return res.json({ status: 400, msg: "Tag not found" });
        if (!tags.includes(tag)) return res.json({ status: 400, msg: "Invalid Tag Found" });
        if (tag === 'create') {
            if (reqFields.some((field) => !field)) return res.json({ status: 400, msg: "All fields are required" });
            if (isNaN(buy_min) || isNaN(buy_max) || isNaN(sell_min) || isNaN(sell_max) || isNaN(gas_fee)) return res.json({ status: 404, msg: `Enter valid numbers` })
            const findName = await CryptoModel.findOne({ where: { name } })
            if (findName) return res.json({ status: 400, msg: 'Crypto wallet already added' })
            const newCrypto = await CryptoModel.create({ name, wallet_add, symbol, network, buy_min, buy_max, sell_min, sell_max, gas_fee });
            return res.json({ status: 201, msg: `${name} wallet created successfully`, data: newCrypto });
        } else if (tag === 'update') {
            if (!id) return res.json({ status: 400, msg: 'Crypto ID missing from request' });
            const findCrypto = await CryptoModel.findOne({ where: { id } });
            if (!findCrypto) return res.json({ status: 404, msg: "Crypto ID not found" });
            const findName = await CryptoModel.findOne({ where: { name } })
            if (findName && findName.name !== findCrypto.name) return res.json({ status: 400, msg: 'Crypto wallet already exist' })
            if (isNaN(buy_min) || isNaN(buy_max) || isNaN(sell_min) || isNaN(sell_max) || isNaN(gas_fee)) return res.json({ status: 404, msg: `Enter valid numbers` })

            const updates = {};
            if (name) updates.name = name;
            if (wallet_add) updates.wallet_add = wallet_add;
            if (network) updates.network = network;
            if (symbol) updates.symbol = symbol;
            if (buy_min) updates.buy_min = buy_min;
            if (buy_max) updates.buy_max = buy_max;
            if (sell_min) updates.sell_min = sell_min;
            if (sell_max) updates.sell_max = sell_max;
            if (gas_fee) updates.gas_fee = gas_fee;

            if (Object.keys(updates).length === 0) return res.json({ status: 400, msg: "No fields provided to update" });

            await CryptoModel.update(updates, { where: { id } });
            return res.json({ status: 200, msg: `${name || findCrypto.name} wallet updated successfully` });
        } else {
            if (!id) return res.json({ status: 400, msg: 'Crypto ID missing from request' });
            const findCrypto = await CryptoModel.findOne({ where: { id } });
            if (!findCrypto) return res.json({ status: 404, msg: "Crypto ID not found" });
            await findCrypto.destroy();
            return res.json({ status: 200, msg: `${findCrypto.name} wallet deleted successfully` });
        }
    } catch (error) {
        ServerError(res, error);
    }
};

exports.getCryptos = async (req, res) => {
    try {
        const cryptos = await CryptoModel.findAll({})
        if (!cryptos) return res.json({ status: 404, msg: 'No cryptos found' })
        return res.json({ status: 200, msg: 'fetch success', data: cryptos });
    } catch (error) {
        ServerError(res, error)
    }
}

exports.AssignRole = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.json({ status: 400, msg: 'ID is required' })
        const admin = await User.findOne({ where: { id: req.user } })
        if (admin.role !== 'super admin') return res.json({ status: 400, msg: 'Unauthorized command' })
        const findUser = await User.findOne({ where: { id } })
        if (!findUser) return res.json({ status: 404, msg: 'User not found' })
        if (findUser.role === 'user') {
            findUser.role = 'admin'
            await findUser.save()
            const allusers = await User.findAll({
                attributes: [`id`, `first_name`, 'surname', `kyc_verified`, 'email', 'role', 'createdAt'],
                include: [
                    {
                        model: Wallet, as: 'user_wallets',
                        attributes: [`balance`]
                    }
                ],
                order: [['createdAt', 'DESC']]
            })
            return res.json({ status: 200, msg: `${findUser.first_name} is now an admin`, data: allusers })
        }
        else if (findUser.role === 'admin') {
            findUser.role = 'user'
            await findUser.save()
            const allusers = await User.findAll({
                attributes: [`id`, `first_name`, 'surname', `kyc_verified`, 'email', 'role', 'createdAt'],
                include: [
                    {
                        model: Wallet, as: 'user_wallets',
                        attributes: [`balance`]
                    }
                ],
                order: [['createdAt', 'DESC']]
            })
            return res.json({ status: 200, msg: `${findUser.first_name} is now a user`, data: allusers })
        } else {
            return res.json({ status: 400, msg: `You can't change a super admin role` })
        }
    } catch (error) {
        return res.json({ status: 400, msg: error.message })
    }
}

exports.getBlogsWithComments = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [
                {
                    model: Comment,
                    as: 'blog_comments',
                    order: [['createdAt', 'DESC']]
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        if (!blogs) return res.json({ status: 404, msg: 'No blog found' })
        const filterBlogs = blogs.filter((blog) => blog.blog_comments.length > 0)
        return res.json({ status: 200, msg: 'fetch success', data: filterBlogs })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.json({ status: 400, msg: 'ID is required' })
        const findComment = await Comment.findOne({ where: { id } })
        if (!findComment) return res.json({ status: 404, msg: 'Comment not found' })
        await findComment.destroy()
        return res.json({ status: 200, msg: 'Comment deleted successfully' })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.createTools = async (req, res) => {
    try {
        const { name, features } = req.body
        if (!name || !features) return res.json({ status: 400, msg: "All fields are required" })
        const featuresArray = Array.isArray(features) ? features : [features]
        const newTool = await Tools.create({ name, features: featuresArray })
        return res.json({ status: 201, msg: 'Tool created successfully', data: newTool })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getAllTools = async (req, res) => {
    try {
        const all_tools = await Tools.findAll({})
        if (!all_tools) return res.json({ status: 404, msg: "No tools found" })
        return res.json({ status: 200, msg: "fetch success", data: all_tools })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.deleteTool = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.json({ status: 400, msg: "ID is missing" })
        const findTool = await Tools.findOne({ where: { id } })
        if (!findTool) return res.json({ status: 404, msg: "Tool ID not found" })
        await findTool.destroy()
        return res.json({ status: 200, msg: "Tool deleted successfully" })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.getSubscribers = async (req, res) => {
    try {
        const allsubs = await Subscriber.findAll({})
        if (!allsubs.length > 0) return res.json({ status: 404, msg: 'No subscriber found' })
        return res.json({ status: 200, msg: "fetch success", data: allsubs })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.AddGiftCard = async (req, res) => {
    try {
        const { name, rate, regrex } = req.body;
        if (!name || !rate || !regrex) {
            return res.json({ status: 400, msg: 'All fields required' });
        }

        const findCard = await Card.findOne({ where: { name } });
        if (findCard) {
            return res.json({ status: 400, msg: "Card already added to list" });
        }

        const Image_ID = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false });
        if (!req?.files) {
            return res.json({ status: 400, msg: 'Upload giftcard image' });
        }

        const image = req?.files?.image;
        if (!image.mimetype.startsWith('image/')) {
            return res.json({ status: 404, msg: `File error, upload valid image format (jpg, jpeg, png, svg)` });
        }

        const imageToUpload = [{ field: 'card_image', file: image }];
        const imageurl = await GlobalImageUploads(imageToUpload, 'giftcards', Image_ID);

        const newRegrex = Number(regrex);
        if (isNaN(newRegrex) || newRegrex <= 0) {
            return res.json({ status: 400, msg: "Invalid regrex value. Must be a positive number." });
        }

        const newcard = await Card.create({
            name,
            rate,
            gen_id: Image_ID,
            image: imageurl.card_image,
            regrex: newRegrex
        });

        return res.json({ status: 200, msg: 'Gift card created successfully', data: newcard });
    } catch (error) {
        ServerError(res, error);
    }
};

exports.getAllGiftCards = async (req, res) => {
    try {
        const allcards = await Card.findAll({
            order: [['createdAt', 'DESC']]
        })
        if (!allcards) return res.json({ status: 404, msg: 'No card found' })
        return res.json({ status: 200, msg: 'fetch success', data: allcards })
    } catch (error) {
        ServerError(res, error)
    }
}

exports.UpdateGiftCard = async (req, res) => {
    try {
        const { id, name, rate, regrex } = req.body;
        if (!id) return res.json({ status: 400, msg: "ID missing" });

        const findCard = await Card.findOne({ where: { id } });
        if (!findCard) return res.json({ status: 400, msg: "Card ID not found" });

        let updatedFields = {};

        if (req.files) {
            if (findCard.image) await GlobalDeleteSingleImage(findCard.image);
            const image = req?.files?.image;
            if (!image.mimetype.startsWith("image/"))
                return res.json({
                    status: 404,
                    msg: "File error, upload a valid image format (jpg, jpeg, png, svg)",
                });

            const imageToUpload = [{ field: "card_image", file: image }];
            const imageurl = await GlobalImageUploads(imageToUpload, "giftcards", findCard.gen_id);

            findCard.image = imageurl.card_image;
            updatedFields.image = findCard.image;
        }

        if (name && name !== findCard.name) {
            findCard.name = name;
            updatedFields.name = name;
        }

        if (rate && rate !== findCard.rate) {
            findCard.rate = rate;
            updatedFields.rate = rate;
        }

        if (regrex) {
            const newRegrex = Number(regrex);
            if (isNaN(newRegrex) || newRegrex <= 0) {
                return res.json({ status: 400, msg: "Invalid regrex value. Must be a positive number." });
            }
            findCard.regrex = newRegrex;
            updatedFields.regrex = newRegrex;
        }

        if (Object.keys(updatedFields).length === 0) {
            return res.json({ status: 200, msg: "No changes detected" });
        }

        await findCard.save();

        return res.json({
            status: 200,
            msg: `${findCard.name} Gift card updated successfully`,
            updatedFields,
        });
    } catch (error) {
        ServerError(res, error);
    }
};

exports.DeleteGiftCard = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.json({ status: 400, msg: "ID missing" });

        const findCard = await Card.findOne({ where: { id } });
        if (!findCard) return res.json({ status: 404, msg: "Card ID not found" });

        if (findCard.image) {
            await GlobalDeleteImage(findCard.image, 'giftcards', findCard.gen_id);
        }
        await findCard.destroy();

        return res.json({
            status: 200,
            msg: `${findCard.name} gift card deleted successfully`,
        });
    } catch (error) {
        ServerError(res, error);
    }
};


exports.ChangeAdminPermissions = async (req, res) => {
    try {
        const { id, role, tag } = req.body;
        if (!id || !role || !tag) {
            return res.status(400).json({ msg: "Incomplete request to assign permission" });
        }

        const roles = ["airdrop", "blog", "exchange", "giftcard", "product"];
        if (!roles.includes(role)) {
            return res.status(400).json({ msg: "Invalid role found" });
        }

        const tags = ["grant", "remove"];
        if (!tags.includes(tag)) {
            return res.status(400).json({ msg: "Invalid action found" });
        }

        // Find admin
        const findAdmin = await User.findOne({ where: { id } });
        if (!findAdmin) {
            return res.status(404).json({ msg: "No Admin with that ID" });
        }
        if (findAdmin.role !== "admin") {
            return res.status(400).json({ msg: "Only admins can be assigned permissions" });
        }

        // Mapping role to permission fields
        const rolePermissions = {
            airdrop: "airdrop_permit",
            blog: "blog_permit",
            exchange: "exchange_permit",
            giftcard: "giftcard_permit",
            product: "product_permit"
        };

        // Update permission
        findAdmin[rolePermissions[role]] = tag === "grant" ? 'true':'false';
        await findAdmin.save();

        return res.json({
            status:200,
            msg: `You have successfully ${tag === "grant" ? "assigned" : "removed"} ${role} permission to ${findAdmin.first_name}`
        });

    } catch (error) {
        ServerError(res, error);
    }
};


