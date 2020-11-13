const dom = {
  countdown : document.getElementById('countdown'),
  day : document.getElementById('day'),
  hour : document.getElementById('hour'),
  minute : document.getElementById('minute'),
  second : document.getElementById('second'),
  year : document.getElementById('year'),
  img : document.getElementById('spinner'),
};

const year = new Date().getFullYear() + 1;

const nextYear = new Date(`January 01 ${year} 00:00:00`);

function updateTime() {
  const now = new Date();
  const diff = nextYear - now;

  const d = Math.floor((diff / 1000 / 60 / 60 / 24));
  const h = Math.floor((diff / 1000 / 60 / 60) % 24);
  const m = Math.floor((diff / 1000 / 60 ) % 60);
  const s = Math.floor((diff / 1000 ) % 60);

  dom.day.innerHTML = d < 10 ? '0' + d : d;
  dom.hour.innerHTML = h < 10 ? '0' + h : h;
  dom.minute.innerHTML = m < 10 ? '0' + m : m;
  dom.second.innerHTML = s < 10 ? '0' + s : s;

};

setInterval(updateTime, 1000);

dom.year.innerHTML = year;

setTimeout(() => {
  dom.img.style.display = 'none';
  dom.countdown.style.display = 'flex';
}, 1000)