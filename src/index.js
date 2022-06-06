const component = () => {
    alert('haha')
    const element = document.createElement('h1')
    element.innerHTML = 'Hello Webpack'
    document.body.appendChild(element)
}

component()