let gameSeq = [];
let userSeq = [];

let btnColors = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];  // Reset user sequence for the new level
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Correct the random index range
    let randColor = btnColors[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
   
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function btnPress() {
    let clickedBtn = this.classList[1]; // Get the class name (color) of the button
    userSeq.push(clickedBtn);
    userFlash(this);
    
    checkUserInput(userSeq.length - 1);
}

function checkUserInput(currentLevel) {
    if (gameSeq[currentLevel] === userSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Move to the next level after a delay
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    h2.innerText = "Game Over, Press Any Key to Restart";
    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
        document.querySelector("body").classList.remove("game-over");
    }, 200);

    resetGame();
}

function resetGame() {
    gameSeq = [];
    started = false;
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (let button of allBtns) { // Avoid reusing the global 'btn'
    button.addEventListener("click", btnPress);
}
