class Hero {
    constructor (x, y) {
        //attributes
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 20;
        this.vx = 0;
        this.vy = 0;
        this.color = 'orange'
        this.zeroPotential = canvas.height - 40 - this.h
        this.gravity = 2;
        this.jumpStrength = 10;
        this.jumpSegmentation = 1;
        this.fallingState = false;
    }
          
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  
    update() {
        // console.log(this.vy);
        // console.log(this.zeroPotential);
        if (this.vy < 0 && this.vy > -1*this.jumpStrength) {
            this.vy -= this.jumpSegmentation
            this.y += this.vy
            this.draw();            
            return;
        }
        this.vy += this.gravity;
        this.fallingState = true;
        if (this.y === this.zeroPotential) {
            this.vy = 0;    
            this.fallingState = false;
        } 
        else {
            this.y  += this.vy;
            this.vy = 0;
        }
        this.draw();
    }
    
    // checkHit() {
    //     if (this.y = this.zeroPotential) {
    //         console.log("hit");
    //         return;
    //     }
    // }

    jump() {
        if (this.vy !== 0) return;
        this.vy -= this.jumpSegmentation;
        // console.log(this.vy);
    }
}

// main <= boundariesObj = {
//     st1: {st1BoundariesOBj},
//     st2: {st1BoundariesOBj},
//     st3: {st1BoundariesOBj},
//     ...
//     st4: {st1BoundariesOBj}
// }


// world.subclasses <= st1BoundariesOBj = {
//     1: {start: pixelsStart, end: pixelsEnd, zeroPotential: 220},
//     2: {start: pixelsStart, end: pixelsEnd, zeroPotential: 220},
//     3: {start: pixelsStart, end: pixelsEnd, zeroPotential: 220},
// }

// logic part

// main <= 1. checking which segment the hero is at => returns a string.update
// add attribute isBeingCrosses boolean for every subclass element of world. 
//     (an if for pixel comparaison with the heroFeetX -> hero pixel location passed on init of world as an arguemnt)
//     get an array or Object, iterate over it in main and get the segment on which the guy is on.

// main <= checkingBottomCollision function:
//     get which segment the hero is at => string
//     if hero.FeetX >= boundariesObj[string].start and hero.FeetX >= boundariesObj[string].end:
//         hero.zeroPotential = boundariesObj[string].zeroPotential 