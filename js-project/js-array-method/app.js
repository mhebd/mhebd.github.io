
const UIController = (() => {

  const doms = {
    container : document.getElementById('user-info'),
    addUser : document.getElementById('add-user'),
    doubleMoney : document.getElementById('double-money'),
    showMillion : document.getElementById('show-million'),
    sortRich : document.getElementById('sort-rich'),
    calculate : document.getElementById('calculate'),
  };



  return {
    getDoms : () => {
      return doms;
    },
  }

})();



const AppController = ( (UiCtrl) => {

  const appStart = () => {
    let dom = UiCtrl.getDoms();
    let userData = [];

    // get user data
    dom.addUser.addEventListener('click', () => {
      getUser(dom, userData);
      
    });

    // Double user money
    dom.doubleMoney.addEventListener('click', () => {
      userData = getDoubleMoney(userData);
      displayUser(dom, userData);
    });

    // Sort user by his money
    dom.sortRich.addEventListener('click', () => {
      userData= sortRichUser(userData);
      displayUser(dom, userData);
    });

    // Show user thoes only have millions of money
    dom.showMillion.addEventListener('click', () => {
      userData = showMillions(userData);
      displayUser(dom, userData);
    });

    // Calculate all users money
    dom.calculate.addEventListener( 'click', () => {
      calculateTotal(dom, userData);
    });
    
  };



  // Get all user info data from API
  const getUser = (dom, userData) => {

    setUser(dom, userData);
    async function setUser(dom, u) {

      const res = await fetch('https://randomuser.me/api');
      const data = await res.json();

      let first = data.results[0].name.first;
      let last = data.results[0].name.last;

      let userInfo = {
        name : `${first} ${last}`,
        money : Math.round((Math.random() * 1000000)),
      };

      u.push(userInfo);
      let d = u;
      displayUser(dom, d);

    };

  };

  
  // Display user information
  const displayUser = (dom, users) => {
    dom.container.innerHTML = '';
    users.forEach((cur) => {
      let html = `<article>
      <span class="left">${cur.name}</span>
      <span class="right">$${nFormate(cur.money)}</span>
    </article>`;
    return dom.container.insertAdjacentHTML('beforeend', html);
    });
  };

  // Double all user money
  const getDoubleMoney = (users) => {
    return users.map((cur) => {
      return { ...cur, money: cur.money * 2}
    });
  };

  // Sort rich user first
  const sortRichUser = (info) => {
    return info.sort((a, b) => {
      return b.money - a.money;
    });
  };

  // Show millionairs only
  const showMillions = (info) => {
    let newUserData = info.filter((cur) => {
      return cur.money > 1000000;
    });
    return newUserData;
  };

  // Calculate total money
  const calculateTotal = (dom, users) => {
    let total = users.reduce((sum, cur) => {
      return sum + cur.money;
    }, 0);

    let html = `<article class="total">
      <span class="left">Total Money</span>
      <span class="right">$${nFormate(total)}</span>
    </article>`;

    dom.container.insertAdjacentHTML('beforeend', html);
  };

  // Formate number as like money
  const nFormate = num => {
    let numSplit, int, dec;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');
    int = numSplit[0];
    dec = numSplit[1];

    if( int.length > 3 ) {
      num = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
    };

    return num + '.' + dec;
  };




  return {
    init : () => {

      console.log('App Successfully Start');
      appStart();

    }
  }

})(UIController);

AppController.init();