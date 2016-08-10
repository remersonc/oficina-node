var socket = io();

var inputContainer = document.getElementById('inputContainer');
var messageBox = document.getElementById('messageBox');
var message = document.querySelector('.message');

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