const { model, Schema } = require('mongoose');

//modelo para la BBDD con los datos que tienen los objetos de mi BBDD

const eventSchema = new Schema({
    // title: { type: String, required: true },
    // description: { type: String, required: true },
    // date: { type: String, required: true },
    // location: { type: String, required: true },
    image: { type: String, required: true }
    // categories: { type: String, required: true }
});

module.exports = model('events', eventSchema);