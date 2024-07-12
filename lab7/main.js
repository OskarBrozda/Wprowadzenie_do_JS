let distance = 100;
let gameState = "stopped";
let force = 5;

const ballSize = 5;
const noOfBalls = 100;
const balls = [];

const canvasWidth = 1000;
const canvasHeight = 500;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;
let isMousePressed = false;

function createBall(id) {
  let ballX = Math.random() * (canvasWidth - ballSize);
  let ballY = Math.random() * (canvasHeight - ballSize);
  let ballDirectionX = Math.random() * 2 - 1;
  let ballDirectionY = Math.random() * 2 - 1;

  function calcDistance(ballToConnect) {
    return Math.sqrt(
      Math.pow(ballToConnect.ballX - ballX, 2) +
        Math.pow(ballToConnect.ballY - ballY, 2)
    );
  }

  function drawConnections() {
    balls.forEach((ballToConnect) => {
      if (calcDistance(ballToConnect) < distance) {
        ctx.beginPath();
        ctx.moveTo(ballX, ballY);
        ctx.lineTo(ballToConnect.ballX, ballToConnect.ballY);
        ctx.strokeStyle = "black";
        ctx.stroke();
      }
    });
  }

  function applyMouseForce() {
    if (isMousePressed) {
      const distToMouse = Math.sqrt(
        Math.pow(mouseX - ballX, 2) + Math.pow(mouseY - ballY, 2)
      );
      if (distToMouse < distance) {
        const angle = Math.atan2(mouseY - ballY, mouseX - ballX);
        ballDirectionX += (Math.cos(angle) * force) / distToMouse;
        ballDirectionY += (Math.sin(angle) * force) / distToMouse;
      }
    }
  }

  function render(ctx, ball) {
    ballX += ballDirectionX;
    ballY += ballDirectionY;

    if (ballX <= ballSize || ballX >= canvasWidth - ballSize) {
      ballDirectionX *= -1;
    }

    if (ballY <= ballSize || ballY >= canvasHeight - ballSize) {
      ballDirectionY *= -1;
    }

    applyMouseForce();
    drawConnections();

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill();

    ball.ballX = ballX;
    ball.ballY = ballY;
  }

  return { id, render, distance, ballX, ballY };
}

function createBalls() {
  for (let i = 0; i < noOfBalls; i++) {
    const newBall = createBall(i);
    balls.push(newBall);
  }
}

function drawBalls() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  balls.forEach((ball) => ball.render(ctx, ball));

  if (gameState === "started") {
    requestAnimationFrame(drawBalls);
  }
}

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
}

canvas.addEventListener("mousemove", getMousePos);
canvas.addEventListener("mousedown", () => (isMousePressed = true));
canvas.addEventListener("mouseup", () => (isMousePressed = false));

canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const clickX = evt.clientX - rect.left;
  const clickY = evt.clientY - rect.top;

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const dist = Math.sqrt(
      Math.pow(clickX - ball.ballX, 2) + Math.pow(clickY - ball.ballY, 2)
    );
    if (dist < ballSize) {
      balls.splice(i, 1);
      balls.push(createBall(balls.length), createBall(balls.length + 1));
      break;
    }
  }
});

createBalls();
drawBalls();

document.querySelector("#distanceRange").addEventListener("input", function () {
  distance = this.value;
  document.querySelector("#distanceValue").textContent = distance;
});

document.querySelector("#forceRange").addEventListener("input", function () {
  force = this.value;
  document.querySelector("#forceValue").textContent = force;
});

const startButton = document.querySelector("#start");

startButton.addEventListener("click", function () {
  gameState = gameState === "started" ? "stopped" : "started";
  startButton.textContent = gameState === "stopped" ? "Start" : "Stop";

  if (gameState === "started") requestAnimationFrame(drawBalls);
});

document.querySelector("#reset").addEventListener("click", () => {
  startButton.textContent = "Start";
  gameState = "stopped";

  balls.length = 0;
  createBalls();

  drawBalls();
});
