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
        this.gravity = 1;
    }
    
    draw() {
        ctx.fillStyle = 'orange'
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    // update() {
    //     this.y  += this.vy;
    //     this.draw();
    //     if (this.y === this.zeroPotential) {
    //         this.vy = 0;    
    //     }
    //     else {
    //         this.vy += this.gravity;
    //         console.log(this.vy);
    //         // if (this.vy !== 0) this.vy += this.gravity;
    //         this.y  += this.vy;
    //         this.vy = 0;
    //         this.draw();
    //     }
    // }

    update() {
        this.y  += this.vy;
        this.draw();
        this.vy += this.gravity;
        if (this.y === this.zeroPotential) {
            this.vy = 0;    
        } 
        else {
            // if (this.vy !== 0) this.vy += this.gravity;
            // this.y  += this.vy;
            console.log(this.y)
            this.vy = 0;
        }
        console.log(this.vy);
    }

    jump() {
        this.vy -= 5;
    }
    
}