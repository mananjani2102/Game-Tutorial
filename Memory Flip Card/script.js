//dom element
const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const timeEl = document.getElementById('timeLeft');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const resetBtn = document.getElementById('resetBtn');
const bestScoreEl = document.getElementById('bestScore');
const overlay = document.getElementById('countdownOverlay');

//game configuration
const rows = 3;
const cols = 6;
const totalPairs = 9;
const initialTime = 60;

//state
let firstCard = null;
let secondCard = null;
let busy = false;
let moves = 0;
let matchedPairs = 0;
let timeLeft = initialTime;
let timerId = null;
let pendingTimeouts = [];
let bestScore = null;

function onLoad(){
    var temp = localStorage.getItem('bestPair');
    if(temp != null){
        bestScore = parseInt(temp);
    }
    else{
        bestScore = 0;
    }
}

function displayContent(){
    timeEl.textContent =  timeLeft;
    bestScoreEl.textContent = bestScore;
}

onLoad();
displayContent();

var num1 = [1,2,3,4,5,6,7,8,9];

function shuffle(num2){
    console.log(num2);
    for (let i= num2.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        console.log(j);
        [num2[i],num2[j]] = [num2[j],num2[i]]
    }
    return num2;
}
function createCard(value){
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = '';

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = value;

    inner.appendChild(front);
    inner.appendChild(back);

    card.appendChild(inner);

    return card;
}

function createBoxGame(){
    const reshuffleNumber = shuffle([...num1,...num1])
    console.log(reshuffleNumber); 
    reshuffleNumber.forEach(value => {
        const card = createCard(value);
        console.log(card);
        board.appendChild(card) ;
    });  
}
// -- Game control & button handlers ----------------------------------------

function startTimer() {
    if (timerId) return;
    timerId = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            stopTimer();
            endGame(false);
        }
    }, 1000);
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function clearPendingTimeouts() {
    pendingTimeouts.forEach(id => clearTimeout(id));
    pendingTimeouts = [];
}

function resetStateForNewRound() {
    firstCard = null;
    secondCard = null;
    busy = false;
    moves = 0;
    matchedPairs = 0;
    timeLeft = initialTime;
    stopTimer();
    clearPendingTimeouts();
    movesEl.textContent = moves;
    pairsEl.textContent = matchedPairs;
    timeEl.textContent = timeLeft;
    displayContent();
}

function endGame(won) {
    // Disable further interaction
    busy = true;
    stopTimer();
    clearPendingTimeouts();
    // Update best score if won (use moves as score)
    if (won) {
        if (!bestScore || moves < bestScore) {
            bestScore = moves;
            localStorage.setItem('bestPair', bestScore);
            displayContent();
        }
        setTimeout(() => alert(`You won! Moves: ${moves}`), 100);
    } else {
        setTimeout(() => alert('Time is up!'), 100);
    }
}

function flipCard(card) {
    card.classList.add('flipped');
}

function unflipCard(card) {
    card.classList.remove('flipped');
}

function handleCardClick(e) {
    if (busy) return;
    const card = e.currentTarget;
    if (card.classList.contains('flipped')) return;
    if (firstCard && firstCard === card) return;

    flipCard(card);

    const value = card.querySelector('.back').textContent;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;
    movesEl.textContent = moves;

    const firstValue = firstCard.querySelector('.back').textContent;
    const secondValue = secondCard.querySelector('.back').textContent;

    if (firstValue === secondValue) {
        // matched
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard = null;
        secondCard = null;
        matchedPairs++;
        pairsEl.textContent = matchedPairs;
        if (matchedPairs === totalPairs) {
            endGame(true);
        }
    } else {
        // not matched -> unflip after delay
        busy = true;
        const t = setTimeout(() => {
            unflipCard(firstCard);
            unflipCard(secondCard);
            firstCard = null;
            secondCard = null;
            busy = false;
        }, 800);
        pendingTimeouts.push(t);
    }
}

function attachCardListeners() {
    const cards = board.querySelectorAll('.card');
    cards.forEach(card => {
        card.removeEventListener('click', handleCardClick);
        card.addEventListener('click', handleCardClick);
    });
}

function buildBoardAndAttach() {
    board.innerHTML = '';
    createBoxGame(); // uses createCard and fills board
    attachCardListeners();
}

// Button actions
startBtn.addEventListener('click', () => {
    resetStateForNewRound();
    buildBoardAndAttach();
    startTimer();
    if (overlay) overlay.style.display = 'none';
});

restartBtn.addEventListener('click', () => {
    resetStateForNewRound();
    buildBoardAndAttach();
    startTimer();
    if (overlay) overlay.style.display = 'none';
});

resetBtn.addEventListener('click', () => {
    // reset best score and current board
    bestScore = 0;
    localStorage.removeItem('bestPair');
    displayContent();
    resetStateForNewRound();
    board.innerHTML = '';
    if (overlay) overlay.style.display = '';
});

// initialize a starting inactive board (optional)
board.innerHTML = '';
createBoxGame();
attachCardListeners();