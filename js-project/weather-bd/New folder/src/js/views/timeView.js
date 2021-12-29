import {elements} from './base';

export const currentTime = () => {
  

  setInterval(() => {
    const time = new Date().toLocaleTimeString('bn-BD');
    elements.time.innerHTML = `
    <p class="time">
      ${
        time
      }
    </p>
  `;
  }, 1000)
}
