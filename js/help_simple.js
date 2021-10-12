const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');

const W = $canvas.width;
const H = $canvas.height;

const gravity = 2;
const maxspeed = 30;

class Mario {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;

    this.vx = 0; // vitesse horizontale
    this.vy = 0; // vitesse verticale
  }
  jump() {
    // Do NOT jump if not on the ground
    if (this.vy !== 0) return
    
    this.vy = -25;
  }
  forward() {
    this.vx = 5;
  }
  backward() {
    this.vx = -5;
  }
  update() {
    // la gravité s'applique
    this.vy += gravity;

    let sol = H;

    // on limite la vitesse
    if (this.vy > maxspeed) this.vy = maxspeed;

    // on met a jour la position via les vitesses
    this.x += this.vx;
    this.y += this.vy;

    // on empeche d'aller plus bas que le sol
    if (this.y + this.h > sol) {
      console.log('limit')
      this.y = sol - this.h;
      this.vy = 0;
    }
  }
  paint() {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

// on crée Mario
var mario = new Mario(225, 125)

function draw() {
  //
  // fonction exécutée toutes les 16ms (boucle d'animation)
  //

  ctx.clearRect(0, 0, W, H); // 🧽

  mario.update(); // on recalcule les positions de notre mario
  mario.paint();  // puis on l'affiche
}

// états d'enfoncement des touches
const pressed = {
  space: false,
  arrowleft: false,
  arrowright: false
}

document.onkeydown = function (e) {
  switch (e.keyCode) {
    // SPACE
    case 32:
      if (pressed.space) return; // STOP si touche déja enfoncée
      pressed.up = true;

      mario.jump(); // jump mario 🦘
      break;
    // LEFT
    case 37:
      if (pressed.arrowleft) return; // STOP si touche déja enfoncée
      pressed.arrowleft = true;

      mario.backward(); // GO back
      break;
    // RIGHT
    case 39:
      if (pressed.arrowright) return; // STOP si touche déja enfoncée
      pressed.right = true;

      mario.forward(); // GO ahead mario !!
      break;
  }
}
document.onkeyup = function (e) {
  switch (e.keyCode) {
    // SPACE
    case 38:
      // on "libère" l'etat d'enfoncement de la touche
      pressed.space = false;
      break;
    // ARROWLEFT
    case 37:
      // on "libère" l'etat d'enfoncement de la touche
      pressed.arrowleft = false;

      // on annule la vitesse horizontale
      mario.vx = 0;
      break;
    // ARROWRIGHT
    case 39:
      // on "libère" l'etat d'enfoncement de la touche
      pressed.arrowright = false;

      // on annule la vitesse horizontale
      mario.vx = 0;
      break;
  }
}

function animLoop() {
  draw();

  requestAnimationFrame(animLoop);
}
requestAnimationFrame(animLoop)