//TODO change this global variable and pass it as an argument for the subclasses
const heroX = 100;
const heroW = 20;

const worldElements = {
            'stairsUp1' : false,
            'stairsUp2' : false,
            'stairsUp3' : false,
            'stairsDown1' : false,
            'stairsDown2' : false,
            'stairsDown3' : false,
            'ground' : false,
            'block1' : false,
            'block2' : false,
            'block3' : false,
            'platform1' : false,
            'platform2' : false,
            'platform3' : false,
            'platform4' : false,
            'platform5' : false,
            'platform6' : false,
            'platform7' : false,
            'tunnel1' : false,
            'tunnel2' : false,
            'tunnel3' : false,
            'tunnel4' : false,
            'ironCertificate' : false,
};

class World {
    constructor (heroX, heroW) {
        //class attributes
        const img = document.createElement('img');
        img.onload = () => {
            this.w = 25;
            const imgRatio = img.naturalWidth/img.naturalHeight;
            this.h = this.w/imgRatio;
            this.img = img
          }
        this.heroX = heroX;
        this.heroW = heroW;
        this.nextPixelPosition = 200;
        this.worldLength = 5000;
        this.currentPixelLocation = 0;
        this.speedX = 0;
        img.src = "ironCertificate.png";
        //stairs up objects
        this.stairsUp1 = new ColoredStairsUp(200, 160);
        this.stairsUp2 = new StairsUp('stairsUp2');
        this.stairsUp3 = new StairsUp('stairsUp3');
        //stairs down objects
        this.stairsDown1 = new StairsDown('stairsDown1');
        this.stairsDown2 = new StairsDown('stairsDown2');
        this.stairsDown3 = new StairsDown('stairsDown3');
        //ground object
        this.ground = new Ground('ground');
        //block objects
        this.block1 = new Block('block1');
        this.block2 = new Block('block2');
        this.block3 = new Block('block3');
        //platform objects
        this.platform1 = new Platform('platform1');
        this.platform2 = new Platform('platform2');
        this.platform3 = new Platform('platform3');
        this.platform4 = new Platform('platform4');
        this.platform5 = new Platform('platform5');
        this.platform6 = new Platform('platform6');
        this.platform7 = new Platform('platform7');
        //tunnel objects
        this.tunnel1 = new Tunnel('tunnel1');
        this.tunnel2 = new Tunnel('tunnel2');
        this.tunnel3 = new Tunnel('tunnel3');
        this.tunnel4 = new Tunnel('tunnel4');
        this.tunnel5 = new Tunnel('tunnel5');
        this.tunnel6 = new Tunnel('tunnel6');
        this.tunnel7 = new Tunnel('tunnel7');
        this.tunnel8 = new Tunnel('tunnel8');
        this.tunnel9 = new Tunnel('tunnel9');
        //certificate object
        this.ironCertificate = new IronCertificate();
    
      }
    updateWorld() {
        this.ground.updateGround(this.speedX);
        this.nextPixelPosition = this.stairsUp1.updateStairs(this.speedX, 'black');
        this.tunnel8.updateTunnel(this.nextPixelPosition + 50, 'black', 500, 100, this.stairsUp1.groundReference - this.stairsUp1.stairHeight - 200);
        this.tunnel9.updateTunnel(this.nextPixelPosition + 50 + 500, 'black', 500, 100, this.stairsUp1.groundReference - this.stairsUp1.stairHeight - 200);
        this.block1.updateBlock(this.nextPixelPosition, 'black', 120);
        this.nextPixelPosition = this.platform1.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.nextPixelPosition = this.stairsDown1.updateStairs(this.nextPixelPosition, 'black');
        this.block2.updateBlock(this.nextPixelPosition + 150, 'black', 220);
        this.nextPixelPosition = this.stairsUp2.updateStairs(this.nextPixelPosition + 300, 'black');
        this.nextPixelPosition = this.platform2.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.nextPixelPosition = this.platform3.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.stairsUp3.updateStairs(this.nextPixelPosition, 'black', 'level up');
        this.nextPixelPosition = this.platform4.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.platform5.updatePlatform(this.nextPixelPosition, 'black', 160);
        // this.nextPixelPosition = this.platform6.updatePlatform(this.nextPixelPosition, 'red', 60);
        this.platform7.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.nextPixelPosition = this.stairsDown2.updateStairs(this.nextPixelPosition, 'black', 'level up');
        this.stairsDown3.updateStairs(this.nextPixelPosition, 'black');
        this.tunnel1.updateTunnel(this.nextPixelPosition + 100, 'black', 500, 100, this.stairsDown3.groundReference - this.stairsDown3.stairHeight - 200 );
        this.block3.updateBlock(this.nextPixelPosition + 400, 'black', 220);
        this.nextPixelPosition = this.tunnel3.updateTunnel(this.nextPixelPosition + 100, 'black', 500,100, this.stairsDown3.groundReference - this.stairsDown3.stairHeight - 200);
        this.nextPixelPosition = this.tunnel4.updateTunnel(this.nextPixelPosition, 'black', 500,150, 0);
        this.ironCertificate.update(this.nextPixelPosition + 500);
        return worldElements;
    }

}

class Ground {
    constructor (elementName) {
        this.x = 0;
        this.y = 260;
        this.elementName = elementName;
        this.boundaries; 
    }
    updateBoundaries(pixelPosition) {
        let Elboundaries = {start: pixelPosition, end: 4000, zeroPotential: 240}
        return Elboundaries;
    }

    checkBeingCrossed(pixelPosition) {
        if ((heroX + heroW) >= pixelPosition) {
            worldElements[this.elementName] = true;
            return;
        }
        worldElements[this.elementName] = false;
        return;
    }

    drawGround() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, 1000, 40);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x + 1000, this.y, 1000, 40);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 2000, this.y, 1000, 40);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x + 3000, this.y, 1000, 40);
    }

    updateGround(speedX) {
        this.x += speedX
        this.checkBeingCrossed(this.x);
        this.boundaries = this.updateBoundaries(this.x);
        this.drawGround();
    }
}

class ColoredStairsUp {
    constructor (x) {
        this.pixelPosition = x;
        this.groundReference = 240;
        this.stairStepWidth = 40;
        this.stairStepHeight = 20;
        this.stairswidth = 5*this.stairStepWidth;
        this.stairHeight = 5*this.stairStepHeight;
        this.boundaries;
    }

    updateBoundaries(pixelPosition) {
        let Elboundaries = {
            1:{start: pixelPosition, end: pixelPosition + 40, zeroPotential: 220},
            2:{start: pixelPosition + 20, end: pixelPosition + 80, zeroPotential: 200},
            3:{start: pixelPosition + 40, end: pixelPosition + 120, zeroPotential: 180},
            4:{start: pixelPosition + 60, end: pixelPosition + 160, zeroPotential: 160},
            5:{start: pixelPosition + 80, end: this.stairswidth + heroW, zeroPotential: 140},
        }
        return Elboundaries;
    }

    checkBeingCrossed(pixelPosition) {
        if ((heroX + heroW) >= pixelPosition && (heroX + heroW) < (pixelPosition + this.stairswidth)) {
            worldElements['stairsUp1'] = true;
            return;
        }
        worldElements['stairsUp1'] = false;
        return;
    }

    drawStairs(pixelPosition, color,) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  this.groundReference, this.stairswidth, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth,  this.groundReference - this.stairStepHeight, this.stairswidth - this.stairStepWidth, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*2,  this.groundReference - this.stairStepHeight*2, this.stairswidth - this.stairStepWidth*2, this.stairStepHeight);
        
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*3,  this.groundReference - this.stairStepHeight*3, this.stairswidth - this.stairStepWidth*3, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*4,  this.groundReference - this.stairStepHeight*4, this.stairswidth - this.stairStepWidth*4, this.stairStepHeight);
        return pixelPosition + this.stairswidth;
    }
    updateStairs(speedX, color) {
            this.pixelPosition += speedX;
            this.checkBeingCrossed(this.pixelPosition);    
            this.boundaries = this.updateBoundaries(this.pixelPosition);
            return this.drawStairs(this.pixelPosition, color);  
        }
}

class StairsUp {
    constructor (elementName) {
        this.elementName = elementName;
        this.groundReference = 240;
        this.stairStepWidth = 40;
        this.stairStepHeight = 20;
        this.stairswidth = 5*this.stairStepWidth;
        this.stairHeight = 5*this.stairStepHeight;
        this.boundaries;
    }
    updateBoundaries(pixelPosition) {
        let Elboundaries = {
            1:{start: pixelPosition, end: pixelPosition + 40, zeroPotential: (this.groundReference - 20)},
            2:{start: pixelPosition + 20, end: pixelPosition + 80, zeroPotential: (this.groundReference - 40)},
            3:{start: pixelPosition + 40, end: pixelPosition + 120, zeroPotential: (this.groundReference - 60)},
            4:{start: pixelPosition + 60, end: pixelPosition + 160, zeroPotential: (this.groundReference - 80)},
            5:{start: pixelPosition + 80, end: this.stairswidth + heroW, zeroPotential: (this.groundReference - 100)},
        }
        return Elboundaries;
    }
    checkBeingCrossed(pixelPosition) {
        if ((heroX + heroW) >= pixelPosition && (heroX + heroW) < (pixelPosition + this.stairswidth)) {
            worldElements[this.elementName] = true;
            return;
        }
        worldElements[this.elementName] = false;
        return;
    }

    drawStairs(pixelPosition, color,) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  this.groundReference, this.stairswidth, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth,  this.groundReference - this.stairStepHeight, this.stairswidth - this.stairStepWidth, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*2,  this.groundReference - this.stairStepHeight*2, this.stairswidth - this.stairStepWidth*2, this.stairStepHeight);
        
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*3,  this.groundReference - this.stairStepHeight*3, this.stairswidth - this.stairStepWidth*3, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*4,  this.groundReference - this.stairStepHeight*4, this.stairswidth - this.stairStepWidth*4, this.stairStepHeight);
        return pixelPosition + this.stairswidth;
    }
    updateStairs(pixelPosition, color, level) {
            if (level === 'level up') {
                this.groundReference = 140;
                this.pixelPosition = pixelPosition;
                this.checkBeingCrossed(this.pixelPosition);    
                this.boundaries = this.updateBoundaries(this.pixelPosition);
                return this.drawStairs(this.pixelPosition, color);
            }
            this.pixelPosition = pixelPosition;
            this.checkBeingCrossed(this.pixelPosition);    
            this.boundaries = this.updateBoundaries(this.pixelPosition);
            return this.drawStairs(this.pixelPosition, color);  
        }
}


class Block {
    constructor (elementName) {
        // this.x = x;
        // this.y = y;
        this.elementName = elementName;
        this.w = 40;
        this.h = 40; 
        this.pixelPosition;
        this.boundaries;

    }
    updateBoundaries(pixelPosition, groundReference) {
        let Elboundaries = {start: pixelPosition, end: pixelPosition + 80, zeroPotential: (groundReference -20)}
        return Elboundaries;
    }

    checkBeingCrossed(pixelPosition) {
        if ((heroX + heroW) >= pixelPosition && (heroX + heroW) < (pixelPosition + this.w)) {
            worldElements[this.elementName] = true;
            return;
        }
        worldElements[this.elementName] = false;
        return;
    }
    
    drawBlock(pixelPosition, color, groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition, groundReference, this.w, this.h);
        return pixelPosition + this.w;
    }

    updateBlock(pixelPosition, color,  groundReference) {
        this.pixelPosition = pixelPosition; 
        this.checkBeingCrossed(this.pixelPosition);
        this.boundaries = this.updateBoundaries(this.pixelPosition, groundReference);
        return this.drawBlock(this.pixelPosition, color, groundReference);
    }
}

class Platform {
    constructor(elementName) {
        this.elementName = elementName;
        this.w = 200;
        this.h = 100;
        this.pixelPosition;
        this.boundaries;
    }
    updateBoundaries(pixelPosition, groundReference) {
        let Elboundaries = {start: pixelPosition, end: pixelPosition + 80, zeroPotential: (groundReference -20)} // !! hard coded not good, needs to change
        return Elboundaries;
    }

    checkBeingCrossed(pixelPosition) {
        if ((heroX + heroW) >= pixelPosition && (heroX + heroW) < (pixelPosition + this.w)) {
            worldElements[this.elementName] = true;
            return;
        }
        worldElements[this.elementName] = false;
        return;
    }

    drawPlatform(pixelPosition, color, groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition, groundReference, this.w, this.h);
        return pixelPosition + this.w;
    }

    updatePlatform(pixelPosition, color,  groundReference) {
        this.pixelPosition = pixelPosition; 
        this.checkBeingCrossed(this.pixelPosition);
        this.boundaries = this.updateBoundaries(this.pixelPosition, groundReference);
        return this.drawPlatform(this.pixelPosition, color, groundReference);
    }
}

class StairsDown {
    constructor (elementName) {
        this.elementName = elementName;
        this.pixelPosition;
        this.groundReference = 240;
        this.stairStepWidth = 40;
        this.stairStepHeight = 20;
        this.stairswidth = 5*this.stairStepWidth;
        this.stairHeight = 5*this.stairStepHeight;
        this.boundaries;
    }

    updateBoundaries(pixelPosition) {
        let Elboundaries = {
            1:{start: pixelPosition, end: pixelPosition + 40, zeroPotential: (this.groundReference - 100)},
            2:{start: pixelPosition + 20, end: pixelPosition + 80, zeroPotential: (this.groundReference - 80)},
            3:{start: pixelPosition + 40, end: pixelPosition + 120, zeroPotential: (this.groundReference - 60)},
            4:{start: pixelPosition + 60, end: pixelPosition + 160, zeroPotential: (this.groundReference - 40)},
            5:{start: pixelPosition + 80, end: this.stairswidth + heroW, zeroPotential: (this.groundReference - 20)},
        }
        return Elboundaries;
    }

    checkBeingCrossed(pixelPosition) {
        if ((heroX + heroW) >= pixelPosition && (heroX + heroW) < (pixelPosition + this.stairswidth)) {
            worldElements[this.elementName] = true;
            return;
        }
        worldElements[this.elementName] = false;
        return;
    }

    drawStairs(pixelPosition, color) {  
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  this.groundReference - this.stairStepHeight*4, this.stairswidth - this.stairStepWidth*4, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  this.groundReference - this.stairStepHeight*3, this.stairswidth - this.stairStepWidth*3, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  this.groundReference - this.stairStepHeight*2, this.stairswidth - this.stairStepWidth*2, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  this.groundReference - this.stairStepHeight, this.stairswidth - this.stairStepWidth, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  this.groundReference, this.stairswidth, 20);
        return pixelPosition+ this.stairswidth;
    }
    
    updateStairs(pixelPosition, color, level) {
        if (level === 'level up') {
            this.groundReference = 140;
            this.pixelPosition = pixelPosition;
            this.checkBeingCrossed(this.pixelPosition);    
            this.boundaries = this.updateBoundaries(this.pixelPosition);
            return this.drawStairs(this.pixelPosition, color);
        }
        this.groundReference = 240;
        this.pixelPosition = pixelPosition;
        this.checkBeingCrossed(this.pixelPosition);    
            this.boundaries = this.updateBoundaries(this.pixelPosition);
        return this.drawStairs(this.pixelPosition, color);  
    }
}

class Tunnel {
    constructor (elementName) {
        this.elementName = elementName;
        this.w = 500;
        this.h;
        this.pixelPosition;
        this.groundReference;
        this.boundaries;
    }
    updateBoundaries(pixelPosition, groundReference, width, heigth) {
        let Elboundaries = {start: pixelPosition, end: pixelPosition + width, zeroPotential: (groundReference + heigth)} // !! hard coded not good, needs to change
        return Elboundaries;
    }

    checkBeingCrossed(pixelPosition) {
        if ((heroX + heroW) >= pixelPosition && (heroX + heroW) < (pixelPosition + this.w)) {
            worldElements[this.elementName] = true;
            return;
        }
        worldElements[this.elementName] = false;
        return;
    }
    
    drawTunnel(pixelPosition, color,  width,height, groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition, groundReference, width, height);
        return pixelPosition + this.w;
    }

    updateTunnel(pixelPosition, color, width, height, groundReference) {
        this.pixelPosition = pixelPosition;
        this.groundReference = groundReference;
        this.checkBeingCrossed(this.pixelPosition);
        this.boundaries = this.updateBoundaries(this.pixelPosition, this.groundReference,width, height);
        return this.drawTunnel(pixelPosition, color, width, height, this.groundReference);
    }
}

class IronCertificate {
    constructor () {
        const img = document.createElement('img');
        img.onload = () => {
            this.w = 25;
            const imgRatio = img.naturalWidth/img.naturalHeight;
            this.h = this.w/imgRatio;
            this.img = img
        }
        img.src = "ironCertificate.png";
        this.pixelPosition;
        this.y = 200;
    }
    show(pixelPosition) {
        if (!this.img) return;
        ctx.drawImage(this.img, pixelPosition, this.y, this.w, this.h);
    }
    update(pixelPosition) {
        this.pixelPosition = pixelPosition;
        this.show(this.pixelPosition);
    }
}