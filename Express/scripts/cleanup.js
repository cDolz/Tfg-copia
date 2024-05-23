const mongoose = require('mongoose');
const EventDate = require('./models/eventdate'); // adjust the path according to your project structure

const cleanup = async () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // set time to 00:00:00.000

    // Fetch all documents
    const eventDates = await EventDate.find();

    // Filter out the documents that have a past date
    const pastEventDates = eventDates.filter(eventDate => {
        const [day, month, year] = eventDate.date.split('-').map(Number);
        const dateToCompare = new Date(year, month - 1, day); // month is 0-indexed
        return dateToCompare < now;
    });

    // Delete the documents that have a past date
    const deletePromises = pastEventDates.map(eventDate => EventDate.deleteOne({ _id: eventDate._id }));
    await Promise.all(deletePromises);

    console.log('Cleanup complete.');
};

module.exports = cleanup;