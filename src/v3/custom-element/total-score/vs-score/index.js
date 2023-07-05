import ScoreStrategy from "../ScoreStrategy.js"
import Base from '../../js/CustomBase.js'

customElements.define('vs-score', class extends ScoreStrategy {

    // 私有属性
    // #_people;
    // #_vs;
    // #diffData;
    #diffElem = null

    constructor() {
        super()

        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/vs-score/index.css'))

        const text = document.createTextNode('SCORE')
        this.#diffElem = Base.create('div')
        shadow.appendChild(text)
        shadow.appendChild(this.scoreElem)
        shadow.appendChild(this.#diffElem)
    }

    // // setter ≈ 数据驱动
    // get vs() {
    //     return this.#_vs
    // }
    // set vs(x) {
    //     this.#_vs = x
    //     this.#diff = this.score - x
    // }

    // get #diff() {
    //     return this.#diffData
    // }
    // set #diff(dist) {
    //     if (this.#_people === 1 || dist === this.#diffData) return
    //     if (dist >= 0) {
    //         this.#diffElem.className = 'diff'
    //     } else {
    //         this.#diffElem.className = 'diff less'
    //     }
    //     this.#diffData = dist
    //     this.#diffElem.innerText = this.showScore(Math.abs(dist))
    // }

    update() {
        // this.#diff = this.score - this.vs
    }

    reset() {
        // this.score = 0   // TODO. 如何调用继承的父元素的同名方法
        this.vs = 0
    }
})