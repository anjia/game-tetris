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
    #people;

    constructor() {
        super()

        // 实例属性
        this.domScore;
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 获取属性
        this.#people = parseInt(this.getAttribute('people')) || 1
        const games = this.getAttribute('games')
        const key = this.getAttribute('key')
        ScoreController.people = this.#people

        // shadow DOM
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-context/index.css'))

        // html
        const container = Base.create('div', { 'class': 'container' })
        this.domScore = ScoreController.create(key)  // score 新增一个
        this.#domLines = Base.create('clear-lines', { 'class': 'flex-item box', 'people': this.#people })
        this.#domNext = Base.create('next-shape', { 'class': 'flex-item box' })
        this.#domPanel = Base.create('grid-panel')
        this.#btnHandler = Base.create('op-handler')

        container.appendChild(Base.create('div', { 'class': 'box' }, [this.domScore]))
        container.appendChild(Base.create('div', { 'class': 'flex' }, [this.#domLines, this.#domNext]))
        container.appendChild(Base.create('div', { 'class': 'box' }, [this.#domPanel]))

        if (this.#people > 1) {
            this.#domWin = Base.create('win-counter', { 'games': games })
            container.appendChild(Base.create('div', { 'class': 'box' }, [this.#domWin]))
        }
        container.appendChild(this.#btnHandler)
        shadow.appendChild(container)

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

    set games(x) {
        if (this.#people > 1) {
            this.#domWin.max = x
        }
    }

    start() {
        this.#domPanel.start(this.#domNext.shape, this.#domLines.speed, this.#domLines.level)
    }

    continue() {
        this.#domPanel.continue()
    }

    pause() {
        this.#domPanel.pause()
    }

    reset(flag) {
        this.#domLines.reset()
        if (this.#people > 1) {
            this.#domWin.reset(flag)
        }
        this.#btnHandler.reset()
    }

    resetPanel() {
        this.#domPanel.reset()
        this.#shapeCounter = 0
        this.#next()
    }

    win() {
        if (this.#people > 1) {
            return this.#domWin.win()
        }
    }

    #next() {
        this.#domNext.next = ShapeProducer.next(this.#shapeCounter)
        this.#shapeCounter++
    }
}

customElements.define('game-context', GameContext)

export default GameContext