const express = require('express');
const cors = require('cors');

// Cargamos las variables de .env
require('dotenv').config();
// Cargamos la conexión a la BBDD
require('./config/db');

const app = express();

// Configuraciones comunes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Derivamos a las rutas de /api
app.use('/api', require('./routes/api'));

// Ponemos el servidor en escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
});