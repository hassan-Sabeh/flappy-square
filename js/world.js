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
        this.worldLength = 5000;
        this.currentPixelLocation;
        this.groundReference = 240;
        this.stairStepWidth = 40;
        this.stairStepHeight = 20;
        this.stairswidth = 5*this.stairStepWidth;
        this.stairHeight = 5*this.stairStepHeight;
        img.src = "ironCertificate.png";
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
}