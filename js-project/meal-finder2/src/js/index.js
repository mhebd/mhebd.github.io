
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/likes';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

const state = {};

/**
 * Search model controller
 */

const searchControl = async () => {
  const query = searchView.getInput();
  
  if(query) {
    state.search = new Search(query);

    searchView.clearInput();
    searchView.clearResCont();
    renderLoader(elements.searchRess);

    await state.search.getRecipe();

    clearLoader();
    searchView.renderResult(state.search.result);
  }

}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchControl();
});

elements.resPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn) {
    const gotoPage = parseInt(btn.dataset.togo, 10);
    searchView.clearResCont();
    searchView.renderResult(state.search.result, gotoPage);
  }
});


/**
 * Recipe model controller
 */

 const recipeControl = async () => {
  const id = window.location.hash.replace('#', '');
  
  if(id) {
    state.recipe = new Recipe(id);

    recipeView.clearRecCont();
    renderLoader(elements.recipe);
    if(state.search) searchView.highlitedSelected(id);

    await state.recipe.getSinRecipe();
    state.recipe.parseIngredients();

    state.recipe.calcTime();
    state.recipe.calcServings();

    clearLoader();
    recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
  }

}

 ['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeControl));

 /**
  * List controller
  */

  const listControl = () => {
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el => {
      const item = state.list.addItem(el.count, el.unit, el.ingredient);
      listView.renderItem(item);
    })
  }

  /**
   * Likes controller
   */

  const likeControl = () => {
    if(!state.likes) state.likes = new Likes();
    const currentId = state.recipe.id;
    if(!state.likes.isLiked(currentId)) {
      const newLike = state.likes.addLikes(
        currentId,
        state.recipe.title,
        state.recipe.author,
        state.recipe.image
      );
      likesView.togleLikedBtn(true);
      likesView.renderLikes(newLike);
    } else {
      state.likes.deleteLike(currentId);
      likesView.togleLikedBtn(false);
      likesView.deleteLikes(currentId);
    };
    likesView.toggleLikeMenu(state.likes.getNumLikes());
  }

  window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLikes(like));
  })

  elements.list.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
      state.list.deleteItem(id);
      listView.deleteItem(id);
    } else if(e.target.matches('.shopping__count--value')) {
      const val = parseFloat(e.target.value, 10);
      state.list.updateCount(id, val);
    }
  })

 elements.recipe.addEventListener('click', e => {
  if(e.target.matches('.btn-dec, .btn-dec *')) {
    if(state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIng(state.recipe);
    }
  } else if(e.target.matches('.btn-inc, .btn-inc *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIng(state.recipe);
  } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    listControl();
  }else if(e.target.matches('.recipe__love, .recipe__love *')) {
    likeControl();
  }
 })

