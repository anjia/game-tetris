import Base from '../../Base.js'
import TetrisStrategy from '../TetrisStrategy.js'
import '../../game-context/vs-context/index.js'
import ScoreObservable from '../../total-score/ScoreObservable.js'

customElements.define('vs-mode', class extends TetrisStrategy {

    // 私有变量
    #container;
    #_people = 0;
    #_games = 3;
    #overCounter = 0
    #PK_OVER = false

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
        return this.#_people
    }

    set people(x) {
        console.log('\n!!! vs-mode people=', x)
        // TODO. context 可在内存中缓存，对于多的
        // BUG. 若多了少了，需要移除 DOM

        x = parseInt(x) || 2
        if (x === this.#_people) return

        if (x < this.#_people) {  // 则将多余的数据从 UI 中移除
            for (let i = x; i < this.#_people; i++) {
                this.context[i].remove()
            }
        } else if (x <= this.context.length) {  // 则直接显示现成的数据
            for (let i = this.#_people; i < x; i++) {
                this.#container.appendChild(this.context[i])
            }
        } else {  // 则优先显示现成的，然后再新建
            for (let i = this.#_people; i < this.context.length; i++) {
                this.#container.appendChild(this.context[i])
            }
            for (let i = this.context.length; i < x; i++) {
                let item = Base.create('vs-context', { 'key': i, 'people': x, 'games': this.#_games })
                item.scoreSubject = this.scoreObservable  // TODO. 此处暂时通过传参
                this.context.push(item)
                this.#container.appendChild(item)
            }
        }
        this.#_people = x
        console.log('VS-MODE len=', this.context.length, ' people=', this.#_people)

        this.#PK_OVER = false
        this.reset()
    }

    set games(x) {
        x = parseInt(x) || 3
        if (x === this.#_games) return
        this.#_games = x
        for (let i = 0; i < this.#_people; i++) {
            this.context[i].games = x
        }
    }


    reset() {
        // TODO. 子类若想访问父类的同名方法？ 
        // super()

        // this.#overCounter = 0
        // GameContext.reset()  // 重置全局类

        // for (let c of this.context) {
        //     c.reset(this.#PK_OVER)     // 重置其它元素，比如 <clear-lines>, <win-counter>
        //     c.resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
        // }
    }

    gameover() {
        // this.#overCounter++
        // if (this.#overCounter === this.people) {
        //     // this.#status = GameTetris.#GAMEOVER
        //     // 比分数（谁多谁赢），如果赢的场次等于最大场次了，游戏就结束了
        //     // const key = parseInt(GameContext.winner)
        //     // if (key >= 0 && this.context[key].win()) {
        //     //     this.#PK_OVER = true
        //     // }
        // }
    }
})