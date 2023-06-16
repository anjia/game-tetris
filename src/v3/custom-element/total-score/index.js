import Base from '../js/CustomBase.js'
import Store from '../js/Store.js'

customElements.define('total-score', class extends Base {

    // 静态属性
    static #SCORE = [0, 100, 300, 700, 1500]  // 一次性消 1-2-3-4 行时的得分
    static #MAX = 999999                      // 最大得分

    // 私有属性
    #_people;
    #_key;
    #_score;
    #_vs;
    #_diff;
    #_max;
    #$score = null
    #$diff = null
    #$max = null

    constructor() {
        super()

        // 私有属性
        this.#_max = Store.max

        // 构造 shadow DOM（不变的部分）
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/index.css'))
        this.#$score = Base.create('div')
        // }

        // connectedCallback() {

        //     console.log('\n====== <total-score>, this.isConnected=', this.isConnected)

        //     if (!this.isConnected) return

        // 获取属性参数
        this.#_people = parseInt(this.getAttribute('people')) || 1
        this.#_key = this.getAttribute('key')

        // html
        // const shadow = this.shadowRoot
        if (this.#_people > 1) {
            const text = document.createTextNode('SCORE')
            this.#$diff = Base.create('div')
            this.#$score.className = ''
            shadow.appendChild(text)
            shadow.appendChild(this.#$score)
            shadow.appendChild(this.#$diff)
        } else {
            this.#$score.className = 'cur'
            this.#$max = Base.create('div', { 'class': 'max', 'text': Base.padNumber(this.#_max, 6) })
            shadow.appendChild(this.#$max)
            shadow.appendChild(this.#$score)
        }

        // 重置（初始化）数据
        this.reset()
    }

    get score() {
        return this.#_score
    }

    get vs() {
        return this.#_vs
    }

    get diff() {
        return this.#_diff
    }

    get key() {
        return this.#_key
    }

    set score(x) {
        if (x > this.constructor.#MAX) {
            x = this.constructor.#MAX
        }
        this.#_score = x
        this.#$score.innerText = Base.padNumber(this.score, 6)

        if (this.#_people === 1) {
            this.#max = this.#_score
        } else {
            this.#diff = x - this.vs
        }
    }

    // 就类似数据驱动
    set vs(x) {
        this.#_vs = x
        this.#diff = this.score - x
    }

    set #diff(dist) {
        if (this.#_people === 1 || dist === this.#_diff) return
        if (dist >= 0) {
            this.#$diff.className = 'diff'
        } else {
            this.#$diff.className = 'diff less'
        }
        this.#_diff = dist
        this.#$diff.innerText = Base.padNumber(Math.abs(dist), 6)
    }

    set #max(x) {
        if (this.#_people > 1 || x === this.#_max) return
        if (x > this.#_max) {
            this.#_max = x
            this.#$max.innerText = Base.padNumber(this.#_max, 6)
            Store.max = x
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