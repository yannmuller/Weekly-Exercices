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
    this.color = "white";
    this.rotation = 0;
    this.angle = 0;
  }

  changeColor(r, g, b) {
    // on affect une couleur aléatoire
    // this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${
    //   Math.random() * 255
    // })`;
    // this.color = "red";
  }

  changeRadius2() {
    this.rayonOrigin.rayon = 50;
  }

  changeRadius(pourcentage) {
    this.rayon = this.rayonOrigin.rayon * pourcentage;
  }

  isInMe(mouseX, mouseY) {
    // on calcule la distance entre la souris et le centre
    let d = this.dist(mouseX, mouseY, this.x, this.y);
    // on compare cette distance au rayon
    if (d < this.rayon + 20) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    this.move();
    //pour préparer la rotation
    this.context.save();
    //on translate le contexte au centre du cercle
    this.context.translate(this.x, this.y);
    //on fait la rotation
    this.context.rotate(this.rotation);
    //on dessine le cercle
    this.context.fillStyle = this.color;
    this.context.beginPath();
    if (this.rayon > 100) {
      console.log(this.rayon);
    }
    this.context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
    // this.context.rect(0, 0, this.rayon * 2, this.rayon * 2);
    this.context.fill();
    this.context.closePath();

    this.context.restore();

    // this.move();
    // this.rapetisser();
  }

  dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
  }

  definirDestination(x, y) {
    this.target = { x: x, y: y };
    this.uniteDeTemps = 0;
  }

  definirRayonAleatoire() {
    this.rayonFinal.rayon = Math.random() * 200 + 50;
    this.uniteDeTemps1 = 0;
  }

  move() {
    // //calcul la distance entre le point de départ et la destination
    // const d = this.dist(this.x, this.y, this.target.x, this.target.y);
    // if (d < 0.01) {
    //   this.origin = { x: this.target.x, y: this.target.y };
    //   return;
    // }
    // //calcul de easing simple
    // // equivalent à un pourcentage
    // const easing = Easing.bounceOut(this.uniteDeTemps); //Math.pow(this.uniteDeTemps, 5); //this.uniteDeTemps * this.speed;
    // //on incrémente le compteur de temps
    // this.uniteDeTemps += 0.01;
    // //on la distance entre le point de départ et la destination
    // let distX = this.target.x - this.origin.x;
    // let distY = this.target.y - this.origin.y;
    // this.x = this.origin.x + distX * easing;
    // this.y = this.origin.y + distY * easing;
    // console.log(Math.cos(this.angle * (Math.PI / 180)) * 100);
    // this.angle++;
    this.rayon++;
    // this.x = this.origin.x + Math.cos(this.angle * (Math.PI / 180)) * 100;
    // this.y = this.origin.y + Math.sin(this.angle * (Math.PI / 180)) * 100;
    // this.rotation += 0.01;
    // this.color = 'red';
    // console.log(this.angle);
  }

  rapetisser() {
    let differenceRayon2 = this.rayonFinal.rayon - this.rayon;
    // console.log(differenceRayon2);
    if (Math.abs(differenceRayon2) < 0.01) {
      this.rayonOrigin = { rayon: this.rayonFinal.rayon };
      return;
    }

    const easing = Easing.elasticOut(this.uniteDeTemps1);
    this.uniteDeTemps1 += 0.01;
    let differenceRayon = this.rayonFinal.rayon - this.rayonOrigin.rayon;
    this.rayon = this.rayonOrigin.rayon + differenceRayon * easing;
  }
}
