const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static('views'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

let server = http.createServer(app).listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

let io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
  console.log("Socket connected");
  socket.emit('connected', 123);


});