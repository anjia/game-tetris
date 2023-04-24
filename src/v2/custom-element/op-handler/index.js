import Base from '../js/CustomBase.js'

class OP extends Base {

    static #KEYS = ['↑←→↓', 'WASZ', 'IJKM', 'YGHB', 'RDFC']
    static #counter = 0

    // 私有属性
    #keys = ['', '', '', '']
    #eventRotate = new Event('rotate')  // TODO. event 可以现 new 吗？
    #eventRight = new Event('right')
    #eventLeft = new Event('left')
    #eventDown = new Event('down')

    constructor() {
        super()

        if (OP.#counter < OP.#KEYS.length) {
            this.#keys = OP.#KEYS[OP.#counter]

            if (OP.#counter == 0) {
                window.addEventListener('keydown', (e) => {
                    // console.log(e.key)
                    switch (e.key) {
                        case 'Up':    // IE/Edge
                        case 'ArrowUp':
                            this.#rotate()
                            break
                        case 'Left':  // IE/Edge
                        case 'ArrowLeft':
                            this.#left()
                            break
                        case 'Right':  // IE/Edge
                        case 'ArrowRight':
                            this.#right()
                            break
                        case 'Down':  // IE/Edge
                        case 'ArrowDown':
                            this.#down()
                            break
                    }
                })
            } else {
                window.addEventListener('keydown', (e) => {
                    // console.log(e.key)
                    switch (e.key) {
                        case this.#keys[0]:
                        case this.#keys[0].toLowerCase():
                            this.#rotate()
                            break
                        case this.#keys[1]:
                        case this.#keys[1].toLowerCase():
                            this.#left()
                            break
                        case this.#keys[2]:
                        case this.#keys[2].toLowerCase():
                            this.#right()
                            break
                        case this.#keys[3]:
                        case this.#keys[3].toLowerCase():
                            this.#down()
                            break
                    }
                })
            }

            OP.#counter++
        }
    }

    connectedCallback() {
        if (!this.isConnected) return

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
            this.#rotate()
        })
        btnRight.addEventListener('click', () => {
            this.#right()
        })
        btnLeft.addEventListener('click', () => {
            this.#left()
        })
        btnDown.addEventListener('click', () => {
            this.#down()
        })
    }

    reset() {
        OP.#counter = 0
    }

    #rotate() {
        this.dispatchEvent(this.#eventRotate)
    }

    #left() {
        this.dispatchEvent(this.#eventLeft)
    }

    #right() {
        this.dispatchEvent(this.#eventRight)
    }

    #down() {
        this.dispatchEvent(this.#eventDown)
    }
}

customElements.define('op-handler', OP)