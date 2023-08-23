import Base from '../../Base.js'
import TetrisStrategy from '../TetrisStrategy.js'
import '../../tetris-context/single-context/index.js'

// TODO. JS 单继承 vs 多继承
customElements.define('single-mode', class extends TetrisStrategy {

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/tetris-mode/single-mode/index.css'))
        this.context = [Base.create('single-context')]
        shadow.appendChild(this.context[0])
    }

    // // 实现工厂方法（TODO.测试 样式就在元素后面了？super()可以写到构造函数的最后一行？）
    // createContextList() {
    //     return [Base.create('single-context')]
    // }

    // TODO. 同一个属性，若子 get 了，也必须覆盖 set
    get people() {
        return 1
    }
    set people(x) { }
})