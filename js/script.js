const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snake, direction, isGameOver, lastTime, speed, score;

function initializeGame() {
    snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    direction = { x: 0, y: 1 };
    isGameOver = false;
    lastTime = 0;
    speed = 100; // Time in milliseconds between updates
    score = 0;
    document.getElementById('gameOverMessage').style.display = 'none'; // Hide Game Over message
    document.getElementById('score').textContent = `Score: ${score}`;
    update();
}

function drawMatrixRain() {
    const cols = Math.floor(canvas.width / 20);
    for (let i = 0; i < cols; i++) {
        const char = Math.random() < 0.5 ? '|' : ' ';
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.font = '20px monospace';
        ctx.fillText(char, i * 20, Math.random() * canvas.height);
    }
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    }
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * 20, y: snake[0].y + direction.y * 20 };

    // Check for collisions with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        isGameOver = true;
        return;
    }

    snake.unshift(head);
    snake.pop(); // Remove the tail
}

function update(timestamp) {
    if (isGameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '50px monospace';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2 - 30);
        document.getElementById('gameOverMessage').style.display = 'block'; // Show Game Over message
        return;
    }

    if (timestamp - lastTime > speed) {
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMatrixRain();
        moveSnake();
        drawSnake();
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
});

document.getElementById('restartButton').addEventListener('click', initializeGame);

// Start the game for the first time
initializeGame();
