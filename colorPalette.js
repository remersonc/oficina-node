paletteContainer = document.getElementById('colorPalette');

colors = ["#000", "#fab109", "#fa09b1", "#b109fa", "#b1fa09", "#09fab1", "#09b1fa", "#f5f5f5"]
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

        if(context.strokeStyle == '#f5f5f5'){
            context.lineWidth = 20;
        }
        else {
            context.lineWidth = 2;   
        }
    }, false);
}