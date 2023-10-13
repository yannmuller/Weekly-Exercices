var i;
var canvas;

var scaleFactor = 1.2;
var canvasWidth = 510 * scaleFactor;
var canvasHeight = 430 * scaleFactor;

var shapeColor = "#5dbc56";
var marginX = 82 * scaleFactor;
var marginY = 22 * scaleFactor;

function backgroundBody() {
  var body = document.querySelector("body");
  body.style.backgroundColor = "#f4f4f4";
}

function createCanvas() {
  canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.position = "absolute";
  canvas.style.left = "50%";
  canvas.style.top = "50%";
  canvas.style.transform = "translate(-50%, -50%)";

  document.body.appendChild(canvas);
}

function setup() {
  console.log("setup");
  backgroundBody();
  createCanvas();
  i = 0;

  document.addEventListener("mousemove", function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    marginX = (mouseX / canvasWidth) * 60 * scaleFactor;
    marginY = (mouseY / canvasHeight) * 60 * scaleFactor;

    // Call draw function to update the canvas with the new margins
    draw();
  });

  draw(); // Initial draw
}

function draw() {
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  Shape1(ctx, 0, 0);
  Shape2(ctx, canvasWidth / 2, 0);
  Shape3(ctx, canvasWidth / 2, canvasHeight / 2);
  Shape4(ctx, 0, canvasHeight / 2);

  i += 1;
  // No need to requestAnimationFrame here, as mousemove event handles updates
}

function Shape1(ctx, x, y) {
  ctx.fillStyle = shapeColor;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + canvasWidth / 2, y + marginX);
  ctx.lineTo(x + canvasWidth / 2, y + canvasHeight / 2);
  ctx.lineTo(x, y + canvasHeight / 2 - marginY);
  ctx.fill();
}

function Shape2(ctx, x, y) {
  ctx.fillStyle = shapeColor;
  ctx.beginPath();
  ctx.moveTo(x, y + marginX);
  ctx.lineTo(x + canvasWidth / 2, y);
  ctx.lineTo(x + canvasWidth / 2, y + (canvasHeight / 2) - marginY);
  ctx.lineTo(x, y + canvasHeight / 2);
  ctx.fill();
}

function Shape3(ctx, x, y) {
  ctx.fillStyle = shapeColor;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + canvasWidth / 2, canvasHeight / 2 + marginY);
  ctx.lineTo(x + canvasWidth / 2, y + canvasHeight / 2);
  ctx.lineTo(x, y + canvasHeight / 2 - marginX);
  ctx.fill();
}

function Shape4(ctx, x, y) {
  ctx.fillStyle = shapeColor;
  ctx.beginPath();
  ctx.moveTo(x, y + marginY);
  ctx.lineTo(x + canvasWidth / 2, y);
  ctx.lineTo(x + canvasWidth / 2, y + (canvasHeight / 2) - marginX);
  ctx.lineTo(x, y + canvasHeight / 2);
  ctx.fill();
}

window.onload = function() {
  console.log("on est prêt");
  setup();
};

window.addEventListener("resize", function() {
  createCanvas();
});
