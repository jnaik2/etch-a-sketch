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
  deleteSketchGrid();
  let size = gridSizeSlider.value;
  createSketchGrid(size);
  document.getElementById("slider-display").innerHTML = `${size} x ${size}`;
});
gridSizeSlider.addEventListener("input", () => {
  let size = gridSizeSlider.value;
  document.getElementById("slider-display").innerHTML = `${size} x ${size}`;
});

const clearButtonElement = document.getElementById("clear-button");
clearButtonElement.addEventListener("click", () => {
  drawMode = "black";
  clearSketchGrid();
});

function deleteSketchGrid() {
  let lastSketchPixel = sketchContainer.lastChild;

  while (lastSketchPixel) {
    sketchContainer.removeChild(lastSketchPixel);
    lastSketchPixel = sketchContainer.lastChild;
  }
}
function clearSketchGrid() {
  document.querySelectorAll(".sketch-pixel").forEach((sketchPixel) => {
    sketchPixel.style.backgroundColor = "white";
  });
}
function createSketchGrid(size) {
  let sketchPixel;

  for (let i = 0; i < size ** 2; i++) {
    sketchPixel = document.createElement("div");
    sketchPixel.classList.add("sketch-pixel");
    sketchPixel.setAttribute("id", `${i}`);
    sketchPixel.style.width = `${600 / size}px`;
    sketchPixel.style.height = `${600 / size}px`;

    sketchPixel.addEventListener("mouseover", () => {
      if (mousePressed) {
        document.getElementById(`${i}`).style.backgroundColor =
          determineColor(drawMode);
      }
    });
    sketchContainer.appendChild(sketchPixel);
  }
}

let drawMode = "black";
function determineColor(mode) {
  function generateRandomRGB() {
    return `${Math.floor(Math.random() * 256)}`;
  }
  switch (mode) {
    case "rainbow":
      return `rgb(${generateRandomRGB()},${generateRandomRGB()},${generateRandomRGB()})`;
    case "eraser":
      return "white";
    case "color":
      return document.getElementById("color-display").value;
    default:
      return "black";
  }
}

const rainbowButtonElement = document.getElementById("rainbow-button");
rainbowButtonElement.addEventListener("click", () => {
  drawMode = "rainbow";
});

const eraserButtonElement = document.getElementById("eraser-button");
eraserButtonElement.addEventListener("click", () => {
  drawMode = "eraser";
});

const colorInputElement = document.getElementById("color-display");
["click", "input"].forEach((evt) =>
  colorInputElement.addEventListener(evt, () => {
    drawMode = "color";
  })
);
createSketchGrid(32);
