import '../clear-lines/index.js'
import '../next-shape/index.js'
import '../grid-panel/index.js'
import '../win-counter/index.js'
import '../op-handler/index.js'

import Base from '../js/CustomBase.js'
import ShapeProducer from '../js/TetrisProducer.js'
import ScoreController from '../js/ScoreController.js'

class GameContext extends Base {

    // 静态方法
    static reset() {
        ShapeProducer.reset()
        ScoreController.reset()  // 最后统一清空分数
    }

    static get winner() {
        return ScoreController.winner
    }

    // 私有属性
    #shapeCounter = 0    // shape 的消费计数
    #domLines = null
    #domNext = null
    #domPanel = null
    #domWin = null
    #btnHandler = null

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 获取属性
        ScoreController.people = parseInt(this.getAttribute('people')) || 1
        const games = this.getAttribute('games')
        const key = this.getAttribute('key')

        // shadow DOM
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-context/index.css'))

        // html
        this.domScore = ScoreController.create(key)  // score 新增一个
        shadow.appendChild(Base.create('div', { 'class': 'box' }, [this.domScore]))

        this.#domLines = Base.create('clear-lines', { 'class': 'flex-item box' })
        this.#domNext = Base.create('next-shape', { 'class': 'flex-item box' })
        shadow.appendChild(Base.create('div', { 'class': 'flex' }, [this.#domLines, this.#domNext]))

        this.#domPanel = Base.create('grid-panel')
        shadow.appendChild(Base.create('div', { 'class': 'box' }, [this.#domPanel]))

        this.#domWin = Base.create('win-counter', { 'games': games })
        shadow.appendChild(Base.create('div', { 'class': 'box' }, [this.#domWin]))

        this.#btnHandler = Base.create('op-handler')
        shadow.appendChild(this.#btnHandler)

        // 监听子元素的事件
        this.#addEventListener()

        // 初始化数据
        this.#next()
    }

    #addEventListener() {
        // 游戏面板
        this.#domPanel.addEventListener('next', () => {
            this.start()
            this.#next()
        })
        this.#domPanel.addEventListener('clear', (e) => {
            const lines = e.detail.lines()
            this.#domLines.clear(lines)
            ScoreController.clear(this.domScore, lines)
        })
        this.#domPanel.addEventListener('gameover', () => {
            this.resetPanel()
        })

        // 游戏手柄
        this.#btnHandler.addEventListener('rotate', () => {
            this.#domPanel.rotate()
        })
        this.#btnHandler.addEventListener('right', () => {
            this.#domPanel.right()
        })
        this.#btnHandler.addEventListener('left', () => {
            this.#domPanel.left()
        })
        this.#btnHandler.addEventListener('down', () => {
            this.#domPanel.down()
        })
    }

    start() {
        this.#domPanel.start(this.#domNext.shape, this.#domLines.speed)
    }

    continue() {
        this.#domPanel.continue()
    }

    pause() {
        this.#domPanel.pause()
    }

    reset(flag) {
        this.#domLines.reset()
        this.#domWin.reset(flag)
    }

    resetPanel() {
        this.#domPanel.reset()
        this.#shapeCounter = 0
        this.#next()
    }

    win() {
        return this.#domWin.win()
    }

    #next() {
        this.#domNext.next = ShapeProducer.next(this.#shapeCounter)
        this.#shapeCounter++
    }
}

customElements.define('game-context', GameContext)

export default GameContext