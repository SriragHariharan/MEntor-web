var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, { folder: "MEntor" })
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject(error.message);
        });
    })
}

const deleteImage = (public_id) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(public_id)
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    })
}


module.exports = {
    uploadImage,
    deleteImage,
}