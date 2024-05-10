const { model, Schema } = require('mongoose');

const attendanceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    date: { type: Schema.Types.ObjectId, ref: 'EventDate' }    
});

module.exports = model('eventdates', eventDateSchema);