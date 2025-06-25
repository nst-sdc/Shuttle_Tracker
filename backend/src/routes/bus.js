const express = require('express');
const Bus = require('../models/Bus');
const router = express.Router();

// Get all buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new bus
router.post('/', async (req, res) => {
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