import Base from '../../js/CustomBase.js'
import TetrisStrategy from '../TetrisStrategy.js'
import GameContext from '../../game-context/index.js'

class VSMode extends TetrisStrategy {

    // 私有变量
    #container;
    #data = [];
    #context = [];    // <game-context>[]

    #_people = 0;
    #_games;
    #overCounter = 0
    #PK_OVER = false

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/vs-mode/index.css'))
        this.#container = Base.create('div', { 'class': 'wrap' })
        shadow.appendChild(this.#container)
    }

    connectedCallback() {
        console.log('vs-mode: isConnected=', this.isConnected)

        if (!this.isConnected) return

        // 获取属性
        this.people = this.getAttribute('people')
        this.games = this.getAttribute('games')
    }


    set people(x) {
        // console.log('vs-mode people=', x)
        // TODO. context 可在内存中缓存，对于多的
        // BUG. 若多了少了，需要移除 DOM

        x = parseInt(x) || 2
        if (x === this.#_people) return

        // 更新数据
        if (x > this.#_people) {
            // 说明要 create 新的了
            for (let i = this.#_people; i < x; i++) {
                let item = Base.create('game-context', { 'people': this.#_people, 'games': this.#_games, 'key': i })
                this.#data.push(item)
                this.#context.push(item)

                // 更新 UI
                this.#container.appendChild(item)
            }
        } else if (x < this.#_people) {  // 则删除多余的
            // this.#context.length = x
            // 2, 5
            for (let i = x; i < this.#_people; i++) {
                this.#context[i].remove()
            }
        }
        this.#_people = x
        console.log('VS-MODE len=', this.#context.length)

        this.#PK_OVER = false
        this.reset()
    }

    set games(x) {
        x = parseInt(x) || 3
        if (x === this.#_games) return
        this.#_games = x
        for (let c of this.#context) {
            c.games = x
        }
    }


    start() {
        for (let c of this.#context) {
            c.start()
        }
    }

    pause() {
        for (let c of this.#context) {
            c.pause()
        }
    }

    continue() {
        for (let c of this.#context) {
            c.continue()
        }
    }
    reset() {
        // TODO. 子类若想访问父类的同名方法？ 
        // super()

        // this.#overCounter = 0
        // GameContext.reset()  // 重置全局类

        // for (let c of this.#context) {
        //     c.reset(this.#PK_OVER)     // 重置其它元素，比如 <clear-lines>, <win-counter>
        //     c.resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
        // }
    }

    gameover() {
        this.#overCounter++
        if (this.#overCounter === this.#_people) {
            // this.#status = GameTetris.#GAMEOVER
            // 比分数（谁多谁赢），如果赢的场次等于最大场次了，游戏就结束了
            const key = parseInt(GameContext.winner)
            if (key >= 0 && this.#context[key].win()) {
                this.#PK_OVER = true
            }
        }
    }
}

customElements.define('vs-mode', VSMode)