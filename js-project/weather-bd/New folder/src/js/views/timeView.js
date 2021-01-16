import {elements} from './base';
import {convert} from '../models/Converter'

export const currentTime = () => {
  

  setInterval(() => {
    const d = new Date().toLocaleTimeString();
    const time = convert(d);
    elements.time.innerHTML = `
    <p class="time">
      ${
        time
      }
    </p>
  `;
  }, 1000)
}
