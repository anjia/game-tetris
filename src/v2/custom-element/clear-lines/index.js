import Base from '../js/CustomBase.js'

customElements.define('clear-lines', class extends Base {

    static #SPEED = [0, 800, 650, 500, 370, 250, 200]   // 每级对应的降落速度，共 6 级
    static #SPEED_VS = [800, 650, 500, 370, 250, 200, 180]   // 每级对应的降落速度，共 6 级
    static #LINES = [0]
    static {
        // 每消除 20 行就升一级，同时增加降落速度 
        // 用数组的好处：可以用 `比大小` 替代取余 `Math.ceil(总行数 % 20)`
        const clearLines = 4 // 20
        for (let i = 1; i < this.#SPEED.length; i++) {
            this.#LINES[i] = this.#LINES[i - 1] + clearLines
        }
    }

    // 私有属性
    #level;
    #lines;
    #domLines = null
    #people;

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        const text = document.createTextNode('LINE')
        shadow.appendChild(text)
        this.#domLines = Base.create('div')
        shadow.appendChild(this.#domLines)

        this.#people = parseInt(this.getAttribute('people')) || 1

        // 重置（初始化）数据
        this.reset()
    }

    get speed() {
        return this.#people === 1 ? this.constructor.#SPEED[this.#level] : this.constructor.#SPEED_VS[this.#level]
    }

    get level() {
        return this.#level
    }

    reset() {
        this.#level = 1
        this.#setlines(0)
    }

    clear(x) {
        if (x) {
            this.#setlines(this.#lines + x)
        }
    }

    #setlines(x) {
        x = parseInt(x) || 0
        if (x === this.#lines) return
        this.#lines = x
        this.#domLines.innerText = Base.padNumber(x, 3)

        // 级别
        if (this.#lines >= this.constructor.#LINES[this.#level] && (this.#level + 1 < this.constructor.#LINES.length)) {
            this.#level++
        }
    }
})