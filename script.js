import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

//Schleife/Rekursion, um Spiel zu starten
let lastTime;
function update(time) {

    if (lastTime != null) {
        const delta = time - lastTime;

        //Ball/ComputerPaddle Position ändern
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);

        //Hintergrund ändern
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
        document.documentElement.style.setProperty("--hue", hue + 0.01 * delta);

        //Abfrage für einen Lose Fall
        if (isLose()) handleLose();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

//Hat einer verloren?
function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}

//Händle das Verlieren
function handleLose() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;

    }
    ball.reset();
    computerPaddle.reset();
}

//SpielerPaddle folgt der Maus
document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

//Spiel Start
window.requestAnimationFrame(update);