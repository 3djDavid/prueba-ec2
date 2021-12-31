const jwt = require('jsonwebtoken');
miSecretKey=process.env.TOKEN_SECRET_KEY

const verifyToken = (req, res, next) => {
    
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }

    const token = req.headers.authorization.split(' ')[1]

    if (token === 'null') {
        return res.status(401).send('Unauthorized Request');
    }

    const payload = jwt.verify(token, miSecretKey)

    req.body.email = payload._id;

    next();
}

module.exports= verifyToken
