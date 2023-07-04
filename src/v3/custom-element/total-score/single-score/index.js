import Store from '../../js/Store.js'
import ScoreStrategy from "../ScoreStrategy.js"

customElements.define('single-score', class extends ScoreStrategy {

    #dataMax;
    #$max = null

    constructor() {
        super()

        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/single-score/index.css'))

        this.#dataMax = Store.max
        this.#$max = Base.create('div', { 'class': 'max', 'text': this.showScore(this.#dataMax) })
        this.$score.className = 'cur'
        shadow.appendChild(this.#$max)
        shadow.appendChild(this.$score)
    }

    set #max(x) {
        if (this.#_people > 1 || x === this.#dataMax) return
        if (x > this.#dataMax) {
            this.#dataMax = x
            this.#$max.innerText = this.showScore(this.#dataMax)
            Store.max = x
        }
    }

    update() {
        this.#max = this.#dataScore
    }
})