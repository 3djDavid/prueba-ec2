// S3 subir archivo fisico
const {AWS} =require('../aws-connect');

const s3 = new AWS.S3();

export const uploadS3= async()=>{
    await s3
    .putObject({
 
    Body: "hello wrold",
    Bucket: process.env.AWS_BUCKET_S3,
    Key: "primerafoto3.txt"
}).promise()
};

// (async()=>{
//     await s3
//     .putObject({
 
//     Body: "hello wrold",
//     Bucket: process.env.AWS_BUCKET_S3,
//     Key: "primerafoto3.txt"
// }).promise()
// })();