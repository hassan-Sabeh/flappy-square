const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
let myWorld = new World(0);
var positionCounter = 0;
var currentPixelPosition;
console.log('hereh');
var timeoutId;
//normally at 15
var speed = 100;
var movementFrames = 0;
var movementDirection = '';

function moveWorld(movementFrames) {
    if (movementFrames === 0) {
        clearInterval(timeoutId);

        return timeoutId;
    }
    movementFrames--;
    ctx.clearRect(0, 0, myWorld.worldLength, 300);
    myWorld.traceGround();
    ctx.save();
    currentPixelPosition = myWorld.addStairsUp(200, 'black');
    myWorld.addBlockObstacle(currentPixelPosition + 20, 'black', 260 - myWorld.stairHeight - 40);
    currentPixelPosition = myWorld.addElevatedTerrain(currentPixelPosition, 'black', 200, myWorld.stairHeight, 260 - myWorld.stairHeight);
    currentPixelPosition = myWorld.addStairsDown(currentPixelPosition, 'black');
    // ctx.restore();
    myWorld.addBlockObstacle(currentPixelPosition + 150, 'black', 260 - 40);
    currentPixelPosition = myWorld.addStairsUp(currentPixelPosition + 300, 'black');
    currentPixelPosition = myWorld.addElevatedTerrain(currentPixelPosition, 'black', myWorld.stairswidth, myWorld.stairHeight, 260 - myWorld.stairHeight);
    myWorld.addElevatedTerrain(currentPixelPosition, 'black', myWorld.stairswidth, myWorld.stairHeight, 260 - myWorld.stairHeight);
    currentPixelPosition = myWorld.addStairsUp(currentPixelPosition, 'black', myWorld.groundReference - myWorld.stairHeight);
    myWorld.addElevatedTerrain(currentPixelPosition, 'black', myWorld.stairswidth, myWorld.stairHeight, 260 - myWorld.stairHeight);
    currentPixelPosition = myWorld.addElevatedTerrain(currentPixelPosition, 'black', myWorld.stairswidth, myWorld.stairHeight, 260 - 2*myWorld.stairHeight);
    myWorld.addElevatedTerrain(currentPixelPosition, 'black', myWorld.stairswidth, myWorld.stairHeight, 260 - myWorld.stairHeight);
    myWorld.addElevatedTerrain(currentPixelPosition, 'black', myWorld.stairswidth, myWorld.stairHeight, 260 - myWorld.stairHeight);
    myWorld.addStairsDown(currentPixelPosition, 'black', myWorld.groundReference - myWorld.stairHeight);
    myWorld.addTunnel(currentPixelPosition + 100, 'black', 100, myWorld.groundReference - myWorld.stairHeight - 200 );
    myWorld.addTunnel(currentPixelPosition + 200, 'black',  75, 0);
    currentPixelPosition = myWorld.addElevatedTerrain(currentPixelPosition + 200, 'black', myWorld.stairswidth, myWorld.stairHeight, 260 - myWorld.stairHeight);
    currentPixelPosition = currentPixelPosition = myWorld.addStairsDown(currentPixelPosition, 'black');
    myWorld.addBlockObstacle(currentPixelPosition + 150, 'black', 260 - 40);
    myWorld.addTunnel(currentPixelPosition + 100, 'black', 100, myWorld.groundReference - myWorld.stairHeight - 200 );
    currentPixelPosition = myWorld.addTunnel(currentPixelPosition, 'black',  150, 0);
    myWorld.addTunnel(currentPixelPosition, 'black',  150, 0);
    currentPixelPosition = myWorld.addBlockObstacle(currentPixelPosition + 150, 'black', 260 - 40);
    //show certificate
    myWorld.ironCertificate(currentPixelPosition + 700, 200);

    if (movementDirection === 'backwards') {
        ctx.translate(+speed/50, 0);
    }
    else {ctx.translate(-speed/50, 0);}
    timeoutId = setTimeout(() => {moveWorld(movementFrames)}, 1000/50);
}

document.addEventListener('keydown', event => {
    // console.log('here in keydown');
    if(event.keyCode === 39) {
        //number to be incremented is the actual moving speed
        positionCounter++;
        //remove this after.
        movementFrames = 5;
        movementDirection = 'forward';
        moveWorld(movementFrames);
        movementFrames = 0;
    }
    else if (event.keyCode === 37) {
        //number to be incremented is the actual moving speed
        positionCounter--;
        movementFrames = 5;
        movementDirection = 'backwards';
        moveWorld(movementFrames);
        movementFrames = 0;
    }    
});