const mongoose = require('mongoose');

// Conexión a la BBDD
mongoose.connect(process.env.MONGO_URI);