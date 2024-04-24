const router = require('express').Router();

// Rutas de mi api
// Ruta para registro y login
router.use('/users', require('./api/users'));
router.use('/events', require('./api/events'));

module.exports = router;