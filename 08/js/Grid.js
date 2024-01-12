export default class Grid {
  constructor(ctx) {
    console.log("Grid is running");
    // this.canvas = document.createElement("canvas");
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    // document.body.appendChild(this.canvas);
    // this.ctx = this.canvas.getContext("2d");
    this.ctx = ctx;

    this.draw();
  }

  draw() {
    // draw a grid 4 x 4 on the canvas
    const largeur = this.canvas.width / 4;
    const hauteur = this.canvas.height / 4;
    this.ctx.strokeStyle = "red";

    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        this.ctx.beginPath();
        this.ctx.rect(x * largeur, y * hauteur, largeur, hauteur);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }
}
