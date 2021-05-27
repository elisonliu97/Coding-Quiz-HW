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
      question: "What's the file type for Javascript?",
      answers: {
        0: ".js",
        1: ".java",
        2: ".script",
        3: ".css"
      },
      correctAnswer: 0
    },
    {
      question: "Inside which HTML element do we put the Javascript",
      answers: {
        0: "<js>",
        1: "<javascript>",
        2: "<script>",
        3: "<scripting>"
      },
      correctAnswer: 2
    },
    {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      answers: {
        0: "<script id='xxx.js'>",
        1: "<script name='xxx.js'>",
        2: "<script href='xxx.js'>",
        3: "<script src='xxx.js'>"
      },
      correctAnswer: 3
    }
  ];

// timer function
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

// function to display each question
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

    for (var ans in answerArr){
        var qAns = document.createElement("button");
        qAns.textContent = answerArr[ans];
        qAns.setAttribute("data-number", ans);
        qAns.class = "ans-btn"
        qDiv.appendChild(qAns);
    }
}

// function to stop displaying each question
function deleteQuestion(){
    var qDivId = document.getElementById("qDivId");
    qDivId.remove();
}

// function to check if the button pressed is the right answer
function checkAnswer(event){
    if (event.target.class !== "ans-btn"){
        return;
    }

    var ansEl = event.target;
    var ansInd = ansEl.getAttribute("data-number");
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

// function to start the quiz
function startGame(event){
    startEl.hidden = true;
    countdown();
    gameClear = false;
    qNum = 0;
    showQuestion(qNum);
    quizEl.addEventListener("click", checkAnswer);
}

// function to input the score after the quiz is finished
function scoreTracker(){
    var scoreDiv = document.createElement('div');
    scoreDiv.id = "scoreDivId"
    quizEl.appendChild(scoreDiv);

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
        startEl.hidden = false;
    });
}

// function to show and hide the score
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
