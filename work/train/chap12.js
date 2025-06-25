var trainSpeed = 250;
var trainPosition = 0;
var animation;

var train = document.getElementById("train");
var smoke = document.getElementById("smoke");
var speedDisplay = document.getElementById("speedDisplay");
var stopButton = document.getElementById("stopButton");
var restartButton = document.getElementById("restartButton");

var movingSound = document.getElementById("whistle");
var crashSound = document.getElementById("crash");

train.addEventListener("click", speedUp);
stopButton.addEventListener("click", stopTrain);
restartButton.addEventListener("click", resetTrain);

function speedUp() {
    if (trainSpeed > 10) {
        trainSpeed -= 10;
    }

    speedDisplay.innerText = "Speed: " + trainSpeed + "ms";

    clearInterval(animation);
    animation = setInterval(frame, trainSpeed);

    playSound();

    // Puff of smoke
    smoke.style.opacity = 1;
    smoke.style.left = (trainPosition + 40) + "px";
    smoke.innerText = "💨";
    setTimeout(() => smoke.style.opacity = 0, 300);
}

function frame() {
    trainPosition += 2;
    train.style.left = trainPosition + "px";

    if (trainPosition >= window.innerWidth - 100) {
        crash();
    }
}

function crash() {
    alert("💥 CRASH! 🚆");
    train.classList.add("shake");
    crashSound.play();
    stopSound();
    clearInterval(animation);

    setTimeout(() => {
        train.classList.remove("shake");
    }, 1200);
}

function stopTrain() {
    clearInterval(animation);
    stopSound();
}

function resetTrain() {
    trainSpeed = 250;
    trainPosition = 0;
    train.style.left = "0px";
    speedDisplay.innerText = "Speed: 250ms";
    stopSound();
}

function playSound() {
    movingSound.loop = true;
    movingSound.volume = 0.3;
    if (movingSound.paused) {
        movingSound.play();
    }
}

function stopSound() {
    movingSound.pause();
    movingSound.currentTime = 0;
}

document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();
    if (key === "arrowright" || key === "d") {
        speedUp();
    } else if (key === "arrowleft" || key === "a") {
        stopTrain();
    } else if (key === "r") {
        resetTrain();
    }
});
