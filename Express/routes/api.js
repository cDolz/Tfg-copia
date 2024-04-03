const router = require('express').Router();

// Rutas de mi api
// Ruta para registro y login
router.use('/users', require('./api/users'));

module.exports = router;