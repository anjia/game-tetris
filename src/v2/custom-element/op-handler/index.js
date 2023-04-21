import Base from '../js/CustomBase.js'

customElements.define('op-handler', class extends Base {

    // 私有属性
    #rotate = new Event('rotate')
    #right = new Event('right')
    #left = new Event('left')
    #down = new Event('down')

    constructor() {
        super()
    }

    connectedCallback() {
        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(Base.createLink('./custom-element/op-handler/index.css'))

        // html
        const btnRotate = Base.createByOptions('button', { 'text': '旋转' })
        const btnRight = Base.createByOptions('button', { 'text': '右移' })
        const btnLeft = Base.createByOptions('button', { 'text': '左移' })
        const btnDown = Base.createByOptions('button', { 'text': '直接掉落' })
        shadow.appendChild(Base.createByOptions('div', { 'class': 'area' }, [btnRotate, btnRight, btnLeft, btnDown]))

        // 事件
        // TODO. 监听键盘
        btnRotate.addEventListener('click', () => {
            this.dispatchEvent(this.#rotate)
        })
        btnRight.addEventListener('click', () => {
            this.dispatchEvent(this.#right)
        })
        btnLeft.addEventListener('click', () => {
            this.dispatchEvent(this.#left)
        })
        btnDown.addEventListener('click', () => {
            this.dispatchEvent(this.#down)
        })
    }
})