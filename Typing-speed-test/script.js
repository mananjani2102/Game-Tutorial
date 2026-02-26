// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerButtons = document.querySelectorAll('.timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

// Test texts
const testTexts = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
  "Technology has revolutionized the way we communicate and work in the modern digital era.",
  "Typing speed is an essential skill for anyone working with computers in today's workplace.",
  "In a world driven by innovation, mastering digital tools can significantly enhance productivity and creativity.",
  "The art of storytelling lies in weaving words that captivate the reader and evoke vivid imagery.",
  "Effective communication requires clarity, empathy, and the ability to listen with genuine interest.",
  "As the sun dipped below the horizon, the sky transformed into a canvas of brilliant colors and fading light.",
  "Learning to code opens doors to endless possibilities, from building websites to automating everyday tasks.",
  "The rhythmic sound of keystrokes echoed through the room as the writer poured thoughts onto the screen.",
  "Curiosity fuels discovery, and every question asked is a step toward deeper understanding and growth."
];

// Game state
let currentText = "";
let timeLeft = 60;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;
let selectedTime = 60; // default

// Save original button values so reset works properly
timerButtons.forEach(btn => btn.originalValue = btn.textContent);

// Load previous best WPM
function webLoad() {
  const temp = sessionStorage.getItem('previouswpm');
  bestWPM = temp ? parseInt(temp) : 0;
  bestWPMDisplay.textContent = bestWPM;
}
webLoad();

// Select time button
timerButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedTime = parseInt(btn.textContent);
    timeLeft = selectedTime;

    // Hide other buttons and show only selected one
    timerButtons.forEach(b => {
      if (b !== btn) b.style.display = 'none';
    });

    // Highlight selected one
    btn.style.background = 'linear-gradient(135deg, #9b58ceff 0%, #372569ff 100%)';
    btn.style.transform = 'scale(1.1)';
  });
});

// Start the typing test
function startGame() {
  if (isTestActive) return;

  timeLeft = selectedTime;
  startBtn.disabled = true;

  currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
  textDisplay.textContent = currentText;
  typingArea.disabled = false;
  typingArea.value = "";
  typingArea.focus();
  typingArea.setAttribute('placeholder', 'Start typing...');

  isTestActive = true;
  startTime = Date.now();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerButtons.forEach(btn => (btn.textContent = timeLeft));

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      typingArea.disabled = true;
      startBtn.disabled = false;
      isTestActive = false;
      textDisplay.innerHTML = "<b>⏰ Time's up!</b> Your test is over.";
    }
  }, 1000);
}

function updateStatus() {
  if (!isTestActive) return;
  const typed = typingArea.value;
  const minutes = (Date.now() - startTime) / 1000 / 60;
  const words = typed.trim().split(/\s+/).filter(w => w.length > 0);
  const wpm = minutes > 0 ? Math.round(words.length / minutes) : 0;
  wpmDisplay.textContent = wpm;

  // Accuracy
  let correctCount = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentText[i]) correctCount++;
  }
  const accuracy = typed.length > 0 ? Math.floor((correctCount / typed.length) * 100) : 100;
  accuracyDisplay.textContent = accuracy + "%";
}

// Highlights typed text
function highlightText() {
  const typed = typingArea.value;
  let result = '';
  for (let i = 0; i < currentText.length; i++) {
    if (i < typed.length) {
      result += currentText[i] === typed[i]
        ? `<span class="correct">${currentText[i]}</span>`
        : `<span class="incorrect">${currentText[i]}</span>`;
    } else {
      result += currentText[i];
    }
  }
  textDisplay.innerHTML = result;
}

function typeControl() {
  if (!isTestActive) return;
  updateStatus();
  highlightText();
}

// Reset test session
function resetGame() {
  clearInterval(timerInterval);
  isTestActive = false;
  typingArea.disabled = true;
  typingArea.value = "";
  startBtn.disabled = false;
  textDisplay.textContent = 'Click "Start Test" to begin typing!';

  // Reset timer buttons
  timerButtons.forEach(btn => {
    btn.style.display = 'inline-block';
    btn.style.background = 'linear-gradient(135deg, #f35a5a 0%, #f32d2d 100%)';
    btn.style.transform = 'scale(1)';
    btn.textContent = btn.originalValue;
  });
}

typingArea.addEventListener('input', typeControl);
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);