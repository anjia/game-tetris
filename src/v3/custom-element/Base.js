export default class extends HTMLElement {

    static create(name, options, children = []) {
        const attrs = {
            'text': 'innerText'
        }
        const elem = document.createElement(name)
        for (let key in options) {
            if (attrs[key]) {
                elem[attrs[key]] = options[key]
            } else {
                elem.setAttribute(key, options[key])
            }
        }
        for (let child of children) {
            elem.appendChild(child)
        }
        return elem
    }

    static createLink(href) {
        return this.create('link', {
            'rel': 'stylesheet',
            'href': href
        })
    }

    static createText(text) {
        return document.createTextNode(text)
    }

    static padNumber(num, len) {
        return String(num).padStart(len, '0')
    }
}