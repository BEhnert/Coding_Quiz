
document.querySelector('#highscores').style.display = "none";
// document.querySelector('#countdown').style.display = "inline-block"
// document.querySelector('#timer').innerText = "Time Left"

var score = 0;
var containerEl = document.getElementById("container");

quizMain();
function quizMain(){

document.querySelector('#main').innerText = "Coding Quiz Challenge"
document.querySelector('#instruction').innerText = "Try to answer the following code-related questions in the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

document.querySelector('#main').style.display = "block";
document.querySelector('#start').style.display = "block";

document.querySelector('#highscores').style.display = "none";
document.querySelector('#back').style.display = "none";
document.querySelector('#clear').style.display = "none";
document.querySelector('#initials-form').style.display = "none"

var startButton = document.createElement('button');
startButton.setAttribute('id', 'startButton');
startButton.innerText = "Start Quiz";
console.log(startButton);
document.querySelector('#start').appendChild(startButton)

startButton.addEventListener("click", function () {
    quizStart();
});
}

function quizStart() {

    var timeRemaining = 60;
    var quizTimer = setInterval(function () {
        if (timeRemaining <= 0){
            clearInterval(quizTimer);
            alert("Game Over")
            document.getElementById("countdown").innerHTML = "Game Over";
        } else {
            document.getElementById("countdown").innerHTML = timeRemaining;
        }
        timeRemaining -= 1;
    }, 1000);

    document.querySelector('#main').innerText = "";
    document.querySelector('#instruction').innerText = "";
    document.querySelector('#start').style.display = "none";
    document.querySelector('#question').style.display = "block";
    document.querySelector('#choices').style.display = "block";
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
    score = 0;
    quizAll(questionIndex);

    function quizAll(questionIndex) {
        /// START of display question and choices
        document.querySelector("#choices").innerHTML = "";
        //Display question
        document.querySelector('#question').innerText = questions[questionIndex].question;

        //Create button for each valid choice for the question
        for (let i = 0; i < questions[questionIndex].choices.length; i++) {
            var button = document.createElement('button')
            button.setAttribute('class', 'choice')
            button.innerText = questions[questionIndex].choices[i]
            document.querySelector('#choices').appendChild(button)
        };
        /// END of display question and choices

        var choices = document.querySelectorAll('.choice')

        choices.forEach(function (element) {

            element.addEventListener('click', function (e) {
                if (questionIndex === questions.length - 1) {
                    clearInterval(quizTimer);
                    if (correctAnswer == userSelectedAnswer) {
                        document.querySelector('#result').innerText = "Correct";
                        score = score + 10;
                    }

                    document.querySelector('#main').innerText = "All Done"
                    document.querySelector('#instruction').innerText = "Your final score is: " + score;
                    document.querySelector('#initials-form').style.display = "block"
                    document.querySelector('#initials-input').style.display = "block"
                    document.querySelector('#initials-text').style.display = "block"
                    document.querySelector('#add-initials').style.display = "block"

                    document.querySelector('#question').style.display = "none"
                    document.querySelector('#choices').style.display = "none"
                    document.querySelector('#result').style.display = "none"
                    // highscorelist(score);
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
                    score = score - 5;
                    questionIndex++
                    quizAll(questionIndex);
                }
            });

        });
    };""
};

    document.querySelector("#add-initials").addEventListener("click", function (event) {
        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        
        event.preventDefault();
        
        var highscores;
        if(localStorage.getItem("highscores")){
            highscores = JSON.parse(localStorage.getItem("highscores"))
        }
        else{
            highscores = [];
        }
        var initials = document.querySelector("#initials-input").value
        highscores.push({score:initials + " " + score})
        localStorage.setItem("highscores",JSON.stringify(highscores))
        document.querySelector("#initials-input").value = "";

        displayHighScores();

        var backButton = document.createElement('button');
        backButton.setAttribute('id', 'backButton');
        backButton.innerText = "Go Back";
        document.querySelector('#back').innerHTML="";
        document.querySelector('#back').appendChild(backButton)
        document.querySelector('#back').style.display = "inline-block";

        var clearButton = document.createElement('button');
        clearButton.setAttribute('id', 'clearButton');
        clearButton.innerText = "Clear Scores";
        document.querySelector('#clear').innerHTML="";
        document.querySelector('#clear').appendChild(clearButton)
        document.querySelector('#clear').style.display = "inline-block";

        document.querySelector('#highscores').style.display = "block";

        // document.querySelector('#instruction').style.display = "none";
        document.querySelector('#main').style.display = "none";
        document.querySelector('#add-initials').style.display = "none";
        document.querySelector('#initials-input').style.display = "none";
        document.querySelector('#initials-text').style.display = "none";
    });

document.querySelector("#back").addEventListener("click", function (event) {
    document.querySelector('#start').removeChild(startButton);
    quizMain();
})

document.querySelector("#clear").addEventListener("click", function (event) {
    location.reload;
    localStorage.clear();
    displayHighScores();
})


document.querySelector('#viewhighscores').addEventListener('click', function (e) {
    document.querySelector('#highscores').style.display = "block";
    document.querySelector('#main').style.display = "none";
    document.querySelector('#instruction').style.display="none";
    document.querySelector('#startButton').style.display = "none";

});

function displayHighScores() {
    //Get high scores from local storage
    var highscorelist = [];
    if(localStorage.getItem("highscores")){
        highscorelist = JSON.parse(localStorage.getItem("highscores"));
    }
    //Loop through high scores
    document.querySelector('#highscorelist').innerHTML="";
    for (let i = 0; i < highscorelist.length; i++) {
         //Create <li> element and inject high score.append to DOM
         var highscore = document.createElement('li')
            highscore.innerText = highscorelist[i].score;
            document.querySelector('#highscorelist').appendChild(highscore)
    }
       
    
    


}
displayHighScores();