const {model, Schema} = require('mongoose');

//modelo para la BBDD con los datos que tienen los objetos de mi BBDD

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    birthDate: String
});

module.exports = model('users', userSchema);