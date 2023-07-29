const sketchContainer = document.getElementById("sketch-container");
var mousePressed = false;
document.addEventListener("mousedown", () => {
  mousePressed = true;
});
document.addEventListener("mouseup", () => {
  mousePressed = false;
});

const gridSizeSlider = document.getElementById("control-size-slider");
gridSizeSlider.addEventListener("mouseup", () => {
  clearSketchGrid();
  let size = gridSizeSlider.value;
  createSketchGrid(size);
  document.getElementById("slider-display").innerHTML = `${size}x${size}`;
});

gridSizeSlider.addEventListener("input", () => {
  let size = gridSizeSlider.value;
  document.getElementById("slider-display").innerHTML = `${size}x${size}`;
});

function clearSketchGrid() {
  let lastSketchPixel = sketchContainer.lastChild;

  while (lastSketchPixel) {
    sketchContainer.removeChild(lastSketchPixel);
    lastSketchPixel = sketchContainer.lastChild;
  }
}

function createSketchGrid(size) {
  let sketchPixel;

  for (let i = 0; i < size ** 2; i++) {
    sketchPixel = document.createElement("div");
    sketchPixel.classList.add("sketch-pixel");
    sketchPixel.setAttribute("id", `${i}`);
    sketchPixel.style.width = `${500 / size}px`;
    sketchPixel.style.height = `${500 / size}px`;

    sketchPixel.addEventListener("mouseover", () => {
      if (mousePressed) {
        document.getElementById(`${i}`).style.backgroundColor = "blue";
      }
    });
    sketchContainer.appendChild(sketchPixel);
  }
}

createSketchGrid(32);
