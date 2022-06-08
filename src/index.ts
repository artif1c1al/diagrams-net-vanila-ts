import './style.css';
import {printMe} from './print';
// import {Icon as HTMLImageElement} from './diagrams-logo.png';

const makeIcon = (icon, width, height) => {
    const myIcon = new Image();
    myIcon.src = icon;
    myIcon.width = width;
    myIcon.height = height;

    return myIcon
}

const makeElement = (elementName: any, innerHTML?: any, width?: any, height?: any) => {
    const element = document.createElement(elementName);
    element.innerHTML = innerHTML;
    element.width = width;
    element.height = height;
    element.onclick = printMe

    return element;
}



function header() {
    const element = makeElement('header', 'hello diagrams')
    // element.appendChild(makeIcon(Icon, 32, 36))


    return element
}

document.body.appendChild(header());