// Socket.IO server for real-time shuttle tracking
let ioInstance;
const driverLocations = {}; // { socketId: { latitude, longitude } }

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
      driverLocations[socket.id] = { ...data, id: socket.id };
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      delete driverLocations[socket.id];
    });
  });

  // Broadcast all driver locations every 5 seconds
  setInterval(() => {
    ioInstance.emit("all-driver-locations", Object.values(driverLocations));
  }, 5000);
}

module.exports = { setupSocket, ioInstance };
