//FOTOS TABLE
const {AWS} =require('../aws-connect');
require('dotenv').config();

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME= process.env.TABLE_NAME_PHOTO

const getPhotos = async () => {
    const params = {
        TableName: TABLE_NAME
    };

    const photos = await dynamoClient.scan(params).promise();
    console.log(photos);
};

const getPhotoById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }

    return await dynamoClient.get(params).promise();
};


const addOrUpdatePhoto = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character
    };

    return await dynamoClient.put(params).promise();
    console.log(characters);
}


const deletePhotoById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,

        },
    };

    return await dynamoClient.delete(params).promise();

}

module.exports ={
    dynamoClient,
    getPhotos,
    getPhotoById,
    addOrUpdatePhoto,
    deletePhotoById
}
