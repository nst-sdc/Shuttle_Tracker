const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// GET /api/auth/google (for testing)
router.get("/google", (req, res) => {
  res.json({ message: "GET route works, but use POST for authentication" });
});

// POST /api/auth/google
router.post("/google", async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ error: "No credential provided" });
  }
  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // You can store more info if needed
    const { email, name, picture, sub } = payload;

    // Create your own JWT
    const token = jwt.sign({ email, name, picture, sub }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Optionally set as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send token and user info in response
    res.json({ token, user: { email, name, picture } });
  } catch (err) {
    res.status(401).json({ error: "Invalid Google token" });
  }
});

module.exports = router;
