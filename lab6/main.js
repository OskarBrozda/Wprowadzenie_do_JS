const ball = document.querySelector(".ball");
const whole = document.querySelector(".whole");
const teleports = document.querySelectorAll(".teleport");
const food = document.querySelector(".food");
const gameArea = document.querySelector(".gameArea");
const scoreDisplay = document.querySelector(".score");
const gameOverDisplay = document.querySelector(".gameOver");

const speedRatio = 30;
let ballSpeedX = 0;
let ballSpeedY = 0;
let ballX = 0;
let ballY = 0;

let colissionCounter = 0;
let score = 0;

let wholeSpeedX = 1;
let wholeSpeedY = 1;
let wholeX = Math.random() * (gameArea.offsetWidth - whole.offsetWidth);
let wholeY = Math.random() * (gameArea.offsetHeight - whole.offsetHeight);

let teleportPositions = [];
let teleportActive = [];

teleports.forEach((teleport, index) => {
  teleportPositions.push({
    x: Math.random() * (gameArea.offsetWidth - teleport.offsetWidth),
    y: Math.random() * (gameArea.offsetHeight - teleport.offsetHeight),
  });
  teleport.style.transform = `translate(${teleportPositions[index].x}px, ${teleportPositions[index].y}px)`;
  teleportActive.push(true);
});

let foodX = Math.random() * (gameArea.offsetWidth - food.offsetWidth);
let foodY = Math.random() * (gameArea.offsetHeight - food.offsetHeight);
food.style.transform = `translate(${foodX}px, ${foodY}px)`;

window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(event) {
  if (colissionCounter === 1) {
    const beta = event.beta;
    const gamma = event.gamma;

    ballSpeedX = gamma / speedRatio;
    ballSpeedY = (beta - 90) / speedRatio;
  }
}

function animateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    ballX = 0;
  } else if (ballX > gameArea.offsetWidth - ball.offsetWidth) {
    ballX = gameArea.offsetWidth - ball.offsetWidth;
  }

  if (ballY < 0) {
    ballY = 0;
  } else if (ballY > gameArea.offsetHeight - ball.offsetHeight) {
    ballY = gameArea.offsetHeight - ball.offsetHeight;
  }

  ball.style.transform = `translate(${ballX}px, ${ballY}px)`;

  checkCollision();
  requestAnimationFrame(animateBall);
}

function animateWhole() {
  wholeX += wholeSpeedX;
  wholeY += wholeSpeedY;

  if (wholeX < 0 || wholeX > gameArea.offsetWidth - whole.offsetWidth) {
    wholeSpeedX = -wholeSpeedX;
  }
  if (wholeY < 0 || wholeY > gameArea.offsetHeight - whole.offsetHeight) {
    wholeSpeedY = -wholeSpeedY;
  }
  whole.style.transform = `translate(${wholeX}px, ${wholeY}px)`;
  requestAnimationFrame(animateWhole);
}

function checkCollision() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  const wholeRect = whole.getBoundingClientRect();
  const foodRect = food.getBoundingClientRect();

  if (
    ballRect.right >= wholeRect.left &&
    ballRect.left <= wholeRect.right &&
    ballRect.bottom >= wholeRect.top &&
    ballRect.top <= wholeRect.bottom
  ) {
    if (colissionCounter === 1) {
      gameOver();
    }
    colissionCounter++;
  }

  if (
    ballRect.right >= foodRect.left &&
    ballRect.left <= foodRect.right &&
    ballRect.bottom >= foodRect.top &&
    ballRect.top <= foodRect.bottom
  ) {
    score++;
    scoreDisplay.textContent = score;
    resetFoodPosition();
  }

  teleports.forEach((teleport, index) => {
    if (!teleportActive[index]) return;

    const teleportRect = teleport.getBoundingClientRect();

    if (
      ballRect.right >= teleportRect.left &&
      ballRect.left <= teleportRect.right &&
      ballRect.bottom >= teleportRect.top &&
      ballRect.top <= teleportRect.bottom
    ) {
      const targetIndex = (index + 1) % teleports.length;
      const targetTeleport = teleports[targetIndex];
      const targetRect = targetTeleport.getBoundingClientRect();

      ballX =
        targetRect.left -
        gameAreaRect.left +
        (targetRect.width - ballRect.width) / 2;
      ballY =
        targetRect.top -
        gameAreaRect.top +
        (targetRect.height - ballRect.height) / 2;

      ball.style.transform = `translate(${ballX}px, ${ballY}px)`;

      teleportActive[targetIndex] = false;
      setTimeout(() => {
        teleportActive[targetIndex] = true;
      }, 2000);
    }
  });
}

function resetFoodPosition() {
  foodX = Math.random() * (gameArea.offsetWidth - food.offsetWidth);
  foodY = Math.random() * (gameArea.offsetHeight - food.offsetHeight);
  food.style.transform = `translate(${foodX}px, ${foodY}px)`;
}

function gameOver() {
  gameOverDisplay.style.display = "block";
  ballSpeedX = 0;
  ballSpeedY = 0;
  wholeSpeedX = 0;
  wholeSpeedY = 0;
  window.removeEventListener("deviceorientation", handleOrientation);
}

animateBall();
animateWhole();
