const currentScoreDisplay = document.querySelector('#currentScore');
const highScoreDisplay = document.querySelector('#highScore');
const timerDisplay = document.querySelector('#timer');
const clickButton = document.querySelector('#clickButton');
const startButton = document.querySelector('#startButton');
const resetHighScoreButton = document.querySelector('#resetHighScoreButton');
const statusMessage = document.querySelector('#statusMessage');

let currentScore = 0;
let highScore = 0;
let timeRemaining = 10;
let gameTimerId = null;
let isGameActive = false;

function initializeGame() {
    loadHighScore();
    updateDisplay();
}

function loadHighScore() {
    const savedHighScore = localStorage.getItem('clickGameHighScore');
    if (savedHighScore !== null) {
        highScore = parseInt(savedHighScore);
    } else {
        highScore = 0;
    }
}

function saveHighScore() {
    localStorage.setItem('clickGameHighScore', currentScore);
    highScore = currentScore;
}

function updateDisplay() {
    currentScoreDisplay.innerText = currentScore;
    highScoreDisplay.innerText = highScore;
    timerDisplay.innerText = timeRemaining;
}

function updateStatus(message) {
    statusMessage.innerText = message;
}

function startGame() {
    currentScore = 0;
    timeRemaining = 10;
    isGameActive = true;
    clickButton.disabled = false;
    startButton.disabled = true;
    updateDisplay();
    updateStatus('Game in progress... Click fast!');
    gameTimerId = setInterval(function () {
        timeRemaining--;
        updateDisplay();
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameTimerId);
    gameTimerId = null;
    isGameActive = false;

    if (clickButton) clickButton.disabled = true;
    if (startButton) startButton.disabled = false;

    const video = document.querySelector('#celebrationVideo');

    if (currentScore > highScore) {
        saveHighScore();
        updateStatus(`🎉 New High Score: ${currentScore}! Amazing!`);
        if (video) {
            video.style.display = 'block';
            video.play();
            setTimeout(() => {
                video.style.display = 'none';
                video.pause();
                video.currentTime = 0;
            }, 5000); 
        }
    } else {
        updateStatus(`Game Over! Your score: ${currentScore}`);
        if (video) {
            video.style.display = 'none';
            video.pause();
            video.currentTime = 0;
        }
    }

    updateDisplay();
}


function handleClick() {
    if (isGameActive) {
        currentScore++;
        updateDisplay();
    }
}

function resetHighScore() {
    const confirmed = confirm('Are you sure you want to reset your high score?');
    if (confirmed) {
        localStorage.removeItem('clickGameHighScore');
        highScore = 0;
        updateDisplay();
        updateStatus('High score has been reset!');
    }
}

const pauseButton = document.querySelector('#pauseButton');
const resumeButton = document.querySelector('#resumeButton');
let isPaused = false;

function pauseGame() {
    if (!isGameActive || isPaused) return;
    clearInterval(gameTimerId);
    isPaused = true;
    clickButton.disabled = true;
    updateStatus('⏸ Game Paused');
}

function resumeGame() {
    if (!isGameActive || !isPaused) return;
    isPaused = false;
    clickButton.disabled = false;
    updateStatus('▶ Game Resumed! Click fast!');
    gameTimerId = setInterval(() => {
        timeRemaining--;
        updateDisplay();
        if (timeRemaining <= 0) endGame();
    }, 1000);
}

document.addEventListener('contextmenu', event => event.preventDefault());

function handleClick(event) {
    if (!isGameActive) return;

    if (event.button === 0 || event.button === 2) {
        currentScore++;
        updateDisplay();
    }
}


clickButton.addEventListener('mousedown', handleClick);



pauseButton.addEventListener('click', pauseGame);
if (pauseButton) pauseButton.addEventListener('click', pauseGame);
if (resumeButton) resumeButton.addEventListener('click', resumeGame);
clickButton.addEventListener('click', handleClick);
startButton.addEventListener('click', startGame);
if (resetHighScoreButton) resetHighScoreButton.addEventListener('click', resetHighScore);

initializeGame();