import Base from '../js/CustomBase.js'

customElements.define('total-score', class extends Base {

    // 静态属性
    static #SCORE = [0, 100, 300, 700, 1500]  // 一次性消 1-2-3-4 行时的得分
    static #MAX = 999999                      // 最大得分

    // 私有属性
    #score;
    #vs;
    #diff;
    #max;
    #domScore = null
    #domDiff = null
    #domMax = null
    #people;

    constructor() {
        super()

        // 实例属性
        this.key;

        // 私有属性
        this.#max = parseInt(localStorage.getItem('max')) || 0

        // 构造 shadow DOM（不变的部分）
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/index.css'))
        this.#domScore = Base.create('div')
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 获取属性参数
        this.#people = parseInt(this.getAttribute('people')) || 1
        this.key = this.getAttribute('key')

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
            this.#domMax = Base.create('div', { 'class': 'max', 'text': Base.padNumber(this.#max, 6) })
            shadow.appendChild(this.#domMax)
            shadow.appendChild(this.#domScore)
        }

        // 重置（初始化）数据
        this.reset()
    }

    // TODO. 对象的实例属性，只读
    // 1. getter, setter
    // 2. freeze
    // 3. writable
    get score() {
        return this.#score
    }

    get vs() {
        return this.#vs
    }

    get diff() {
        return this.#diff
    }

    set score(x) {
        if (x > this.constructor.#MAX) {
            x = this.constructor.#MAX
        }
        this.#score = x
        this.#domScore.innerText = Base.padNumber(this.score, 6)

        if (this.#people === 1) {
            this.#renderMax(this.#score)
        } else {
            this.#renderDiff()
        }
    }

    // 就类似数据驱动
    set vs(x) {
        this.#vs = x
        this.#renderDiff()
    }

    clear(lines) {
        const x = this.score + this.constructor.#SCORE[lines]
        this.score = x
    }

    reset() {
        this.vs = 0
        this.score = 0
    }

    #renderDiff() {
        if (this.#people === 1) return
        const dist = this.score - this.vs
        if (dist === this.#diff) return
        if (dist >= 0) {
            this.#domDiff.className = 'diff'
        } else {
            this.#domDiff.className = 'diff less'
        }
        this.#diff = dist
        this.#domDiff.innerText = Base.padNumber(Math.abs(dist), 6)
    }

    #renderMax(x) {
        if (this.#people > 1 || x === this.#max) return
        if (x > this.#max) {
            this.#max = x
            this.#domMax.innerText = Base.padNumber(this.#max, 6)
            localStorage.setItem('max', x)
        }
    }
})