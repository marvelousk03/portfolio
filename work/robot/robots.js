const rightEye = document.getElementById("righteye");
const leftEye = document.getElementById("lefteye");
const leftArm = document.getElementById("leftarm");
const rightArm = document.getElementById("rightarm");
const mouth = document.getElementById("mouth");
const speech = document.getElementById("speech");
const powerBtn = document.getElementById("power-btn");

const music = new Audio("brz.mp3");

let poweredOn = true;

// Eye blinking
function blinkEyes() {
    if (!poweredOn) return;
    leftEye.style.opacity = "0";
    rightEye.style.opacity = "0";
    setTimeout(() => {
        leftEye.style.opacity = "1";
        rightEye.style.opacity = "1";
    }, 200);
}
setInterval(blinkEyes, 3000);

// Bounce
function bounce(part) {
    if (!poweredOn) return;
    part.style.transition = "transform 0.3s ease";
    part.style.transform = "translateY(-10px)";
    setTimeout(() => {
        part.style.transform = "translateY(0)";
    }, 300);
}

// Swing
function swing(part) {
    if (!poweredOn) return;
    part.style.transition = "transform 0.3s ease";
    part.style.transform = "rotate(20deg)";
    setTimeout(() => {
        part.style.transform = "rotate(0deg)";
    }, 300);
}

// Toggle music
function toggleMusic() {
    if (!poweredOn) return;
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// Power toggle
powerBtn.addEventListener("click", () => {
    poweredOn = !poweredOn;
    if (!poweredOn) {
        music.pause();
        speech.style.display = "none";
        document.querySelector(".robot").style.opacity = "0.3";
    } else {
        speech.style.display = "block";
        document.querySelector(".robot").style.opacity = "1";
    }
});

// Interactions
rightEye.addEventListener("click", () => {
    bounce(rightEye);
    toggleMusic();
});

leftEye.addEventListener("click", () => {
    bounce(leftEye);
    toggleMusic();
});

leftArm.addEventListener("click", () => {
    swing(leftArm);
    toggleMusic();
});

rightArm.addEventListener("click", () => {
    swing(rightArm);
    toggleMusic();
});

// Mouth hover
mouth.addEventListener("mouseover", () => {
    if (poweredOn) mouth.style.backgroundColor = "lime";
});

mouth.addEventListener("mouseout", () => {
    if (poweredOn) mouth.style.backgroundColor = "cyan";
});

// Show speech when powered on initially
window.onload = () => {
    if (poweredOn) speech.style.display = "block";
};
