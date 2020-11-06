
const dom = {
  container : document.getElementById('post-container'),
  filter : document.getElementById('filter'),
  cssLoader : document.querySelector('.css-loader'),
};


let post = 5;
let page = 1;

// Get post from API
async function getPost() {
  const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${post}&_page=${page}`);

  const data = await res.json();
  return data;
};

// Show post in the display
async function displayPost() {
  const posts = await getPost();

  posts.forEach(post => {
    let html = `
    <div class="s-post">
      <div class="post-id">${post.id}</div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    dom.container.insertAdjacentHTML('beforeend', html);
  });
};

displayPost();


// Creat scroll event leistener
window.addEventListener('scroll', getNewPost);

// Get new post by scroll
function getNewPost(e) {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight -5) {
    callCssLoader();
  }
};

// Show css loader and show new post
function callCssLoader() {
  dom.cssLoader.classList.add('show');

  setTimeout(() => {
    dom.cssLoader.classList.remove('show');
    setTimeout(() => {
      page++;
      displayPost();
    }, 300)
  }, 1000)
};

// Creat event listener for filter post
dom.filter.addEventListener('input', filterPost);

// Filter post by input value
function filterPost() {
  const input = dom.filter.value.toUpperCase();
  const postArr = document.querySelectorAll('.s-post');

  postArr.forEach(cur => {
    const title = cur.querySelector('.post-title').innerText.toUpperCase();
    const body = cur.querySelector('.post-body').innerText.toUpperCase();

    if(title.indexOf(input) > -1 || body.indexOf(input) > -1) {
      cur.style.display = 'block';
    } else {
      cur.style.display = 'none';
    }
  });
};
