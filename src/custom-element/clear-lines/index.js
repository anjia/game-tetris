customElements.define('clear-lines', class extends HTMLElement {

    static SPEED = [0, 800, 650, 500, 370, 250, 200]   // 每级对应的降落速度，共 6 级
    static LEVELS = [0]
    static {
        // 每消除 20 行就升一级，同时增加降落速度 
        // 用数组的好处：可以用 `比大小` 替代取余 `Math.ceil(总行数 % 20)`
        const clearLines = 20
        for (let i = 1; i < this.SPEED.length; i++) {
            this.LEVELS[i] = this.LEVELS[i - 1] + clearLines
        }
    }

    static #showNumber(num) {
        return String(num).padStart(3, '0')
    }

    // 私有属性
    #lines;
    #domLines = null

    constructor() {
        super()

        // 实例属性
        this.level;

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        const text = document.createTextNode('LINE')
        shadow.appendChild(text)
        this.#domLines = document.createElement('div')
        shadow.appendChild(this.#domLines)

        // 重置（初始化）数据
        this.reset()
    }

    get speed() {
        return this.constructor.SPEED[this.level]
    }

    get lines() {
        return this.#lines
    }

    set lines(x) {
        x = parseInt(x) || 0
        if (x === this.#lines) return
        this.#lines = x
        this.#domLines.innerText = this.constructor.#showNumber(x)

        // 级别
        if (this.#lines >= this.constructor.LEVELS[this.level] && (this.level + 1 < this.constructor.LEVELS.length)) {
            this.level++
        }
    }

    reset() {
        this.level = 1
        this.lines = 0
    }

    add(x) {
        if (x) {
            this.lines = this.lines + x
        }
    }
})