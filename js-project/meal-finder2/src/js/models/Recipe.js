import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  };

  async getSinRecipe() {
    try{
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      // this.result = res.data;
      this.title = res.data.recipe.title;
      this.image = res.data.recipe.image_url;
      this.author = res.data.recipe.publisher;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      // console.log(this.result);
    } catch(err) {
      alert(err);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort,'kg', 'g'];

    const newIngerdients = this.ingredients.map(el => {

      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng;
      if(unitIndex > -1) {
        const arrCount = arrIng.slice(0, unitIndex);
        let count; 
        if(arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+')).toFixed(1);
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }
      } else if(parseInt(arrIng[0], 10)) {
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if(unitIndex === -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }
      return objIng;
    });
    this.ingredients = newIngerdients;
  }

  updateServings(type) {
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
    
    this.ingredients.forEach(ing => {
      ing.count *= (newServings / this.servings);
    });
    this.servings = newServings;
  }

}