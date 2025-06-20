<img width="900" alt="image" src="https://github.com/user-attachments/assets/f7b4adb8-10d2-4d69-a310-28a0ac91df8e" />

# 🚍 Driver Status & Location Tracking – Design Proposal

## 🧠 Overview

This feature allows the driver’s current location or status (`At Hostel`, `On Route`, `At Campus`) to be tracked and accessed by students via the app. The data is lightweight and does not require a heavy storage solution initially.

We aim for a **minimal setup using in-memory variables or file-based storage**, with the flexibility to scale later using Redis or MongoDB.

---

## 🎯 Goals

- In-memory storage and update of driver's current **location/status**
- Allow the frontend (students) to **poll** the backend and fetch this status
- Keep the system **lightweight and modular** for now
- Prepare for later integration with **Redis** (for real-time) or **MongoDB**

---

## ✅ Basic Implementation (Temporary In-Memory Approach)

We use `navigator.geolocation.getCurrentPosition()` in the driver app to fetch the driver's GPS coordinates and send them to the backend.

The backend stores the latest location in a **real-time in-memory variable**:


```js
// In-memory storage
let driverLocation = { lat: null, lng: null };

// Update location via POST /api/driver/location
app.post('/api/driver/location', (req, res) => {
  const { lat, lng } = req.body;
  driverLocation = { lat, lng };
  res.json({ message: 'Location updated' });
});

