
// Select all DOM elements
const dom = {
  container : document.getElementById('container'),
  progressContainer : document.getElementById('progress-container'),
  progress : document.getElementById('progress'),
  music : document.getElementById('music'),
  title : document.getElementById('title'),
  coverImg : document.getElementById('cover-img'),
  prev : document.getElementById('prev'),
  play : document.getElementById('play'),
  next : document.getElementById('next'),
  volumeContainer : document.getElementById('volume-container'),
  volumeBar : document.getElementById('volume-bar'),
  volumeBtn : document.getElementById('volume-btn'),
  title : document.getElementById('title'),
};

const musicList = ['audio1', 'audio2', 'audio3'];
let selectedMusic = 1;

// Load initial music
function loadMusic(music) {
  dom.music.src = `audio/${music}.mp3`;
  dom.coverImg.src = `img/${music}.jpg`;
  dom.title.innerText = music;
}
loadMusic(musicList[selectedMusic]);


// All events list
function events() {
  dom.play.addEventListener('click', controllMusic);
  dom.prev.addEventListener('click', prevMusic);
  dom.next.addEventListener('click', nextMusic);
  dom.music.addEventListener('timeupdate', updateProgress);
  dom.progressContainer.addEventListener('click', updateMusic);
  dom.volumeContainer.addEventListener('click', updateVolume);
  dom.volumeBtn.addEventListener('click', toggleVolume);
};
events();

// Initialy Controll full music app
function controllMusic() {
  const isPlaying = dom.container.classList.contains('play');
  if(isPlaying) {
    audioPause();
  } else {
    audioPlay();
  }
};

// Play music
function audioPlay() {
  dom.container.classList.add('play');
  dom.play.innerHTML = `<i class="fas fa-pause"></i>`;
  dom.music.play();
};

// Pause music
function audioPause() {
  dom.container.classList.remove('play');
  dom.play.innerHTML = `<i class="fas fa-play"></i>`;
  dom.music.pause();
};

// Change to previous music
function prevMusic() {
  selectedMusic--;
  if(selectedMusic < 0 ) {
    selectedMusic = musicList.length -1;
  };
  loadMusic(musicList[selectedMusic]);
  const isPlaying = dom.container.classList.contains('play');
  if(!isPlaying) {
    audioPause();
  } else {
    audioPlay();
  }
}

// Change to next music
function nextMusic() {
  selectedMusic++;
  if(selectedMusic > musicList.length - 1 ) {
    selectedMusic = 0;
  };
  loadMusic(musicList[selectedMusic]);
  const isPlaying = dom.container.classList.contains('play');
  if(!isPlaying) {
    audioPause();
  } else {
    audioPlay();
  }
}

// Update progress bar with music current time
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  let progress = (currentTime / duration) * 100;
  dom.progress.style.width = `${progress}%`;
}

// Update music current time with progress bar
function updateMusic(e) {
  const width = this.clientWidth;
  const widthX = e.offsetX;
  const duration = dom.music.duration;

  dom.music.currentTime = (widthX / width) * duration;
};

// Update volume with volume bar
function updateVolume(e) {
  const widthX = e.offsetX;
  dom.music.volume = widthX / 100;
  dom.volumeBar.style.width = `${widthX}%`;
};

// Toggle volume (0-1) with volume icon
function toggleVolume() {
  const getVolume = dom.music.volume;
  if(getVolume > 0) {
    dom.music.volume = 0;
    dom.volumeBar.style.width = '0%';
    dom.volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  } else {
    dom.music.volume = 1;
    dom.volumeBar.style.width = '100%';
    dom.volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  }
}
