import {convert} from './models/Converter';
import {elements} from './views/base';

import Location from './models/Location';
import Weather from './models/Weather';

import * as weatherView from './views/weatherView';
import {currentTime} from './views/timeView';


const state = {};

// Get Search form
elements.searchBtn.addEventListener('click', () => elements.searchFormCont.classList.add('show'))

// Remove search form
elements.searchFormCls.addEventListener('click', () => elements.searchFormCont.classList.remove('show'));

// Set location in the localstorage
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  locationControl();
});

const locationControl = () => {
  const locName = elements.searchForm.location.value;
  state.location = new Location(locName);
  state.location.setLocation();
  state.location.getLocation();

  searchControl();
  elements.searchFormCont.classList.remove('show');
}


const searchControl = async () => {
  const loc = state.location;

  if(loc) {
  state.weather = new Weather(loc.locationName);
  await state.weather.getWeather();

  weatherViewControl(state.weather.result);
  }
};


const weatherViewControl = (info) => {
  weatherView.renderWeather(info, state.weather.location);
} 


window.addEventListener('load', async () => {
  const location = localStorage.getItem('location') !== null ? localStorage.getItem('location') : 'dhaka'; 
  if(location) {
    state.weather = new Weather(location);
    await state.weather.getWeather();
  
    weatherViewControl(state.weather.result);
  }

  currentTime();

})


