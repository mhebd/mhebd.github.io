import axios from 'axios';

export default class Weather {
  constructor(loc) {
    this.location = loc;
  }

  async getWeather() {
    const key = 'f9a9bb6567b443dabf5102430202112';
    const day = 7;
    try {
      const res = await axios(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${this.location}&days=${day}&lang=bn`);

      this.result = res.data;
    } catch(err) {
      console.log(err);
    }
  }
}