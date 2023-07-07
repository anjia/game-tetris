import ScoreStrategy from "../ScoreStrategy.js"
import Base from '../../Base.js'

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

        this.orderElem = Base.create('div', { 'text': '--' })
        shadow.appendChild(this.orderElem)

        // 初始化
        this.reset()
    }

    // setter ≈ 数据驱动
    get vs() {
        return this.vsData
    }
    set vs(x) {
        const diff = this.score - x
        console.log(`第${this.orderData}名 vs 分数${x}, diff=${diff}`)
        if (diff === this.vsData) return
        if (diff >= 0) {
            this.vsElem.className = 'diff'
        } else {
            this.vsElem.className = 'diff less'
        }
        this.vsData = diff
        this.vsElem.innerText = this.showScore(Math.abs(this.vsData))
    }

    scoreUpdate() {
        console.log('<vs-score> update()')
        this.vs = this.score - this.vs

        // 通知 scoreSubject，分数有更新了
        if (this.scoreObservable) {
            this.scoreObservable.dataChanged(this.orderData)
        }
    }

    update(order) {
        this.orderData = order
        this.orderElem.innerText = this.orderData
        if (this.orderData === 0) {
            this.vs = this.scoreObservable.second
        } else {
            this.vs = this.scoreObservable.first
        }
    }

    set scoreSubject(x) {
        this.scoreObservable = x
        this.scoreObservable.registerObserver(this)
    }

    reset() {
        console.log('<vs-score> reset()')
        this.score = 0  // TODO. 如何调用父元素的
        this.vs = 0
    }
})