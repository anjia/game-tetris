import ScoreStrategy from "../ScoreStrategy.js"

import Store from '../../Store.js'
import Base from '../../Base.js'

customElements.define('single-score', class extends ScoreStrategy {

    #maxElem = null

    constructor() {
        super()

        // html
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/single-score/index.css'))

        // 实例属性
        this.maxData = Store.max
        this.#maxElem = Base.create('div', { 'class': 'max', 'text': this.showScore(this.maxData) })
        this.scoreElem.className = 'cur'
        shadow.appendChild(this.#maxElem)
        shadow.appendChild(this.scoreElem)

        // 初始化
        this.reset()
    }

    set max(x) {
        if (x > this.maxData) {
            this.maxData = x
            this.#maxElem.innerText = this.showScore(this.maxData)
            Store.max = x
        }
    }
    get max() {
        return this.maxData
    }

    scoreUpdated() {
        console.log('<signle-score> update()')
        this.max = this.score
    }
})