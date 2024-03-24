
let url="https://random-word-api.herokuapp.com/word";

const wordsToSpell = 3;
let currentWordIndex = 0;
let correctWords = 0;
let data;

async function getword()
{
    try{
    const word=await fetch(url);
    data= await word.json();
    console.log(data);

    speakWord(data[0]);


    document.getElementById('startButton').disabled = false;
    }
    catch(e){
        console.log(e);
    }
}



function speakWord(word) {
    const msg = new SpeechSynthesisUtterance(`Please spell: ${word}`);
    msg.onend = function() {
        // After speaking the word, show the input field
        document.getElementById('spellingInput').style.display = 'inline-block';
        document.getElementById('listen').style.display = 'inline-block';
        document.getElementById('spellingInput').focus();
        // Hide the start button and show the check button and next button
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('checkButton').style.display = 'inline-block';
        document.getElementById('nextButton').style.display = 'inline-block';
    };
    window.speechSynthesis.speak(msg);
    document.getElementById('checkButton').disabled = false;
    document.getElementById('nextButton').disabled = true;
}






function checkSpelling() {
    const userSpelling = document.getElementById('spellingInput').value.toLowerCase();
    const spokenWord = data[0];



    if (userSpelling === spokenWord) {
        document.getElementById('spellingResult').textContent = 'Correct spelling!';
        correctWords++;
    } else {
        document.getElementById('spellingResult').textContent = 'Incorrect spelling!';
    }

    document.getElementById('checkButton').disabled = true;
    document.getElementById('nextButton').disabled = false;
}






function nextWord() {
    currentWordIndex++;;
    // console.log(currentWordIndex)
    document.getElementById('spellingResult').textContent = '';
    document.getElementById('spellingInput').value = ''; // Clear input field
    if (currentWordIndex < wordsToSpell) {
        console.log(currentWordIndex);
       getword();
    } else{
        const msg = new SpeechSynthesisUtterance(`All done for today`);
        window.speechSynthesis.speak(msg);
        document.getElementById('spellingInput').style.display = 'none';
        document.getElementById('checkButton').style.display = 'none';
        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('finalResult').style.display = 'block';
        document.getElementById('finalResult').textContent = `You spelled ${correctWords} out of ${wordsToSpell} words correctly.`;
    }
}




function speakAgain(){
    const msg = new SpeechSynthesisUtterance(`Please spell: ${data}`);
    window.speechSynthesis.speak(msg);

}




    document.querySelector("#startButton").addEventListener('click',getword);
    document.querySelector("#checkButton").addEventListener('click',checkSpelling);
    document.querySelector("#listen").addEventListener('click',speakAgain)
    document.querySelector("#nextButton").addEventListener('click',nextWord)

  

