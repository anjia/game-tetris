import ScoreStrategy from "../ScoreStrategy.js"

import Store from '../../js/Store.js'
import Base from '../../js/CustomBase.js'

customElements.define('single-score', class extends ScoreStrategy {

    #maxData;
    #maxElem = null

    constructor() {
        super()

        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/single-score/index.css'))

        this.#maxData = Store.max
        this.#maxElem = Base.create('div', { 'class': 'max', 'text': this.showScore(this.#maxData) })
        this.scoreElem.className = 'cur'
        shadow.appendChild(this.#maxElem)
        shadow.appendChild(this.scoreElem)
    }

    set #max(x) {
        if (x > this.#maxData) {
            this.#maxData = x
            this.#maxElem.innerText = this.showScore(this.#maxData)
            Store.max = x
        }
    }

    update() {
        this.#max = this.score
    }
})