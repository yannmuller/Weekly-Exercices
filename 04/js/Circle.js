// la définition de la classe Circle c'est comme définir une function mais sans les parenthèses
// la fonction par défaul est le constructor
// on peut passer des paramètres au constructor
// dans une class on n'écrit pas "function" pour TOUTES les fonctions
// une variable globale de class s'écrit avec "this."
class Circle {
  constructor(x, y, rayon, context) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.target = { x: x, y: y };

    this.speed = 1;
    this.uniteDeTemps = 0;
    this.uniteDeTemps1 = 0;

    this.rayon = rayon;
    this.rayonOrigin = { rayon: rayon };
    this.rayonFinal = { rayon: rayon };

    this.context = context;
    // on initialise une couleur au bol

    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;

    this.rotation = 0;

    this.ajout = 0;
    this.isIn = false;
    this.isOver = false;
  }

  changeColor() {
    // on affect une couleur aléatoire
    this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;
    //on change la taille du rayon
    // this.rayon = Math.random() * 100;
  }

  isInMe(mouseX, mouseY) {
    // on calcule la distance entre la souris et le centre
    let d = this.dist(mouseX, mouseY, this.x, this.y);
    // on compare cette distance au rayon
    if (d < this.rayon) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
  }

  rotate() {
    console.log("rotate");
    // const easing = Easing.circInOut(this.uniteDeTemps);
    // this.uniteDeTemps += 0.001;
    // this.rotation += this.ajout * easing;

    this.rotation += 0.01;
  }

  draw() {
    //pour préparer la rotation
    this.context.save();
    //on translate le contexte au centre du cercle
    this.context.translate(this.x, this.y);
    //on fait la rotation
    this.context.rotate(this.rotation);
    //on dessine le cercle
    this.context.fillStyle = this.secondaryColor;

    for (let i = 0; i < 8; i++) {
      this.context.rotate(Math.PI / 4);
      this.context.beginPath();
      this.context.roundRect(-50, -30, 100, 200, 100);
      this.context.fill();
      this.context.closePath();
    }

    this.context.fillStyle = this.primaryColor;
    this.context.beginPath();
    // this.context.roundRect(-60, -80, 50, 100, 50);
    // this.context.roundRect(20, -80, 50, 100, 50);
    this.context.arc(0, 0, this.rayon, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();

    this.context.fillStyle = this.secondaryColor;
    this.context.beginPath();
    this.context.roundRect(-70, -95, 50, 80, 50);
    this.context.roundRect(20, -95, 50, 80, 50);
    this.context.arc(0, 0, 15, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();

    this.context.fillStyle = this.primaryColor;
    this.context.beginPath();
    this.context.roundRect(10, -50, 30, 40, 50);
    this.context.roundRect(-40, -50, 30, 40, 50);
    this.context.fill();
    this.context.closePath();

    this.context.restore();

    // if (this.isIn == false) {
    //   if (this.ajout <= 0) {
    //     this.ajout = 0;
    //     return;
    //   }
    //   this.ajout -= 0.001;
    // } else {
    //   if (this.ajout >= 0.1) {
    //     this.ajout = 0.1;
    //     return;
    //   }
    //   this.ajout += 0.001;
    // }
    if (this.isOver == true) this.rotate();
  }
}
