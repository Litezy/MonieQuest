exports.webName = 'MonieQuest'
exports.webShort = 'MQ'
exports.webURL = 'https://moniequest.vercel.app/'

exports.Socials = {
    fb: 'https://www.facebook.com/profile.php?id=61571510583455',
    ig: 'https://www.instagram.com/the_moniequest',
    x: 'https://x.com/TheMonieQuest',
    tg: 'http://t.me/Officialmoniequest'
}

exports.dollarSign = '$'
exports.nairaSign = '₦'

exports.ServerError = (res, error) => {
    res.status(500).json({ error: error.message, stack: '`sorry something went wrong on our end' })
}