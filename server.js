const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const { pass } = require('./pass.json');
const words = require('./words.json');

var word = words[Math.floor(Math.random() * words.length)];
var canvasData;

console.log('====');
console.log('>>>Nova palavra escolhida: ' + word);
console.log('====');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  console.log('Um usuário se conectou, id: %s', socket.id);

  io.emit('update canvas', canvasData);

  socket.on('unlock', (password) => {
    if(password === pass)
      socket.emit('unlocked');
  });

  socket.on('send message', (msg) => {
    if(msg.toLowerCase() === word) {
      io.emit('receive message', msg, true);
      word = words[Math.floor(Math.random() * words.length)];

      console.log('====');
      console.log('>>>Nova palavra escolhida: ' + word);
      console.log('====');
    }
    else {
      io.emit('receive message', msg);
    }
  });

  socket.on('update data', (data) => {
    canvasData = data;

    io.emit('update canvas', data);
  });
});

http.listen(1966, () => {
  console.log('Servidor rodando na porta 1966');
});