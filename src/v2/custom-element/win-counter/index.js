import { createLink } from '../js/utility.js'

customElements.define('win-counter', class extends HTMLElement {

    // 私有属性
    #min = 0
    #max = 0
    #win = 0
    #container = null

    constructor() {
        super()

        // shadow root
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(createLink('./custom-element/win-counter/index.css'))

        // html
        this.#container = document.createElement('ul')
        shadow.appendChild(this.#container)

        // 初始化
        this.max = 3
        this.win = 0
    }

    set win(x) {
        if (x === this.#win || x < this.#min || x > this.#max) return
        this.#win = x
        for (let i = 0; i < this.#win; i++) {
            this.#container.children[i].className = 's'
        }
        for (let i = this.#win; i < this.#max; i++) {
            this.#container.children[i].className = ''
        }
    }

    set max(x) {
        if (x === this.#max || x < this.#min) return
        if (x > this.#max) {
            let innerHTML = ''
            for (let i = this.#max; i < x; i++) {
                innerHTML += '<li></li>'
            }
            this.#container.insertAdjacentHTML('beforeend', innerHTML)
            this.#max = x
        } else {
            for (let i = this.#max - 1; i >= x; i--) {
                this.#container.children[i].remove()
            }
            this.#max = x
            if (this.#win > this.#max) {
                this.#win = this.#max
                this.setAttribute('value', this.#win)
            }
        }
    }

    reset() {
        this.win = 0
    }
})