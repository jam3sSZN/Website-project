const gameboard = document.getElementById
("gameboard");
const ctx = gameboard.getContext("2d");

const BOARDHEIGHT = 500;
const BOARDWIDTH = 500;

let ball = new Ball(250,250,1,1,12.5);
let paddleL = new Paddle(0, 0, 100, 25, "red");
let paddleR = new Paddle(475, 0 ,100, 25, "blue");

function clearBoard() {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, 500, 500);
}

function resetGame() {
    clearBoard();
    ball.draw();
    paddleL.draw();
    paddleR.draw();
    
}
let intervalID;

function nexTick() {
    IntervalID = setTimeout(
        () => {
            paddleL.move()
            paddleR.move()
            //movePaddles()
            //checkPaddle()
            //checkwall()
            //moveBall()

            
            draw();
            nexTick();
        }, 10
        );
    }
    function restGame(){
        clearInterval(intervalID);
        draw();
        nexTick();
    }


    const UPARROW = 38;
    const DOWNARROW = 40;
    const WKEY = 87;
    const SKEY = 83;
    
    window.addEventListener("keydown", keyDown);
    function keyDown(event) {
        const key = event.Keycode;
        console.log ('KEYDOWN: ${key}')
        switch(key) {
            case (UPARROW):
            paddleR.vy
            break;
            case (DOWNARROW):
            paddleR.vy = 1;
            break;
            case (WKEY):
            paddleL.vy = -1;
            break;
            case (SKEY):
            paddleL.vy = 1;
            break;
        }
    }
    
    
    window.addEventListener("keyup", keyup);
    function keyup(event) {
        const key = event.Keycode;
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