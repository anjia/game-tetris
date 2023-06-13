import TetrisStrategy from '../TetrisStrategy.js'

import Base from '../../js/CustomBase.js'

class SingleMode extends TetrisStrategy {

    #context;

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        // debugger

        const shadow = this.attachShadow({ mode: 'open' })

        shadow.appendChild(Base.createLink('./custom-element/game-tetris/single-mode/index.css'))


        this.#context = Base.create('game-context')
        // TODO. 如何访问父元素的属性和方法？

        shadow.appendChild(this.#context)
        // shadow.appendChild(Base.create('div', { 'class': 'gap' }, [this.#btnWrap]))
    }

    start() {
        this.#context.start()
    }

    pause() {
        this.#context.pause()
    }

    continue() {
        this.#context.continue()
    }

    reset() {
        this.#context.reset()
        this.#context.resetPanel()
    }
}

customElements.define('single-mode', SingleMode)