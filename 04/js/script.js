var a1;
var a2;
var centerX;
var centerY;
var width = window.innerWidth;
var height = window.innerHeight;
var context;

var monCercle;

var primaryColor = "#f2ead5";
var secondaryColor = "#1c1c1c";

function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
}

function draw() {
  // console.log("draw");
  context.clearRect(0, 0, width, height);

  monCercle.draw();
  requestAnimationFrame(draw);
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  monCercle = new Circle(width / 2, height / 2, 100, context);
  document.addEventListener("mouseover", mouseIsOver);
  draw();
}

// function mousePressed(e) {
//   console.log("mousePressed", e);
//   monCercle.rotate();
// }

function mouseIsOver(e) {
  console.log("mouseIsOver", e);
}

function changeBackground(color) {
  document.body.style.background = color;
}

window.addEventListener("load",function() { changeBackground(primaryColor) });

window.onload = function () {
  console.log("on est pret");
  setup();
};
