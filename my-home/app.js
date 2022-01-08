(() => {
    
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
    timeEl : document.getElementById('time'),
    tempEl : document.querySelector('.temp'),
    iconEl : document.querySelector('.icon'),
    avatarFormWrap : document.querySelector('.avatar-form-wrap'),
    avatarForm : document.getElementById('avatar-form'),
    aCBtn : document.getElementById('ac-btn'),
    aFClose : document.getElementById('af-close')
  };

  // Declear date
  const date = new Date();

  // All event listeners
  events();
  function events() {
    domEl.editBtn.addEventListener('click', formController);
    domEl.editForm.addEventListener('submit', setInfo);
    domEl.closeBtn.addEventListener('click', hideFormCon);
    domEl.sitesBtn.addEventListener('click', sitesContainerToggle);
    domEl.aCBtn.addEventListener('click', avatarFormShow);
    domEl.aFClose.addEventListener('click', avatarFormHide);
    domEl.avatarForm.addEventListener('submit', setImageIntoLocStg);

    getUserName()
    setGreetings();
    setUserName();
    setDate();
    setTime();
    setBackground();
    setAvatar();
    getLocation();
    setWeather();
    setColor();

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
    const data = {};
    data.name = domEl.editForm.name.value;
    data.location = domEl.editForm.location.value;
    data.color1 = domEl.editForm.color1.value;
    data.color2 = domEl.editForm.color2.value;

    localStorage.setItem('data', JSON.stringify(data));
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
    const data = localStorage.getItem('data');

    return userName = JSON.parse(data).name !== null ? JSON.parse(data).name : 'Your Name';
  };

  // Get location
  function getLocation() {
    // Set location from localstorage
    const data = localStorage.getItem('data');

    return locationName = JSON.parse(data).location !== null ? JSON.parse(data).location : 'Kushtia';
  }

  function setWeather() {
    const key = 'f9a9bb6567b443dabf5102430202112';
    const loc = locationName;
    getTemp();

    async function getTemp() {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${loc}
      `);
      const data = await res.json();
      const tempC = data.current.temp_c;
      const icon = data.current.condition.icon;
      console.table(data.current);
      console.table(data.location);

      setTemp(tempC);
      setIcon(icon);
    }
  }

  // Set tempareture
  function setTemp(t) {
    domEl.tempEl.innerText = t;
  }

  // Set Icon 
  function setIcon(i) {
    domEl.iconEl.innerHTML = `<img src="https:${i}" alt="Weather Icon">`;
  }

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
    const picUrl = localStorage.getItem('picture') || 'https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg';
    domEl.avatarCon.innerHTML = `<img src="${picUrl}" alt="Your Avatar" class="avatar">`;
  }

  // Set date into dom
  function setDate() {
    const dt = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    domEl.dateEl.innerText = `${dt}`;
  }

  // Set time into dom
  function setTime() {
    setInterval(() => {
      domEl.timeEl.innerText = new Date().toLocaleTimeString();
    }, 1000);
  };


  // Set Background image
  async function setBackground() {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=OrhxU0W9Z03nJCKjuq4J1YTv8xXjut-zRU7m5KdTrhU&orientation=landscape&query=beach`);
    const data = await res.json();

    document.body.style.backgroundImage = `
    radial-gradient(rgba(0, 0, 0, 0.527), transparent), url(${data.urls.full})`;
  };

  // Avatar form show
  function avatarFormShow() {
    domEl.avatarFormWrap.classList.add('show');
  }

  // Avatar form Hide
  function avatarFormHide() {
    domEl.avatarFormWrap.classList.remove('show');
  }

  // Set Image Into Localstorage
  function setImageIntoLocStg(e) {
    e.preventDefault();
    const input = document.getElementById("picture");
    const fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function(event){
      localStorage.setItem('picture', event.target.result);
    };
    avatarFormHide();
    window.location.reload();
  }

  // Set color for this site
  function setColor() {
    const data = localStorage.getItem('data');

    const btnBg = JSON.parse(data).color1 !== null ? JSON.parse(data).color1 : '#ff0077';
    const textColor = JSON.parse(data).color2 !== null ? JSON.parse(data).color2 : '#fff';

    domEl.editForm.color1.value = btnBg;
    domEl.editForm.color2.value = textColor;

    document.documentElement.style.setProperty('--btn-bg', btnBg);
    document.documentElement.style.setProperty('--text-color', textColor);
  }


  // Others funtionality
  function others() {
    domEl.editForm.name.value = userName;
    domEl.editForm.location.value= locationName;
  };

})();








// ToDo list all settings
(() => {
  // All dom element list
  const domEl = {
    tfCont : document.getElementById('tf-container'),
    form : document.getElementById('todo-form'),
    close : document.getElementById('todo-close'),
    add : document.getElementById('todo-add'),
    todoCont : document.getElementById('todo-container'),
    todoLstCont: document.getElementById('todo')
  };
  let listItems = [];

  class Item {
    constructor(task, id, date, time) {
      this.task = task;
      this.id = id;
      this.date = date;
      this.time = time;
    };
  };

  // All funtions
  startFunc();
  function startFunc() {
    getTodoForm();
    removeTodoForm();
    setListItems();
    getListLocStg();
    setStgItemToLstI();
    setListToDom();
    removeItem();
  };

  // Get todo form 
  function getTodoForm() {
    domEl.add.addEventListener('click', () => {
      domEl.tfCont.classList.add('show');
    })
  };

  // Remove todo form
  function removeTodoForm() {
    domEl.close.addEventListener('click', () => {
      domEl.tfCont.classList.remove('show');
    })
  };

  // Set list items into listitems attay
  function setListItems() {
    domEl.form.addEventListener('submit', setItem);
  };

  function setItem(e) {
    e.preventDefault();
    const taskValue = domEl.form.task.value;
    const id = listItems.length + 1;
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();

    if( taskValue == '') {
      alert("Please Input Your Task Info..");
    } else {
      const item = new Item(taskValue, id, date, time);
      listItems.push(item);
      setListLocStg();
      setListToDom();
      domEl.form.task.value = '';
    }
  };

  // Set list Items into localstorage
  function setListLocStg() {
    localStorage.setItem('listItems', JSON.stringify(listItems));
  };

  // Get list from localstorage
  function getListLocStg() {
    return strgList = JSON.parse(localStorage.getItem('listItems')) || [];
  };

  // Set list to the dom
  function setListToDom() {
    const html = listItems.map(item => {
      return `<li class="todo-item" data-id="${item.id}">
        <p class="lead">${item.task}</p>
        <p class="small">${item.date} | ${item.time}</p>
        <div class="delete-btn">
          <button class="btn del-btn close-btn">X</button>
        </div>
      </li>`;
    }).join('');
    domEl.todoLstCont.innerHTML = html;
  };

  // Set storage list item into listitems list
  function setStgItemToLstI() {
    strgList.forEach(item => {
      listItems.push(item);
    });
  };

  // Remove item from dom and listItems list also storage
  function removeItem() {
    domEl.todoLstCont.addEventListener('click', findId);
  };

  // Find item ID 
  function findId(e) {
    if(e.target.classList.contains('del-btn')) {
      const dataId = e.target.parentNode.parentNode.getAttribute('data-id');
      
      removeFromList(dataId);
      // console.log(dataId);
    };
  };

  // Remove Item form list
  function removeFromList(dataId) {
    getIndex(dataId);
  };

  // Get list item index
  function getIndex(dataId) {
    listItems.forEach((item, index) => {
      // console.log(item);
      if(item.id == dataId) {
        removeListByIndex(index);
        upDateId();
      }
    })
  };

  // Remove list by index
  function removeListByIndex(i) {
    listItems.splice(i, 1);
  };

  // Update id again
  function upDateId() {
    listItems.forEach((item, index) => {
      item.id = index + 1;
    });
    setListLocStg();
    setListToDom();
  }

})();
