const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  message: String,
  checked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);