import './style.css';
import Framework from './framework';

function header() {
  const element = Framework.createElement('div', {
    class: 'appHeader',
    innerHTML: 'haha',
    type: 'TEXT_ELEMENT',
  }, 'Header');

  return element;
}

const $app = document.querySelector('body');

Framework.render(header(), $app);
// document.body.appendChild(tools());
