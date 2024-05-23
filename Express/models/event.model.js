const { model, Schema } = require('mongoose');

//modelo para la BBDD con los datos que tienen los objetos de mi BBDD

const eventSchema = new Schema({
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },    
    location: { type: String, required: true },
    categorization: { type: String, required: true },
    organizer: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    file: { type: String, required: true },
    popularity: { type: Number, required: true }
});

module.exports = model('events', eventSchema);
