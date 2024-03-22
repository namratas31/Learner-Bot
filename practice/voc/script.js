let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "What is the synonym of the word 'happy'?",
        options: ["Sad", "Joyful", "Angry"],
        correctAnswer: 1
    },
    {
        question: "What is the antonym of the word 'hot'?",
        options: ["Cold", "Warm", "Boiling"],
        correctAnswer: 0
    },
    {
        question: "What is the synonym of the word 'big'?",
        options: ["Small", "Large", "Tiny"],
        correctAnswer: 1
    }
];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const resultContainer = document.getElementById('result');

function displayQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach((option, index) => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = index;
        const label = document.createElement('label');
        label.textContent = option;
        const div = document.createElement('div');
        div.appendChild(input);
        div.appendChild(label);
        optionsElement.appendChild(div);
    });

    // Disable Next button for the first question
    if (currentQuestion === 0) {
        nextBtn.disabled = true;
    }
}

displayQuestion();

submitBtn.addEventListener('click', function() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answerIndex = parseInt(selectedAnswer.value);
        if (answerIndex === questions[currentQuestion].correctAnswer) {
            resultContainer.textContent = 'Correct!';
            score++;
        } else {
            resultContainer.textContent = 'Wrong!';
        }
        resultContainer.style.display = 'block';
        submitBtn.disabled = true;
        nextBtn.disabled = false;
    } else {
        alert('Please select an answer.');
    }
});

nextBtn.addEventListener('click', function() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        resultContainer.style.display = 'none';
        submitBtn.disabled = false;
        nextBtn.disabled = true;
    } else {
        resultContainer.textContent = `Your Score: ${score} out of ${questions.length}`;
        resultContainer.style.display = 'block';
        document.getElementById('quiz').style.display = 'none';
    }
});
