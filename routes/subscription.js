const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');
const router = express.Router();

// Subscribe to Event
router.post('/:eventId/subscribe', authMiddleware, async (req, res) => {
  try {
    const subscription = new Subscription({ user: req.user.id, event: req.params.eventId });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Unsubscribe from Event
router.delete('/:eventId/subscribe', authMiddleware, async (req, res) => {
  try {
    await Subscription.findOneAndDelete({ user: req.user.id, event: req.params.eventId });
    res.json({ message: 'Unsubscribed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Check for Event Updates (Notifications)
router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id, checked: false });
    res.json(notifications);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;