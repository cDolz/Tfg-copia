const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');

// Apunta a la ruta de registro
router.post('/sign-up', async (req, res, next) => {
    try {
        // Encriptamos la contraseña
        req.body.password = bcrypt.hashSync(req.body.password, 12);

        // Introducimos los datos en la BBDD con .create
        await User.create(req.body);

        // enviamos respuesta de éxito
        res.json({ message: 'Registro exitoso' });

    } catch (error) {
        next(error);
    }
});

router.post('/check-email', async (req, res, next) => {
    try {
        // Compruebo si el email ya existe en la BBDD
        const { email } = req.body;
        const user = await User.findOne({ email });
        // Si existe devuelvo true, si no false
        if (user) {
            return res.json({ emailExists: true });
        }
        res.json({ emailExists: false });

    } catch (error) {
        // Si hay un error devuelvo un error 500   
        next(error);
    }
});


router.post('/login', async (req, res, next) => {    
    try {
        // Compruebo email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {            
            return res.json({ userExists: false });
        }

        // compruebo contraseña
        const passwordEquals = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordEquals) {            
            return res.json({ userExists: false });
        }

        // devuelvo token en caso de login correcto        
        res.json({ token : createToken(user) });
              
    } catch (error) {
        next(error);
    }

});

// creo el token
function createToken(user) {
    const payload = { userId: user._id };
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = router;