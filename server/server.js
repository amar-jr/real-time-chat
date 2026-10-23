const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const messages = [];

const app = express();
const server = createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://real-time-chat-ten-delta.vercel.app",
];

const previewPattern =
  /^https:\/\/real-time-chat-[a-z0-9]+-personal-project-5e38\.vercel\.app$/;

function checkOrigin(origin, callback) {
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin) || previewPattern.test(origin)) {
    return callback(null, true);
  }
  return callback(null, false);
}

const io = new Server(server, {
  cors: {
    origin: checkOrigin,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: checkOrigin }));
app.use(express.json());

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// get
app.get("/", (req, res) => {
  res.send("Chat backend is running");
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello From Express"
  });
});

// post
app.get("/api/messages", (req, res) => {
  res.json(messages);
});


app.post("/api/messages", (req, res) => {
  const { text, userId, username} = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({
      success: false,
      message: "Message text is required"
    });
  }

  const newMessage = {
    id: Date.now(),
    userId:userId,
    username:username,
    text: text.trim(),
   //  sender: text.length > 5 ? "Demo" : "You",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  };

  messages.push(newMessage);

  // Broadcast the message to all connected users
  io.emit("newMessage", newMessage);

  res.status(201).json({
    success: true,
    message: newMessage
  });
});

// practice server in localmachine
// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });


// Start Express and Socket.IO on the same server
// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
