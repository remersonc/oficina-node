var socket = io();

var inputContainer = document.getElementById('inputContainer');
var messageBox = document.getElementById('messageBox');
var message = document.querySelector('.message');
var lock = document.querySelector('.lock');
var label = document.querySelector('.lock label');
var password = document.querySelector('.lock input');
var newRound = document.querySelector('.newRound');

newRound.addEventListener('animationend', function() {
  newRound.className = 'newRound';
})

lock.onsubmit = function(evt) {
  evt.preventDefault();

  socket.emit('unlock', password.value);
}

inputContainer.onsubmit = function(evt) {
  evt.preventDefault();

  socket.emit('mensagem enviada', message.value);

  message.value = ''
}

socket.on('mensagem recebida', function(msg, certa, id) {
  var msg = msg.replace(/</g, '&lt;');
  msg = msg.replace(/>/g, '&gt;');

  var chatMessage;

  if(certa) {
    messageBox.innerHTML = '';
    chatMessage = '<div class="chatMessage">Usuário' + id + ': ' + msg + '<strong class="red"> &lt;-- resposta certa</strong></div><div><strong>--NOVA RODADA--</strong></div>';

    socket.emit('fim da rodada');
  }
  else
    chatMessage = '<div class="chatMessage">Usuário' + id + ': ' + msg + '</div>';

  messageBox.innerHTML += chatMessage;

  messageBox.scrollTop = messageBox.scrollHeight;
});