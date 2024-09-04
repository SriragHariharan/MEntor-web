const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

//upload a file to s3 bucket
const uploadFileToS3 = (req) => {
    //image details
    const file = req.files.file;
    const fileType = file.mimetype;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "webinar-" + Date.now().toString(),
        Body: file.data,
        ContentType: fileType,
    };

    const s3Client = new S3Client({
        region: process.env.S3_BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACESS_KEY_ID ,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });

    return new Promise(async(resolve, reject) => {
        try {
            await s3Client.send(new PutObjectCommand(params));
            const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${params.Key}`;
            resolve(imageUrl);
        } catch (err) {
            console.log(err);
            reject('Error uploading file to S3');
        }
    })
}

module.exports = uploadFileToS3;