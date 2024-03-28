const words = ["hello", "actor", "rainbow", "elephant"]; // List of words to pronounce
    let currentWordIndex = 0;
    let correctlyPronouncedCount = 0;
    let voiceHeard = false; // To track if voice is heard for current word
    const wordDisplay = document.getElementById('wordDisplay');
    const recordButton = document.getElementById('recordButton');
    const nextButton = document.getElementById('nextButton');
    const timerDisplay = document.getElementById('timer');
    const resultDisplay = document.getElementById('result');
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

    // Function to display the current word
    function displayWord() {
      wordDisplay.textContent = words[currentWordIndex];
      voiceHeard = false; // Reset voiceHeard for the new word
      nextButton.disabled = true; // Disable Next button for new word
      recordButton.disabled = false; // Enable Record button for new word
      recordButton.style.opacity = '1'; // Reset opacity for the Record button
    }

    // Function to handle the recording
    recordButton.addEventListener('click', () => {
      recordButton.disabled = true;
      resultDisplay.textContent = '';
      timerDisplay.textContent = 'Recording...';

      recognition.start();
      let timer = 5; // Change the recording duration to 6 seconds
      const countdown = setInterval(() => {
        timerDisplay.textContent = `Recording... ${timer}s left`;
        timer -= 1;
        if (timer < 0) {
          clearInterval(countdown);
          recognition.stop();
          timerDisplay.textContent = '';

          if (!resultDisplay.textContent) {
            resultDisplay.textContent = 'No voice heard';
            nextButton.disabled = true; // Disable Next button if no voice heard
          } else {
            voiceHeard = true; // Voice is heard for the current word
            recordButton.disabled = true; // Disable Record button after voice is heard
            recordButton.style.opacity = '0.5'; // Reduce opacity to visually indicate disabled
          }

          if (currentWordIndex < words.length - 1 && voiceHeard) {
            nextButton.disabled = false; // Enable Next button after recording ends and voice heard
          } else if (currentWordIndex === words.length - 1) {
            nextButton.style.display = 'none'; // Hide Next button at the last word
            displayResult(); // Display the result after all words are completed
          }
        }
      }, 1000);

      recognition.onresult = (event) => {
        const recordedWord = event.results[0][0].transcript.toLowerCase().trim();
        checkPronunciation(recordedWord);
      };

      recognition.onend = () => {
        recordButton.disabled = false;
        clearInterval(countdown);
        timerDisplay.textContent = '';
      };
    });

    // Function to check the pronunciation
    function checkPronunciation(recordedWord) {
      const expectedWord = words[currentWordIndex];

      if (recordedWord === expectedWord) {
        resultDisplay.textContent = 'Correct pronunciation!';
        correctlyPronouncedCount++;
        recordButton.disabled = true; // Disable Record button if pronunciation is correct
        recordButton.style.opacity = '0.5'; // Reduce opacity to visually indicate disabled
      } else {
        resultDisplay.textContent = 'Incorrect pronunciation. Try again!';
        recordButton.disabled = true; // Disable Record button if pronunciation is incorrect
        recordButton.style.opacity = '0.5'; // Reduce opacity to visually indicate disabled
      }

      voiceHeard = true; // Voice is heard for the current word

      if (currentWordIndex < words.length - 1) {
        if (voiceHeard) {
          nextButton.disabled = false; // Enable Next button after result and voice heard
        }
      } else if (currentWordIndex === words.length - 1) {
        displayResult(); // Display the result after all words are completed
      }
    }

    // Function to display the final result
    function displayResult() {
      const container = document.querySelector('.container');
      const resultDisplay = document.getElementById('result');
      resultDisplay.textContent = `Correctly pronounced ${correctlyPronouncedCount} out of ${words.length} words.`;

      // Remove all elements inside the container except the result display
      while (container.firstChild !== resultDisplay) {
        container.removeChild(container.firstChild);
      }
    }

    // Function to move to the next word
    nextButton.addEventListener('click', () => {
      currentWordIndex = (currentWordIndex + 1) % words.length;
      displayWord();
      resultDisplay.textContent = ''; // Clear the result for the new word
    });

    // Initialize with the first word
    displayWord();