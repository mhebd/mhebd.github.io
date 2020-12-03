
// Get all dom elements
const domEl = {
  editFormCon : document.getElementById('edit-form'),
  editForm : document.getElementById('form'),
  editBtn : document.getElementById('edit'),
  closeBtn : document.getElementById('close'),
  sitesBtn : document.getElementById('sites'),
  sitesContainer : document.getElementById('sites-container'),
  avatarCon : document.getElementById('avatar-wrap'),
  greetings : document.getElementById('greetings'),
  usrNameEl : document.getElementById('user-name'),
  dateEl : document.getElementById('date'),
  timeEl : document.getElementById('time')
};

// Declear date object
const date = new Date();

// All event listeners
events();
function events() {
  domEl.editBtn.addEventListener('click', formController);
  domEl.editForm.addEventListener('submit', setInfo);
  domEl.closeBtn.addEventListener('click', hideFormCon);
  domEl.sitesBtn.addEventListener('click', sitesContainerToggle);

  getUserName()
  setGreetings();
  setUserName();
  setDate();
  setTime();
  setBackground();
  setAvatar();

  others();
};


// Form controller
function formController() {
  domEl.editFormCon.classList.toggle('show');
};

// Hide form by close button
function hideFormCon(e) {
  e.preventDefault();
  domEl.editFormCon.classList.remove('show');
}


// Set all info from form
function setInfo(e) {
  e.preventDefault();
  const name = domEl.editForm.name.value;
  const bgs = domEl.editForm.bgs.value;
  const input = document.getElementById("picture");
  const fReader = new FileReader();
  fReader.readAsDataURL(input.files[0]);
  fReader.onloadend = function(event){
    localStorage.setItem('picture', event.target.result);
  };

  localStorage.setItem('name', name);
  localStorage.setItem('bgChanges', bgs);
  domEl.editFormCon.classList.remove('show');
  window.location.reload();
}

// Sites container toggle
function sitesContainerToggle() {
  domEl.sitesContainer.classList.toggle('show');
}

// Get user name 
function getUserName() {
  // Set user name form localstorage
  return userName = localStorage.getItem('name') !== null ? localStorage.getItem('name') : 'Your Name';
};

// Set greetings 
function setGreetings() {
  let h = date.getHours();
  if(h > 6 && h < 12) {
    domEl.greetings.innerText = 'Good Morning!';
  } else if(h >= 12 && h < 16) {
    domEl.greetings.innerText = 'Good Noon!';
  } else if(h >= 16 & h < 19) {
    domEl.greetings.innerText = 'Good Evening';
  } else {
    domEl.greetings.innerText = 'Good Night!';
  };
};

// Set user name into dom
function setUserName() {
  domEl.usrNameEl.innerText = userName;
};

function setAvatar() {
  const picUrl = localStorage.getItem('picture') !== null ? localStorage.getItem('picture') : 'img/16.jpg';
  domEl.avatarCon.innerHTML = `<img src="${picUrl}" alt="Your Avatar" class="avatar">`;
}

// Set date into dom
function setDate() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let dy = date.getDay();
  let m = date.getMonth();
  let dt = date.getDate();
  let y = date.getFullYear();

  domEl.dateEl.innerText = `${days[dy]} - ${months[m]} ${dt}, ${y} `;
}

// Set time into dom
function setTime() {
  setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let status = h >= 12 ? 'PM' : 'AM';
    
    h = h > 12 ? h - 12 : h;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    
    domEl.timeEl.innerText = `${h} : ${m} : ${s} ${status}`;
  }, 1000);
};


// Set Background image
function setBackground() {
  const bgChanges = localStorage.getItem('bgChanges') !== null ? localStorage.getItem('bgChanges') : 'always';
  document.getElementById(bgChanges).checked = true;

  if( bgChanges === 'always' ) {
    const imageNumber = 18;
    const image = Math.floor(Math.random() * imageNumber) + 1;
    document.body.style.backgroundImage = `
      radial-gradient(rgba(0, 0, 0, 0.527), transparent), url(img/${image}.jpg)
    `;
  } else if( bgChanges === 'daily' ) {
    const img = date.getDate();
    img > 18 ? img - 18 : img;
    document.body.style.backgroundImage = `
      radial-gradient(rgba(0, 0, 0, 0.527), transparent), url(img/${img}.jpg)
    `;
  };
};


// Others funtionality
function others() {
  domEl.editForm.name.value = userName;
};



