export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLikes(id, title, author, img) {
    const like = {id, title, author, img};
    this.likes.push(like);
    this.parsisData();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1); 
    this.parsisData();
  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }
  

  getNumLikes() {
    return this.likes.length;
  }

  parsisData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const data = JSON.parse(localStorage.getItem('likes'));
    if(data) this.likes = data;
  }
}