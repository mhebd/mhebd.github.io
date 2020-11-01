
const dom = {
  form : document.getElementById('s-form'),
  random : document.getElementById('random'),
  srHeading : document.getElementById('srh'),
  sResult : document.getElementById('sr'),
  ssResult : document.getElementById('ssr'),
};


const events = (dom) => {
  dom.form.addEventListener('submit', getMeal);

  dom.sResult.addEventListener('click', e => {
    const id = e.target.parentNode.getAttribute('data-id');

    if(id !== null) {
      displaySingleMeal(id);
    }
  });

  dom.random.addEventListener('click', displayRandomeMeal)
};
events(dom);



function getMeal(e) {
  e.preventDefault();
  const searchValue = dom.form.search.value;

  dom.sResult.innerHTML = '';
  dom.ssResult.innerHTML = '';

  if(searchValue === '' || searchValue === null ) {
    alert('Please, Input a meal name.');
  } else {
    async function getMealData() {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
  
      const data = await res.json();

      if( data.meals !== null ) {
        dom.srHeading.innerHTML = `<h2>Your Search Result For : ${searchValue}</h2>`
      } else {
        dom.srHeading.innerHTML = `<h2>Nothing found for '${searchValue}'. Please try again.</h2>`
      }

      if(data.meals !== null) {
        const mealEl = data.meals.map(cur => `
        <div class="meal-wrap" data-id="${cur.idMeal}">
          <img src="${cur.strMealThumb}" alt="${cur.strMeal}" class="thumb" />
          <h4 class="name">${cur.strMeal}</h4>
        </div>
        `).join('');

        dom.sResult.innerHTML = mealEl;
      }
    }
    getMealData();
  };

  dom.form.search.value = '';

};



function displaySingleMeal(id) {
  dom.ssResult.innerHTML = '';

  async function getSMeal(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    const data = await res.json();
    displayMeal(data);
  }
  getSMeal(id);
};



function displayRandomeMeal(e, text) {
  dom.ssResult.innerHTML = '';
  dom.sResult.innerHTML = '';

  if( text !== undefined ) {
    dom.srHeading.innerHTML = `<h2>${text}</h2>`;
  } else {
    dom.srHeading.innerHTML = `<h2>Meal For You!</h2>`;
  }

  async function randomMeal() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);

    const data = await res.json();
    displayMeal(data);
  };
  randomMeal()
}

displayRandomeMeal('e', 'Today\'s Hit!');




function displayMeal(data) {
  const meal = data.meals[0];

  const container = `
      <div class="single-meal-wrap">
        <h2 class="heading">Full Meal Feature</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="thumb" />
        <h3 class="name">${meal.strMeal}</h3>
        <h4 class="category">Meal Category: ${meal.strCategory}</h4>
        <h4 class="area">Meal Area: ${meal.strArea}</h4>

        <p class="meal-details">${meal.strInstructions}</p>
      </div>
    `;

  dom.ssResult.innerHTML = container;
}