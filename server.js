const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');
});

http.listen(1966, () => {
  console.log('Servidor rodando na porta 1966');
});