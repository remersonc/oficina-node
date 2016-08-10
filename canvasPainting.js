canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

painting = false
unlocked = false

canvas.addEventListener('mousedown', ev_mouseDown, false);
canvas.addEventListener('mousemove', ev_mouseMove, false);
canvas.addEventListener('mouseup', ev_mouseUp, false);

socket.on('atualizar canvas', function(data) {
    var img = new Image();

    img.onload = function() {
        context.drawImage(img, 0, 0);
    }

    img.src = data;
});

socket.on('nova rodada', function() {
    newRound.className = 'newRound active';

    context.clearRect(0, 0, canvas.width, canvas.height);
});

socket.on('unlocked', function() {
    if(!unlocked) {
        unlocked = true;
        label.textContent = 'UNLOCKED';
        password.blur();
    }
});

function ev_mouseDown(ev) {
    if(unlocked) {
        adjustCoordinates(ev)
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        painting = true;
    }
};

function ev_mouseMove(ev) {
    adjustCoordinates(ev)

    if (painting) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
    }
}

function ev_mouseUp(ev) {
    adjustCoordinates(ev)

    if (painting) {
        ev_mouseMove(ev);
        painting = false;
    }

    var data = canvas.toDataURL();

    socket.emit('atualizar dados', data);
}

function adjustCoordinates(ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
        ev._x = ev.layerX;
        ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        ev._x = ev.offsetX;
        ev._y = ev.offsetY;
    }
}