import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  };

  async getRecipe() {
    try{
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
      this.result = res.data.recipes;
    } catch(err) {
      alert(err);
    }
  };

}