const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');

// Apunta a la ruta de registro
router.post('/sign-up', async (req, res) => {
    try {
        // Encriptamos la contraseña
        req.body.password = bcrypt.hashSync(req.body.password, 12);

        // Introducimos los datos en la BBDD con .create
        await User.create(req.body);

        // enviamos respuesta de éxito
        res.json({ message: 'Registro exitoso' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/check-email', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        // If a user with the email exists, return an error
        res.json({ error: 'Email is already in use' });
      } else {
        // If no user with the email exists, return success
        res.json({ success: true });
      }
    } catch (err) {
      // Handle any errors that occur
      console.error(err);
      res.status(500).json({ error: 'An error occurred while checking the email' });
    }
  });


router.post('/login', async (req, res) => {

    try {
        // Compruebo email
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ error: 'El email o la contraseña no son correctos' });
        }

        // compruebo contraseña
        const passwordEquals = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordEquals) {
            return res.status(401).json({ error: 'El email o la contraseña no son correctos' });
        }

        // devuelvo token en caso de login correcto
        res.json({ token: createToken(user) });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// creo el token
function createToken(user) {
    const payload = { userId: user._id };
    return jwt.sign(payload, 'token');
}

module.exports = router;