import { io } from 'socket.io-client';

// Use Vite's environment variable system
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true,
});

export default socket;
