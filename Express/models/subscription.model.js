const { model, Schema } = require('mongoose');

const subscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    eventId: { type: Schema.Types.ObjectId, ref: 'events' },
    eventDateId: { type: Schema.Types.ObjectId, ref: 'eventdates' }
});

module.exports = model('subscriptions', subscriptionSchema);