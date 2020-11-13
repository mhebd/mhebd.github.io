
// DOM elements
const dom = {
  formEl : document.getElementById('form'),
  voicesEl : document.getElementById('voices'),
  textEl : document.getElementById('textarea'),
};

// Voice container
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    dom.voicesEl.appendChild(option);
  });
}

// Get voices
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Convert text into speech
const message = new SpeechSynthesisUtterance();

function listen(e) {
  e.preventDefault();
  const text = dom.textEl.value;
  message.text = text;
  speechSynthesis.speak(message);
  console.log(message);
};

function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Listen voices
dom.formEl.addEventListener('submit', listen);

// Set voices
dom.voicesEl.addEventListener('change', setVoice);

// Get voices
getVoices();
