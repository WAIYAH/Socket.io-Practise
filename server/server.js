const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-room', ({ room, username }) => {
    socket.join(room);
    socket.to(room).emit('user-joined', `${username} joined the room`);
    socket.username = username; // Store username
    socket.room = room; // Store room
  });

  socket.on('send-message', ({ room, message, username }) => {
    io.to(room).emit('receive-message', { username, message });
  });

  socket.on('disconnect', () => {
    if (socket.room && socket.username) {
      io.to(socket.room).emit('user-left', `${socket.username} left the room`);
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});