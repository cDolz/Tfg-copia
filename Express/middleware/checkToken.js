const checkToken = (req, res, next) => {
    console.log('middleware');
    next();
}

module.exports = checkToken;