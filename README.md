# Real-Time Chat Application 💬

A real-time chat application built as a learning project using React, Vite, Node.js, Express, and Socket.IO.

🚧 **Work in Progress:** This project currently implements the basic features of a real-time chat application. I'm building it incrementally to understand frontend development, backend APIs, and real-time communication. More features, improvements, and enhancements will be added as development continues.

## Current Features

- Real-time messaging between multiple users
- React-based chat interface
- Express REST API for sending and retrieving messages
- Socket.IO for live message broadcasting
- User IDs and usernames associated with messages
- Message history stored in backend memory

## Tech Stack

- **Frontend:** React, JavaScript, Vite
- **Backend:** Node.js, Express
- **Real-time communication:** Socket.IO

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd real-time-chat
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Start the backend

Open a second terminal:

```bash
cd server
npm install
node server.js
```

The frontend runs at `http://localhost:5173`, and the backend runs at `http://localhost:3000`.

## Current Limitations

- Messages are stored in backend memory and may be lost when the server restarts.
- The application is under active development, and additional features are planned.

## Future Improvements

This section will be updated as new features are implemented.

## Purpose

The goal of this project is to learn by building, testing, and improving a real-time web application step by step.
