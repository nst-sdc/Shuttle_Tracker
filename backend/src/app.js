const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const cookieParser = require("cookie-parser");

const busRouter = require("./routes/bus");
const authRouter = require("./routes/auth");
const { setupSocket } = require("./socket");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const allowedOrigins = [
  "https://shuttle-tracker-gamma.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());

// Add security headers to allow Google OAuth postMessage
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// API routes
app.use("/api/buses", busRouter);
app.use("/api/auth", authRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Shuttle Tracker API is running!");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const server = http.createServer(app);
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
