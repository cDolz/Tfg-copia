const router = require('express').Router();

const Subscription = require('../../models/subscription.model');
const Event = require('../../models/event.model');
const EventDate = require('../../models/eventDate.model');

router.post('/subscribe', async (req, res, next) => {
    try {
        const { eventId, eventDateId } = req.body;

        await Subscription.create(req.body);

        await Event.findOneAndUpdate(
            { _id: eventId },
            { $inc: { popularity: 1 } },
            { new: true }
        );
        
        await EventDate.findOneAndUpdate(
            { _id: eventDateId },
            { $inc: { participants: 1 } },
            { new: true }
        );

        res.json({ success: 'Subscribed!' });

    } catch (error) {
        next(error);
    }
});

router.delete('/unsubscribe/:id', async (req, res, next) => {
    try {
        const id = decodeURIComponent(req.params.id);
        
        const subscription = await Subscription.findById(id);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found.' });
        }

        const { eventId, eventDateId } = subscription;
        
        await Subscription.findByIdAndDelete(id);
        
        await Event.findOneAndUpdate(
            { _id: eventId },
            { $inc: { popularity: -1 } },
            { new: true }
        );
        
        await EventDate.findOneAndUpdate(
            { _id: eventDateId },
            { $inc: { participants: -1 } },
            { new: true }
        );

        res.json({ success: 'Unsubscribed!' });

    } catch (error) {
        next(error);
    }
});

router.get('/get-subscriptions/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const subscriptions = await Subscription.find({ userId: userId })
            .populate('eventId')
            .populate('eventDateId');
        res.json(subscriptions);
    } catch (error) {
        next(error);
    }
});

module.exports = router;