var i;
var canvas; // Declare a global variable for the canvas element

function createCanvas() {
  canvas = document.createElement("canvas");
  canvas.width = window.innerWidth; // Set canvas width to window width
  canvas.height = window.innerHeight; // Set canvas height to window height
  document.body.appendChild(canvas);
}

function setup() {
  console.log("setup");
  createCanvas();
  i = 0;

  document.addEventListener("click", mousePressed);

  draw();
}

function draw() {
  // Get the canvas context
  var ctx = canvas.getContext("2d");

  // Fill the entire canvas with a black color
  ctx.fillStyle = "#E7E7E7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var canvasWidth = 510;
  var canvasHeight = 430;
  
  // Calculate the center of the canvas
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;

  // Calculate the top-left corner coordinates of the centered rectangle
  var canvasX = centerX - canvasWidth / 2;
  var canvasY = centerY - canvasHeight / 2;

  ctx.fillStyle = "#000";
  ctx.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);

  ctx.fillStyle = "#5dbc56";
  ctx.beginPath();
  ctx.moveTo(canvasX, canvasY);
  ctx.lineTo(0, 0);
  ctx.lineTo(100, 25);
  ctx.fill();

  // Perform your other drawing operations here

  i += 1;
  requestAnimationFrame(draw);
}

function mousePressed(e) {
  console.log("mousePressed");
}

window.onload = function () {
  console.log("on est prêt");
  setup();
};

// Resize the canvas if the window is resized
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});