// HTML ELEMENTS
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var resultsEl = document.getElementById("results");
var showScoreEl = document.getElementById("showScore");


// VARIABLES
var timeLeft
var questionArr
var qNum
var getAns
var gameClear

// QUESTIONS
var myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        1: "Douglas Crockford",
        2: "Sheryl Sandberg",
        3: "Brendan Eich"
      },
      correctAnswer: 2
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        1: "Node.js",
        2: "TypeScript",
        3: "npm"
      },
      correctAnswer: 2
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        1: "Angular",
        2: "jQuery",
        3: "RequireJS",
        4: "ESLint"
      },
      correctAnswer: 3
    }
  ];


function countdown(){
    timeLeft = 100;
    timerEl.textContent = timeLeft
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft < 1) {
            gameClear = true
        }
        if(gameClear){
            clearInterval(timeInterval);
            timerEl.textContent = "Time Left:"
        }
    }, 1000);

}

function showQuestion(qNum){

    if (qNum >= myQuestions.length){
        gameClear = true;
        scoreTracker();
        return;
    }

    var qDiv = document.createElement('div');
    qDiv.id = "qDivId"
    quizEl.appendChild(qDiv);
    var qPar = document.createElement('p');
    qDiv.appendChild(qPar);

    qPar.textContent = myQuestions[qNum].question;

    var answerArr = Object.values(myQuestions[qNum].answers);
    console.log(answerArr)

    for (var ans in answerArr){
        var qAns = document.createElement("button");
        qAns.textContent = answerArr[ans];
        qAns.setAttribute("data-number", ans);
        qAns.class = "ans-btn"
        qDiv.appendChild(qAns);
    }
}
function deleteQuestion(){
    var qDivId = document.getElementById("qDivId");
    qDivId.remove();
}


function checkAnswer(event){
    console.log(event.target.class)
    if (event.target.class !== "ans-btn"){
        return;
    }

    var ansEl = event.target;
    var ansInd = ansEl.getAttribute("data-number");
    console.log(ansInd)
    console.log(myQuestions[qNum].correctAnswer)
    if (ansInd == myQuestions[qNum].correctAnswer){
        qNum++;
        deleteQuestion();
        showQuestion(qNum);
    }
    else {
        qNum++;
        timeLeft = timeLeft - 15;
        deleteQuestion();
        showQuestion(qNum);
    }
}

function startGame(event){
    countdown();
    gameClear = false;
    qNum = 0;
    showQuestion(qNum);
    quizEl.addEventListener("click", checkAnswer);
}

function scoreTracker(){
    var scoreDiv = document.createElement('div');
    scoreDiv.id = "scoreDivId"
    resultsEl.appendChild(scoreDiv);

    var scorePar = document.createElement('p');
    scoreDiv.appendChild(scorePar);
    scorePar.textContent = "Your score is: " + timeLeft + ". Please enter your initials: ";

    var scoreInput = document.createElement('input');
    scoreInput.id = "scoreInput"
    scoreDiv.appendChild(scoreInput);

    var scoreBtn = document.createElement('button');
    scoreBtn.id = "scoreBtn"
    scoreDiv.appendChild(scoreBtn)
    scoreBtn.textContent = "OK"

    scoreBtn.addEventListener("click", function(event) {
        var scoreName = document.querySelector("#scoreInput").value;
        localStorage.setItem(scoreName, timeLeft);
        scoreDiv.remove();
    });
}

function getAllScores(){

}

function displayScore(){
    showScoreEl.hidden = true;
    var values = [];
    var keyArr = Object.keys(localStorage);
    for (var i = 0; i < keyArr.length; i++ ){
        values.push(localStorage.getItem(keyArr[i]));
    }
    var scoreboardDiv = document.createElement('div');
    scoreboardDiv.id = "scoreboardDivId"
    resultsEl.appendChild(scoreboardDiv);

    for (var i = 0; i < keyArr.length; i++){
        var scoreboardPar = document.createElement('p');
        scoreboardDiv.appendChild(scoreboardPar);
        scoreboardPar.textContent = keyArr[i] + " : " + values[i];
    }

    var scoreboardBtn = document.createElement('button');
    scoreboardBtn.id = "scoreboardBtn"
    scoreboardDiv.appendChild(scoreboardBtn)
    scoreboardBtn.textContent = "Hide Scoreboard"

    scoreboardBtn.addEventListener("click", function(){
        scoreboardDiv.remove();
        showScoreEl.hidden = false;
    });
}


// EVENT LISTENERS
startEl.addEventListener("click", startGame);
showScoreEl.addEventListener("click", displayScore)

// WHEN BUTTON IS CLICKED GAME IS STARTED
// COUNTDOWN STARTS
// QUESTION 1 APPEARS
// BUTTONS APPEAR

// QUESTIONS AND AnSWERS INSIDE AN ARRAY OF OBJECTS
// NEED COUNTER TO CHECK WHICH QUESTION IT IS
// REMEMBER TO CLEAR BUTTONS IF YOU APPEND