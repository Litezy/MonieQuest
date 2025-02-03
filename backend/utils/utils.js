exports.webName = 'MonieQuest'
exports.webShort = 'MQ'
exports.webURL = 'https://moniequest.vercel.app/'

exports.Socials = {
    fb: 'https://',
    ig: 'https://',
    x: 'https://',
    tg: 'https://'
}

exports.ServerError = (res,error)=>{
    res.status(500).json({error: error.message,stack:'`sorry something went wrong on our end'})
}