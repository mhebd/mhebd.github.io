const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

const listItems = [];

let dragStartIndex;

createList();
function createList() {
  [...richestPeople]
  .map(a => ({value: a, sort: Math.random()}))
  .sort((a, b) => a.sort - b.sort)
  .map(a => a.value)
  .forEach((people, index) => {
    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);

    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${people}</p>
        <i class="fas fa-bars"></i>
      </div>
    `;

    listItems.push(listItem);
    draggableList.appendChild(listItem);
  });

  addEventListener();
};



function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  const draggableListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragstart);
  });

  draggableListItems.forEach(item => {
    item.addEventListener('dragover', dragover);
    item.addEventListener('drop', drop);
    item.addEventListener('dragenter', dragenter);
    item.addEventListener('dragleave', dragleave);
  })
};


function dragstart(e) {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragenter() {
  this.classList.add('over');
}

function dragleave() {
  this.classList.remove('over');
}

function dragover(e) {
  e.preventDefault();
}

function drop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}


function swapItems(from, to) {
  const itemOne = listItems[from].querySelector('.draggable');
  const itemTwo = listItems[to].querySelector('.draggable');

  listItems[from].appendChild(itemTwo);
  listItems[to].appendChild(itemOne);
};


check.addEventListener('click', checkOrder);

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}
