const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const busRouter = require('./routes/bus');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/buses', busRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Shuttle Tracker API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 