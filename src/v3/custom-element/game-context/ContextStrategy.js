import '../clear-lines/index.js'
import '../next-shape/index.js'
import '../grid-panel/index.js'
import '../op-handler/index.js'

import Base from '../js/CustomBase.js'
import ShapeProducer from '../js/TetrisProducer.js'

export default class extends Base {

    // 静态方法
    static reset() {
        ShapeProducer.reset()
    }

    // 私有属性
    #people;
    #shapeCounter = 0    // shape 的消费计数
    #btnHandler = null

    constructor() {
        super()

        // 实例属性
        this.scoreElem;

        // TODO. 优化要封装
        this.container;

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-context/index.css'))

        this.container = Base.create('div', { 'class': 'container' })
        this.clearElem = Base.create('clear-lines', { 'class': 'flex-item box' })
        this.nextElem = Base.create('next-shape', { 'class': 'flex-item box' })
        this.panelElem = Base.create('grid-panel')
        this.btnHandler = Base.create('op-handler')

        // 因为是 Base.create() 创建的，所以此时属性是 null
        // console.log('\n~~~~ <game-context>, people = ', this.#people, this.getAttribute('people'))
    }

    init() {
        // 监听子元素的事件
        this.#addEventListener()

        // 初始化数据
        this.#next()
    }

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
        ScoreController.people = this.#people
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