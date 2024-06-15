const ball = document.querySelector(".ball");
const whole = document.querySelector(".whole");
const food = document.querySelector(".teleport");

const speedRatio = 30;
let ballSpeedX = 0;
let ballSpeedY = 0;
let ballX = 0;
let ballY = 0;

window.addEventListener("deviceorientation", handleOrientation);

const gameArea = document.querySelector(".gameArea");

function handleOrientation(event) {
  const beta = event.beta;
  const gamma = event.gamma;

  ballSpeedX = gamma / speedRatio;
  ballSpeedY = (beta - 90) / speedRatio;
}

function animate() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
  requestAnimationFrame(animate);
}

animate();
