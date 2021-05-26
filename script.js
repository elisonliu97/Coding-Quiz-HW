// HTML ELEMENTS
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var resultsEl = document.querySelector("results");


// VARIABLES
var timeLeft
var questionArr



function countdown(){
    timeLeft = 100;
    timerEl.textContent = timeLeft
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
    }, 1000);
}

function showQuestion(qNum){

}

function startGame(event){
    countdown();

}






// EVENT LISTENERS
startEl.addEventListener("click", startGame);

// WHEN BUTTON IS CLICKED GAME IS STARTED
// COUNTDOWN STARTS
// QUESTION 1 APPEARS
// BUTTONS APPEAR