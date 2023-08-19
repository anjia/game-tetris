import Base from '../../Base.js'
import TetrisStrategy from '../TetrisStrategy.js'
import '../../tetris-context/single-context/index.js'

// TODO. JS 单继承 vs 多继承
customElements.define('single-mode', class extends TetrisStrategy {

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
})