class CustomBase extends HTMLElement {

    static create(name, attrs) {
        const elem = document.createElement(name)
        for (let key in attrs) {
            elem.setAttribute(key, attrs[key])
        }
        return elem
    }

    static createByOptions(name, options = {}, children = []) {
        const div = document.createElement(name)
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

    static createLink(href) {
        return this.create('link', {
            'rel': 'stylesheet',
            'href': href
        })
    }

    static padNumber(num, len) {
        return String(num).padStart(len, '0')
    }
}

export default CustomBase