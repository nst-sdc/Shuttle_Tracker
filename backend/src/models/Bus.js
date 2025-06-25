const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  currentLocation: { type: String, required: true },
  status: { type: String, default: 'In Service' },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bus', busSchema); 