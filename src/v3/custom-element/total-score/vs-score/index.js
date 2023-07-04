import ScoreStrategy from "../ScoreStrategy.js"

customElements.define('vs-score', class extends ScoreStrategy {

    // 私有属性
    #_people;
    #_key;
    #_vs;
    #_diff;
    #$diff = null

    constructor() {
        super()

        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/vs-score/index.css'))

        const text = document.createTextNode('SCORE')
        this.#$diff = Base.create('div')
        shadow.appendChild(text)
        shadow.appendChild(this.$score)
        shadow.appendChild(this.#$diff)
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

    set key(x) {
        this.#_key = x
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
        this.#$diff.innerText = this.showScore(Math.abs(dist))
    }

    update(x) {
        this.#diff = x - this.vs
    }

    reset() {
        this.vs = 0
        this.score = 0   // TODO. 如何调用继承的父元素的同名方法
    }
})