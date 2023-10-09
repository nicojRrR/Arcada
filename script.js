const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Керування курсором
gameContainer.addEventListener('mousemove', (e) => {
    player.style.left = `${e.clientX - player.clientWidth / 2}px`;
});

// Створення противників
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = `${Math.random() * (gameContainer.clientWidth - 30)}px`;
    gameContainer.appendChild(obstacle);

    obstacle.addEventListener('animationiteration', (event) => {
        event.currentTarget.remove();
        score++;
        scoreDisplay.textContent = `Рахунок: ${score}`;
    });
}

setInterval(createObstacle, 50);


// Перевірка зіткнення
function checkCollision() {
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach((obstacle) => {
        if (player.getBoundingClientRect().bottom > obstacle.getBoundingClientRect().top &&
            player.getBoundingClientRect().top < obstacle.getBoundingClientRect().bottom &&
            player.getBoundingClientRect().right > obstacle.getBoundingClientRect().left &&
            player.getBoundingClientRect().left < obstacle.getBoundingClientRect().right) {
            gameOver();
        }
    });
}


// Кінець гри
function gameOver() {
    alert(`Гра закінчена! Ваш рахунок: ${score}`);
    location.reload(); // Перезавантажити гру
}

setInterval(checkCollision, 10);
