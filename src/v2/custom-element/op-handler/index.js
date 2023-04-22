import Base from '../js/CustomBase.js'

class OP extends Base {

    static KEY = ['↑←→↓', 'wasz', 'ijkm', 'yghb', 'rdfc']
    static counter = 0

    // 私有属性
    #rotate = new Event('rotate')
    #right = new Event('right')
    #left = new Event('left')
    #down = new Event('down')
    #keys = ['', '', '', '']

    constructor() {
        super()
        if (OP.counter < OP.KEY.length) {
            this.#keys = OP.KEY[OP.counter]

            if (OP.counter == 0) {
                window.addEventListener('keydown', (e) => {
                    // console.log(e.key)
                    switch (e.key) {
                        case 'Up':
                        case 'ArrowUp':
                            this.dispatchEvent(this.#rotate)
                            break
                        case 'Left':
                        case 'ArrowLeft':
                            this.dispatchEvent(this.#left)
                            break
                        case 'Right':
                        case 'ArrowRight':
                            this.dispatchEvent(this.#right)
                            break
                        case 'Down':
                        case 'ArrowDown':
                            this.dispatchEvent(this.#down)
                            break
                    }
                })
            } else {
                window.addEventListener('keydown', (e) => {
                    // console.log(e.key)
                    switch (e.key) {
                        case this.#keys[0]:
                            this.dispatchEvent(this.#rotate)
                            break
                        case this.#keys[1]:
                            this.dispatchEvent(this.#left)
                            break
                        case this.#keys[2]:
                            this.dispatchEvent(this.#right)
                            break
                        case this.#keys[3]:
                            this.dispatchEvent(this.#down)
                            break
                    }
                })
            }

            OP.counter++
        }
    }

    connectedCallback() {
        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(Base.createLink('./custom-element/op-handler/index.css'))

        // html
        const btnRotate = Base.create('button', { 'text': '旋转', 'data-key': this.#keys[0] })
        const btnRight = Base.create('button', { 'text': '右移', 'data-key': this.#keys[2] })
        const btnLeft = Base.create('button', { 'text': '左移', 'data-key': this.#keys[1] })
        const btnDown = Base.create('button', { 'text': '直接掉落', 'data-key': this.#keys[3] })
        shadow.appendChild(Base.create('div', { 'class': 'area' }, [btnRotate, btnRight, btnLeft, btnDown]))

        // 事件
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
}

customElements.define('op-handler', OP)