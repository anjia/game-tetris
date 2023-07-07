import '../clear-lines/index.js'
import '../next-shape/index.js'
import '../grid-panel/index.js'
import '../op-handler/index.js'

import Base from '../Base.js'
import ShapeProducer from '../next-shape/TetrisProducer.js'

export default class extends Base {

    // 静态方法
    static reset() {
        ShapeProducer.reset()
    }

    // 私有属性
    #people;
    #shapeCounter = 0    // shape 的消费计数

    constructor() {
        super()

        // TODO. 优化要封装
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-context/index.css'))

        // 设计模式：模板模式
        this.container = Base.create('div', { 'class': 'container' })
        this.createScoreElem()  // 回调1
        this.clearElem = Base.create('clear-lines', { 'class': 'flex-item box' })
        this.nextElem = Base.create('next-shape', { 'class': 'flex-item box' })
        this.panelElem = Base.create('grid-panel')
        this.btnHandler = Base.create('op-handler')

        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.scoreElem]))
        this.container.appendChild(Base.create('div', { 'class': 'flex' }, [this.clearElem, this.nextElem]))
        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.panelElem]))
        this.createAppendWinElem()  // 回调2
        this.container.appendChild(this.btnHandler)
        shadow.appendChild(this.container)

        // 因为是 Base.create() 创建的，所以此时属性是 null
        // console.log('\n~~~~ <game-context>, people = ', this.#people, this.getAttribute('people'))

        // 监听子元素的事件
        this.#addEventListener()

        // 初始化数据
        this.#next()
    }

    createScoreElem() { }       // 由子元素实现
    createAppendWinElem() { }   // 若有，则由子元素实现

    #addEventListener() {
        // 游戏面板
        this.panelElem.addEventListener('next', () => {
            this.start()
            this.#next()
        })
        this.panelElem.addEventListener('clear', (e) => {
            const lines = e.detail.lines()
            this.clearElem.clear(lines)
            this.scoreElem.clear(lines)
        })
        this.panelElem.addEventListener('gameover', () => {
            this.resetPanel()
        })

        // 游戏手柄
        this.btnHandler.addEventListener('rotate', () => {
            this.panelElem.rotate()
        })
        this.btnHandler.addEventListener('right', () => {
            this.panelElem.right()
        })
        this.btnHandler.addEventListener('left', () => {
            this.panelElem.left()
        })
        this.btnHandler.addEventListener('down', () => {
            this.panelElem.down()
        })
    }

    set people(x) {
        this.#people = parseInt(x) || 1
        // this.scoreElem.people = this.#people
        this.clearElem.people = this.#people
        this.btnHandler.people = this.#people
        this.container.appendChild(this.btnHandler)
    }

    start() {
        this.panelElem.start(this.nextElem.shape, this.clearElem.speed, this.clearElem.level)
    }

    continue() {
        this.panelElem.continue()
    }

    pause() {
        this.panelElem.pause()
    }

    reset() {
        this.clearElem.reset()
        this.btnHandler.reset()
    }

    win() { }

    resetPanel() {
        this.panelElem.reset()
        this.#shapeCounter = 0
        this.#next()
    }

    #next() {
        this.nextElem.level = this.clearElem.level
        this.nextElem.next = ShapeProducer.next(this.#shapeCounter)
        this.#shapeCounter++
    }
}