import { createLink } from '../js/utility.js'

customElements.define('grid-panel', class extends HTMLElement {
    constructor() {
        super()

        // 实例属性
        this.container = null

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(createLink('./custom-element/grid-panel/index.css'))

        // html
        this.container = document.createElement('section')
        this.container.setAttribute('class', 'grid')
        let innerHTML = ''
        for (let i = 0; i < 200; i++) {
            innerHTML += '<span></span>'
        }
        this.container.innerHTML = innerHTML
        shadow.appendChild(this.container)
    }

    start() {

    }
    pause() {

    }
    left() {

    }
    right() {

    }
    down() {

    }
    rotate() {

    }

    set shape(x) {

    }
})