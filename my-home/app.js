const basicSetting = (() => {
    
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
    iconEl : document.querySelector('.icon')
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
    getLocation();
    setWeather();

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
    const location = domEl.editForm.location.value;
    const input = document.getElementById("picture");
    const fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function(event){
      localStorage.setItem('picture', event.target.result);
    };

    localStorage.setItem('name', name);
    localStorage.setItem('bgChanges', bgs);
    localStorage.setItem('location', location);
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

  // Get location
  function getLocation() {
    // Set location from localstorage
    return locationName = localStorage.getItem('location') !== null ? localStorage.getItem('location') : 'Kushtia';
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
      const icon = data.current.is_day;
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
    domEl.iconEl.innerHTML = (i === 1 ? '<im class="fas fa-sun"></img>': '<i class="fas fa-moon"></i>');
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
      // let date = new Date();
      // let h = date.getHours();
      // let m = date.getMinutes();
      // let s = date.getSeconds();
      // let status = h >= 12 ? 'PM' : 'AM';
      
      // h = h > 12 ? h - 12 : h;
      // h = h < 10 ? '0' + h : h;
      // m = m < 10 ? '0' + m : m;
      // s = s < 10 ? '0' + s : s;
      
      // domEl.timeEl.innerText = `${h} : ${m} : ${s} ${status}`;

      domEl.timeEl.innerText = new Date().toLocaleTimeString();
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
      let img = date.getDate();
      img = img > 18 ? img - 18 : img;
      document.body.style.backgroundImage = `
        radial-gradient(rgba(0, 0, 0, 0.527), transparent), url(img/${img}.jpg)
      `;
    };
  };


  // Others funtionality
  function others() {
    domEl.editForm.name.value = userName;
    domEl.editForm.location.value= locationName;
  };

})();








// ToDo list all settings
const todoListSetting = (() => {
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
    return strgList = JSON.parse(localStorage.getItem('listItems'));
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
    console.log(listItems);
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