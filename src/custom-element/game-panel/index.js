import { createLink } from '../utility.js'

customElements.define('game-panel', class extends HTMLElement {
    constructor() {
        super()

        // 实例属性
        this.container = null

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(createLink('./custom-element/style/grid.css'))
        shadow.appendChild(createLink('./custom-element/game-panel/index.css'))

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
})