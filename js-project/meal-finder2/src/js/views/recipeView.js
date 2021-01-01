import {elements} from './base';
import {Fraction} from 'fractional';

export const clearRecCont = () => {
  elements.recipe.innerHTML = '';
}

const formateCount = count => {
    if(count) {
        const [int, dec] = count.toString().split('.').map(el=>parseInt(el, 10));
        if(!dec) {
            return count;
        } else if(int === 0) {
            const fc = new Fraction(count);
            return `${fc.numerator}/${fc.denominator}`;
        } else {
            const fc = new Fraction(count - int);
            return `${int} and ${fc.numerator}/${fc.denominator}`;
        }
    }
    return '?';
}

const createIngList = el => `
  <li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formateCount(el.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${el.unit}</span>
        ${el.ingredient}
    </div>
  </li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const html = `
    <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-dec">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-inc">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${ !isLiked ? '-outlined' : ''}"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(el => createIngList(el)).join('')}
        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
  `;
  elements.recipe.insertAdjacentHTML('afterbegin', html);
};

export const updateServingsIng = recipe => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    const countEle = [...document.querySelectorAll('.recipe__count')];
    countEle.forEach((el, i) => {
        el.textContent =formateCount(recipe.ingredients[i].count);
    })
}