class CustomBase extends HTMLElement {

    static createLink(href) {
        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', href)
        return link
    }

    static createButton(text) {
        const btn = document.createElement('button')
        btn.innerText = text
        return btn
    }

    static createDiv(options = {}, children = []) {
        const div = document.createElement('div')
        const attrs = {
            'class': 'className',
            'text': 'innerText'
        }
        for (let key in options) {
            div[attrs[key]] = options[key]
        }
        for (let child of children) {
            div.appendChild(child)
        }
        return div
    }

    static create(name, attrs) {
        const elem = document.createElement(name)
        for (let key in attrs) {
            elem.setAttribute(key, attrs[key])
        }
        return elem
    }

    static showNumber(num, len) {
        return String(num).padStart(len, '0')
    }
}

export default CustomBase