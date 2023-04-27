import Base from '../js/CustomBase.js'

customElements.define('total-score', class extends Base {

    // 静态属性
    static #SCORE = [0, 100, 300, 700, 1500]  // 一次性消 1-2-3-4 行时的得分
    static #MAX = 999999                      // 最大得分

    // 私有属性
    #people;
    #key;
    #score;
    #vs;
    #dataDiff;
    #dataMax;
    #domScore = null
    #domDiff = null
    #domMax = null

    constructor() {
        super()

        // 私有属性
        this.#dataMax = parseInt(localStorage.getItem('max')) || 0

        // 构造 shadow DOM（不变的部分）
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/index.css'))
        this.#domScore = Base.create('div')
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 获取属性参数
        this.#people = parseInt(this.getAttribute('people')) || 1
        this.#key = this.getAttribute('key')

        // html
        const shadow = this.shadowRoot
        if (this.#people > 1) {
            const text = document.createTextNode('SCORE')
            this.#domDiff = Base.create('div')
            this.#domScore.className = ''
            shadow.appendChild(text)
            shadow.appendChild(this.#domScore)
            shadow.appendChild(this.#domDiff)
        } else {
            this.#domScore.className = 'cur'
            this.#domMax = Base.create('div', { 'class': 'max', 'text': Base.padNumber(this.#dataMax, 6) })
            shadow.appendChild(this.#domMax)
            shadow.appendChild(this.#domScore)
        }

        // 重置（初始化）数据
        this.reset()
    }

    get score() {
        return this.#score
    }

    get vs() {
        return this.#vs
    }

    get diff() {
        return this.#dataDiff
    }

    get key() {
        return this.#key
    }

    set score(x) {
        if (x > this.constructor.#MAX) {
            x = this.constructor.#MAX
        }
        this.#score = x
        this.#domScore.innerText = Base.padNumber(this.score, 6)

        if (this.#people === 1) {
            this.#max = this.#score
        } else {
            this.#diff = x - this.vs
        }
    }

    // 就类似数据驱动
    set vs(x) {
        this.#vs = x
        this.#diff = this.score - x
    }

    set #diff(dist) {
        if (this.#people === 1 || dist === this.#dataDiff) return
        if (dist >= 0) {
            this.#domDiff.className = 'diff'
        } else {
            this.#domDiff.className = 'diff less'
        }
        this.#dataDiff = dist
        this.#domDiff.innerText = Base.padNumber(Math.abs(dist), 6)
    }

    set #max(x) {
        if (this.#people > 1 || x === this.#dataMax) return
        if (x > this.#dataMax) {
            this.#dataMax = x
            this.#domMax.innerText = Base.padNumber(this.#dataMax, 6)
            localStorage.setItem('max', x)
        }
    }

    clear(lines) {
        const x = this.score + this.constructor.#SCORE[lines]
        this.score = x
    }

    reset() {
        this.vs = 0
        this.score = 0
    }
})