const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
var timeoutId;
var x = 0;


function moveWorld(x) {
    if (x === 0) {
        console.log('here');
        while(timeoutId) {
            clearInterval(timeoutId);
            return timeoutId;
        }
        // return timeoutId;
    }
    // x++;
    ctx.clearRect(0, 0, 1000, 300);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 260, 1000, 40);
    ctx.fillStyle = 'red';
    ctx.fillRect(1000, 260, 1000, 40);

    ctx.fillStyle = 'black';
    ctx.fillRect(2000, 260, 1000, 40);

    ctx.fillStyle = 'black';
    ctx.fillRect(250,  220, 40, 40);
    ctx.fillStyle = 'green';
    ctx.fillRect(500,  220, 40, 40);
    
    ctx.fillStyle = 'green';
    ctx.fillRect(540,  220, 40, 40);
    ctx.fillStyle = 'green';
    ctx.fillRect(540,  180, 40, 40);

    ctx.translate(-x/50, 0);
    timeoutId = setTimeout(() => {moveWorld(x)}, 1000/50);
}

// console.log(moveWorld(0));

document.addEventListener('keydown', event => {
    if(event.keyCode === 39) {
        x++;
        console.log(x);
        moveWorld(x);
    }
    else if (event.keyCode === 37) {
        x = 0;
        console.log(x);
        moveWorld(x);
    }    
});
