import Base from '../js/CustomBase.js'

class OP extends Base {

    static #KEYS = [[], ['↑←→↓'], ['WADS', '↑←→↓'], ['WADS', 'IJLK', '↑←→↓'], ['WADS', 'TFHG', 'IJLK', '↑←→↓']]
    static #counter = 0

    // 私有属性
    #keys = ['', '', '', '']
    #eventRotate = new Event('rotate')
    #eventRight = new Event('right')
    #eventLeft = new Event('left')
    #eventDown = new Event('down')

    constructor() {
        super()

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/op-handler/index.css'))
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 根据属性，确定快捷键
        const people = parseInt(this.getAttribute('people')) || 1
        const keyGroup = OP.#KEYS[Math.min(OP.#KEYS.length - 1, people)]
        if (OP.#counter < keyGroup.length) {
            this.#keys = keyGroup[OP.#counter]
            if (OP.#counter === keyGroup.length - 1) {
                this.#addArrowListener()
            } else {
                this.#addKeyListener()
            }
        }
        OP.#counter++


        // shadow DOM
        const shadow = this.shadowRoot

        // html
        const btnRotate = Base.create('button', { 'text': '旋转', 'data-key': this.#keys[0] })
        const btnRight = Base.create('button', { 'text': '右移', 'data-key': this.#keys[2] })
        const btnLeft = Base.create('button', { 'text': '左移', 'data-key': this.#keys[1] })
        const btnDown = Base.create('button', { 'text': '直接掉落', 'data-key': this.#keys[3] })
        shadow.appendChild(Base.create('div', { 'class': 'area' }, [btnRotate, btnRight, btnLeft, btnDown]))

        // 点击事件
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

    #addArrowListener() {
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
    }

    #addKeyListener() {
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