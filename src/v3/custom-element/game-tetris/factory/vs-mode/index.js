import Base from '../../Base.js'
import TetrisStrategy from '../TetrisStrategy.js'
import '../../tetris-context/vs-context/index.js'
import ScoreObservable from '../../total-score/ScoreObservable.js'

customElements.define('vs-mode', class extends TetrisStrategy {

    // 私有变量
    #container;
    #peopleData = 0
    #gamesData = 3

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/vs-mode/index.css'))
        this.#container = Base.create('div', { 'class': 'wrap' })
        shadow.appendChild(this.#container)

        // TODO. 应该要依赖注入
        this.scoreObservable = new ScoreObservable()
    }

    get people() {
        return this.#peopleData
    }

    set people(x) {
        console.log('\n!!! vs-mode people=', x)
        // TODO. context 可在内存中缓存，对于多的
        // BUG. 若多了少了，需要移除 DOM

        x = parseInt(x) || 2
        if (x === this.#peopleData) return

        if (x < this.#peopleData) {  // 则将多余的数据从 UI 中移除
            for (let i = x; i < this.#peopleData; i++) {
                this.context[i].remove()
            }
        } else if (x <= this.context.length) {  // 则直接显示现成的数据
            for (let i = this.#peopleData; i < x; i++) {
                this.#container.appendChild(this.context[i])
            }
        } else {  // 则优先显示现成的，然后再新建
            for (let i = this.#peopleData; i < this.context.length; i++) {
                this.#container.appendChild(this.context[i])
            }
            for (let i = this.context.length; i < x; i++) {
                let item = Base.create('vs-context', { 'key': i, 'people': x, 'games': this.#gamesData })
                item.scoreSubject = this.scoreObservable  // TODO. 此处暂时通过传参
                this.context.push(item)
                this.#container.appendChild(item)
            }
        }
        this.#peopleData = x
        console.log('VS-MODE len=', this.context.length, ' people=', this.#peopleData)

        this.reset()
    }

    set games(x) {
        x = parseInt(x) || 3
        if (x === this.#gamesData) return
        this.#gamesData = x
        for (let i = 0; i < this.#peopleData; i++) {
            this.context[i].games = x
        }
    }
})