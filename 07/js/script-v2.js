// largeur totale de l'écran
var width = window.innerWidth;
// hauteur totale de l'écran
var height = window.innerHeight;
// contexte 2D
var context;
// image fixed
var image = null;
var area = null;

// largeur et hauteur par default de l'image ou de la video
var largeur = 1;
var hauteur = 1;
var largeurA = 1;
var hauteurA = 1;
// tableau pour stocker la grille de cercles
var grille = [];
// variable pour stocker les pixels de l'image video
var video = null;
// une variable pour définir si on utilise la webcam ou l'image fixe
var webcam = false;
var frameCount = 0;

// fonction pour créer un canvas
function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  // on active la gestion de la souris
  document.addEventListener("mousedown", mousePressed);
  document.addEventListener("mousemove", mouseMoved);

  let midiConnection = new MidiConnection();
  midiConnection.addEventListener("midi", control);

  // pour l'exemple avec la webcam , on initialise la caméra
  if (webcam) {
    initialiserCamera();
  } else {
    area = new Image();
    // on attend que l'image soit chargée avant de l'afficher
    area.onload = () => {
      //on peut récupèrer la largeur et la hauteur de l'image
      largeurA = area.width;
      hauteurA = area.height;
    };
    // on définit la source de l'image
    area.src = "/image/areas.png";

    // pour l'exemple avec l'image fixe
    image = new Image();
    // on attend que l'image soit chargée avant de l'afficher
    image.onload = () => {
      //on peut récupèrer la largeur et la hauteur de l'image
      largeur = image.width;
      hauteur = image.height;
    };
    // on définit la source de l'image
    image.src = "/image/map.png";


  }
  //on créé une grille de cercles
  // pour une grille de 1000x1000
  for (let j = 0; j < height; j += 10) {
    for (let i = 0; i < width; i += 10) {
      let circle = new Circle(i, j, 3, context);
      // on affecte un angle incrémenteal à chaque cercle
      circle.angle = i * 0.01;
      // on stock le cercle dans le tableau
      grille.push(circle);
    }
  }
  draw();
}

function draw() {
  // frameCount++;
  // on analyse les pixels de l'image
  //on efface tout l'écran en noir
  detectPixels();
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
  // on dessine les cercles

  grille.forEach((circle, i) => {
    circle.draw();
    // le mouvment de chaque cercle est géré dans la fonction draw de la class Circle
  });

  requestAnimationFrame(draw);
}

function detectPixels() {
  // on prépare une variable pour stocker les pixels
  let pixels = null;

  // on dessine l'image dans le contexte
  // attention si on veut l'image static, il faut remplacer video par image
  if (webcam) {
    context.drawImage(video, imageX, imageY);
  } else {
    context.drawImage(image, 0, 0);
  }
  // on récupère les pixels de l'image
  areaPixels = context.getImageData(0, 0, largeur, hauteur);
  pixels = context.getImageData(0, 0, largeur, hauteur);


  // on parcours tous les cercles
  grille.forEach((circle, i) => {
    //récupérer la couleur du pixel par l'index
    let index = (circle.origin.y * largeur + circle.origin.x) * 4;
    // on récupère les valeurs de rouge, vert et bleu
    let r = pixels.data[index];
    let g = pixels.data[index + 1];
    let b = pixels.data[index + 2];
    // on calcule l'intensité de la couleur
    let intensity = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // circle.changeColor(r, g, b);
    // on change le rayon du cercle en fonction de l'intensité (pourcentage de 0 à 1)
    circle.changeRadius(intensity / 300);


  });

  grille.forEach((circle, i) => {
    //récupérer la couleur du pixel par l'index
    let index = (circle.origin.y * largeurA + circle.origin.x) * 4;
    // on récupère les valeurs de rouge, vert et bleu
    let rA = areaPixels.data[index];
    let gA = areaPixels.data[index + 1];
    let bA = areaPixels.data[index + 2];
    // on calcule l'intensité de la couleur
    let intensityA = 0.2126 * rA + 0.7152 * gA + 0.0722 * bA;

    // circle.changeColor(r, g, b);
    // on change le rayon du cercle en fonction de l'intensité (pourcentage de 0 à 1)
    if (circle.isInMe(axeX, axeY)) {

    }

  });

}

function control(e) {

}


function initialiserCamera() {
  video = document.createElement("video");
  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  navigator.getMedia(
    {
      video: { width: largeur, height: hauteur },
      audio: false,
    },
    (stream) => {
      video.srcObject = stream;
      video.play();
    },
    (error) => {
      console.log(error);
    }
  );
}

function mousePressed(e) {
  // on parcours tous les cercles
  grille.forEach((circle, i) => {
    // on vérifie si la souris est dans le cercle
    if (circle.isInMe(e.clientX, e.clientY)) {
      // on change la couleur du cercle
      // circle.changeColor();
      // circle.changeRadius2();
    }
  });




}

function mouseMoved(e) {
  // on parcours tous les cercles
  grille.forEach((circle, i) => {
    // on vérifie si la souris est dans le cercle
    if (circle.isInMe(e.clientX, e.clientY)) {
      // on change la couleur du cercle
      // circle.changeColor();
      // circle.changeRadius2();
    }
  });
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
