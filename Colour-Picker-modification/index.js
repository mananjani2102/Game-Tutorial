const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
console.log(colorBoxes);
const newRoundBtn = document.querySelector('#newRoundBtn');

const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
const btnTrack = document.querySelector('.color-box-container');  //button ko track karne ke liye

// variable---------------------
var currentStreak = 0;
var bestStreak = 0;         //privios storage
// var correctColor = null;
var pickCorrectColor = 0;   ///random color
var color = [];
var num = 6; 
var element;               //loop control

function webLoad() {
    onLoad();
    setGame();
    displayContent();
    // colorGenerate();
}

function displayMessage() {
    currentStreakDisplay.textContent = current;
    bestStreakDisplay.textContent = high;

};

//whenever the website eill load the  first it will load the entire data....
function onLoad() {
    var temp = localStorage.getItem('highBestStreak');
    if (temp != null) {
        bestStreak = parseInt(temp);  // => here the localstorage containes the data so it will return the data not null.
    }

    else {
        bestStreak = 0; // => if there is no data in localstorage so it will return null insted of number
    }


}

//here we will define the display content messsge in the function format.....

function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}



function resetGame() {

    localStorage.clear();
    currentStreak = 0;
    bestStreak = 0;

    setGame();
    displayContent();
    messageDisplay.textContent = "Your Game is Reset🔃";
    video.style.display = 'none';

    btnTrack.style.pointerEvents = "auto";
    messageDisplay.style.color = "#6F42C1";
}


function newround() {

    messageDisplay.textContent = "New Round Is Start! Pick a color!";
    setGame();
    displayContent();
    video.style.display = 'none';
    element.style.border = "none";
    btnTrack.style.pointerEvents = "auto";
    messageDisplay.style.color = "#007BFF";

}

function easymode() {
    num = 3; // sirf 3 color generate honge
    setGame();

    for (let i = 3; i < colorBoxes.length; i++) {
        colorBoxes[i].style.display = 'none';
    }
    messageDisplay.textContent = "Easy mode";
    messageDisplay.style.color = "#28A745";
    btnTrack.style.pointerEvents = "auto";
    easyBtn.style.backgroundColor = 'green';
    hardBtn.style.backgroundColor = 'white';
};


function hardmode() {
    num = 6; // 
    setGame();
    for (let i = 0; i < colorBoxes.length; i++) {
        colorBoxes[i].style.display = 'block';
    }

    messageDisplay.textContent = "Hard mode";
    messageDisplay.style.color = "red";
    btnTrack.style.pointerEvents = "auto";
    hardBtn.style.backgroundColor = 'white';
    easyBtn.style.backgroundColor = ' rgba(255, 255, 255, 0.1)'
};


//rendom color generator

function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    return `rgb(${a}, ${b}, ${c})`;
}

function generateColor(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;
}

function pickGenerater() {
    const math = Math.floor(Math.random() * color.length);
    return color[math];  //idhar math ki jagah index
}

function setGame() {

    color = generateColor(num);  // color=> empty array => main purpose to store the total 6 - diffrent rgb() => ek esa function

    pickCorrectColor = pickGenerater();

    console.log(color);
    console.log(pickCorrectColor)
    colorDisplay.textContent = pickCorrectColor;

    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];
    }
}
webLoad();

// parent add event listener


// parent container ko track karne se uske sabhi children ko track kar payege
function trackBtn(event) {        //event ki vajah se is element pe click kiya use ko track kar sakte he
     element = event.target;
    console.log(element);
    var rgb = element.style.backgroundColor;
    console.log(rgb);
    colorDisplay.style.fontWeight = 'bold';



    btnTrack.style.pointerEvents = "none";


    if (pickCorrectColor == rgb) {
        messageDisplay.textContent = "Correct! You are win 🎉🎉";
        messageDisplay.style.color = "green";
        element.style.border = "4px solid yellow";

        for (var i = 0; i < colorBoxes.length; i++) {
            colorBoxes[i].style.backgroundColor = pickCorrectColor;
        }

        currentStreak++;
        localStorage.setItem('currentstreak', currentStreak);

        if (currentStreak === 1) {
            messageDisplay.textContent = "First Win!";
        }

        if (currentStreak >= 3) {
            messageDisplay.textContent = "Streak!";
            messageDisplay.style.color = "green";
        }


        video.style.display = 'block';


        if (currentStreak > bestStreak) {
            bestStreak = currentStreak
            localStorage.setItem('highBestStreak', bestStreak);
            messageDisplay.textContent = "Exxelent! You have new best stereak 🎉🎉";
            messageDisplay.style.color = "green";
        }

    }

    else {
        messageDisplay.textContent = "You are Lose 😔";
        messageDisplay.style.color = "red";

        element.classList.add("shake");    
        setTimeout(() => {
            element.classList.remove("shake");
        }, 400);

        currentStreak = 0;
    }
    displayContent();
}

btnTrack.addEventListener('click', trackBtn);
resetStreakBtn.addEventListener('click', resetGame);
newRoundBtn.addEventListener('click', newround);

easyBtn.addEventListener('click', easymode);
hardBtn.addEventListener('click', hardmode);