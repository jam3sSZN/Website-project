const gameboard = document.getElementById("gameboard");
const ctx = gameboard.getContext("2d");

const BOARDHEIGHT = 500;
const BOARDWIDTH = 500;
const PADDLESPIN = 1.5;
const PADDLEFORCE = 1.4;

let ball = new Ball(250,250,1,-4,12.5);
let paddleL = new Paddle(0, 0, 250, 25, "red");
let paddleR = new Paddle(475, 0 ,250, 25, "blue");

var grd = ctx.createLinearGradient(0, 0, 500, 0);
grd.addColorStop(0, "tan");
grd.addColorStop(1, "turquoise");

function clearBoard() { 
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 500, 500);
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(0, 0, 500, 500);
    ctx.moveTo(BOARDWIDTH/2, 0)
    ctx.lineTo(BOARDWIDTH/2,BOARDHEIGHT)
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
}

function updateScore() {
    const scoreBoard = document.getElementById("scoreboard")
    scoreBoard.innerHTML = `${scoreL} : ${scoreR}`;
    callWinner();
}

function draw() {
    clearBoard();
    
    paddleL.draw();
    paddleR.draw();
    ball.draw();
}
let intervalID;

function nextTick() {
    intervalID = setTimeout(
        () => {
            paddleL.move()
            paddleR.move()
            
            ball.bounceWall()
            
            if (ball.bouncePaddleL(paddleL) || (ball.x < 0)) score("right");
            
            if (ball.bouncePaddleR(paddleR)) score("left");
            ball.move();
            
            
            
            draw();
            nextTick();
        }, 10
        );
    }
    
    function score(player) {
        if (player == "left") scoreL++;
        if (player == "right") scoreR++;
        
        let vx = 1;
        if (player == "right") vx = -2;
        if (player == "left") vx = 2;
        ball = new Ball(250, 250, vx, -1, 12.5);
        updateScore();
    }

    function callWinner() {
        if (scoreL == 5) {
            alert("Red wins!")
            resetGame();
        }
        if (scoreR == 5) {
            alert("Blue wins!")
            resetGame();
        }
    }
    
    function resetGame(){
        clearInterval(intervalID);
        ball = new Ball(250, 250, 1, -1, 12.5);
        paddleL = new Paddle(0, 0, 140, 25, "red");
        paddleR = new Paddle(475, 0, 140, 25, "blue");
        scoreL = 0;
        scoreR = 0;
        draw();
        updateScore();
        nextTick();
    }
    
    function resetObjects() {
        ball = new Ball(250, 250, 1, -1, 12.5);
        paddleL = new Paddle(0, 0, 100, 25, "red");
        paddleR = new Paddle(475, 0, 100, 25, "blue");
    }
    
    
    const UPARROW = 38;
    const DOWNARROW = 40;
    const WKEY = 87;
    const SKEY = 83;
    const PADDLEVELOCITY = 5
    window.addEventListener("keydown", keyDown);
    function keyDown(event) {
        const key = event.keyCode;
        console.log (`KEYDOWN: ${key}`)
        switch(key) {
            case (UPARROW):
            paddleR.vy = -PADDLEVELOCITY;
            break;
            case (DOWNARROW):
            paddleR.vy = PADDLEVELOCITY;
            break;
            case (WKEY):
            paddleL.vy = -PADDLEVELOCITY;
            break;
            case (SKEY):
            paddleL.vy = PADDLEVELOCITY;
            break;
        }
    }
    
    
    window.addEventListener("keyup", keyup);
    function keyup(event) {
        const key = event.keyCode;
        // console.log(' KEYUP:   ${Key}')
        console.log ('KEYDOWN: ${key}')
        
        switch(key) {
            case (UPARROW):
            case (DOWNARROW):
            paddleR.vy = 0;
            break;
            case (WKEY):
            case (SKEY):
            paddleL.vy = 0;
            break;
        }
    }