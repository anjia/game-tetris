import '../clear-lines/index.js'
import '../next-shape/index.js'
import '../grid-panel/index.js'
import '../win-counter/index.js'
import '../op-handler/index.js'

import Base from '../js/CustomBase.js'
import ShapeProducer from '../js/tetris/Producer.js'
import Score from '../js/Score.js'

customElements.define('game-context', class extends Base {

    // 静态属性
    static shaper = new ShapeProducer()  // shape 生产者
    static scorer = new Score()          // score 的管理者
    static reseted = false

    constructor() {
        super()

        // 实例属性
        this.shapeCounter = 0   // shape 的消费计数
        this.domScore = this.constructor.scorer.add()

        this.domClears = null
        this.domNext = null
        this.domPanel = null
        this.domWin = null
        this.btnHandler = null

        // shadow DOM
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-context/index.css'))

        // html
        shadow.appendChild(Base.createDiv({ 'class': 'box' }, [this.domScore]))

        this.domClears = Base.create('clear-lines', { 'class': 'flex-item box' })
        this.domNext = Base.create('next-shape', { 'class': 'flex-item box' })
        shadow.appendChild(Base.createDiv({ 'class': 'flex' }, [this.domClears, this.domNext]))

        this.domPanel = Base.create('grid-panel')
        shadow.appendChild(Base.createDiv({ 'class': 'box' }, [this.domPanel]))

        this.domWin = Base.create('win-counter')
        shadow.appendChild(Base.createDiv({ 'class': 'box' }, [this.domWin]))

        this.btnHandler = Base.create('op-handler')
        shadow.appendChild(this.btnHandler)

        // 监听子元素的事件
        this.domPanel.addEventListener('next', (e) => {
            this.start()
            this.#getNewNext()
        })
        this.domPanel.addEventListener('clear', (e) => {
            const lines = e.detail.lines
            this.domClears.add(lines)
            this.constructor.scorer.clear(this.domScore, lines)
        })
        this.domPanel.addEventListener('gameover', (e) => {
            this.reset()
        })
        this.btnHandler.addEventListener('rotate', () => {
            this.domPanel.rotate()
        })
        this.btnHandler.addEventListener('right', () => {
            this.domPanel.right()
        })
        this.btnHandler.addEventListener('left', () => {
            this.domPanel.left()
        })
        this.btnHandler.addEventListener('down', () => {
            this.domPanel.down()
        })


        // 初始化数据
        this.#getNewNext()
    }

    start() {
        this.domPanel.start(this.domNext.shape, this.domClears.speed)
        this.constructor.reseted = false
    }

    pause() {
        this.domPanel.pause()
    }

    reset() {
        // 静态属性相关
        if (!this.constructor.reseted) {
            this.constructor.shaper.reset()
            this.constructor.reseted = true
        }

        // 实例属性
        this.constructor.scorer.reset(this.domScore)
        this.shapeCounter = 0
        this.#getNewNext()
        this.domClears.reset()
        this.domPanel.reset()
        this.domWin.reset()
    }

    #getNewNext() {
        this.domNext.shape = (this.constructor.shaper).next(this.shapeCounter)
        this.shapeCounter++
    }
})