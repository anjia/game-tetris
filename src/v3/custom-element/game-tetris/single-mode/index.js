import Base from '../../js/CustomBase.js'
import TetrisStrategy from '../TetrisStrategy.js'
import GameContext from '../../game-context/index.js'

// TODO. JS 单继承 vs 多继承
class SingleMode extends TetrisStrategy {

    // 私有变量
    #context;    // <game-context>

    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/single-mode/index.css'))
    }

    connectedCallback() {
        console.log('single-mode: isConnected=', this.isConnected)

        if (!this.isConnected) return

        this.#context = Base.create('game-context')
        this.shadowRoot.appendChild(this.#context)
    }

    start() {
        this.#context.start()
    }

    pause() {
        this.#context.pause()
    }

    continue() {
        this.#context.continue()
    }

    reset() {
        GameContext.reset()  // 重置全局类
        this.#context.reset(true)     // 重置其它元素，比如 <clear-lines>, <win-counter>
        this.#context.resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
    }

    gameover() { }
}

customElements.define('single-mode', SingleMode)