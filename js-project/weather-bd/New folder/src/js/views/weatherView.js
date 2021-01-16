import {elements} from './base';
import {convert} from '../models/Converter';

const renderCurrentWeather = dataC => {
  const html = `
    <div class="temp-wrap">
      <span class="temp">${convert(Math.round(dataC.temp_c))}&#176;</span> সে.
    </div>
    <ul class="other-info">
      <li>
        <img src="${dataC.condition.icon}" alt="" class="statas-img">
        <span>${dataC.condition.text}</span>
      </li>
      <li>
        <i class="fas fa-wind"></i>
        <span>বাতাশের গতি ${convert(dataC.wind_kph)} কিমি/ঘন্টা</span>
      </li>
      <li>
        <i class="fas fa-umbrella"></i>
        <span>আদ্রতা ${convert(dataC.humidity)} শতাংশ</span>
      </li>
    </ul>
  `;
  elements.currntCont.innerHTML = html;
};

const singleHour = (data, index) => {
  if(index % 3 === 0) {
  return `
    <li>
      <h3 class="time"><em>${convert(data.time).replace(/-/g, '.')}</em></h3>
      <div class="info-wrap">
        <div class="icon">
          <img src="${data.condition.icon}" alt="">
        </div>
        <div class="info">
          <p>${data.condition.text}</p>
          <p>তাপমাত্রা ${convert(data.temp_c)}&#176; সে.</p>
          <p>বাতাশের গতি ${convert(data.wind_kph)} কিমি/ঘন্টা</p>
        </div>
      </div>
    </li>
  `;
  }

}

const singleDay = data => {
  const html = `
    <div class="forecast-container bg">
      <div class="sec-header">
        <h2>${convert(data.date).replace(/-/g, '. ')}</h2>
        <div class="sec-info-wrap">
          <div class="left">
            <p>সর্বচ্চ তাপমাত্রা ${convert(data.day.maxtemp_c)}&#176; সে.</p>
            <p>সর্বনিম্ন তাপমাত্রা ${convert(data.day.mintemp_c)}&#176; সে.</p>
          </div>
          <div class="right">
            <p>সূর্যোদয় ${convert(data.astro.sunrise)}</p>
            <p>সূর্যাস্ত ${convert(data.astro.sunset)}</p>
          </div>
        </div>
      </div>
      <div class="forecast-info-wrap">
        <ul>

        ${
          data.hour.map((sd, i) => {return singleHour(sd, i)
          }).join(' ')
        }
        
        </ul>
      </div>
    </div>
  `;
  elements.forecastCont.insertAdjacentHTML('beforeend', html);
}


const renderForecastWeather = dataF => {
  dataF.forEach(data => {
    singleDay(data);
  });
}

export const renderWeather = (data) => {
  elements.locationName.innerHTML = `<p>${data.location.name}, ${data.location.country}</p>`;
  
  renderCurrentWeather(data.current);
  renderForecastWeather(data.forecast.forecastday);
};
