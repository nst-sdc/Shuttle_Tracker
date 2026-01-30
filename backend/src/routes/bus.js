const express = require("express");
const prisma = require("../lib/prisma");
const router = express.Router();

// Get all buses
router.get("/", async (req, res) => {
  try {
    const buses = await prisma.bus.findMany();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new bus
router.post("/", async (req, res) => {
  try {
    const { busNumber, driverName, currentLocation, status } = req.body;
    const newBus = await prisma.bus.create({
      data: { busNumber, driverName, currentLocation, status },
    });
    res.status(201).json(newBus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
