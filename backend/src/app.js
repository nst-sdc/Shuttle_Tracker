const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');

const busRouter = require('./routes/bus');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/buses', busRouter);
app.use('/api/auth', authRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Shuttle Tracker API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 