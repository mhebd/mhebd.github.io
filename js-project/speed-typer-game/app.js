
// Select all dom element 
const dom = {
  lavel : document.querySelector('.game-lavel-wrap'),
  dificult : document.getElementById('dificulty'),
  word : document.getElementById('word'),
  text : document.getElementById('text'),
  timer : document.getElementById('timer'),
  score : document.getElementById('score'),
  gameEndCont : document.getElementById('game-end-container'),
  settingBtn : document.getElementById('setting-btn'),
};


// Get some randomword and select initial variable
const words = ['world', 'javascript', 'natural', 'jump', 'sweet', 'beautiful', 'wanderful', 'exercise', 'goverment', 'london', 'america', 'bangladesh', 'work', 'hard', 'cool', 'winter', 'summer', 'love', 'friend', 'wordpress', 'jquery', 'react', 'node-js', 'first', 'second', 'mobile', 'telephone', 'computer', 'hard-disk', 'memory'];
let selectedWord;
let time = 10;
let score = 0;
dom.text.focus();

// Set dificulty lavel with localstorage
let dificulty = localStorage.getItem('dificulty') !== null ? localStorage.getItem('dificulty') : 'medium';

dom.dificult.value = localStorage.getItem('dificulty');


// select random word for DOM
function selectWord() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  dom.word.innerText = selectedWord;
  dom.score.textContent = 'Score: ' + score;
}
selectWord();

// Set time interval
const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  dom.timer.innerText = `Time Left: ${time}s`;

  if( time === 0) {
    clearInterval(timeInterval);
    // End game
    gameOver();
  }
};


// Get input value and check with selected word
dom.text.addEventListener('input', checkWord);

function checkWord() {
  const value = dom.text.value.toUpperCase();
  const word = dom.word.textContent.toUpperCase();
  if(value === word) {
    score++;
    selectWord();
    dom.text.value = '';

    if(dificulty === 'hard') {
      time += 2;
    } else if( dificulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
}


// Set game over message;
function gameOver() {
  const html = `
    <h2 class="heading">Time Ran Out</h2>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;

  dom.gameEndCont.innerHTML = html;
  dom.gameEndCont.style.display = 'flex';
}

// Settings events listener
dom.settingBtn.addEventListener('click', () => {
  dom.lavel.classList.toggle('hide');
});


// Set dificulty into localstorage
dom.dificult.addEventListener('change', (e) => {
  dificulty = e.target.value;
  localStorage.setItem('dificulty', dificulty);
})
