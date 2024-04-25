const router = require('express').Router();
const { checkToken } = require('../middleware/checkToken');

// Rutas de mi api
// Ruta para registro y login
router.use('/users', require('./api/users'));
router.use('/events', checkToken, require('./api/events'));

module.exports = router;