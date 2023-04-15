import { createLink } from '../js/utility.js'

customElements.define('op-handler', class extends HTMLElement {

    // 私有属性
    #btnRotate = null
    #btnRight = null
    #btnLeft = null
    #btnDown = null
    #eRotate = new Event('rotate')
    #eRight = new Event('right')
    #eLeft = new Event('left')
    #eDown = new Event('down')

    constructor() {
        super()

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(createLink('./custom-element/op-handler/index.css'))

        // html
        let container = document.createElement('div')
        container.className = 'area'
        this.#btnRotate = document.createElement('button')
        this.#btnRotate.innerText = '旋转'
        container.appendChild(this.#btnRotate)
        this.#btnRight = document.createElement('button')
        this.#btnRight.innerText = '右移'
        container.appendChild(this.#btnRight)
        this.#btnLeft = document.createElement('button')
        this.#btnLeft.innerText = '左移'
        container.appendChild(this.#btnLeft)
        this.#btnDown = document.createElement('button')
        this.#btnDown.innerText = '直接掉落'
        container.appendChild(this.#btnDown)
        shadow.appendChild(container)

        // 事件
        this.#btnRotate.addEventListener('click', (e) => {
            this.dispatchEvent(this.#eRotate)
        })
        this.#btnRight.addEventListener('click', (e) => {
            this.dispatchEvent(this.#eRight)
        })
        this.#btnLeft.addEventListener('click', (e) => {
            this.dispatchEvent(this.#eLeft)
        })
        this.#btnDown.addEventListener('click', (e) => {
            this.dispatchEvent(this.#eDown)
        })
    }
})