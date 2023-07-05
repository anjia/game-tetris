import ScoreStrategy from "../ScoreStrategy.js"
import Base from '../../js/CustomBase.js'

customElements.define('vs-score', class extends ScoreStrategy {

    // 私有属性

    constructor() {
        super()

        this.vsData = undefined
        this.vsElem = null

        // html
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/total-score/vs-score/index.css'))

        const text = document.createTextNode('SCORE')
        this.vsElem = Base.create('div')
        shadow.appendChild(text)
        shadow.appendChild(this.scoreElem)
        shadow.appendChild(this.vsElem)

        // 初始化
        this.reset()
    }

    // setter ≈ 数据驱动
    get vs() {
        return this.vsData
    }
    set vs(x) {
        const diff = this.score - x
        if (diff === this.vsData) return
        if (diff >= 0) {
            this.vsElem.className = 'diff'
        } else {
            this.vsElem.className = 'diff less'
        }
        this.vsData = diff
        this.vsElem.innerText = this.showScore(Math.abs(x))
    }

    update() {
        console.log('<vs-score> update()')
        this.vs = this.score - this.vs
    }

    reset() {
        console.log('<vs-score> reset()')
        this.score = 0  // TODO. 如何调用父元素的
        this.vs = 0
    }
})