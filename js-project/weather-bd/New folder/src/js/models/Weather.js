import axios from 'axios';

export default class Weather {
  constructor(loc) {
    this.location = loc;
  }

  async getWeather() {
    const key = 'cd7826165c00ce8e484ddc9e03a2ea85';
    try {
      const latLonRes = await axios(`https://api.openweathermap.org/geo/1.0/direct?q=${this.location}&appid=${key}`);

      const {lat, lon} = latLonRes.data[0];

      const res = await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${key}&units=metric&lang=bn`);

      this.result = res.data;
    } catch(err) {
      console.log(err);
    }
  }
}