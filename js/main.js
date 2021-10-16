const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
let heroXPosition = 100;
let heroYPosition = 100;
let hero = new Hero (heroXPosition, heroYPosition);
let myWorld = new World(heroXPosition, hero.w);
var heroFront = heroXPosition + hero.w;  
var maxSpeed = 1; 
var movementDirection = '';
var animtId;
var obstacleCollision = false;
var worldElementsObj;
var gameState = true;
var jumpAbility = true;
var gotCertificate = false;

function draw() {
    move();
    ctx.clearRect(0, 0, myWorld.worldLength, 300);
    worldElementsObj =  myWorld.updateWorld();
    checkPotentialRef()
    hero.update();
    checkWin();
    checkGameState();
}

function checkGameState () {
    if (!hero.fallingState) {
        hero.color = 'red';
        gameState = false;
        jumpAbility = false;
        maxSpeed = 0;
        hero.zeroPotential = 1000;
    }
    else if (hero.y > canvas.height) {
        gameOverSequence();
    }
    else if (gotCertificate) {
        gameState = false;
        maxSpeed = 0;
        hero.vy = 0;
    }
}
function gameOverSequence() {
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("You lost :/ type 'r' to reload", canvas.width/2, canvas.height/2);
}

function gameWinSequence() {
    ctx.font = "20px Comic Sans MS";
    hero.color = 'green';
    ctx.textAlign = "center";
    ctx.fillText("Congragulations! you got your certificate :) type 'r' to reload", canvas.width/2, canvas.height/2);
}


function checkWin() {
    if (hero.y > myWorld.ironCertificate.y && hero.y < (myWorld.ironCertificate.y + myWorld.ironCertificate.h) ) {
        if (heroFront > myWorld.ironCertificate.pixelPosition) {
            gotCertificate = true;
            ctx.fillStyle = "green";
            return;
        }
    }
    gotCertificate = false;
    return;
}

function checkPotentialRef() {
    let beingCrossedArr = Object.entries(worldElementsObj).filter(([key, values]) => values === true);
    if (beingCrossedArr[0]) {
        if (beingCrossedArr[0][0].includes('stairs')){
            if (heroFront > myWorld[beingCrossedArr[0][0]].boundaries[1].start && heroFront < myWorld[beingCrossedArr[0][0]].boundaries[1].end) {
                hero.zeroPotential.lower = myWorld[beingCrossedArr[0][0]].boundaries[1].zeroPotential;
            }
            else if (heroFront > myWorld[beingCrossedArr[0][0]].boundaries[2].start && heroFront < myWorld[beingCrossedArr[0][0]].boundaries[2].end) {
                hero.zeroPotential.lower = myWorld[beingCrossedArr[0][0]].boundaries[2].zeroPotential;
            }
            else if (heroFront >myWorld[beingCrossedArr[0][0]].boundaries[3].start && heroFront < myWorld[beingCrossedArr[0][0]].boundaries[3].end) {
                hero.zeroPotential.lower = myWorld[beingCrossedArr[0][0]].boundaries[3].zeroPotential;
            }
            else if (heroFront > myWorld[beingCrossedArr[0][0]].boundaries[4].start && heroFront < myWorld[beingCrossedArr[0][0]].boundaries[4].end) {
                hero.zeroPotential.lower = myWorld[beingCrossedArr[0][0]].boundaries[4].zeroPotential;
            }
            else if (heroFront > myWorld[beingCrossedArr[0][0]].boundaries[5].start && heroFront < myWorld[beingCrossedArr[0][0]].boundaries[5].end) {
                hero.zeroPotential.lower = myWorld[beingCrossedArr[0][0]].boundaries[5].zeroPotential;
            }
            checkUpperCollision(beingCrossedArr);
            return;
        }
        else {
            checkLowerCollision(beingCrossedArr);
            checkUpperCollision(beingCrossedArr);
        }
    }
    else {
        hero.zeroPotential.lower = 240;
        checkUpperCollision(beingCrossedArr);
    }    

}

function checkUpperCollision(beingCrossedArr) {
    let tunnel = beingCrossedArr.filter(el => el[0].includes('tunnel'));
    let ground = beingCrossedArr.filter(el => el[0].includes('ground'));
    if (tunnel.length != 0) {
        hero.zeroPotential.upper = myWorld[tunnel[0][0]].boundaries.zeroPotential;
    }
}

function checkLowerCollision(beingCrossedArr) {
    let platform = beingCrossedArr.filter(el => el[0].includes('platform'));
    let block = beingCrossedArr.filter(el => el[0].includes('block'));
    let ground = beingCrossedArr.filter(el => el[0].includes('ground'));
    
    if (platform.length != 0 && block.length != 0) {
        hero.zeroPotential.lower = myWorld[block[0][0]].boundaries.zeroPotential;
    }
    else if (platform.length != 0) {
        hero.zeroPotential.lower = myWorld[platform[0][0]].boundaries.zeroPotential;
    }
    
    else if (block.length != 0) {
        hero.zeroPotential.lower = myWorld[block[0][0]].boundaries.zeroPotential;
    }
    else if (ground.length != 0) {
        hero.zeroPotential.lower = myWorld[ground[0][0]].boundaries.zeroPotential;
    }
}

function move(){
    //direction was the argument to this function
    let translateDirection;
    myWorld.speedX = -1*maxSpeed;
    // if (direction === 'backwards' &&  obstacleCollision === false) {
    //     // console.log(obstacleCollision);
    //     myWorld.speedX = maxSpeed;
    // }
    // else if (direction === 'farward' && obstacleCollision === false){
    //     myWorld.speedX = -1*maxSpeed;
    // }
    // else {myWorld.speedX = 0;}
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
    else if(event.keyCode === 32 && jumpAbility) {
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
        keyState.left = false;
        move('none');
    }    
    else if(event.keyCode === 32) {
        keyState.space = false;
        if (keyState.right) {
            move('farward');
        }
        else if (keyState.left) {
            move('backwards');
        }
    }

});

let commandsStatus

function anim() { 
    if (gotCertificate) {
        gameWinSequence();
        cancelAnimationFrame(animtId);  
        return;
    }
    commandsStatus = checkCommands()
    animtId = window.requestAnimationFrame(anim);
    draw();
} 
window.requestAnimationFrame(anim);

document.addEventListener('keydown', event => {
    if(event.keyCode === 82) {
        location.reload();
    }
});