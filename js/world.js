console.log("i am in the world");

class World {
    constructor () {
        //class attributes
        const img = document.createElement('img');
        img.onload = () => {
            this.w = 25;
            const imgRatio = img.naturalWidth/img.naturalHeight;
            this.h = this.w/imgRatio;
            this.img = img
          }
        this.nextPixelPosition = 200;
        this.worldLength = 5000;
        this.currentPixelLocation = 0;
        this.speedX = 0;
        img.src = "ironCertificate.png";
        //stairs up objects
        this.stairsUp1 = new ColoredStairsUp(200, 160);
        this.starisUp2 = new StairsUp();
        this.starisUp3 = new StairsUp();
        //stairs down objects
        this.stairsDown1 = new StairsDown();
        this.stairsDown2 = new StairsDown();
        this.stairsDown3 = new StairsDown();
        //ground object
        this.ground = new Ground();
        //block objects
        this.block1 = new Block();
        this.block2 = new Block();
        this.block3 = new Block();
        //platform objects
        this.platform1 = new Platform();
        this.platform2 = new Platform();
        this.platform3 = new Platform();
        this.platform4 = new Platform();
        this.platform5 = new Platform();
        this.platform6 = new Platform();
        this.platform7 = new Platform();
        //tunnel objects
        this.tunnel1 = new Tunnel();
        this.tunnel2 = new Tunnel();
        this.tunnel3 = new Tunnel();
        this.tunnel4 = new Tunnel();
        //certificate object
        this.ironCertificate = new IronCertificate();
    
    }
    
    traceGround() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 260, 1000, 40);
        ctx.fillStyle = 'red';
        ctx.fillRect(1000, 260, 1000, 40);

        ctx.fillStyle = 'black';
        ctx.fillRect(2000, 260, 1000, 40);


        ctx.fillStyle = 'red';
        ctx.fillRect(3000, 260, 1000, 40);
    }


    addStairsUp(pixelPosition, color, groundReference = this.groundReference) { 
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  groundReference, this.stairswidth, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth,  groundReference - this.stairStepHeight, this.stairswidth - this.stairStepWidth, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*2,  groundReference - this.stairStepHeight*2, this.stairswidth - this.stairStepWidth*2, this.stairStepHeight);
        
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*3,  groundReference - this.stairStepHeight*3, this.stairswidth - this.stairStepWidth*3, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition + this.stairStepWidth*4,  groundReference - this.stairStepHeight*4, this.stairswidth - this.stairStepWidth*4, this.stairStepHeight);
        return pixelPosition + this.stairswidth;
    }

    
    addStairsDown(pixelPosition, color,  groundReference = this.groundReference) {  
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  groundReference - this.stairStepHeight*4, this.stairswidth - this.stairStepWidth*4, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  groundReference - this.stairStepHeight*3, this.stairswidth - this.stairStepWidth*3, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  groundReference - this.stairStepHeight*2, this.stairswidth - this.stairStepWidth*2, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  groundReference - this.stairStepHeight, this.stairswidth - this.stairStepWidth, this.stairStepHeight);
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  groundReference, this.stairswidth, 20);
        return pixelPosition+ this.stairswidth;
    }

    addBlockObstacle(pixelPosition, color, groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition, groundReference, 40, 40);
        return pixelPosition+ 40;
    }

    addElevatedTerrain(pixelPosition, color, terrainWidth, terrainHeight, groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition,  groundReference, terrainWidth, terrainHeight);
        return pixelPosition + terrainWidth;
    }
    
    addTunnel(pixelPosition, color,  height, groundReference = this.groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition, groundReference, 500, height);
        return pixelPosition + 500;
    }

    ironCertificate(x, y) {
        if (!this.img) return; // if `this.img` is not loaded yet => don't draw
        ctx.drawImage(this.img, x, y, this.w, this.h);
      }
    updateWorld() {
        this.ground.updateGround(this.speedX);
        this.nextPixelPosition = this.stairsUp1.updateStairs(this.speedX, 'black');
        this.block1.updateBlock(this.nextPixelPosition, 'black', 120);
        this.nextPixelPosition = this.platform1.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.nextPixelPosition = this.stairsDown1.updateStairs(this.nextPixelPosition, 'black');
        this.block2.updateBlock(this.nextPixelPosition + 150, 'black', 220);
        this.nextPixelPosition = this.starisUp2.updateStairs(this.nextPixelPosition + 300, 'black');
        this.nextPixelPosition = this.platform2.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.nextPixelPosition = this.platform3.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.starisUp3.updateStairs(this.nextPixelPosition, 'black', 'level up');
        this.nextPixelPosition = this.platform4.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.platform5.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.nextPixelPosition = this.platform6.updatePlatform(this.nextPixelPosition, 'black', 60);
        this.platform7.updatePlatform(this.nextPixelPosition, 'black', 160);
        this.nextPixelPosition = this.stairsDown2.updateStairs(this.nextPixelPosition, 'black', 'level up');
        this.stairsDown3.updateStairs(this.nextPixelPosition, 'black');
        this.tunnel1.updateTunnel(this.nextPixelPosition + 100, 'black', 100, this.stairsDown3.groundReference - this.stairsDown3.stairHeight - 200 );
        this.tunnel2.updateTunnel(this.nextPixelPosition + 200, 'black', 75, 0);
        this.block3.updateBlock(this.nextPixelPosition + 400, 'black', 220);
        this.nextPixelPosition = this.tunnel3.updateTunnel(this.nextPixelPosition + 100, 'black', 100, this.stairsDown3.groundReference - this.stairsDown3.stairHeight - 200);
        this.nextPixelPosition = this.tunnel4.updateTunnel(this.nextPixelPosition, 'black', 150, 0);
        this.ironCertificate.update(this.nextPixelPosition + 500);
    }

}

class Ground {
    constructor () {
        this.x = 0;
        this.y = 260; 
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
    }

    drawStairs(pixelPosition, color,) {
        ctx.fillStyle = "red";
        ctx.fillRect(pixelPosition,  this.groundReference, this.stairswidth, this.stairStepHeight);
        ctx.fillStyle = 'green';
        ctx.fillRect(pixelPosition + this.stairStepWidth,  this.groundReference - this.stairStepHeight, this.stairswidth - this.stairStepWidth, this.stairStepHeight);
        ctx.fillStyle = 'blue';
        ctx.fillRect(pixelPosition + this.stairStepWidth*2,  this.groundReference - this.stairStepHeight*2, this.stairswidth - this.stairStepWidth*2, this.stairStepHeight);
        
        ctx.fillStyle = 'red';
        ctx.fillRect(pixelPosition + this.stairStepWidth*3,  this.groundReference - this.stairStepHeight*3, this.stairswidth - this.stairStepWidth*3, this.stairStepHeight);
        ctx.fillStyle = 'black';
        ctx.fillRect(pixelPosition + this.stairStepWidth*4,  this.groundReference - this.stairStepHeight*4, this.stairswidth - this.stairStepWidth*4, this.stairStepHeight);
        return pixelPosition + this.stairswidth;
    }
    updateStairs(speedX, color) {
            this.pixelPosition += speedX;
            return this.drawStairs(this.pixelPosition, color);  
        }
}

class StairsUp {
    constructor () {
        this.groundReference = 240;
        this.stairStepWidth = 40;
        this.stairStepHeight = 20;
        this.stairswidth = 5*this.stairStepWidth;
        this.stairHeight = 5*this.stairStepHeight;
    }

    drawStairs(pixelPosition, color,) {
        ctx.fillStyle = "red";
        ctx.fillRect(pixelPosition,  this.groundReference, this.stairswidth, this.stairStepHeight);
        ctx.fillStyle = 'green';
        ctx.fillRect(pixelPosition + this.stairStepWidth,  this.groundReference - this.stairStepHeight, this.stairswidth - this.stairStepWidth, this.stairStepHeight);
        ctx.fillStyle = 'blue';
        ctx.fillRect(pixelPosition + this.stairStepWidth*2,  this.groundReference - this.stairStepHeight*2, this.stairswidth - this.stairStepWidth*2, this.stairStepHeight);
        
        ctx.fillStyle = 'red';
        ctx.fillRect(pixelPosition + this.stairStepWidth*3,  this.groundReference - this.stairStepHeight*3, this.stairswidth - this.stairStepWidth*3, this.stairStepHeight);
        ctx.fillStyle = 'black';
        ctx.fillRect(pixelPosition + this.stairStepWidth*4,  this.groundReference - this.stairStepHeight*4, this.stairswidth - this.stairStepWidth*4, this.stairStepHeight);
        return pixelPosition + this.stairswidth;
    }
    updateStairs(pixelPosition, color, level) {
            if (level === 'level up') {
                this.groundReference = 140;
                this.pixelPosition = pixelPosition;
                return this.drawStairs(this.pixelPosition, color);
            }
            this.pixelPosition = pixelPosition;
            return this.drawStairs(this.pixelPosition, color);  
        }
}


class Block {
    constructor () {
        // this.x = x;
        // this.y = y;
        this.w = 40;
        this.h = 40; 
        this.pixelPosition;

    }
    drawBlock(pixelPosition, color, groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition, groundReference, this.w, this.h);
        return pixelPosition + this.w;
    }

    updateBlock(pixelPosition, color,  groundReference) {
        this.pixelPosition = pixelPosition; 
        return this.drawBlock(this.pixelPosition, color, groundReference);
    }
}

class Platform {
    constructor() {
        this.w = 200;
        this.h = 100;
        this.pixelPosition;
    }

    drawPlatform(pixelPosition, color, groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition, groundReference, this.w, this.h);
        return pixelPosition + this.w;
    }

    updatePlatform(pixelPosition, color,  groundReference) {
        this.pixelPosition = pixelPosition; 
        return this.drawPlatform(this.pixelPosition, color, groundReference);
    }
}

class StairsDown {
    constructor () {
        this.pixelPosition;
        this.groundReference = 240;
        this.stairStepWidth = 40;
        this.stairStepHeight = 20;
        this.stairswidth = 5*this.stairStepWidth;
        this.stairHeight = 5*this.stairStepHeight;
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
            return this.drawStairs(this.pixelPosition, color);
        }
        this.groundReference = 240;
        this.pixelPosition = pixelPosition;
        return this.drawStairs(this.pixelPosition, color);  
    }
}

class Tunnel {
    constructor () {
        this.w = 500;
        this.h;
        this.pixelPosition;
        this.groundReference;
    }
    drawTunnel(pixelPosition, color,  height, groundReference) {
        ctx.fillStyle = color;
        ctx.fillRect(pixelPosition, groundReference, 500, height);
        return pixelPosition + this.w;
    }

    updateTunnel(pixelPosition, color, height, groundReference) {
        this.pixelPosition = pixelPosition;
        this.groundReference = groundReference;
        return this.drawTunnel(pixelPosition, color, height, this.groundReference);
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
    }
    show(pixelPosition) {
        if (!this.img) return;
        ctx.drawImage(this.img, pixelPosition, 200, this.w, this.h);
    }
    update(pixelPosition) {
        this.pixelPosition = pixelPosition;
        this.show(this.pixelPosition);
    }
}