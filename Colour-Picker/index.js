// Step 1: Get all needed elements from HTML
const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
const newRoundBtn = document.querySelector('#newRoundBtn');

const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
const btnTrack = document.querySelector('.color-box-container');

// Step 2: Variables for scores and game state
var currentStreak = 0;
var bestStreak = 0;
var color = [];
var num = 6; // Number of colors shown, depending on difficulty (6 = hard default)
var pickCorrectColor = '';

// Step 3: Load on page load or reset
function webLoad() {
    onLoad();
    displayContent();
    setGame();
}

function onLoad() {
    var temp = localStorage.getItem('bestStreak');
    bestStreak = temp != null ? parseInt(temp) : 0;
}

function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}

// Step 4: Generate random RGB color string
function changeColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

// Step 5: Generate array of random colors of length num
function genrateColor(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(changeColor());
    }
    return arr;
}

// Step 6: Pick a random color from the color array
function pickGenrator() {
    const idx = Math.floor(Math.random() * color.length);
    return color[idx];
}

// Step 7: Setup game board with colors and display correct one
function setGame() {
    color = genrateColor(num);
    pickCorrectColor = pickGenrator();
    colorDisplay.textContent = pickCorrectColor;
    messageDisplay.textContent = '';

    for (var j = 0; j < colorBoxes.length; j++) {
        if (color[j]) {
            colorBoxes[j].style.backgroundColor = color[j];
            colorBoxes[j].style.display = 'block';
            colorBoxes[j].disabled = false;
            colorBoxes[j].style.opacity = "1";
            colorBoxes[j].style.cursor = "pointer";
        } else {
            colorBoxes[j].style.display = 'none'; // Hide unused boxes in easy mode
        }
    }
}

// Disable wrong clicked button
function disableWrongButton(element) {
    element.disabled = true;
    element.style.opacity = "0.3";
    element.style.cursor = "not-allowed";
}

// Change all boxes to correct color
function colorAllBoxes(color) {
    colorBoxes.forEach(box => {
        box.style.backgroundColor = color;
        box.disabled = true;
    });
}

// Step 8: Handle color box clicks for guessing
function trackBtn(event) {
    var element = event.target;
    if (!element.classList.contains('color-box')) return;
    var rgb = element.style.backgroundColor;

    if (pickCorrectColor === rgb) {
        // ✅ Player wins
        messageDisplay.textContent = "You Win Bro!";
        currentStreak++;
        displayContent();

        // Change all boxes to the correct color
        colorAllBoxes(pickCorrectColor);

        // Ensure all boxes are fully visible
        colorBoxes.forEach(box => {
            box.style.opacity = "1";
            box.style.cursor = "pointer";
        });

        // Update best streak if needed
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
            localStorage.setItem('bestStreak', bestStreak);
        }

        // Wait briefly, then load next round
        setTimeout(() => {
            colorBoxes.forEach(box => box.disabled = false);
            setGame();
        }, 500);

    } else {
        // ❌ Wrong answer
        messageDisplay.textContent = "Try Again Bruh";
        disableWrongButton(element); // disable clicked wrong box
        currentStreak = 0;
        displayContent();
    }
}

// Step 9: Difficulty selector - easy (3 colors), hard (6 colors)
function setDifficulty(mode) {
    if (mode === 'easy') {
        num = 3;
        easyBtn.classList.add('selected');
        hardBtn.classList.remove('selected');
    } else if (mode === 'hard') {
        num = 6;
        hardBtn.classList.add('selected');
        easyBtn.classList.remove('selected');
    }
    currentStreak = 0;
    displayContent();
    setGame();
}

// Step 10: Reset streaks
function resetStreak() {
    currentStreak = 0;
    bestStreak = 0;
    localStorage.removeItem('bestStreak');
    displayContent();
    messageDisplay.textContent = "Streaks reset!";
    setGame();
}

// Step 11: Event listeners
btnTrack.addEventListener('click', trackBtn);
newRoundBtn.addEventListener('click', setGame);
easyBtn.addEventListener('click', () => setDifficulty('easy'));
hardBtn.addEventListener('click', () => setDifficulty('hard'));
resetStreakBtn.addEventListener('click', resetStreak);

// Initialize game on page load
webLoad();