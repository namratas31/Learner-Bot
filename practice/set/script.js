const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "Stack Overflow is a question and answer site for professional and enthusiast programmers",
    "Python is a high-level programming language with dynamic semantics",
    "Artificial Intelligence is intelligence demonstrated by machines"
  ];
  
  let currentSentenceIndex = 0;
  let currentSentence = '';
  let correctAnswers = 0;
  let totalQuestions = sentences.length;
  let isAnswered = false;
  
  function shuffleSentence(sentence) {
    const words = sentence.split(' ');
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words.join(' ');
  }
  
  function displaySentence() {
    currentSentence = sentences[currentSentenceIndex];
    const scrambledSentence = shuffleSentence(currentSentence);
    document.getElementById('sentence-container').innerText = scrambledSentence;
    updateNextButtonState(); // Update next button state
    isAnswered = false; // Reset answer status for new question
  }
  
  function checkAnswer() {
    const userInput = document.getElementById('user-input').value;
    const isCorrect = userInput.trim().toLowerCase() === currentSentence.toLowerCase();
    if (isCorrect) {
      document.getElementById('result').innerText = 'Correct!';
      correctAnswers++;
    } else {
      document.getElementById('result').innerText = 'Incorrect. Try again!';
    }
    isAnswered = true; // Mark question as answered
    updateNextButtonState(); // Update next button state
  }
  
  function updateNextButtonState() {
    const nextButton = document.getElementById('next-btn');
    nextButton.disabled = !isAnswered; // Disable next button if the question has not been answered
  }
  
  function nextQuestion() {
    if (!isAnswered) return; // Check if the question has been answered before proceeding
    currentSentenceIndex++;
    if (currentSentenceIndex < totalQuestions) {
      displaySentence();
      document.getElementById('result').innerText = '';
      document.getElementById('user-input').value = '';
    } else {
      // End of all questions
      document.getElementById('container').innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Total Questions: ${totalQuestions}</p>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Incorrect Answers: ${totalQuestions - correctAnswers}</p>
      `;
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    displaySentence();
  });
  