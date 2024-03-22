const words = [
    { word: 'Revert :', meaning: 'to come or go back' },
    { word: 'Difference :', meaning: 'the amount by which people or things are not the same' },
    { word: 'Spacious :', meaning: 'having a lot of space; large in size' }
  ];

  let currentIndex = 0;

  function displayWord() {
    const wordElement = document.getElementById('word');
    const meaningElement = document.getElementById('meaning');

    if (currentIndex < words.length) {
      const currentWord = words[currentIndex];
      wordElement.innerHTML = `<strong>${currentWord.word}</strong>`;
      meaningElement.textContent = currentWord.meaning;
    } else {
      wordElement.textContent = "That's all for today!";
      meaningElement.textContent = '';
      document.getElementById('next-btn').style.display = 'none';
    }
  }

  function nextWord() {
    currentIndex++;
    displayWord();
  }

  document.getElementById('next-btn').addEventListener('click', nextWord);

  displayWord();