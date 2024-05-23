const { model, Schema } = require('mongoose');

//modelo para la BBDD con los datos que tienen los objetos de mi BBDD

const eventDateSchema = new Schema({
    date: { type: Date, required: true },
    participants: { type: Number, required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event' }
});

module.exports = model('eventdates', eventDateSchema);