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
  //document.addEventListener("mouseover", mouseIsOver);
  monCercle.rotate();

  draw();
}

// function mousePressed(e) {
//   console.log("mousePressed", e);
//   monCercle.rotate();
// }

let lastMouseX = 0;
let lastMouseY = 0;
let mouseX = 0;
let mouseY = 0;


function updateMouseStatus(e) {
  // Vérifier si la position de la souris a changé depuis la dernière vérification
  if (lastMouseX !== mouseX || lastMouseY !== mouseY) {
      //document.getElementById('mouseStatus').innerText = 'En mouvement';
      if(e.x > width / 2 - 400 && e.x < width / 2 + 400 && e.y > height / 2 - 400 && e.y < height / 2 + 100) {
        console.log("test");
        //monCercle.rotate();
        monCercle.isIn = true;
      }
      else
      {
        monCercle.isIn = false;
      }
  } else {
      //document.getElementById('mouseStatus').innerText = 'Statique';
      monCercle.isIn = false;
  }
  
  // Mettre à jour les dernières positions connues de la souris
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function updateMousePosition(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  updateMouseStatus(e);
}

// Ajouter un écouteur d'événement pour le mouvement de la souris
document.addEventListener('mousemove', updateMousePosition);

setInterval(updateMouseStatus, 10);

function handleMouseMove(e) {
  console.log("test");
}

function changeBackground(color) {
  document.body.style.background = color;
}

window.addEventListener("load",function() { changeBackground(primaryColor) });

window.onload = function () {
  console.log("on est pret");
  setup();
};
