
// Get dom element
const textEl = document.getElementById('text');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const clear = document.getElementById('clear');
const copy = document.getElementById('copy');
const indictor = document.querySelector('.indicator');
const langEl = document.getElementById('lang');

// Get languages from json file
getLang();
async function getLang() {
  const res = await fetch('lang.json');
  const data = await res.json();
  setLang(data.languages);
};

// Set language into selection list
function setLang(languages) {
  languages.forEach(language => {
    const opt = `<option value="${language.code}">${language.name} - ${language.nativeName}</option>`;
    langEl.innerHTML += opt;
  });
  langEl.value = localStorage.getItem('language') !== null ? localStorage.getItem('language') : 'bn';
};

// textarea focusing
textEl.focus();

// Prepear window for speechrecognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Get recognition object
let recognition = new window.SpeechRecognition();

// start record process
start.addEventListener('click', startRecord);
stop.addEventListener('click', stopRecord);

function startRecord() {
  recognition.start();
  recognition.addEventListener('end', () => recognition.start());
  textEl.focus();
};

function stopRecord() {
  window.location.reload();
  textEl.focus();
};


// Set indicator style
recognition.addEventListener('audiostart', () => indictor.style.background = 'green');
recognition.addEventListener('audioend', () => indictor.style.background = 'red');

// Language selection events
langEl.addEventListener('change', (e) => {
  let language = e.target.value;
  localStorage.setItem('language', language);
  setLanguage();
});

// Set recognition language
setLanguage();
function setLanguage() {
  let lang = localStorage.getItem('language') !== null ? localStorage.getItem('language') : 'bn';
  recognition.lang = lang;
}


// get record result
recognition.addEventListener('result', onSpeak);

function onSpeak(e) {
  let text = e.results[0][0].transcript;
  textEl.value += ' ' + text;
  
  // Set text value into localstorage
  let textValue = textEl.value;
  localStorage.setItem('text', textValue);
};

// Get value text value from localstorage
textEl.value = localStorage.getItem('text');

// Clear textarea
clear.addEventListener('click', () => {
  textEl.value = '';
  localStorage.setItem('text', '');
});

// Copy text on clipboard
copy.addEventListener('click', copyText);

function copyText() {
  let textField = textEl;
  if(textField.value) {
    textField.select();
    textField.setSelectionRange(0, 999999);
    document.execCommand('copy');
  }
};

