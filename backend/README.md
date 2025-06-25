# Shuttle Tracker Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shuttle_tracker
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)

## Project Structure

```
backend/
  src/
    controllers/
    models/
    routes/
    utils/
    app.js
  .env
  package.json
  README.md
```
