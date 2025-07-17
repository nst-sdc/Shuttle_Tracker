# Shuttle Tracker 🚍

A **real-time bus tracking and pick-up notification system** built for NST students.

---

## ✨ Overview

The Shuttle Tracker web-app lets students see the exact location of their college shuttle, request a pick-up with one tap, and display their class schedule to the driver—reducing confusion and unnecessary calls.

### Impact

| Role           | Benefits                                       |
| -------------- | ---------------------------------------------- |
| Students       | Shorter waiting times, on-time arrivals        |
| Drivers        | Fewer calls, clearer routing                   |
| Faculty        | Fewer class disruptions                        |
| NST Management | More disciplined, data-driven transport system |

---

## 🚀 Tech Stack

- **Frontend:** React 19 + Vite + TailwindCSS
- **Backend:** Node.js + Express.js + Socket.io
- **Authentication:** Google OAuth + JWT
- **Real-time Communication:** Socket.io
- **Maps:** Leaflet + React-Leaflet

---



## 📂 Project Structure

```
Shuttle_Tracker/
├── 📁 backend/                 # Node.js backend server
│   ├── 📁 src/
│   │   ├── 📄 app.js          # Express app entry point
│   │   ├── 📄 socket.js       # Socket.io configuration
│   │   ├── 📁 models/         # Database models
│   │   │   └── 📄 Bus.js      # Bus model schema
│   │   └── 📁 routes/         # API route handlers
│   │       ├── 📄 auth.js     # Authentication routes
│   │       └── 📄 bus.js      # Bus tracking routes
│   ├── 📄 package.json        # Backend dependencies
│   ├── 📄 .env.example       # Environment variables template
│   └── 📄 README.md          # Backend specific documentation
│
├── 📁 frontend/               # React frontend application
│   └────── 📁 src/
│       │   ├── 📄 App.jsx     # Main React component
│       │   ├── 📄 main.jsx    # React entry point
│       │   ├── 📄 socket.js   # Socket.io client setup
│       │   ├── 📁 components/ # Reusable UI components
│       │   │   ├── 📄 BusCard.jsx
│       │   │   ├── 📄 Footer.jsx
│       │   │   ├── 📄 Loader.jsx
│       │   │   ├── 📄 Navbar.jsx
│       │   │   ├── 📄 ThemeProvider.jsx
│       │   │   └── 📄 ThemeToggle.jsx
│       │   ├── 📁 pages/      # Application pages/views
│       │   │   ├── 📄 Driver.jsx      # Driver dashboard
│       │   │   ├── 📄 Home.jsx        # Landing page
│       │   │   ├── 📄 Student.jsx     # Student dashboard
│       │   │   └── 📄 TrackShuttle.jsx # Real-time tracking
│       │   └── 📁 assets/     # Static assets
│       │       └── 📁 logo/
│       │           └── 📄 main-logo.png
│       ├── 📄 index.html      # HTML template
│       ├── 📄 package.json    # Frontend dependencies
│       ├── 📄 vite.config.js  # Vite configuration
│       ├── 📄 tailwind.config.js # TailwindCSS config
│       └── 📄 eslint.config.js   # ESLint configuration
│
├── 📄 README.md              # Project documentation (this file)
├── 📄 HLD.md                 # High-level design document
└── 📄 LICENSE                # MIT license
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can get started:

### Development Workflow

1. **Fork & Clone**
   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Shuttle_Tracker.git
   cd Shuttle_Tracker

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install


# Start development server
npm run dev
or
node scr/app.js

```
##### Create environment file
##### Edit .env with your configuration (MongoDB URI, JWT secret, etc.)
📌 Note: All .env.local files are ignored — never push secret keys or tokens.
> 🔐 Don't forget to configure .env.local (and keep it out of version control).



Backend will run on `http://localhost:5001`
#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend/latest

# Install frontend dependencies
npm install

# Start development server
npm run dev
```
Frontend will run on `http://localhost:5173`

   

2. **Create a Feature Branch**
   ```bash
   # Always create a new branch from main
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

3. **Set Up Development Environment**
   ```bash
   # Install all dependencies
   npm run install-all
   
   # Start both backend and frontend in development mode
   npm run dev
   ```
<!-- ### Environment Variables

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shuttle_tracker
JWT_SECRET=your_jwt_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NODE_ENV=development
```

--- -->

4. **Test Your Changes**
   ```bash
   # Run frontend 
   cd frontend/latest && npm run dev
   
   # Run Backend
   cd backend/src/app.js
   ```
   

   # Test both frontend and backend functionality
   # Make sure real-time features work correctly

5. **Commit & Push**
   ```bash
   # Stage your changes
   git add .
   
   # Commit with a descriptive message
   git commit -m "feature: msg "
   
   # Push to your fork
   git push -u origin feature/your-feature-branch-name
   ```

7. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Provide a clear title and description
   - Reference any related issues (Fix #issue no.)

#### Commit Message Format
```
type(scope): brief description

Detailed explanation (if needed)

Closes #issue-number
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

#### Before Submitting
- [ ] Code follows project style guidelines
- [ ] All tests pass (if any)
- [ ] Documentation updated (if needed)
- [ ] Real-time features tested with Socket.io
- [ ] Mobile responsiveness checked


### Need Help?

- 💬 **Discussion**: Open a GitHub Discussion for questions
- 🐛 **Bug Reports**: Create an issue with detailed steps to reproduce
- 💡 **Feature Requests**: Open an issue with clear use case description
- 📧 **Contact**: Reach out to the maintainers

### First-Time Contributors

Look for issues labeled with:
- `good first issue` - Perfect for newcomers
- `help wanted` - Community help needed
- `documentation` - Improve docs and guides

<!-- ---

## � API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Bus Tracking
- `GET /api/bus/location` - Get current bus locations
- `POST /api/bus/request-pickup` - Request shuttle pickup
- `GET /api/bus/schedule` - Get bus schedule

### Real-time Events (Socket.io)
- `bus-location-update` - Real-time bus location updates
- `pickup-request` - New pickup request notifications
- `driver-status` - Driver availability updates

--- -->


## 📱 Features

### For Students
- 🗺️ **Real-time Bus Tracking** - See exact shuttle location on map
- 📱 **One-tap Pickup Request** - Request shuttle with single button
- ⏰ **ETA Predictions** - Know when shuttle will arrive
<!-- - 📅 **Class Schedule Display** - Show your schedule to driver -->
<!-- - 🔔 **Smart Notifications** - Get notified when shuttle is nearby -->

### For Drivers
- 🗺️ **Optimized Routes** - Get suggested routes for efficiency
- 📊 **Trip Analytics** - Track completed trips and timing

### For Administration
- 📈 **Usage Analytics** - Monitor system usage and patterns
- 🚌 **Fleet Management** - Track all buses and driver assignments
- 📊 **Data Insights** - Generate reports on transport efficiency
- ⚙️ **System Configuration** - Manage routes, schedules, and users

---

## 🔒 Security Features

- **Google OAuth Integration** - Secure authentication with NST email domain
- **JWT Token Management** - Stateless authentication with refresh tokens
- **Rate Limiting** - Prevent API abuse and spam requests
- **CORS Protection** - Secure cross-origin resource sharing
- **Input Validation** - Sanitize and validate all user inputs
- **Environment Variables** - Secure configuration management

---

## �📄 License

This project is released under the MIT License — see `LICENSE` for details.
