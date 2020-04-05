const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set static folder
//app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatBot';

// Run when client connects
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    console.log('joinRoom fired');
    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to chat!'));

    // Broadcast when a user connect
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chat messages
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    console.log('received message: ' + msg);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
