const { AWS } = require('../aws-connect')
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const {encriptarPass} = require('../helpers/handleBcrypt')

const TABLE_NAME = process.env.TABLE_NAME_AUTH

const registrarBD = async (datos) => {

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


const consultarBD = async (datos) => {

    const { email } = datos

    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'email = :email',

        ExpressionAttributeValues: {
            ':email': email
        }
    };

    return await dynamoClient.query(params).promise()
};


module.exports = { consultarBD, registrarBD}