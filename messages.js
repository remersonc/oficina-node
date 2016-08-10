var socket = io();

var inputContainer = document.getElementById('inputContainer');
var messageBox = document.getElementById('messageBox');
var message = document.querySelector('.message');
var lock = document.querySelector('.lock');
var label = document.querySelector('.lock label');
var password = document.querySelector('.lock input');

lock.onsubmit = function(evt) {
  evt.preventDefault();

  socket.emit('unlock', password.value);
}

inputContainer.onsubmit = function(evt) {
  evt.preventDefault();

  socket.emit('send message', message.value);

  message.value = ''
}

socket.on('receive message', function(msg, certa) {
  var msg = msg.replace(/</g, '&lt;');
  msg = msg.replace(/>/g, '&gt;');

  var chatMessage;

  if(certa)
    chatMessage = '<div class="chatMessage">' + msg + '<strong class="red"> &lt;-- resposta certa</strong></div>';
  else
    chatMessage = '<div class="chatMessage">' + msg + '</div>';

  messageBox.innerHTML += chatMessage;

  messageBox.scrollTop = messageBox.scrollHeight;
});