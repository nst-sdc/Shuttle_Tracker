# Shuttle Tracker

A **real-time bus tracking and pick-up notification system** built for NST students.

---

## Overview

The Shuttle Tracker web-app allows students to:

- See the exact location of their college shuttle
- Request a pick-up with one tap
- Display their class schedule to the driver

This system reduces confusion and unnecessary calls, helping everyone stay on time.

### Impact

| Role               | Benefits                                       |
| ------------------ | ---------------------------------------------- |
| **Students**       | Shorter waiting times, on-time arrivals        |
| **Drivers**        | Fewer calls, clearer routing                   |
| **Faculty**        | Fewer class disruptions                        |
| **NST Management** | More disciplined, data-driven transport system |

---

## Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS
- **Backend:** Node.js, Express.js, Socket.io
- **Authentication:** Google OAuth, JWT
- **Real-time Communication:** Socket.io
- **Maps:** Leaflet, React-Leaflet

---

## Project Structure

```bash
Shuttle_Tracker/
├── backend/                 # Node.js backend server
│   ├── src/
│   │   ├── app.js          # Express app entry point
│   │   ├── socket.js       # Socket.io configuration
│   │   ├── models/         # Database models
│   │   │   └── Bus.js      # Bus model schema
│   │   └── routes/         # API route handlers
│   │       ├── auth.js     # Authentication routes
│   │       └── bus.js      # Bus tracking routes
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
│
├── frontend/               # React frontend application
│   └── src/
│       ├── App.jsx         # Main React component
│       ├── main.jsx        # React entry point
│       ├── socket.js       # Socket.io client setup
│       ├── components/     # Reusable UI components
│       │   ├── BusCard.jsx
│       │   ├── Footer.jsx
│       │   ├── Loader.jsx
│       │   ├── Navbar.jsx
│       │   ├── ThemeProvider.jsx
│       │   └── ThemeToggle.jsx
│       ├── pages/          # Application pages/views
│       │   ├── Driver.jsx
│       │   ├── Home.jsx
│       │   ├── Student.jsx
│       │   └── TrackShuttle.jsx
│       └── assets/logo/main-logo.png
│       ├── index.html      # HTML template
│       ├── package.json    # Frontend dependencies
│       ├── vite.config.js  # Vite configuration
│       ├── tailwind.config.js # TailwindCSS config
│       └── eslint.config.js   # ESLint configuration
│
├── README.md               # Project documentation (this file)
├── HLD.md                  # High-level design document
└── LICENSE                 # MIT license
```

---

## Contributing Guide

We welcome contributions from the community!

### Quick Start

#### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/Shuttle_Tracker.git
cd Shuttle_Tracker
```

#### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
# or
node src/app.js
```

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

> Configure MongoDB URI, Google OAuth, etc.

Backend runs on `http://localhost:5001`

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

#### 4. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

---

### Environment Variables

Backend `.env` example:

```env
MONGODB_URI=mongodb://localhost:27017/shuttle_tracker
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret
```

Frontend `.env` (optional):

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

> **Important**: `.env.local` is git-ignored — **never push secrets**.

---

### Development Checklist

#### Commit Message Format

```
type(scope): short description

Longer description (optional)

Closes #issue-number
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

#### Push & PR

```bash
git add .
git commit -m "feat: add feature xyz"
git push -u origin feature/your-feature-name
```

- Open a **Pull Request** with a clear description.
- Reference issues like: `Fixes #issue-no`.

---

## Features

### For Students

- Real-time Bus Tracking
- One-tap Pickup Request
- ETA Predictions

### For Drivers

- Optimized Routes
- Trip Analytics

### For Administration

- Usage Analytics
- Fleet Management
- Data Insights
- System Configuration

---

## Security Features

- Google OAuth Login (NST domain)
- JWT Token Authentication
- Rate Limiting & API Protection
- CORS Security
- Input Validation & Sanitization
- Environment Variables for Secrets

---

## Community Support

- **Discussions:** Open for Q&A
- **Bug Reports:** Use Issues with reproducible steps
- **Feature Requests:** Open an Issue with details
- **Contact:** Maintainers listed in repo

#### First-time contributors?

- Look for labels: `good first issue`, `help wanted`, `documentation`
- If you're unsure about an issue, **comment and ask for clarification** maintainers are happy to help
- Join the discussions and ask questions in **Issues** or **Discussions**

---

## License

Released under [MIT License](LICENSE).

---

Happy Contributing
