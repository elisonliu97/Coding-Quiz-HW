// HTML ELEMENTS
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var resultsEl = document.querySelector("results");


// VARIABLES
var timeLeft
var questionArr
var qNum


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
    }, 1000);

}

function showQuestion(qNum){
    var qDiv = document.createElement('div');
    quizEl.appendChild(qDiv);
    var qPar = document.createElement('p');
    quizEl.appendChild(qPar);

    qPar.textContent = myQuestions[qNum].question;

    var answerArr = Object.values(myQuestions[qNum].answers);
    console.log(answerArr)

    for (var ans in answerArr){
        var qAns = document.createElement("button");
        qAns.textContent = answerArr[ans];
        qAns.setAttribute("data-number", ans);
        quizEl.appendChild(qAns);
    }
    
    

}

function startGame(event){
    countdown();
    qNum = 0;
    showQuestion(qNum);


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