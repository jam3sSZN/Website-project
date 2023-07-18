
class Ball {
    constructor(x, y, vx, vy, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
    }
    
    draw() {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    bounceWall() {
        //top wall
        if (this.y < this.r) {
            this.vy = 1.1 * Math.abs(this.vy);
        } 
        //bottom wall
        if (this.y > BOARDHEIGHT - this.r) {
            this.vy = -1.1 * Math.abs(this.vy); 
        } 
    }

    bouncePaddleL(paddle) {
        if (this.x - this.r > paddle.w) return false;
        if (this.x - this.r < 0) return true;
        if (this.y < paddle.y) return false;
        if (this.y > paddle.y + paddle.l) return false;
        if (this.vx < 0) {
            this.vx = PADDLEFORCE * Math.abs(this.vx);
            let paddlePos = (this.y - paddle.y - paddle.l/2) / paddle.l * 2; // between -1.0 and 1.0
            this.vy = this.vy + paddlePos*PADDLESPIN;
        }
        return false;
    }

    bouncePaddleR(paddle) {
        if (this.x + this.r < paddle.x) return false;
        if (this.x + this.r > paddle.x + paddle.w) return true;
        if (this.y < paddle.y) return false;
        if (this.y > paddle.y + paddle.l) return false;
        if (this.vx > 0) {
            this.vx = -PADDLEFORCE * Math.abs(this.vx);
            let paddlePos = (this.y - paddle.y - paddle.l/2) / paddle.l * 2; // between -1.0 and 1.0
            this.vy = this.vy + paddlePos*PADDLESPIN;
        }
        return false;
    }



    move() {
        this.x += this.vx;
        this.y += this.vy
    }
}

