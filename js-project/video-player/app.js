
// UI Controller modules 
const UIController = (() => {

  const doms = {
    video : document.getElementById('video'),
    play : document.getElementById('play'), 
    stop : document.getElementById('stop'),
    progress : document.getElementById('progress'),
    time : document.getElementById('time'),
    volume : document.getElementById('volume')
  };

  return {
    getDoms : () => {
      return doms;
    }
  }

})();


// Main controller modules
const MainController = ((UiCtrl) => {

  let doms = UiCtrl.getDoms();

  const events = () => {

    doms.video.addEventListener('click', updateVideoStatus);
    doms.video.addEventListener('pause', updatePlayBtn);
    doms.video.addEventListener('play', updatePlayBtn);
    doms.video.addEventListener('timeupdate', updateProgress);
    doms.video.addEventListener('wheel', updateVolume);

    doms.play.addEventListener('click', updateVideoStatus);
    doms.stop.addEventListener('click', stopVideo);
    doms.progress.addEventListener('change', setVideoProgress);
    doms.volume.addEventListener('change', setVolume);

  };

  const updateVideoStatus = () => {
    if(doms.video.paused) {
      doms.video.play();
    } else {
      doms.video.pause();
    }
  };

  const updateVolume = (e) => {
    if( e.deltaY < 0 ) {
      if( doms.video.volume !== 1) {
        doms.video.volume += .1;
        doms.volume.value = doms.video.volume;
      }
    } else {
      if( doms.video.volume != 0 ) {
        doms.video.volume -= .1;
        doms.volume.value = doms.video.volume;
      }
    }
  };

  const updatePlayBtn = () => {
    if(doms.video.paused) {
      doms.play.className = 'btn play play-icon';
    } else {
      doms.play.className = 'btn play pause-icon';
    }
  };

  const stopVideo = () => {
    doms.video.currentTime = 0;
    doms.video.pause();
  };

  const updateProgress = () => {
    doms.progress.value = (doms.video.currentTime / doms.video.duration) * 100;

    let mins = Math.floor(doms.video.currentTime / 60);
    if( mins < 10 ) {
      mins = '0' + mins;
    };

    let secs = Math.floor(doms.video.currentTime % 60 );
    if( secs < 10 ) {
      secs = '0' + secs;
    };

    doms.time.textContent = `${mins}:${secs}`;
  };

  const setVideoProgress = () => {
    doms.video.currentTime = (+doms.progress.value * doms.video.duration) / 100;
  };

  const setVolume = () => {
    doms.video.volume = doms.volume.value;
  }

  return {
    init : () => {
      events();
    }
  }


})(UIController);

MainController.init();   