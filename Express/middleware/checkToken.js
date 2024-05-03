const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    console.log('req.headers', req.headers);
    if (!req.headers['authorization']) {
        console.log('Not Authorized');
        return res.json({ error: 'Not Authorized' });
    }
    try {
        jwt.verify(req.headers['authorization'].split(' ')[1],
         process.env.SECRET_KEY);
    } catch (error) {
        console.log('Not Authorized catch');
        return res.json({ error: 'Not Authorized' });
    }
    next();

}

module.exports = { checkToken };