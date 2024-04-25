const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {    
    if(!req.headers['authorization']){
        return res.json({ error: 'Not Authorized' });
    }
    try {
        jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    } catch (error) {
        return res.json({ error: 'Not Authorized' });
    }
    next();
    
}

module.exports = { checkToken };