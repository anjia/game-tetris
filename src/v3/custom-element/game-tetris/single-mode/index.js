import Base from '../../Base.js'
import TetrisStrategy from '../TetrisStrategy.js'
import '../../game-context/single-context/index.js'

// TODO. JS 单继承 vs 多继承
class SingleMode extends TetrisStrategy {

    constructor() {
        super()

        // TODO. 如何访问父元素的私有变量
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/single-mode/index.css'))
        this.context.push(Base.create('single-context'))
        shadow.appendChild(this.context[0])
    }

    // TODO. 同一个属性，若子 get 了，也必须覆盖 set
    get people() {
        return 1
    }
    set people(x) { }

    connectedCallback() {
        console.log('signle-mode: isConnected=', this.isConnected)
    }

    reset() {
        // // GameContext.reset()  // 重置全局类
        // this.#context[0].reset(true)     // 重置其它元素，比如 <clear-lines>, <win-counter>
        // this.#context[0].resetPanel()             // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
    }

    gameover() { }
}

customElements.define('single-mode', SingleMode)