import Base from '../js/CustomBase.js'

customElements.define('op-handler', class extends Base {

    // 私有属性
    #rotate = new Event('rotate')
    #right = new Event('right')
    #left = new Event('left')
    #down = new Event('down')

    constructor() {
        super()

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(Base.createLink('./custom-element/op-handler/index.css'))

        // html
        const btnRotate = Base.createButton('旋转')
        const btnRight = Base.createButton('右移')
        const btnLeft = Base.createButton('左移')
        const btnDown = Base.createButton('直接掉落')
        shadow.appendChild(Base.createDiv({ 'class': 'area' }, [btnRotate, btnRight, btnLeft, btnDown]))

        // 事件
        // TODO. 监听键盘
        btnRotate.addEventListener('click', (e) => {
            this.dispatchEvent(this.#rotate)
        })
        btnRight.addEventListener('click', (e) => {
            this.dispatchEvent(this.#right)
        })
        btnLeft.addEventListener('click', (e) => {
            this.dispatchEvent(this.#left)
        })
        btnDown.addEventListener('click', (e) => {
            this.dispatchEvent(this.#down)
        })
    }
})