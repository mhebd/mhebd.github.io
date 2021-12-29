import {elements} from './base';
import {convertNum, convertDate, convertText} from '../models/Converter';

const renderCurrentWeather = dataC => {
  const html = `
    <div class="temp-wrap">
      <span class="temp">${convertNum(Math.round(dataC.temp))}&#176;</span> সে.
    </div>
    <ul class="other-info">
      <li>
        <img src="https://openweathermap.org/img/w/${dataC.weather[0].icon}.png" alt="" class="statas-img">
        <span>${convertText(dataC.weather[0].description)}</span>
      </li>
      <li>
        <i class="fas fa-wind"></i>
        <span>বাতাশের গতি ${convertNum(dataC.wind_speed)} কিমি/ঘন্টা</span>
      </li>
      <li>
        <i class="fas fa-umbrella"></i>
        <span>আদ্রতা ${convertNum(dataC.humidity)} শতাংশ</span>
      </li>
    </ul>
  `;
  elements.currntCont.innerHTML = html;
};

const singleHour = (data, index) => {
  if(index % 3 === 0) {
  return `
    <li>
      <h3 class="time"><em>${convertDate(data.dt).date}</em> | <em>${convertDate(data.dt).time}</em></h3>
      <div class="info-wrap">
        <div class="icon">
          <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">
        </div>
        <div class="info">
          <p>${convertText(data.weather[0].description)}</p>
          <p>তাপমাত্রা ${convertNum(data.temp)}&#176; সে.</p>
          <p>বাতাশের গতি ${convertNum(data.wind_speed)} কিমি/ঘন্টা</p>
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
        <h2>${convertDate(data.dt).date}</h2>
        <div class="sec-info-wrap">
          <div class="weather">
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="" class="statas-img">
            <h3>${convertText(data.weather[0].description)}</h3>
          </div>
          <div class="left">
            <p>সর্বচ্চ তাপমাত্রা ${convertNum(data.temp.max)}&#176; সে.</p>
            <p>সর্বনিম্ন তাপমাত্রা ${convertNum(data.temp.min)}&#176; সে.</p>
          </div>
          <div class="right">
            <p>সূর্যোদয় ${convertNum(new Date(data.sunrise * 1000).toLocaleTimeString()).replace(/\//g, '. ')}</p>
            <p>সূর্যাস্ত ${convertNum(new Date(data.sunset * 1000).toLocaleTimeString()).replace(/\//g, '. ')}</p>
            <p>বাতাশের গতি ${convertNum(data.wind_speed)} কিমি/ঘন্টা</p>
            <p>আদ্রতা ${convertNum(data.humidity)} শতাংশ</p>
          </div>
        </div>
      </div>
    </div>
  `;
  elements.forecastCont.insertAdjacentHTML('beforeend', html);
}

const renderNext48hWeather = dataH => {
  const listHtml = ` 
    ${
      dataH.map((sd, i) => {return singleHour(sd, i)
      }).join(' ')
    }
  `;

  elements.next48hListCont.innerHTML = listHtml;
}


const renderForecastWeather = dataF => {
  dataF.forEach(data => {
    singleDay(data);
  });
}







export const renderWeather = (data, loc) => {
  elements.locationName.innerHTML = `<p>${loc}</p>`;
  
  renderCurrentWeather(data.current);
  renderNext48hWeather(data.hourly);
  renderForecastWeather(data.daily);
};
