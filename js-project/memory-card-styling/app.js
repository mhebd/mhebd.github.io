
const dom = {
  trash : document.getElementById('trash'),
  getForm : document.getElementById('add-new-card'),
  cardContainer : document.getElementById('card-container'),
  prev : document.getElementById('btn-prev'),
  next : document.getElementById('btn-next'),
  curdNumber : document.getElementById('card-number'),
  addContainer : document.getElementById('add-container'),
  close : document.getElementById('close'),
  form : document.getElementById('new-card'),
}


let CurrentActiveCard = 0;

const cardEl = [];

const allData = getCardsData();


function creatCard() {
  allData.forEach((data, index) => cards(data, index))
};

function cards(data, index) {
  const div = document.createElement('div');
  div.classList.add('card');

  if( index === 0 ) {
    div.classList.add('active');
  }

  div.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.quest}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.ans}</p>
    </div>
  </div>
  `;

  div.addEventListener('click', () => div.classList.toggle('show-ans') );

  cardEl.push(div);
  dom.cardContainer.appendChild(div);

  updateCurrentText();
};

creatCard();


function updateCurrentText() {
  dom.curdNumber.innerText = `${CurrentActiveCard + 1}/${cardEl.length}`;
};

dom.next.addEventListener('click', nextCard);
dom.prev.addEventListener('click', prevCard);

function nextCard() {
  cardEl[CurrentActiveCard].className = 'card left';
  CurrentActiveCard++;
  if( CurrentActiveCard > cardEl.length - 1) {
    CurrentActiveCard = cardEl.length - 1;
  };
  cardEl[CurrentActiveCard].className = 'card active';
  updateCurrentText();
};

function prevCard() {
  cardEl[CurrentActiveCard].className = 'card';
  CurrentActiveCard--;
  if( CurrentActiveCard < 0) {
    CurrentActiveCard = 0;
  };
  cardEl[CurrentActiveCard].className = 'card active';
  updateCurrentText();
}

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
};

function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

dom.getForm.addEventListener('click', () => dom.addContainer.classList.add('show'));

dom.close.addEventListener('click', () => dom.addContainer.classList.remove('show'));

dom.form.addEventListener('submit', addNewQuest);

function addNewQuest(e) {
  e.preventDefault();
  const quest = dom.form.quest.value;
  const ans = dom.form.ans.value;
  console.log(quest, ans);

  if( quest.trim() && ans.trim() ) {
    const newData = {quest, ans};

    creatCard(newData);

    dom.form.quest.value = '';
    dom.form.ans.value = '';
    dom.addContainer.classList.remove('show');

    allData.push(newData);
    setCardsData(allData);
  }
}

dom.trash.addEventListener('click', clearStorage );

function clearStorage() {
  localStorage.clear();
  dom.cardContainer.innerHTML = '';
  window.location.reload();
}