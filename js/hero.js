class Hero {
    constructor (x, y) {
        //attributes
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 20;
        this.vx = 0;
        this.vy = 0;
        this.zeroPotential = canvas.height - 40 - this.h
        this.gravity = 2;
        this.jumpStrength = 10;
        this.jumpSegmentation = 1;
    }
    
    draw() {
        ctx.fillStyle = 'orange'
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
        if (this.y === this.zeroPotential) {
            this.vy = 0;    
        } 
        else {
            this.y  += this.vy;
            this.vy = 0;
        }
        this.draw(); 
    }

    jump() {
        if (this.vy !== 0) return;
        this.vy -= this.jumpSegmentation;
        // console.log(this.vy);
    }
}