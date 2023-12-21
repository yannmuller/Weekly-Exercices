// largeur totale de l'écran
var width = window.innerWidth;
// hauteur totale de l'écran
var height = window.innerHeight;
// contexte 2D
var context;
// image fixed
var image = null;
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

var axeX = 0;
var axeY = 0;
var area;
var areaData;
var pixels;
var data;
var areaPixels;
const audioArray = [];
const audioState = Array(audioArray.length).fill(false);
// const played = false;

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

  // let beat = new Audio("./assets/sounds/jingle-bells.mp3");
  loadAudio("./assets/sounds/northAmerica.mp3");
  loadAudio("./assets/sounds/southAmerica.mp3");
  loadAudio("./assets/sounds/europe.mp3");
  loadAudio("./assets/sounds/africa.mp3");
  loadAudio("./assets/sounds/asia.mp3");
  loadAudio("./assets/sounds/oceanie.mp3");

  if (webcam) {
    initialiserCamera();
  } else {
    area = new Image();
    // on attend que l'image soit chargée avant de l'afficher
    area.onload = () => {
      //on peut récupèrer la largeur et la hauteur de l'image
      largeurA = area.width;
      hauteurA = area.height;
      context.drawImage(area, 0, 0, largeurA, hauteurA);
      // on récupère les pixels de l'image
      areaPixels = context.getImageData(0, 0, largeurA, hauteurA);
      areaData = areaPixels.data;
    };
    // on définit la source de l'image
    area.src = "/image/areas.jpg";
    // pour l'exemple avec l'image fixe
    image = new Image();
    // on attend que l'image soit chargée avant de l'afficher
    image.onload = () => {
      //on peut récupèrer la largeur et la hauteur de l'image
      largeur = image.width;
      hauteur = image.height;
      context.drawImage(image, 0, 0, largeur, hauteur);
      // on récupère les pixels de l'image
      pixels = context.getImageData(0, 0, largeur, hauteur);
      data = pixels.data;
      draw();
    };
    // on définit la source de l'image
    image.src = "/image/map.jpg";
  }
  //on créé une grille de cercles
  // pour une grille de 1000x1000
  for (let j = 0; j < height; j += 10) {
    for (let i = 0; i < width; i += 20) {
      let circle = new Circle(i, j, 2, context);
      // on affecte un angle incrémenteal à chaque cercle
      circle.angle = i * 0.05;
      // on stock le cercle dans le tableau
      grille.push(circle);
    }
  }
}

function draw() {
  // frameCount++;
  // on analyse les pixels de l'image
  //on efface tout l'écran en noir

  // detectPixels();

  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
  // on dessine les cercles

  context.save();
  context.fillStyle = "magenta";
  context.rect(axeX, 0, 5, height);
  context.rect(0, axeY, width, 5);
  context.fill();
  context.restore();

  grille.forEach((circle, i) => {
    const couleurs = detectPixels(circle.x, circle.y, data);
    const r = couleurs[0];
    const g = couleurs[1];
    const b = couleurs[2];
    let intensity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    circle.changeRadius(intensity / 255);
    circle.draw();
    // le mouvment de chaque cercle est géré dans la fonction draw de la class Circle
  });

  requestAnimationFrame(draw);
}

function detectPixels(x, y, data) {
  let index = (y * largeur + x) * 4;
  let r = data[index];
  let g = data[index + 1];
  let b = data[index + 2];
  return [r, g, b];
}

function control(e) {
  console.log(e);
  if (e[3] === 1) {
    // console.log("note on [1]");
    axeX = map(e[4], 0, 127, 0, width);
    // console.log(axeX);
  }

  if (e[3] === 2) {
    axeY = map(e[4], 127, 0, 0, height);
    // console.log("note on [2]");
  }

  const couleurs = detectPixels(Math.round(axeX), Math.round(axeY), areaData);
  // console.log(couleurs);

  if (couleurs[0] === 194 && couleurs[1] === 39 && couleurs[2] === 45) {
    if (e[3] === 40 && e[4] === 127) {
      console.log("Amérique du Nord");
      playSound(0);

      // beat.play();

      // var ifrm = document.createElement("iframe");
      // ifrm.setAttribute(
      //   "src",
      //   "https://i.ytimg.com/vi/1F1MYfL66wk/maxresdefault.jpg"
      // );
      // ifrm.style.width = "640px";
      // ifrm.style.height = "480px";
      // ifrm.style.top = "800px";
      // ifrm.style.left = "800px";
      // document.body.appendChild(ifrm);
      // console.log(ifrm);
    }
  }

  if (couleurs[0] === 58 && couleurs[1] === 181 && couleurs[2] === 74) {
    if (e[3] === 40 && e[4] === 127) {
      console.log("Amérique du Sud");
      playSound(1);
      pauseSound(0);
      pauseSound(2);
      pauseSound(3);
      pauseSound(4);
      pauseSound(5);
      console.log(audioArray[1]);
    }
  }
  if (couleurs[0] === 41 && couleurs[1] === 170 && couleurs[2] === 225) {
    if (e[3] === 40 && e[4] === 127) {
      console.log("EU");
      playSound(2);
      pauseSound(0);
      pauseSound(1);
      pauseSound(3);
      pauseSound(4);
      pauseSound(5);
    }
  }
  if (couleurs[0] === 241 && couleurs[1] === 90 && couleurs[2] === 37) {
    if (e[3] === 40 && e[4] === 127) {
      console.log("Afrique");
      playSound(3);
      pauseSound(0);
      pauseSound(1);
      pauseSound(2);
      pauseSound(4);
      pauseSound(5);
    }
  }
  if (couleurs[0] === 251 && couleurs[1] === 176 && couleurs[2] === 59) {
    if (e[3] === 40 && e[4] === 127) {
      console.log("Asie");
      playSound(4);
      pauseSound(0);
      pauseSound(1);
      pauseSound(2);
      pauseSound(3);
      pauseSound(5);
    }
  }
  if (couleurs[0] === 46 && couleurs[1] === 49 && couleurs[2] === 146) {
    if (e[3] === 40 && e[4] === 127) {
      console.log("Océanie");
      playSound(5);
      pauseSound(0);
      pauseSound(1);
      pauseSound(2);
      pauseSound(3);
      pauseSound(4);
    }
  }

  // if (e[3] === 36 && e[4] === 127) {
  //   console.log("stop");
  //   pauseSound(0);
  //   pauseSound(1);
  //   pauseSound(2);
  //   pauseSound(3);
  //   pauseSound(4);
  //   pauseSound(5);
  // }
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

function map(value, start1, stop1, start2, stop2) {
  // First, map the value from the original range to a 0-1 range
  const normalizedValue = (value - start1) / (stop1 - start1);

  // Then, map the normalized value to the new range
  return start2 + normalizedValue * (stop2 - start2);
}

function loadAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.addEventListener("canplaythrough", function () {
    audioArray.push(audio);
  });
}

function playSound(index) {
  if (index >= 0 && index < audioArray.length) {
    audioArray[index].play();
  }
}

function pauseSound(index) {
  if (index >= 0 && index < audioArray.length) {
    audioArray[index].pause();
  }
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
