const Admin = require('../models').users
const User = require('../models').users
const otp = require('otp-generator')


exports.CreateAccount = async (req, res) => {
    try {
        const { first_name, surname, email, phone_number, password, confirm_password } = req.body
        if (!first_name || !surname || !email || !phone_number || !password || !confirm_password) return res.json({ status: 404, msg: `Incomplete request found` })
        if (password.length < 6) return res.json({ status: 404, msg: `Password must be at least 6 characters long` })
        if (confirm_password !== password) return res.json({ status: 404, msg: `Passwords mismatch` })

        const findEmail = await User.findOne({ where: {email } })
        if (findEmail) return res.json({ status: 404, msg: `Email address already exists` })

        const profileImage = req?.files?.image
        const filePath = './public/profiles'
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        let imageName;
        if (profileImage) {
            if (profileImage.size >= 1000000) return res.json({ status: 404, msg: `Image size too large, file must not exceed 1mb` })
            if (!profileImage.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `File error, upload a valid image format (jpg, jpeg, png, svg)` })
            imageName = `${slug(first_name, '-')}.jpg`
            await profileImage.mv(`${filePath}/${imageName}`)
        }

        const user = await User.create({
            image: profileImage ? imageName : null,
            first_name,
            surname,
            email,
            phone_number,
            password,
        })

        if (user.id !== 1) {
            await Wallet.create({
                user: user.id
            })

            await Notification.create({
                user: user.id,
                title: `welcome ${first_name}`,
                content: `Welcome to ${webName} family, get ready for some amazing deals and updates with us.`,
                url: '/user/dashboard',
            })
        } else {
            await Util.create({
            })

            await Notification.create({
                user: user.id,
                title: `welcome admin`,
                content: `Getting started? how about a quick look around.`,
                url: '/admin/dashboard',
            })
        }

        const admins = await User.findAll({ where: { role: 'admin' } })
        if (admins) {
            admins.map(async ele => {

                await Notification.create({
                    user: ele.id,
                    title: `${user.first_name} joins ${webShort}`,
                    content: `Hello Admin, you have a new user as ${user.first_name} joins the platform.`,
                    url: '/admin/all_users',
                })

                Mailing({
                    subject: 'New User Alert',
                    eTitle: `New user joins ${webShort}`,
                    eBody: `
                     <div>Hello admin, you have a new user as ${user.first_name} joins ${webName} today ${moment(user.createdAt).format('DD-MM-yyyy')} / ${moment(user.createdAt).format('h:mm')}.</div> 
                    `,
                    account: ele,
                })

            })
        }

        const otp = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })

        Mailing({
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