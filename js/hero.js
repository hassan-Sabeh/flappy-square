class Hero {
    constructor (x, y) {
        //attributes
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 20;
        
        this.vx = 0;
        this.vy = 0;
    }
    
    draw() {
        ctx.fillStyle = 'orange'
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(relativeXPosition) {
        //TODO
        this.x += relativeXPosition + this.vx;
        this.y  += this.vy;
        // reset vy
        this.vy = 0;
        this.draw();
    }

    jump() {
        this.vy -= 10;
    }
    
}