import {elements} from './base';
import {reduceTitle} from './searchView';

export const togleLikedBtn = isLiked => {
  const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`);
};

export const toggleLikeMenu = numLikes => {
  elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikes = like => {
  const html = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.image}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${reduceTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
  `;
  elements.likesList.insertAdjacentHTML('beforeend', html);
};

export const deleteLikes = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
  if(el) el.parentElement.removeChild(el);
}
