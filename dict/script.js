  let currentIndex = 0;

  let url="https://random-word-api.herokuapp.com/word";
  let url2="https://api.dictionaryapi.dev/api/v2/entries/en/";
  
  async function getword()
  {
      try{
        const wordElement = document.getElementById('word');
        const meaningElement = document.getElementById('meaning');

        if(currentIndex==3){
          wordElement.textContent = "That's all for today!";
          meaningElement.textContent = '';
          document.getElementById('next-btn').style.display = 'none';
          document.querySelector('.wordDisplay2').style.display = 'none';
          document.querySelector('.wordDisplay1').style.width = 100;
        }
        else if(currentIndex<3)
        {
        
          let word=await fetch(url);
          let data=await word.json();
          let mean =await fetch(url2+data);
          let data2=await mean.json();

          wordElement.textContent = '';
          meaningElement.textContent = '';
          // if(mean!=''){/

          
          meaningElement.innerHTML=`${data2[0].meanings[0].definitions[0].definition}`;
          wordElement.innerHTML=`${data}`;
         
          // }

          console.log(data);
          console.log(data2);
          console.log(data2[0].meanings[0].definitions[0].definition);
          
        }
      }
        
      catch(e){
        getword();
          console.log(e);
     }
  }
  
  function nextWord() {
    currentIndex++;
    getword();
  }
  document.getElementById('next-btn').addEventListener('click', nextWord);

   getword();