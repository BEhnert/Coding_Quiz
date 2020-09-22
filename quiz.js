
document.querySelector('#highscores').style.display="none";
document.querySelector('#timer').innerText = "Time Left"

var containerEl = document.getElementById("container");

document.querySelector('#main').innerText = "Coding Quiz Challenge"
document.querySelector('#instruction').innerText = "Try to answer the following code-related questions in the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

document.querySelector('#initials-form').style.display = "none"

var startButton = document.createElement('button');
startButton.setAttribute('id', 'startButton');
startButton.innerText = "Start Quiz";
console.log(startButton);
document.querySelector('#choices').appendChild(startButton)

startButton.addEventListener("click", function () {
    quizStart();
    startQuizTimer();
});

function quizStart() {
    // containerEl.textContent="";
    document.querySelector('#main').innerText = "";
    document.querySelector('#instruction').innerText = "";
    document.querySelector('#choices').removeChild(startButton);

    var questions = [
        
        {
            question: "Commonly used data types DO NOT include:",
            choices: [
                '1: strings',
                '2: booleans',
                '3: alerts',
                '4: numbers'
            ],
            answer: '3: alerts'
        },
        {
            question: "The condition in an if / else statement is enclosed within _____.",
            choices: [
                '1: quotes',
                '2: curly brackets',
                '3: parentheses',
                '4: square brackets'
            ],
            answer: '3: parentheses'
        },
        {
            question: "Arrays in JavaScript can be used to store _____.",
            choices: [
                '1: numbers and strings',
                '2: other arrays',
                '3: booleans',
                '4: all of the above'
            ],
            answer: '4: all of the above'
        },
        {
            question: "String values must be enclosed within _____ when being assigned to variables.",
            choices: [
                '1: commas',
                '2: curly brackets',
                '3: quotes',
                '4: parentheses'
            ],
            answer: '3: quotes'
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            choices: [
                '1: JavaScript',
                '2: terminal/bash',
                '3: for loops',
                '4: console.log'
            ],
            answer: '4: console.log'
        }

    ]
    var questionIndex = 0
    var score = 0;
    quizAll(questionIndex);

    function quizAll(questionIndex) {
        /// START of display question and choices

        document.querySelector("#choices").innerHTML = "";
        //Display question
        document.querySelector('#question').innerText = questions[questionIndex].question

        //Create button for each valid choice for the question
        
        for (let i = 0; i < questions[questionIndex].choices.length; i++) {
            var button = document.createElement('button')
            button.setAttribute('class', 'choice')
            button.innerText = questions[questionIndex].choices[i]
            document.querySelector('#choices').appendChild(button)
        };
        /// END of display question and choices

        var choices = document.querySelectorAll('.choice')

        choices.forEach(function(element) {
                     
                element.addEventListener('click', function (e) {
                     if (questionIndex === questions.length - 1) {
                         document.querySelector('#main').innerText = "All Done"
                         document.querySelector('#instruction').innerText = "Your final score is: " + score;
                         document.querySelector('#initials-form').style.display = "block"

                         
                         document.querySelector('#question').style.display = "none"
                         document.querySelector('#choices').style.display = "none"
                         document.querySelector('#result').style.display = "none"
                        highscorelist();                         
                         return score;
                     }   
                    var correctAnswer = questions[questionIndex].answer
                    var userSelectedAnswer = e.target.innerText
                    if (correctAnswer == userSelectedAnswer) {
                        document.querySelector('#result').innerText = "Correct";
                        score = score + 10;
                        questionIndex++
                        quizAll(questionIndex);

                    } else {
                        document.querySelector('#result').innerText = "Wrong";
                        score = score - 10;
                        questionIndex++
                        quizAll(questionIndex);
                    }
                });

        });
    };
};

// function viewHighScores(){}



document.querySelector('#viewhighscores').addEventListener('click', function(e){
    document.querySelector('#highscores').style.display="block";
    document.querySelector('#main').style.display="none";
    document.querySelector('#instruction').style.display="none";
    document.querySelector('#startButton').style.display="none";
   
});

var highScoresAll = [];

function highscorelist(){
document.querySelector("#add-initials").addEventListener("click", function(event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
    
    // Here we grab the text from the input box
    var initials = document.querySelector("#initials-input").value

    if(initials === ""){
        return;
    }
    console.log(initials);
    highScoresAll.push(initials + " " + score);
    initials.value = ""
    console.log("High " + highScoresAll) 
});
};

function startQuizTimer(){
var timeRemaining = 60;
var quizTimer = setInterval(function(){
  if(timeRemaining <= 0){
    clearInterval(quizTimer);
    alert("Game Over")
    document.getElementById("countdown").innerHTML = "Game Over";
  } else {
    document.getElementById("countdown").innerHTML = timeRemaining;
  }
  timeRemaining-= 1;
}, 1000);
}
