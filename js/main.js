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
var speed = 0;
var movementFrames = 0;
var movementDirection = '';
var animtId;

function draw() {
    ctx.clearRect(0, 0, myWorld.worldLength, 300);
    myWorld.updateWorld();
    hero.update();
}


function move(direction){
    let translateDirection;
    if (direction === 'backwards') {
        myWorld.speedX = 10;
    }
    else if (direction === 'farward'){
        myWorld.speedX = -10;
    }
    else {myWorld.speedX = 0;}
}


const keyState = {
    space: false,
    right: false,
    left:  false,
}

function checkCommands() {
    let noKeysPressed = true;
    Object.values(keyState).forEach(val => {
        if (val) {
            noKeysPressed = false;
        }
    });   
    return noKeysPressed;
}

document.addEventListener('keydown', event => {
    var direction = '';
    if(event.keyCode === 39) {
        keyState.right = true;
        direction = 'farward';
        move(direction);
    }
    else if (event.keyCode === 37) {
        keyState.left = true;
        direction = 'backwards';
        move(direction);
    }    
    else if(event.keyCode === 32) {
        keyState.space = true;
        if (keyState.right) {
            move('farward');
            hero.jump();
        }
        else if (keyState.left) {
            move('backwards');
            hero.jump();
        }
        else {hero.jump();}
    }
});




document.addEventListener('keyup', event => {
    if(event.keyCode === 39) {
        keyState.right = false;
        move('none');
    }
    else if (event.keyCode === 37) {
        movementFrames = 0;
        keyState.left = false;
        move('none');
    }    
    else if(event.keyCode === 32) {
        movementFrames = 0;
        keyState.space = false;
        if (keyState.right) {
            move('farward');
        }
        else if (keyState.left) {
            move('backwards');
        }
        // else {}
    }

});

let commandsStatus

function anim() { 
    commandsStatus = checkCommands()
    animtId = window.requestAnimationFrame(anim);
    draw();
} 
window.requestAnimationFrame(anim);