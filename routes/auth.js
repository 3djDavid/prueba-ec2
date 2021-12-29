const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const { compararPass } = require('../helpers/handleBcrypt')

const {
    registrar,
    consultar
} = require('../controllers/auth.controller')


router.get('/', (req, res) => res.send('Hello world'))//localhoats:3000/auth en chrome

//Registrar nuevo usuario

router.post('/registro', async (req, res) => {
    const datos = req.body;

    try {
        await registrar(datos);
        const token = jwt.sign({ _id: req.body.email }, 'secretKey');

        res.status(200).json({ token });

    } catch (err) {

        res.status(500).json({ err: 'Algo va mal en registro' });
    }
});


//Logearse si ya esta inscrito con signup (dado de alta)

router.post('/ingreso', async (req, res) => {

    try {
        emailF = req.body.email
        passwordF = req.body.password

        const datos = { email: emailF, password: passwordF }
        const user = await consultar(datos);

         
        r_email = JSON.stringify((user.Items[0].email))
        r_password = JSON.stringify((user.Items[0].password))
        

        if (!r_email) return res.status(401).send('el correo no esta registrado');

        const checkPassword = await compararPass(passwordF, r_password)
        if (checkPassword) return res.status(401).send("Password no coincide con bd")

        // si todos los datos coinciden en la bd se devuelve entonces el token
        const token = jwt.sign({ _id: emailF }, 'secretKey');
        res.status(200).json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Algo va mal en ingreso' });

    }
});





//Creamos 2 rutas para devolver datos:
//esta primera es publica
router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum 1',
            date: "2021-11-25T23:05:47.836Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum 2',
            date: "2021-11-25T23:05:47.836Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum 3',
            date: "2021-11-25T23:05:47.836Z"
        }
    ])
})
//esta segunda es privada y se necesita verificar con una funcion que se puede reutilizar
router.get('/private-tasks', verifyToken, (req, res) => {

    res.json([
        {
            _id: 4,
            name: 'Task one',
            description: 'lorem ipsum 1',
            date: "2021-11-25T23:05:47.836Z"
        },
        {
            _id: 5,
            name: 'Task two',
            description: 'lorem ipsum 2',
            date: "2021-11-25T23:05:47.836Z"
        },
        {
            _id: 6,
            name: 'Task three',
            description: 'lorem ipsum 3',
            date: "2021-11-25T23:05:47.836Z"
        }
    ])
})
//
module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request');
    }

    const payload = jwt.verify(token, 'secretKey')

    req.body.email = payload._id;
    console.log("el req.body.email 2es: ", req.body.email)
    next();
}