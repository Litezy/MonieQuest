exports.webName = 'MonieQuest'
exports.webShort = 'MQ'
require('dotenv').config()
const path = require('path')
const fs = require('fs')
exports.webURL = 'https://moniequest.vercel.app/'
const cloudinary = require('cloudinary').v2

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





exports.UploadImage = async (image, subfolder) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseURI = `http://localhost:${process.env.PORT}`;

    const date = new Date();
    const fileName = `file_${date.getTime()}`;

    if (isProduction) {
        // Production: Upload to Cloudinary
        try {
            const folder = `moniequest/${subfolder}`; // e.g., moniequest/testimonials
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: folder, public_id: fileName, resource_type: 'image' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(image.data);
            });
            const url = result.secure_url
            console.log(url)
            return url; // Cloudinary URL
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw error;
        }
    } else {
        const filePath = path.join('public', subfolder);
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        const fullPath = path.join(filePath, `${fileName}.jpg`);
        await image.mv(fullPath);
        const url = `${baseURI}/${subfolder}/${fileName}.jpg`; 
        return url;
    }
}



exports.DeleteImage = async (image) => {
    const splitImage = image.split('/')
    const folder = splitImage[splitImage.length - 2]
    const getimage = splitImage[splitImage.length - 1]

    const filePath = `./public/${folder}/${getimage}`
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}


// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const book = await Book.findByPk(id)
//         if (!book) return res.json({ status: 404, message: 'not found' })
//         DeleteImage(book.image)

//         await book.destroy();

//         return res.json({ status: 200, message: 'deleted' })
//     } catch (error) {
//         return res.json({ status: 500, message: Error: ${ error } })
//     }
// })


// router.post('/add', async (req, res) => {
//     try {
//         const { name } = req.body
//         const image = req.files?.image

//         const { fileName, folder } = UploadImage(image, "profiles")

//         const item = await Book.create({
//             name,
//             image: ${ URI } / ${ folder } / ${ fileName }
//         })

// return res.json({ status: 200, msg: item })

//     } catch (error) {
//     return res.json({ status: 500, message: Error: ${ error } })
//     }
// })