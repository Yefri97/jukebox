// Get dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Point static path to root
app.use(express.static(path.join(__dirname, '/')));

// Seeker
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/seeker.html'));
});

// Player
app.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/player.html'));
});

// Socket IO
io.on('connection', function(socket) {
  console.log("Connected");
  socket.on('send', function(data) {
    io.emit('add', data);
  });
});

// Listen port
http.listen(3000, function() {
  console.log('App running on 3000');
});
