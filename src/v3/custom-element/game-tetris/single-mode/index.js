import Base from '../../js/CustomBase.js'
import TetrisStrategy from '../TetrisStrategy.js'
import '../../game-context/index.js'

// TODO. JS 单继承 vs 多继承
class SingleMode extends TetrisStrategy {

    #context;

    constructor() {
        super()

        // TODO. 如何访问父元素的私有变量
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/single-mode/index.css'))
        this.#context = Base.create('game-context')
        shadow.appendChild(this.#context)
    }

    connectedCallback() {
        console.log('signle-mode: isConnected=', this.isConnected)
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
        // GameContext.reset()  // 重置全局类
        this.#context.reset(true)     // 重置其它元素，比如 <clear-lines>, <win-counter>
        this.#context.resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
    }

    gameover() { }
}

customElements.define('single-mode', SingleMode)