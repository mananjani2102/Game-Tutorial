const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const resumeBtn = document.querySelector('#resumeBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

var score = 0;
var time = 30;
var bestScore = 0;
var playGame = false;
var paused = false;
var gameId = null;

function webload() {
  onLoad();
  displayContent();
}

function onLoad() {
  var temp = localStorage.getItem('highScoreMole');
  bestScore = temp != null ? temp : 0;
}

function displayContent() {
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = time;
  maxScoreDisplay.textContent = bestScore;
}

function endGame() {
  clearInterval(gameId);
  playGame = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resumeBtn.disabled = true;

  if (score > bestScore) {
    localStorage.setItem('highScoreMole', score);
    bestScore = score;
    alert(`🎉 New High Score: ${score}`);
  } else {
    alert(`Your Score: ${score}`);
  }

  score = 0;
  displayContent();
}

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomHole() {
  var index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function popGame() {
  var timer = randomTime(1000, 1500);
  var hole = randomHole();
  var mole = hole.querySelector('.mole');

  if (playGame && !paused) {
    mole.classList.add('up');
    setTimeout(() => {
      mole.classList.remove('up');
      if (playGame && !paused) {
        popGame();
      }
    }, timer);
  }
}

function startGame() {
  time = 30;
  score = 0;
  playGame = true;
  paused = false;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;

  popGame();

  gameId = setInterval(() => {
    if (!paused) {
      time--;
      if (time <= 0) {
        endGame();
      }
      displayContent();
    }
  }, 1000);
}

function pauseGame() {
  paused = true;
  pauseBtn.disabled = true;
  resumeBtn.disabled = false;
}

function resumeGame() {
  paused = false;
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;
  popGame(); // Continue mole popping
}

function bonk(event) {
  if (!event.isTrusted || !playGame || paused) return;
  if (event.target.classList.contains('up')) {
    score++;
    event.target.classList.remove('up');
    event.target.classList.add('bonked');
    displayContent();
    setTimeout(() => event.target.classList.remove('bonked'), 300);
  }
}

webload();
moles.forEach(box => box.addEventListener('click', bonk));
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);