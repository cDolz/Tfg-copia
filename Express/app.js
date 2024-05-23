const express = require('express');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const cleanup = require('./scripts/cleanup');

// Cargamos las variables de .env
require('dotenv').config();
// Cargamos la conexión a la BBDD
require('./config/db');

const app = express();

// Configuraciones comunes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Derivamos a las rutas de /api
app.use('/api', require('./routes/api'));

// Ponemos el servidor en escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () =>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
    await cleanup();
});