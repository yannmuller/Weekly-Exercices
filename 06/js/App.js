class App {
  constructor() {
    // appel la fonction setup
    this.setup();
  }

  setup() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.circle = new Circle(100, 100, 50, this.ctx);
    this.allCircles = [];
    for (let i = 0; i < 1024; i++) {
      this.allCircles.push(
        new Circle(i * 2, window.innerHeight / 2, 2, this.ctx)
      );
    }

    this.circle = new Circle(100, 100, 50, this.ctx);
    this.audioTool = new AudioTool();

    document.addEventListener("click", (e) => {
      this.audioTool.play(e);
    });
    // appel la fonction draw
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.circle.draw();
    this.allCircles.forEach((circle) => {
      circle.draw();
    });

    this.audioTool.updateWaveForm();
    if (this.audioTool.audioContext) {
      for (let i = 0; i < this.audioTool.dataWave.length; i++) {
        this.allCircles[i].y =
          -this.audioTool.dataWave[i] + window.innerHeight / 2;
      }
    }
    //bind: permet de chercher la fonction "this.draw" dans une autre fonction que la fonction "window.requestAnimationFrame"
    requestAnimationFrame(this.draw.bind(this));
  }
}

// intencie une nouvelle app
// attend que la page soit chargée pour lire le code (appel la class App)
window.onload = function () {
  const app = new App();
};
