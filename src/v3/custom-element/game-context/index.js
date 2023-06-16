import '../clear-lines/index.js'
import '../next-shape/index.js'
import '../grid-panel/index.js'
import '../win-counter/index.js'
import '../op-handler/index.js'

import Base from '../js/CustomBase.js'
import ShapeProducer from '../js/TetrisProducer.js'
import ScoreController from '../js/ScoreController.js'

customElements.define('game-context', class extends Base {

    static get observedAttributes() {
        return ['people', 'games', 'key']
    }

    // 静态方法
    static reset() {
        ShapeProducer.reset()
        ScoreController.reset()  // 最后统一清空分数
    }

    static get winner() {
        return ScoreController.winner
    }

    // 私有属性
    #container;
    #people;
    #key;
    #shapeCounter = 0    // shape 的消费计数
    #domLines = null
    #domNext = null
    #domPanel = null
    #domWin = null
    #btnHandler = null

    constructor() {
        super()

        // 实例属性
        this.domScore;

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-context/index.css'))

        // 因为是 Base.create() 创建的，所以此时属性是 null
        // console.log('\n~~~~ <game-context>, people = ', this.#people, this.getAttribute('people'))

        // html
        this.#container = Base.create('div', { 'class': 'container' })
        this.domScore = ScoreController.create()
        this.#domLines = Base.create('clear-lines', { 'class': 'flex-item box' })
        this.#domNext = Base.create('next-shape', { 'class': 'flex-item box' })
        this.#domPanel = Base.create('grid-panel')
        this.#btnHandler = Base.create('op-handler')
        this.#container.appendChild(Base.create('div', { 'class': 'box' }, [this.domScore]))
        this.#container.appendChild(Base.create('div', { 'class': 'flex' }, [this.#domLines, this.#domNext]))
        this.#container.appendChild(Base.create('div', { 'class': 'box' }, [this.#domPanel]))
        shadow.appendChild(this.#container)

        // 监听子元素的事件
        this.#addEventListener()

        // 初始化数据
        this.#next()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`<game-contex> attributeChangedCallback() name=${name}, oldValue=${oldValue}, newValue=${newValue}`)
        // debugger
        switch (name) {
            case 'people':
                this.people = newValue
                break
            case 'games':
                this.games = newValue
                break
            case 'key':
                this.#key = newValue
                this.domScore.key = newValue
                break
        }
    }

    set people(x) {
        this.#people = parseInt(x) || 1

        this.domScore.people = this.#people
        ScoreController.people = this.#people
        this.#domLines.people = this.#people
        this.#btnHandler.people = this.#people
        if (this.#people > 1) {
            this.#domWin = Base.create('win-counter')
            this.#container.appendChild(Base.create('div', { 'class': 'box' }, [this.#domWin]))
        }
        this.#container.appendChild(this.#btnHandler)
    }

    set games(x) {
        this.#domWin.games = x
        if (this.#people > 1) {
            this.#domWin.max = x
        }
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
        this.#domNext.level = this.#domLines.level
        this.#domNext.next = ShapeProducer.next(this.#shapeCounter)
        this.#shapeCounter++
    }
})