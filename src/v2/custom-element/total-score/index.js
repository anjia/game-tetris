import Base from '../js/CustomBase.js'

customElements.define('total-score', class extends Base {

    // 静态属性
    static #SCORE = [0, 100, 300, 700, 1500]  // 一次性消 1-2-3-4 行时的得分
    static #MAX = 999999                      // 最大得分

    // 私有属性
    #vs;
    #diff;
    #domScore = null;
    #domDiff = null;

    constructor() {
        super()

        // 实例属性
        this.score;
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 获取属性参数
        const people = parseInt(this.getAttribute('people')) || 1

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/index.css'))

        // html
        const text = document.createTextNode('SCORE')
        shadow.appendChild(text)
        if (people > 1) {
            this.#domScore = Base.createDiv()
            this.#domDiff = Base.createDiv()
            shadow.appendChild(this.#domScore)
            shadow.appendChild(this.#domDiff)
        } else {
            const max = Base.createDiv({ 'text': '最高分 000000' })
            const total = Base.createDiv({ 'text': '当前分 000000' })
            shadow.appendChild(max)
            shadow.appendChild(total)
        }

        // 重置（初始化）数据
        this.reset()
    }

    // 就类似数据驱动
    set vs(x) {
        this.#vs = x
        this.#renderDiff()
    }

    clear(lines) {
        const x = this.score + this.constructor.#SCORE[lines]
        this.#setScore(x)
    }

    reset() {
        this.score = 0
        this.#vs = 0
        this.#setScore(0)
    }

    #setScore(x) {
        if (x > this.constructor.#MAX) {
            x = this.constructor.#MAX
        }
        this.score = x
        this.#domScore.innerText = Base.padNumber(this.score, 6)
        this.#renderDiff()
    }

    #renderDiff() {
        const dist = this.score - this.#vs
        if (dist === this.#diff) return
        if (dist >= 0) {
            this.#domDiff.className = 'diff'
        } else {
            this.#domDiff.className = 'diff less'
        }
        this.#diff = dist
        this.#domDiff.innerText = Base.padNumber(Math.abs(dist), 6)
    }
})