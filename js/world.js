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
        this.nextPixelPosition;
        this.worldLength = 5000;
        this.currentPixelLocation = 0;
        this.speedX = 0;
        img.src = "ironCertificate.png";
        this.stairsUp1 = new StairsUp(200, 160);
        this.ground = new Ground();
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
      
    // drawWorld() {
    //     this.traceGround();
    //     currentPixelPosition = this.addStairsUp(200, 'black');
    //     this.addBlockObstacle(currentPixelPosition + 20, 'black', 260 - this.stairHeight - 40);
    //     currentPixelPosition = this.addElevatedTerrain(currentPixelPosition, 'black', 200, this.stairHeight, 260 - this.stairHeight);
    //     currentPixelPosition = this.addStairsDown(currentPixelPosition, 'black');
    //     // ctx.restore();
    //     this.addBlockObstacle(currentPixelPosition + 150, 'black', 260 - 40);
    //     currentPixelPosition = this.addStairsUp(currentPixelPosition + 300, 'black');
    //     currentPixelPosition = this.addElevatedTerrain(currentPixelPosition, 'black', this.stairswidth, this.stairHeight, 260 - this.stairHeight);
    //     this.addElevatedTerrain(currentPixelPosition, 'black', this.stairswidth, this.stairHeight, 260 - this.stairHeight);
    //     currentPixelPosition = this.addStairsUp(currentPixelPosition, 'black', this.groundReference - this.stairHeight);
    //     this.addElevatedTerrain(currentPixelPosition, 'black', this.stairswidth, this.stairHeight, 260 - this.stairHeight);
    //     currentPixelPosition = this.addElevatedTerrain(currentPixelPosition, 'black', this.stairswidth, this.stairHeight, 260 - 2*this.stairHeight);
    //     this.addElevatedTerrain(currentPixelPosition, 'black', this.stairswidth, this.stairHeight, 260 - this.stairHeight);
    //     this.addElevatedTerrain(currentPixelPosition, 'black', this.stairswidth, this.stairHeight, 260 - this.stairHeight);
    //     this.addStairsDown(currentPixelPosition, 'black', this.groundReference - this.stairHeight);
    //     this.addTunnel(currentPixelPosition + 100, 'black', 100, this.groundReference - this.stairHeight - 200 );
    //     this.addTunnel(currentPixelPosition + 200, 'black',  75, 0);
    //     currentPixelPosition = this.addElevatedTerrain(currentPixelPosition + 200, 'black', this.stairswidth, this.stairHeight, 260 - this.stairHeight);
    //     currentPixelPosition = currentPixelPosition = this.addStairsDown(currentPixelPosition, 'black');
    //     this.addBlockObstacle(currentPixelPosition + 150, 'black', 260 - 40);
    //     this.addTunnel(currentPixelPosition + 100, 'black', 100, this.groundReference - this.stairHeight - 200 );
    //     currentPixelPosition = this.addTunnel(currentPixelPosition, 'black',  150, 0);
    //     this.addTunnel(currentPixelPosition, 'black',  150, 0);
    //     currentPixelPosition = this.addBlockObstacle(currentPixelPosition + 150, 'black', 260 - 40);
    //     //show certificate
    //     this.ironCertificate(currentPixelPosition + 700, 200);
    //   }
    //   drawWorld() {
    //       this.currentPixelPosition = stairsUp1.drawStairs(200, 'black');
    //   }
    updateWorld() {
        this.ground.updateGround(this.speedX);
        this.nextPixelPosition = this.stairsUp1.updateStairs(this.speedX, 'black');
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

class StairsUp {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.pixelPosition = x;
        this.groundReference = 240;
        this.stairStepWidth = 40;
        this.stairStepHeight = 20;
        this.stairswidth = 5*this.stairStepWidth;
        this.stairHeight = 5*this.stairStepHeight;
    }

    drawStairs(pixelPosition, color, groundReference = this.groundReference) {
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
    updateStairs(speedX, color, groundReference = this.groundReference) {
        this.pixelPosition += speedX;
        this.drawStairs(this.pixelPosition, color, groundReference = this.groundReference);
    }
}