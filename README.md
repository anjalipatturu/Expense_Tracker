# 💰 Expense Tracker

A full-stack **Expense Tracker application** built with the **MERN stack** and fully containerized using **Docker and Docker Compose**.

The application allows users to manage their income and expenses, organize transactions by category, and view their overall financial summary.

---

## ✨ Features

- ➕ Add income
- ➖ Add expenses
- 📋 View all transactions
- ✏️ Edit transactions
- 🗑️ Delete transactions
- 🏷️ Categorize transactions
- 📅 Store transaction dates
- 💰 Calculate total income
- 💸 Calculate total expenses
- 💵 Calculate current balance
- 🐳 Dockerized frontend, backend, and database
- 💾 Persistent MongoDB data using Docker volumes
- 🔗 Run the entire application with Docker Compose

---

## 🛠️ Tech Stack

### Frontend

- **React.js**
- **Vite**
- **JavaScript**
- **CSS**
- **Fetch API**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **REST API**
- **CORS**
- **dotenv**

### DevOps & Containerization

- **Docker**
- **Docker Compose**
- **NGINX**
- **Docker Volumes**

---

## 🏗️ Application Architecture

```text
                         🌐 Browser
                              │
                              ▼
                  ┌─────────────────────┐
                  │   React Frontend    │
                  │      + NGINX        │
                  │      Port: 5173     │
                  └──────────┬──────────┘
                             │
                             │ HTTP Requests
                             ▼
                  ┌─────────────────────┐
                  │   Node.js +         │
                  │   Express Backend   │
                  │      Port: 5000     │
                  └──────────┬──────────┘
                             │
                             │ Mongoose
                             ▼
                  ┌─────────────────────┐
                  │      MongoDB        │
                  │      Port: 27017    │
                  └─────────────────────┘
```

The application is divided into three Docker services:

1. **Frontend** – React application served using NGINX
2. **Backend** – Node.js and Express REST API
3. **Database** – MongoDB for storing transactions

---

## 📂 Project Structure

```text
Expense_Tracker/
│
├── backend/
│   ├── controllers/
│   │   └── transactionController.js
│   │
│   ├── models/
│   │   └── Transaction.js
│   │
│   ├── routes/
│   │   └── transactionRoutes.js
│   │
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── compose.yaml
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git

Check your installations:

```bash
node --version
npm --version
docker --version
docker compose version
git --version
```

---

# 🐳 Run the Project Using Docker

Docker Compose is the recommended way to run the complete application because it starts the frontend, backend, and MongoDB services together.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/Expense_Tracker.git
```

### 2. Navigate to the project

```bash
cd Expense_Tracker
```

### 3. Build and start the containers

```bash
docker compose up --build -d
```

### 4. Check the containers

```bash
docker compose ps
```

You should see three services:

```text
expense-frontend
expense-backend
expense-mongodb
```

### 5. Open the application

Open your browser:

```text
http://localhost:5173
```

---

# 🌐 Application URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| MongoDB | mongodb://localhost:27017 |

---

# 🔌 REST API

The backend provides REST APIs for managing transactions.

### Base URL

```text
http://localhost:5000/api/transactions
```

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Get all transactions |
| `GET` | `/summary` | Get financial summary |
| `POST` | `/` | Add a transaction |
| `PUT` | `/:id` | Update a transaction |
| `DELETE` | `/:id` | Delete a transaction |

---

## 📌 Add Transaction

### Request

```http
POST /api/transactions
```

### Example

```json
{
  "title": "Monthly Salary",
  "amount": 50000,
  "type": "income",
  "category": "Salary",
  "date": "2026-09-20"
}
```

---

## 📌 Update Transaction

```http
PUT /api/transactions/:id
```

The transaction ID is provided in the URL.

---

## 📌 Delete Transaction

```http
DELETE /api/transactions/:id
```

---

## 📌 Get Transactions

```http
GET /api/transactions
```

Returns all stored transactions.

---

## 📌 Get Summary

```http
GET /api/transactions/summary
```

Returns:

- Total income
- Total expenses
- Current balance

---

# 🗄️ Database

The application uses **MongoDB** to store transaction data.

Each transaction contains:

```text
Transaction
│
├── title
├── amount
├── type
├── category
├── date
├── createdAt
└── updatedAt
```

The `type` field can contain:

```text
income
expense
```

MongoDB data is stored in a Docker volume named:

```text
mongo-data
```

This allows the database data to persist when containers are stopped and restarted.

---

# 🔐 Environment Variables

For local development, the backend uses a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense_tracker
```

⚠️ **Never commit your `.env` file to GitHub.**

The project includes `.env` in `.gitignore`.

When running with Docker Compose, the backend connects to MongoDB using the Docker service name:

```text
mongodb://mongodb:27017/expense_tracker
```

---

# 💻 Running Without Docker

You can also run the frontend and backend separately during development.

## Backend

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:5000
```

---

## Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# 🛑 Stop the Docker Application

To stop the application:

```bash
docker compose down
```

To start it again:

```bash
docker compose up -d
```

To rebuild after making code changes:

```bash
docker compose up --build -d
```

---

# 📜 Docker Logs

View logs from all services:

```bash
docker compose logs
```

Backend logs:

```bash
docker compose logs backend
```

Frontend logs:

```bash
docker compose logs frontend
```

MongoDB logs:

```bash
docker compose logs mongodb
```

---

# 🧠 What I Learned

This project helped me understand and practice:

- MERN stack development
- React application development
- REST API development
- CRUD operations
- MongoDB database management
- Mongoose
- Frontend and backend communication
- Environment variables
- Docker images
- Docker containers
- Dockerfiles
- Docker Compose
- Container networking
- Docker volumes
- NGINX
- Multi-container application architecture

---

# 🔮 Future Improvements

Planned improvements include:

- 🔐 User
