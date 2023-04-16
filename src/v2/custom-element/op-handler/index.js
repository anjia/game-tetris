import Base from '../js/CustomBase.js'

customElements.define('op-handler', class extends Base {

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
        shadow.appendChild(Base.createLink('./custom-element/op-handler/index.css'))

        // html
        this.#btnRotate = Base.createButton('旋转')
        this.#btnRight = Base.createButton('右移')
        this.#btnLeft = Base.createButton('左移')
        this.#btnDown = Base.createButton('直接掉落')
        shadow.appendChild(Base.createDiv({ 'class': 'area' }, [this.#btnRotate, this.#btnRight, this.#btnLeft, this.#btnDown]))

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