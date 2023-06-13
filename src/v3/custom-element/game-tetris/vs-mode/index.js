import TetrisStrategy from '../TetrisStrategy.js'

class VSMode extends TetrisStrategy {

    constructor() {
        super()


    }

    connectedCallback() {
        if (!this.isConnected) return

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/vs-mode/index.css'))
        this.shadow.appendChild(super.context[0])
        for (let i = 1; i < super.people; i++) {
            let text = Base.create('div', { 'text': 'VS' })
            let children = [text]
            // if (i === 1) {
            //     children.push(this.#btnWrap)
            // }
            this.shadow.appendChild(Base.create('div', { 'class': 'gap' }, children))
            this.shadow.appendChild(super.context[i])
        }
    }
}

customElements.define('vs-mode', VSMode)