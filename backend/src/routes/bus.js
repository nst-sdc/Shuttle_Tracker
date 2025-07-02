const express = require('express');
const Bus = require('../models/Bus');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// Get all buses (students and drivers)
router.get('/', authenticate, async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new bus (drivers only)
router.post('/', authenticate, authorize('driver'), async (req, res) => {
  try {
    const { busNumber, driverName, currentLocation, status } = req.body;
    const newBus = new Bus({ busNumber, driverName, currentLocation, status });
    await newBus.save();
    res.status(201).json(newBus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;