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
        const user = await User.create(req.body);
        
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {      
        // Compruebo email
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.json( { error: 'El email o la contraseña no son correctos'} );
        }

        // compruebo contraseña
        const passwordEquals = bcrypt.compareSync(req.body.password, user.password);
        
        if (!passwordEquals) {
            return res.json( { error: 'El email o la contraseña no son correctos'} );
        }

        // devuelvo token en caso de login correcto
        res.json({token: createToken(user)});

    } catch (error) {
        res.json({ error: error.message });
    }
});

// creo el token
function createToken(user) {
    const payload = { userId: user._id };    
    return jwt.sign(payload, 'token');
}

module.exports = router;