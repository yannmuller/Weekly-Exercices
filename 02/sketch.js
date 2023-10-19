let bg = 0;
let fg = "#f1f1f1";

let img;

let tilesX = 10; 
let tilesY = 80;

function preload() {
  img = loadImage("./data/image.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(tilesX, tilesY);
}

function draw() {
  pixelDensity(2.5)
  background("#f1f1f1");
  fill(0);
  noStroke();
  //smooth();
  
  let wave = map(sin(radians(frameCount)), -1, 2, 20, 100);
  
  let tileW = width / tilesX;
  let tileH = height / tilesY;
  
  
  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      let c = img.get(x, y);
      let b = brightness(c);
      let s = map(b, wave, 10, 10 , 0);
      
      fill(c);
      rect(x * tileW, y * tileH, tileW, tileH * s);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}