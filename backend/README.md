## Base URL

The default base URL for the API is `http://localhost:5001`.

---

## General Endpoints

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| GET    | `/`           | Root message.                 |
| GET    | `/api/health` | Backend status and timestamp. |

---

## Bus Endpoints

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | `/api/buses` | Fetch all buses.      |
| POST   | `/api/buses` | Add a new bus record. |

---

## Authentication Endpoints

| Method | Endpoint           | Description                               |
| ------ | ------------------ | ----------------------------------------- |
| GET    | `/api/auth/google` | Auth router test route.                   |
| POST   | `/api/auth/google` | Verify Google token and create a session. |

---
