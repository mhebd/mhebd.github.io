export default class Location {
  constructor(loc) {
    this.Location = loc;
  }

  setLocation() {
    localStorage.setItem('location', this.Location);
  }

  getLocation() {
    this.locationName = localStorage.getItem('location') !== null ? localStorage.getItem('location') : 'dhaka';
  }
}