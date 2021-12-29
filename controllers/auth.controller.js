//AUTH TABLE
const { AWS } = require('../aws-connect');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { encriptarPass } = require('../helpers/handleBcrypt')

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME_AUTH


const registrar = async (datos) => {

    //encriptar pasword
    passwordE = await encriptarPass(datos.password)
    
    const params = {

        TableName: TABLE_NAME,
        Item: {
            "email": datos.email,
            "password": passwordE
        }
    };
    return await dynamoClient.put(params).promise();
};



const consultar = async (datos) => {

    const { email} = datos

    // const params = {
    //     TableName: TABLE_NAME,
    //     Key: {
    //         email,
    //         password
    //     },
    // };

    // return await dynamoClient.get(params).promise();


    const params = {
        TableName : TABLE_NAME,
        KeyConditionExpression: 'email = :email',
       
        ExpressionAttributeValues: {
            ':email':email
        }
        
    };

    return await dynamoClient.query(params).promise()
    //    return console.log(JSON.stringify(result))

};




module.exports = {
    dynamoClient,
    registrar,
    consultar

}