class App {
  constructor() {
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

    let snowfall = new Snowfall({
      // number of snowflakes
      count: 200,
      // min/max size
      minRadius: 10,
      maxRadius: 30,
      // min/max speed
      minSpeed: 3,
      maxSpeed: 2,
      // custom symbol or text for snowflakes
      text: "\u2744",
      // color of snowflakes
      color: "#fff",
      // z-index for the canvas
      zIndex: "1000",
    });

    this.circle = new Circle(100, 100, 50, this.ctx);
    this.allCircles = [];
    // for (let i = 0; i < 1024; i++) {
    //   this.allCircles.push(
    //     /**
    //      * A CHOIX : utiliser un cercle ou un texte
    //      */
    //     // new Circle(i * 2, window.innerHeight / 2, 5, this.ctx)
    //     new Text(i * 2, window.innerHeight / 2, this.ctx)
    //   );
    // }

    this.audioTool = new AudioTool();

    document.addEventListener("click", (e) => {
      this.audioTool.play(e);
    });

    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.allCircles.forEach((circle) => {
      circle.draw();
    });
    /**
     *  A CHOIX : analyser un des 3 types de data
     */
    // this.audioTool.updateWaveForm();
    // this.audioTool.updateFrequency();
    this.audioTool.updatedFloatFrequency();

    /**
     *  A CHOIX : récupérer un des 3 types de tableau
     */
    // const data = this.audioTool.dataWave;
    // const data = this.audioTool.dataFrequency;
    const data = this.audioTool.dataFloatFrequency;

    if (this.audioTool.audioContext) {
      this.ctx.save();
      this.ctx.fillStyle = "white";
      this.ctx.translate(0, -400);
      this.ctx.rotate((Math.PI / 180) * 10);
      for (let i = 0; i < 40; i++) {
        // this.ctx.translate(this.width / 2, this.height / 2);
        // this.ctx.rotate((Math.PI / 180) * 10);
        // this.ctx.translate(this.width / 2, 0);
        i % 2 == 0
          ? (this.ctx.fillStyle = "#e45445")
          : (this.ctx.fillStyle = "#63a65f");
        rectangle(
          0,
          (i * this.height) / 12 + data[400] * 0.6,
          this.width * 2,
          this.height / (24 + data[400] * 0.6),
          this.ctx
        );
      }
      this.ctx.restore();

      this.ctx.save();
      this.ctx.translate(0, -400);
      this.ctx.rotate((Math.PI / 180) * 10);
      for (let i = 0; i < 40; i++) {
        // this.ctx.translate(this.width / 2, this.height / 2);
        // this.ctx.rotate((Math.PI / 180) * 10);
        // this.ctx.translate(this.width / 2, 0);
        i % 2 == 0
          ? (this.ctx.fillStyle = "#b2cfcc")
          : (this.ctx.fillStyle = "#efb0bb");
        rectangle(
          0,
          (i * this.height) / 6 + data[400] * 0.5,
          this.width * 2,
          this.height / (12 + data[400] * 0.5),
          this.ctx
        );
      }
      this.ctx.restore();

      this.ctx.save();
      this.ctx.translate(0, -400);
      this.ctx.rotate((Math.PI / 180) * 10);
      for (let i = 0; i < 40; i++) {
        // this.ctx.translate(this.width / 2, this.height / 2);
        // this.ctx.rotate((Math.PI / 180) * 10);
        // this.ctx.translate(this.width / 2, 0);
        i % 2 == 0
          ? (this.ctx.fillStyle = "#e45445")
          : (this.ctx.fillStyle = "#b2cfcc");
        rectangle(
          0,
          (i * this.height) / 5 + data[100] * 0.5,
          this.width * 2,
          this.height / (20 + data[100] * 0.5),
          this.ctx
        );
      }
      this.ctx.restore();
    }

    // if (this.audioTool.audioContext) {
    //   this.ctx.fillStyle = "red";
    //   circleB(this.width / 2, this.height / 2, -dataC[512] * 4, this.ctx);

    //   this.ctx.fillStyle = "green";
    //   circleA(this.width / 2, this.height / 2, -dataC[100] * 1, this.ctx);

    //   // console.log(data);
    //   // for (let i = 0; i < data.length; i++) {
    //   //   /**
    //   //    * A CHOIX : modifier la position ou autre parametre
    //   //    */
    //   //   // this.allCircles[i].y = data[i] + window.innerHeight / 2 - 125;
    //   //   this.allCircles[i].y = -data[i] + window.innerHeight / 2;
    //   //   // console.log(Math.abs(data[i] / 10));
    //   //   // this.allCircles[i].fontSize = -data[i] / 5;
    //   // }
    // }

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  const app = new App();
  //   console.log(app);
};

function rectangle(x, y, width, height, ctx) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fill();
}

function circle(x, y, radius, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}
