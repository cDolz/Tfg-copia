const EventDate = require('../models/eventDate.model');
const Subscription = require('../models/subscription.model');

const cleanup = async () => {
    const now = new Date();
    
    const oldEventDates = await EventDate.find({ date: { $lt: now } });
    
    const oldEventDateIds = oldEventDates.map(eventDate => eventDate._id);
    
    await Subscription.deleteMany({ eventDateId: { $in: oldEventDateIds } });
    
    await EventDate.deleteMany({ _id: { $in: oldEventDateIds } });

    console.log('Cleanup complete.');
};

module.exports = cleanup;