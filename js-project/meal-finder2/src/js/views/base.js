export const elements = {
  searchForm : document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResList: document.querySelector('.results__list'),
  searchRess: document.querySelector('.results'),
  resPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  list : document.querySelector('.shopping__list'),
  likeMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list')
};

export const renderLoader = parent => {
  const loader = `
    <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if(loader) loader.parentElement.removeChild(loader);
}