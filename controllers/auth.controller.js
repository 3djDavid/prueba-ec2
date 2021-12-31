//AUTH TABLE
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { compararPass } = require('../helpers/handleBcrypt')
const { consultarBD, registrarBD } = require('../helpers/dynamo')

miSecretKey = process.env.TOKEN_SECRET_KEY


exports.signIn = async (req, res) => {

    try {
        emailF = req.body.email
        passwordF = req.body.password

        const datos = { email: emailF, password: passwordF }
        const user = await consultarBD(datos);

        r_email = ((user.Items[0].email))
        r_password = ((user.Items[0].password))

        const checkPassword = await compararPass(passwordF, r_password)
        console.log(checkPassword)
        if (!r_email) {
            res.json({ message: 'el correo no esta registrado' });
        } else if (!checkPassword) {
            res.json({ message: "Password no coincide con bd" });
        } else {
            // si todos los datos coinciden en la bd se devuelve entonces el token
            const token = jwt.sign({ _id: emailF }, miSecretKey);
            res.json({ token });
        }
    } catch (err) {
       console.log(err)
        res.send('error: ', err)
    }
}


exports.signUp = async (req, res) => {
    const datos = req.body;

    try {
        await registrarBD(datos);
        const token = jwt.sign({ _id: req.body.email }, miSecretKey);

        res.status(200).json({ token });

    } catch (err) {

        res.status(500).json({ err: 'Algo va mal en registro' });
    }
}

