import { createLink } from '../js/utility.js'

customElements.define('total-score', class extends HTMLElement {

    // 静态属性
    static SCORE = [0, 100, 300, 700, 1500]  // 一次性消 1-2-3-4 行时的得分
    static MAX = 999999                      // 最大得分

    // 静态方法
    static #showNumber(num) {
        return String(num).padStart(6, '0')
    }

    // 私有属性
    #type
    #score;
    #vs;
    #diff;
    #domScore = null;
    #domDiff = null;

    constructor() {
        super()

        // 获取属性参数
        this.#type = this.getAttribute('type') || '2'

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(createLink('./custom-element/total-score/index.css'))

        // html
        const text = document.createTextNode('SCORE')
        shadow.appendChild(text)
        if (this.#type === '2') {
            this.#domScore = document.createElement('div')
            this.#domDiff = document.createElement('div')
            shadow.appendChild(this.#domScore)
            shadow.appendChild(this.#domDiff)
        } else {
            const max = document.createElement('div')
            max.innerText = '最高分 000000'
            const total = document.createElement('div')
            total.innerText = '当前分 000000'
            shadow.appendChild(max)
            shadow.appendChild(total)
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

    set score(x) {
        x = parseInt(x) || 0
        if (x === this.#score) return
        if (x > this.constructor.MAX) {
            x = this.constructor.MAX
        }
        this.#score = x
        this.#domScore.innerText = this.constructor.#showNumber(this.#score)
        this.#updateDiff()
    }

    set vs(x) {
        x = parseInt(x) || 0
        if (this.#type !== '2' || x === this.#vs) return
        this.#vs = x
        this.#updateDiff()
    }

    reset() {
        this.score = 0
        this.vs = 0
    }

    clear(lines) {
        this.score = this.score + this.constructor.SCORE[lines]
    }

    #updateDiff() {
        const dist = this.#score - this.#vs
        if (dist === this.#diff) return
        if (dist >= 0) {
            this.#domDiff.className = 'diff'
        } else {
            this.#domDiff.className = 'diff less'
        }
        this.#diff = dist
        this.#domDiff.innerText = this.constructor.#showNumber(Math.abs(dist))
    }
})