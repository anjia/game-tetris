import '../clear-lines/index.js'
import '../next-shape/index.js'
import '../grid-panel/index.js'
import '../op-handler/index.js'

import Base from '../Base.js'
import ShapeProducer from '../next-shape/ShapeProducer.js'

export default class extends Base {

    // 私有属性
    // #people;

    constructor() {
        super()

        this.shapeProducer = new ShapeProducer()

        // TODO. 优化要封装
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/tetris-context/index.css'))

        // 设计模式：模板模式
        this.container = Base.create('div', { 'class': 'container' })
        this.scoreElem = this.createScoreElem()  // 回调1
        this.clearElem = Base.create('clear-lines', { 'class': 'flex-item box' })
        this.nextElem = Base.create('next-shape', { 'class': 'flex-item box' })
        this.nextElem.shapeSubject = this.shapeProducer  // TODO. 如何依赖注入？如此变可避免传参...
        this.nextElem.refresh()    // TODO. 如果是依赖注入，就不用写两条语句了....

        this.panelElem = Base.create('grid-panel')
        this.btnHandler = Base.create('op-handler')

        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.scoreElem]))
        this.container.appendChild(Base.create('div', { 'class': 'flex' }, [this.clearElem, this.nextElem]))
        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.panelElem]))

        const winElem = this.createWinElem()  // 回调2
        if (winElem) {
            this.container.appendChild(Base.create('div', { 'class': 'box' }, [winElem]))
        }

        this.container.appendChild(this.btnHandler)
        shadow.appendChild(this.container)

        // 因为是 Base.create() 创建的，所以此时属性是 null
        // console.log('\n~~~~ <tetris-context>, people = ', this.#people, this.getAttribute('people'))

        // 监听子元素的事件
        this.#addEventListener()
    }

    createScoreElem() { }       // 由子元素实现
    createWinElem() { }   // 若有，则由子元素实现

    #addEventListener() {
        // 游戏面板
        this.panelElem.addEventListener('next', () => {
            this.start()
            this.nextElem.refresh(this.clearElem.level)
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

    // set people(x) {
    //     this.#people = parseInt(x) || 1
    //     // this.scoreElem.people = this.#people
    //     this.clearElem.people = this.#people
    //     this.btnHandler.people = this.#people
    //     this.container.appendChild(this.btnHandler)
    // }

    start() {
        this.panelElem.start(this.nextElem.shape, this.clearElem.speed, this.clearElem.level)
    }

    pause() {
        this.panelElem.pause()
    }

    continue() {
        this.panelElem.continue()
    }

    reset() {
        this.shapeProducer.reset()
        this.clearElem.reset()
        this.btnHandler.reset()
    }

    resetPanel() {
        this.panelElem.reset()
        this.nextElem.refresh(this.clearElem.level)
    }

    win() { }
}