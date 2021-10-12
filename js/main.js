const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
let myWorld = new World(0);
let heroXPosition = 250;
let heroYPosition = 100;
let hero = new Hero (heroXPosition, heroYPosition);
var positionCounter = 0;
// var currentPixelPosition;
console.log('hereh');
var timeoutId;
//normally at 15
var speed = 100;
var movementFrames = 0;
var movementDirection = '';

function draw(movementDirection) {
    let translateDirection = 0;
    // console.log(movementDirection);
    myWorld.drawWorld();
    if (movementDirection === 'backwards') {
        translateDirection = speed/50;
    }
    else if (movementDirection === 'farward'){
        translateDirection = -1*speed/50;
    }
    else {translateDirection = 0;}
    // console.log(translateDirection);
    ctx.translate(translateDirection, 0)
    //create update method with the positions of the hero.
    hero.update(translateDirection*-1);
}

// const keyState = {
//     39: {pressed: false, func: moveForward()},
//     37: {pressed: false, func: moveBackward()}
// }

// function moveForward(){
//     console.log('i am here');
//     movementFrames = 5;
//     movementDirection = 'forward';
//     anim(movementFrames);
//     movementFrames = 0
// }

function move(direction){
    console.log('i am here');
    movementFrames = 5;
    movementDirection = direction;
    anim(movementFrames);
    movementFrames = 0;
}

// document.addEventListener('keydown', event => {
//     if (keyState[event.keyCode]) {
//         keyState[event.keyCode].pressed = true;
//     }
// })

// document.addEventListener('keyup', event => {
//     if (keyState[event.keyCode]) {
//         keyState[event.keyCode].pressed = false;
//     }
// })

// function checkCommands() {
//     Object.keys(keyState).forEach(key => {
//         if (key.pressed) {
//             key.func();
//         }
//     });   
// }

const keyState = {
    space: false,
    right: false,
    left: false,
}

document.addEventListener('keydown', event => {
    var direction = '';
    if(event.keyCode === 39) {
        direction = 'farward';
        move(direction);
    }
    else if (event.keyCode === 37) {
        direction = 'backwards';
        move(direction);
    }    
    else if(event.keyCode === 32) {
        hero.jump();
        move(direction);
    }

});

document.addEventListener('keyup', event => {
    if(event.keyCode === 39) {
        move();
    }
    else if (event.keyCode === 37) {
        move();
    }    
    else if(event.keyCode === 32) {
        move();
    }

});

// const pressed = {
//     space: false,
//     arrowleft: false,
//     arrowright: false
//   }
  
//   document.onkeydown = function (e) {
//     switch (e.keyCode) {
//       // SPACE
//       case 32:
//         if (pressed.space) return; // STOP si touche déja enfoncée
//         pressed.up = true;
  
//         hero.jump(); // jump mario 🦘
//         break;
//       // LEFT
//       case 37:
//         if (pressed.arrowleft) return; // STOP si touche déja enfoncée
//         pressed.arrowleft = true;
  
//         moveBackward(); // GO back
//         break;
//       // RIGHT
//       case 39:
//         if (pressed.arrowright) return; // STOP si touche déja enfoncée
//         pressed.right = true;
  
//         moveForward(); // GO ahead mario !!
//         break;
//     }
//   }
//   document.onkeyup = function (e) {
//     switch (e.keyCode) {
//       // SPACE
//       case 38:
//         // on "libère" l'etat d'enfoncement de la touche
//         pressed.space = false;
//         break;
//       // ARROWLEFT
//       case 37:
//         // on "libère" l'etat d'enfoncement de la touche
//         pressed.arrowleft = false;
  
//         // on annule la vitesse horizontale
//         // mario.vx = 0;
//         break;
//       // ARROWRIGHT
//       case 39:
//         // on "libère" l'etat d'enfoncement de la touche
//         pressed.arrowright = false;
  
//         // on annule la vitesse horizontale
//         // mario.vx = 0;
//         break;
//     }
//   }


function anim(movementFrames) {
    if (movementFrames === 0) {
        clearInterval(timeoutId);

        return timeoutId;
    }
    movementFrames--;
    ctx.clearRect(0, 0, myWorld.worldLength, 300);
    draw(movementDirection); 
    timeoutId = setTimeout(() => {anim(movementFrames)}, 1000/50);
    // checkCommands();
}