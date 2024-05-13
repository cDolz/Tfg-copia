const router = require('express').Router();
const { checkToken } = require('../middleware/checkToken');

// Rutas de mi api
// Ruta para registro y login
router.use('/users', require('./api/users'));
router.use('/events', checkToken, require('./api/events'));
router.use('/subscriptions', checkToken, require('./api/subscriptions'));
module.exports = router;