canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

painting = false

canvas.addEventListener('mousedown', ev_mouseDown, false);
canvas.addEventListener('mousemove', ev_mouseMove, false);
canvas.addEventListener('mouseup', ev_mouseUp, false);

function ev_mouseDown(ev) {
    adjustCoordinates(ev)
    context.beginPath();
    context.moveTo(ev._x, ev._y);
    painting = true;
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