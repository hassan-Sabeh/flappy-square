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
        this.zeroPotential = {
            upper: 240,
            lower: canvas.height - 40 - this.h,
        }
        this.gravity = 2;
        this.jumpStrength = 10   ;
        this.jumpSegmentation = 2;
        this.fallingState = false;
    }
          
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  
    update() {
        if (this.vy < 0 && this.vy > -1*this.jumpStrength) {
            this.vy -= this.jumpSegmentation
            this.y += this.vy
            this.draw();            
            return;
        }
        this.vy += this.gravity;
        this.fallingState = true;
        if (this.y === this.zeroPotential.lower || this.y === this.zeroPotential.upper) {
            this.vy = 0;    
            this.fallingState = false;
        } 
        else {
            this.y  += this.vy;
            this.vy = 0;
        }
        this.draw();
        this.zeroPotential = [0];
    }
    
    jump() {
        if (this.vy !== 0) return;
        this.vy -= this.jumpSegmentation;
    }
}