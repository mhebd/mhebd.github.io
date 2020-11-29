// Dom element
const msgEl = document.getElementById('msg');

// Random number
const randomNum = randomNumger();

console.log('Number is: ' + randomNum);

// Set window for SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Get recognition object
let recognition = new window.SpeechRecognition();

// Start recognition
recognition.start();

// Get recognintion result
recognition.addEventListener('result', onSpeak);

function onSpeak(e) {
  let speech = e.results[0][0].transcript;

  wrightMsg(speech);
  checkNum(speech);
}


function wrightMsg(speech) {
  msgEl.innerHTML = `
    <h2>You Said</h2>
    <p class="box">${speech}</p>
  `;
};

function checkNum(speech) {
  let num = +speech;

  if(Number.isNaN(num)) {
    msgEl.innerHTML += '<h3>This is not a valid number</h3>';
    return;
  };

  if(num > 100 || num < 1) {
    msgEl.innerHTML += '<h3>Number must be between 1 - 100</h3>';
    return;
  };

  if(num === randomNum) {
    document.body.innerHTML = `
      <h2> Congrats! You have guessed the number </h2>
      <h2>It was <span>${num}</span> </h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<h3>Go Lower</h3>';
    return;
  } else if(num < randomNum) {
    msgEl.innerHTML += '<h3>Go Higher</h3>'
  };  
}



// Always on microphone
recognition.addEventListener('end', () => recognition.start());

// Play again after success
document.body.addEventListener('click', (e) => {
  if(e.target.id === 'play-again') {
    window.location.reload();
  }
})



// Get ramdom number
function randomNumger() {
  return Math.floor(Math.random() * 100) + 1;
};