const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");
const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { email, password, name, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "student",
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        busNumber: user.busNumber,
        driverName: user.driverName,
        mobileNumber: user.mobileNumber,
        currentLocation: user.currentLocation,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        busNumber: user.busNumber,
        driverName: user.driverName,
        mobileNumber: user.mobileNumber,
        currentLocation: user.currentLocation,
        picture: user.picture,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/google
router.post("/google", async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ error: "No credential provided" });
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          picture,
          role: req.body.role || "student", // Allow passing role
        },
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      token,
      user: {
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: user.role,
        busNumber: user.busNumber,
        driverName: user.driverName,
        mobileNumber: user.mobileNumber,
        currentLocation: user.currentLocation,
      },
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid Google token" });
  }
});

// GET /api/auth/me (Check current user)
router.get("/me", async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        picture: user.picture,
        busNumber: user.busNumber,
        driverName: user.driverName,
        mobileNumber: user.mobileNumber,
        currentLocation: user.currentLocation,
      },
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// PUT /api/auth/update-profile
router.put("/update-profile", async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { busNumber, driverName, mobileNumber, currentLocation } = req.body;

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        busNumber,
        driverName,
        mobileNumber,
        currentLocation,
      },
    });

    res.json({
      message: "Profile updated successfully",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        busNumber: user.busNumber,
        driverName: user.driverName,
        mobileNumber: user.mobileNumber,
        currentLocation: user.currentLocation,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
