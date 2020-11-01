
const word = document.getElementById('word');
const wrongLetter = document.getElementById('wrong-letters');
const playAgain = document.getElementById('play-btn');
const popUp = document.getElementById('message-contianer');
const notification = document.getElementById('notification-container');
const message = document.getElementById('message');

const manBody = document.querySelectorAll('.body');

const words = ['application', 'organizetion', 'apologies', 'conclution', 'apple', 'sonofsorder', 'active', 'correct', 'adventure', 'spiderman', 'superman', 'avengers', 'chemistry', 'physics', 'mathametics'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

displayWords();

function displayWords() {

  word.innerHTML= `
    ${selectedWord.split('').map( letter => 
        `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>`
      ).join('')
    }
  `;

  const innerWord = word.innerText.replace(/\n/g, '');

  if( innerWord === selectedWord ) {
    message.textContent = 'Congratulation! you won!';
    popUp.style.display = 'flex';
  };

};


window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWords();
      } else {
        showNotification();
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter); 

        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});


function updateWrongLetters() {
  wrongLetter.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map( letter => `<span>${letter}</span>`)}
  `;

  manBody.forEach((part, index) => {
    const errors = wrongLetters.length;

    if( index < errors ) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if(wrongLetters.length === manBody.length) {
    message.textContent = 'Unfortunately you lost !';
    popUp.style.display = 'flex';
  }
};

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  },2000)
};

playAgain.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWords();
  updateWrongLetters();
  popUp.style.display = 'none';
});