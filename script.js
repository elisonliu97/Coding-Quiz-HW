// HTML ELEMENTS
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var resultsEl = document.querySelector("results");


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
            clearInterval(timeInterval);
            timerEl.textContent = "Time Left:";
        }
        if(gameClear){
            clearInterval(timeInterval);
        }
    }, 1000);

}

function showQuestion(qNum){

    if (qNum >= myQuestions.length){
        gameClear = true;
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
        qAns.setAttribute("class", "ans-btn")
        qDiv.appendChild(qAns);
    }
}
function deleteQuestion(){
    var qDivId = document.getElementById("qDivId");
    qDivId.remove();
}


function checkAnswer(event){
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






// EVENT LISTENERS
startEl.addEventListener("click", startGame);

// WHEN BUTTON IS CLICKED GAME IS STARTED
// COUNTDOWN STARTS
// QUESTION 1 APPEARS
// BUTTONS APPEAR

// QUESTIONS AND AnSWERS INSIDE AN ARRAY OF OBJECTS
// NEED COUNTER TO CHECK WHICH QUESTION IT IS
// REMEMBER TO CLEAR BUTTONS IF YOU APPEND