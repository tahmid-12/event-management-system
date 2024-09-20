const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const Event = require('../models/Event');
const router = express.Router();

// Create Event
router.post('/', authMiddleware, roleMiddleware(['organizer']), async (req, res) => {
  const { title, description, date, location } = req.body;
  
  try {
    const newEvent = new Event({ title, description, date, location, createdBy: req.user.id });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get All Events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update Event
router.put('/:id', authMiddleware, roleMiddleware(['organizer']), async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete Event
router.delete('/:id', authMiddleware, roleMiddleware(['organizer']), async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;