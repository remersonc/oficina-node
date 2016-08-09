paletteContainer = document.getElementById('colorPalette');

colors = ["#000", "#fab109", "#fa09b1", "#b109fa", "#b1fa09", "#09fab1", "#09b1fa"]
first = true

palettes = []

for (color of colors) {

    var colorButton = document.createElement('div');

    if (first) {
        colorButton.className = 'colorButton selected';
        first = false
    } else {
        colorButton.className = 'colorButton';
    }

    colorButton.style.backgroundColor = color;

    paletteContainer.appendChild(colorButton);

    palettes.push(colorButton)
}

for (palette of palettes) {
    palette.addEventListener("click", function () {
        for (palette of palettes) {
            palette.className = 'colorButton';
        }
        this.className = 'colorButton selected';
        context.strokeStyle = this.style.backgroundColor;
    }, false);
}