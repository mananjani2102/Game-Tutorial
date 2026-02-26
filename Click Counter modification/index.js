const currentScoreDisplay = document.querySelector('#currentScore');
const highScoreDisplay = document.querySelector('#highScore');
const timerDisplay = document.querySelector('#timer');
const clickButton = document.querySelector('#clickButton');
const startButton = document.querySelector('#startButton');
const resetHighScoreButton = document.querySelector('#resetHighScoreButton');
const statusMessage = document.querySelector('#statusMessage');
const celebrationVideo = document.querySelector('#celebrationVideo');

let currentScore = 0;
let highScore = 0;
const GAME_DURATION = 10; // New constant for game duration
let timeRemaining = GAME_DURATION;
let gameTimerId = null;
let isGameActive = false;
let isPaused = false;
let buttonScale = 1.0; // Variable for button scaling

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

    // 1. Click Counter Turns Red When > 20
    if (currentScore > 20) {
        currentScoreDisplay.style.color = 'red';
    } else {
        currentScoreDisplay.style.color = 'white'; // Reset to default (or whatever CSS sets)
    }
}

function updateStatus(message) {
    statusMessage.innerText = message;
}

function startGame() {
    // Stop any existing game/timer
    clearInterval(gameTimerId);
    if (celebrationVideo) {
        celebrationVideo.style.display = 'none';
        celebrationVideo.pause();
        celebrationVideo.currentTime = 0;
    }

    currentScore = 0;
    timeRemaining = GAME_DURATION;
    isGameActive = true;
    isPaused = false;
    buttonScale = 1.0; // Reset button scale
    clickButton.style.transform = 'scale(1.0)'; // Reset button style
    clickButton.disabled = false;
    startButton.disabled = true;
    updateDisplay();
    updateStatus('Game in progress... Click fast!');

    // 2. "Click Me!" Message Flashes on Start
    clickButton.innerText = "Click Me!";
    setTimeout(() => {
        if (isGameActive && !isPaused) {
            clickButton.innerText = "Click Me!"; // Keep default text
        }
    }, 1000);

    // 5. Start Button Says "Play Again" After Game - Reset text
    startButton.innerText = "Start Game";

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
    isPaused = false; // Ensure pause state is reset

    if (clickButton) {
        clickButton.disabled = true;
        clickButton.style.transform = 'scale(1.0)'; // Reset button style
    }
    if (startButton) startButton.disabled = false;

    // 5. Start Button Says "Play Again" After Game
    startButton.innerText = "Play Again";

    const cps = (currentScore / GAME_DURATION).toFixed(2); // Calculate CPS

    if (currentScore > highScore) {
        saveHighScore();
        // 4. Show Clicks Per Second (CPS) & 6. Confetti on New High Score
        updateStatus(`🎉 New High Score: ${currentScore} | Your CPS: ${cps} clicks/s!`);

        // 6. Confetti on New High Score (Yellow Flash)
        document.body.style.background = 'gold';
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 1000);

        if (celebrationVideo) {
            celebrationVideo.style.display = 'block';
            celebrationVideo.play();
            setTimeout(() => {
                celebrationVideo.style.display = 'none';
                celebrationVideo.pause();
                celebrationVideo.currentTime = 0;
            }, 5000);
        }
    } else {
        // 4. Show Clicks Per Second (CPS)
        updateStatus(`Game Over! Your score: ${currentScore} | Your CPS: ${cps} clicks/s.`);
        if (celebrationVideo) {
            celebrationVideo.style.display = 'none';
            celebrationVideo.pause();
            celebrationVideo.currentTime = 0;
        }
    }

    updateDisplay();
}


function pauseGame() {
    if (!isGameActive || isPaused || timeRemaining <= 0) return;
    clearInterval(gameTimerId);
    isPaused = true;
    clickButton.disabled = true;
    updateStatus('⏸ Game Paused');
}

function resumeGame() {
    if (!isGameActive || !isPaused || timeRemaining <= 0) return;
    isPaused = false;
    clickButton.disabled = false;
    updateStatus('▶ Game Resumed! Click fast!');
    gameTimerId = setInterval(() => {
        timeRemaining--;
        updateDisplay();
        if (timeRemaining <= 0) endGame();
    }, 1000);
}

function handleClick(event) {
    if (!isGameActive || isPaused) return;

    // Check if the click is the primary (left) or secondary (right) mouse button
    // This allows both left and right clicks to count if the contextmenu prevention is active
    if (event.button === 0 || event.button === 2) {
        currentScore++;
        updateDisplay();

        // 3. Button Grows When You Click
        // Increase scale by 0.1, up to a maximum of 2.0 (2x size)
        buttonScale = Math.min(buttonScale + 0.1, 2.0);
        clickButton.style.transform = `scale(${buttonScale})`;
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

// Prevents the context menu from showing up on right-click
document.addEventListener('contextmenu', event => event.preventDefault());

// Event Listeners
if (pauseButton) pauseButton.addEventListener('click', pauseGame);
if (resumeButton) resumeButton.addEventListener('click', resumeGame);
// Use 'mousedown' to capture quick clicks, including both mouse buttons if desired
clickButton.addEventListener('mousedown', handleClick); 
startButton.addEventListener('click', startGame);
if (resetHighScoreButton) resetHighScoreButton.addEventListener('click', resetHighScore);

initializeGame();