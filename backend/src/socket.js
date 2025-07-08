// Socket.IO server for real-time shuttle tracking
let ioInstance;

function setupSocket(server) {
  const { Server } = require("socket.io");
  ioInstance = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Listen for driver location updates
    socket.on("send-location", (data) => {
      // Broadcast to all clients (including sender)
      ioInstance.emit("receive-location", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket, ioInstance };
