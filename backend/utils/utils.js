exports.webName = 'MonieQuest'
exports.webShort = 'MQ'
require('dotenv').config()
const path = require('path')
const fs = require('fs')
exports.webURL = 'https://moniequest-front.vercel.app/'
const cloudinary = require('cloudinary').v2
const axios = require('axios')
const moment = require('moment-timezone') 

exports.Socials = {
    fb: 'https://www.facebook.com/profile.php?id=61571510583455',
    ig: 'https://www.instagram.com/the_moniequest',
    x: 'https://x.com/TheMonieQuest',
    tg: 'http://t.me/Officialmoniequest'
}

exports.dollarSign = '$'
exports.nairaSign = '₦' 




exports.formatToUserTimezone = (dateInput = new Date(), format = 'hh:mm a') => {
    return moment(dateInput).tz('Africa/Lagos').format(format);
};

  exports.ServerError = (res, error) => {
    if (!res) {
        console.error("Response object is missing.");
        return;
    }
    return res.json({
        status: 500,
        error: error.message,
        stack: 'sorry something went wrong on our end'
    });
}





exports.GlobalUploadImage = async (image, subfolder, folder_Id) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseURI = `http://localhost:${process.env.PORT}`;

    const date = new Date();
    const fileName = `file_${date.getTime()}`;

    if (isProduction) {
        try {
            const folder = `moniequest/${subfolder}/${folder_Id}`;
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
        const filePath = path.join('public', subfolder, folder_Id);
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        const fullPath = path.join(filePath, `${fileName}.jpg`);
        await image.mv(fullPath);
        const url = `${baseURI}/${subfolder}/${fileName}.jpg`;
        return url;
    }
}


exports.GlobalDeleteMultiImages = async (images, subfolder, folderId) => {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!images || !Array.isArray(images) || images.length === 0) return ;

    const imageUrls = images.map(img => typeof img === 'string' ? img : img.url).filter(url => url && typeof url === 'string');

    if (isProduction) {
        try {
            // Delete specified images
            for (const imageUrl of imageUrls) {
                const parts = imageUrl.split('/');
                const uploadIndex = parts.findIndex(part => part === 'upload') + 2;
                const publicId = parts.slice(uploadIndex).join('/').replace(/\.[^/.]+$/, '');
                const destroyResult = await cloudinary.uploader.destroy(publicId);
                if (destroyResult.result === 'ok') {
                    console.log(`Deleted file from Cloudinary: ${publicId}`);
                } else {
                    console.log(`Cloudinary file deletion failed: ${JSON.stringify(destroyResult)}`);
                }
            }

            // Delete all remaining images in the subfolder and the subfolder itself
            if (subfolder && folderId) {
                const folderPath = `moniequest/${subfolder}/${folderId}`; 
                // Delete all resources in the folder
                const resources = await cloudinary.api.resources({
                    resource_type: 'image',
                    type: 'upload',
                    prefix: folderPath,
                    max_results: 10 
                });

                if (resources.resources.length > 0) {
                    const publicIds = resources.resources.map(resource => resource.public_id);
                    await cloudinary.api.delete_resources(publicIds, { resource_type: 'image' });
                    console.log(`Deleted ${publicIds.length} remaining images in ${folderPath}`);
                }

                // delete the subfolder
                await cloudinary.api.delete_folder(folderPath);
                console.log(`Deleted Cloudinary subfolder: ${folderPath}`);
            }
        } catch (error) {
            console.error(`Cloudinary delete error:`, error);
            throw error;
        }
    } else {
       
        for (const imageUrl of imageUrls) {
            const filePath = imageUrl.replace(`http://localhost:${process.env.PORT}/`, 'public/');
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                // console.log(`Deleted locally: ${filePath}`);
            }
        }

        // Delete local subfolder if exists
        if (subfolder && folderId) {
            const folderPath = path.join('public', subfolder, folderId);
            if (fs.existsSync(folderPath)) {
                fs.rmSync(folderPath, { recursive: true, force: true });
                // console.log(`Deleted local subfolder: ${folderPath}`);
            }
        }
    }
};


exports.GlobalDeleteImage = async (imageUrl, subfolder, folderId) => {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!imageUrl || typeof imageUrl !== 'string') return;

    if (isProduction) {
        try {
            // Extract publicId (after 'upload/')
            const parts = imageUrl.split('/');
            const uploadIndex = parts.findIndex(part => part === 'upload') + 2;
            const publicId = parts.slice(uploadIndex).join('/').replace(/\.[^/.]+$/, '');

            // Delete the individual image
            const destroyResult = await cloudinary.uploader.destroy(publicId);
            if (destroyResult.result === 'ok') {
                console.log(`Deleted file from Cloudinary: ${publicId}`);
            } else {
                console.log(`Cloudinary file deletion failed: ${JSON.stringify(destroyResult)}`);
            }

            // Delete the folderId inside the subfolder (but not the subfolder itself)
            if (subfolder && folderId) {
                const folderPath = `moniequest/${subfolder}/${folderId}`;

                // Check if folder is empty
                const resources = await cloudinary.api.resources({
                    resource_type: 'image',
                    type: 'upload',
                    prefix: folderPath,
                    max_results: 1
                });

                if (resources.resources.length === 0) {
                    await cloudinary.api.delete_folder(folderPath);
                    console.log(`Deleted Cloudinary folder: ${folderPath}`);
                } else {
                    console.log(`Folder ${folderPath} not deleted: still contains assets`);
                }
            }
        } catch (error) {
            console.error(`Cloudinary delete error for ${imageUrl}:`, error);
            throw error;
        }
    } else {
        const filePath = imageUrl.replace(`http://localhost:${process.env.PORT}/`, 'public/');
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete local folderId if empty (but keep the subfolder)
        if (subfolder && folderId) {
            const folderPath = path.join('public', subfolder, folderId);
            if (fs.existsSync(folderPath) && fs.readdirSync(folderPath).length === 0) {
                fs.rmSync(folderPath, { recursive: true, force: true });
                console.log(`Deleted local folder: ${folderPath}`);
            }
        }
    }
};


exports.GlobalDeleteSingleImage = async (imageUrl) => {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!imageUrl || typeof imageUrl !== 'string') return;

    if (isProduction) {
        try {
            const parts = imageUrl.split('/');
            const publicIdIndex = parts.findIndex(part => part === 'upload') + 2; // After 'upload/v<version>'
            const publicId = parts.slice(publicIdIndex).join('/').replace(/\.[^/.]+$/, '');

            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result === 'ok') {
                console.log(`Deleted from Cloudinary: ${publicId}`);
            } else {
                console.log(`Cloudinary deletion failed: ${JSON.stringify(result)}`);
            }
        } catch (error) {
            console.error(`Cloudinary delete error for ${imageUrl}:`, error);
            throw error
        }
    } else {
        const filePath = imageUrl.replace(`http://localhost:${process.env.PORT}/`, 'public/');
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

}




exports.GlobalImageUploads = async (images, subfolder, folderId) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseURI = `http://localhost:${process.env.PORT}`;
    const date = new Date();
    const timestamp = date.getTime();

    // Ensure images is an array of { field, file } objects
    const imageEntries = Array.isArray(images) ? images : [];
    const validImages = imageEntries.filter(item =>
        item &&
        typeof item.field === 'string' &&
        item.file &&
        item.file.data &&
        item.file.mimetype
    );

    if (validImages.length === 0) return {};

    const uploadedUrls = {};
    for (const { field, file } of validImages) {
        const fileName = `${subfolder}_${timestamp}_${field}`;
        if (isProduction) {
            try {
                const folder = `moniequest/${subfolder}/${folderId}`;
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: folder, public_id: fileName, resource_type: 'image' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(file.data);
                });
                uploadedUrls[field] = result.secure_url;
                // console.log(`Uploaded to Cloudinary: ${field} - ${result.secure_url}`);
            } catch (error) {
                console.error(`Cloudinary upload error for ${field}:`, error);
                throw error;
            }
        } else {
            const filePath = path.join('public', subfolder, folderId);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            const fullPath = path.join(filePath, `${fileName}.jpg`);
            // console.log(`Saving ${field} locally to:`, fullPath);
            await file.mv(fullPath);
            uploadedUrls[field] = `${baseURI}/${subfolder}/${folderId}/${fileName}.jpg`;
            // console.log(`Local URL for ${field}:`, uploadedUrls[field]);
        }
    }

    return uploadedUrls;
};




exports.UploadBlogImages = async (image1, image2, image3, subfolder, blog_id) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseURI = `http://localhost:${process.env.PORT}`;
    const date = new Date();
    const timestamp = date.getTime();
    const images = [
        { field: 'first_image', file: image1 },
        { field: 'second_image', file: image2 },
        { field: 'extras_image', file: image3 }
    ].filter(item => item.file && item.file.data && item.file.mimetype);

    const uploadedUrls = {};
    for (let i = 0; i < images.length; i++) {
        const { field, file } = images[i];
        const fileName = `blog_${timestamp}_${field}`;

        if (isProduction) {
            try {
                const folder = `moniequest/${subfolder}/${blog_id}`;
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: folder, public_id: fileName, resource_type: 'image' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(file.data);
                });
                uploadedUrls[field] = result.secure_url;
                // console.log(`Uploaded to Cloudinary: ${field} - ${result.secure_url}`);
            } catch (error) {
                console.error(`Cloudinary upload error for ${field}:`, error);
                throw error;
            }
        } else {
            const filePath = path.join('public', subfolder, blog_id);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            const fullPath = path.join(filePath, `${fileName}.jpg`);
            console.log(`Saving ${field} locally to:`, fullPath);
            await file.mv(fullPath);
            uploadedUrls[field] = `${baseURI}/${subfolder}/${blog_id}/${fileName}.jpg`;
            console.log(`Local URL for ${field}:`, uploadedUrls[field]);
        }
    }
    return uploadedUrls;
};

exports.DeleteBlogImages = async (images, blog_Id) => {
    const isProduction = process.env.NODE_ENV === 'production';
    for (const imageUrl of images) {
        if (!imageUrl) continue;

        if (isProduction) {
            try {
                const parts = imageUrl.split('/');
                const publicIdIndex = parts.findIndex(part => part === 'upload') + 2;
                const publicId = parts.slice(publicIdIndex).join('/').replace(/\.[^/.]+$/, '');

                const result = await cloudinary.uploader.destroy(publicId);
                if (result.result === 'ok') {
                    console.log(`Deleted from Cloudinary: ${publicId}`);
                } else {
                    console.log(`Cloudinary deletion failed: ${JSON.stringify(result)}`);
                }
            } catch (error) {
                console.error(`Cloudinary delete error for ${imageUrl}:`, error);
            }
        } else {
            // Local: Convert URL to path and delete
            const filePath = imageUrl.replace(`http://localhost:${process.env.PORT}/`, 'public/');
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Deleted locally: ${filePath}`);
            }
        }
    }

    // Delete local folder (if exists)
    if (!isProduction && blog_Id) {
        const blogFolderPath = `./public/blogs/${blog_Id}`;
        if (fs.existsSync(blogFolderPath)) {
            fs.rmSync(blogFolderPath, { recursive: true, force: true });
            console.log(`Deleted local folder: ${blogFolderPath}`);
        }
    }
};




exports.GoogleImageUpload = async (imageUrl, subfolder, folder_Id) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseURI = `http://localhost:${process.env.PORT}`;

    const date = new Date();
    const fileName = `file_${date.getTime()}`;

    if (isProduction) {
        try {
            const folder = `moniequest/${subfolder}/${folder_Id}`;
            const result = await cloudinary.uploader.upload(imageUrl, {
                folder: folder,
                public_id: fileName,
                resource_type: 'image'
            });

            return result.secure_url; 
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw error;
        }
    } else {
        // Local storage (for development mode)
        try {
            const filePath = path.join("public", subfolder, folder_Id);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }

            // **Download Image from URL**
            const response = await axios({
                url: imageUrl,
                responseType: "arraybuffer", // Get raw image data
            });

            const fullPath = path.join(filePath, `${fileName}.jpg`);
            fs.writeFileSync(fullPath, Buffer.from(response.data)); // Store image locally

            return `${baseURI}/${subfolder}/${folder_Id}/${fileName}.jpg`;
        } catch (error) {
            console.error("Local image storage error:", error);
            throw error;
        }
    }
};





