const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const welcomePage = document.getElementById('welcome-container');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const checkAnswerEl = document.getElementById('check-answer');

let shuffledQuestions, currentQuestionIndex;

const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<js>', correct: false },
            { text: '<scripting>', correct: false },
            { text: '<script>', correct: true },
            { text: '<javascript>', correct: false}
        ]
    },
    {
        question: 'What is the correct syntax for referring to an external script called "fff.js"?',
        answers: [
            { text: '<script href="fff.js">', correct: false},
            { text: '<script name="fff.js">', correct: false},
            { text: '<script src="fff.js">', correct: true},
            { text: '<script rel="fff.js">', correct: false}
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alert("Hello World");', correct: true},
            { text: 'msg("Hello World");', correct: false},
            { text: 'alertBox("Hello World");', correct: false},
            { text: 'msgBox("Hello World");', correct: false}
        ]
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    welcomePage.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide'); 
    setNextQuestion();
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
};

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
};

function resetState() {
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    checkAnswerEl.classList.remove("hide");
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (correct) {
        checkAnswerEl.innerHTML = "You got it right!";
    } else {
        checkAnswerEl.innerHTML = "Sorry that was not the correct answer.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            // If the aswer is wrong, deduct time by 10
            timeLeft -= 10;
        }
    };
    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');  
    
    
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    };
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}}