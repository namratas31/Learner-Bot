document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.getElementById('question');
    const userInputElement = document.getElementById('userInput');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resultElement = document.getElementById('result');

    let recognition;
    let isRecording = false;

    // Load question when the page is loaded
    fetch('/generate_question')
        .then(response => response.json())
        .then(data => {
            questionElement.textContent = data.question;
        })
        .catch(error => console.error('Error:', error));

    startBtn.addEventListener('click', function() {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        isRecording = true;

        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = function(event) {
            const transcript = event.results[event.results.length - 1][0].transcript;
            userInputElement.value = transcript;
        };

        recognition.onend = function() {
            if (isRecording) {
                recognition.start();
            }
        };

        recognition.start();
    });

    stopBtn.addEventListener('click', function() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        isRecording = false;
        if (recognition) {
            recognition.stop();
        }
    });

    // Send user input to server for grammar checking
    userInputElement.addEventListener('input', function() {
        const userInput = userInputElement.value.trim();
        if (userInput !== '') {
            fetch('/check_grammar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userInput: userInput })
            })
            .then(response => response.json())
            .then(data => {
                resultElement.innerHTML = `<strong>Relevance:</strong> ${data.relevance}<br><strong>Grammar Correctness:</strong> ${data.grammar}`;
            })
            .catch(error => console.error('Error:', error));
        } else {
            resultElement.innerHTML = '';
        }
    });
});
