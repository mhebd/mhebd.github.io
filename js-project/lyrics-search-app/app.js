
const dom = {
  form : document.getElementById('form'),
  container : document.getElementById('container'),
  more : document.getElementById('more'),
};

const url = 'https://api.lyrics.ovh';

dom.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = dom.form.search.value;

  if(!searchTerm) {
    alert('Please Enter artist name or song title');
  } else {
    getSongs(searchTerm);
  };

  dom.form.search.value = '';
});


async function getSongs(term) {
  const res = await fetch(`${url}/suggest/${term}`);
  const data = await res.json();
  showSongs(data);
};

function showSongs(data) {
  dom.container.innerHTML = `
    <h3>Total Songs Found - ${data.total}</h3>
    <hr>
    <ul class="songs">
      ${
        data.data.map( song => `
          <li class="song">
            <span><strong>${song.artist.name}</strong><span> - <em>${song.title}</em>
            <button class="btn btn-lyrics" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</button>
          </li>
        `).join('')
      }
    </ul>
  `;

  if(data.prev || data.next) {
    dom.more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSong('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSong('${data.next}')">next</button>` : ''}
    `
  }
};

async function getMoreSong(moreUrl) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${moreUrl}`);
  const data = await res.json();
  showSongs(data);
};

dom.container.addEventListener('click', getRequest);

function getRequest(e) {
  const clickedEl = e.target;

  if( clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const title = clickedEl.getAttribute('data-title');

    getLyrics(artist, title);
  }
};

async function getLyrics(artist, title) {
  const res = await fetch(`${url}/v1/${artist}/${title}`);
  const data = await res.json();

  dom.container.innerHTML = `
  <p><strong>${artist}</strong> - ${title}</p>
  <hr>
  <em>${data.lyrics.replace(/(\r|\n|\r\n)/g, '<br />')}</em>`;

  dom.more.innerHTML = '';
};

