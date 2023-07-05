import Base from '../../js/CustomBase.js'
import ContextStrategy from '../ContextStrategy.js'

import '../../total-score/vs-score/index.js'
import '../../win-counter/index.js'

customElements.define('vs-context', class extends ContextStrategy {

    static get observedAttributes() {
        return ['people', 'games', 'key']
    }

    #key;
    #winElem = null

    constructor() {
        super()

        const shadow = this.shadowRoot

        // html
        this.scoreElem = Base.create('vs-score')
        this.#winElem = Base.create('win-counter')

        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.scoreElem]))
        this.container.appendChild(Base.create('div', { 'class': 'flex' }, [this.clearElem, this.nextElem]))
        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.panelElem]))
        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.#winElem]))
        shadow.appendChild(this.container)

        this.init()
    }

    set people(x) {
        // TODO. 先调用父的同名方法

    }

    set games(x) {
        // TODO. 先调用父的同名方法
        this.#winElem.max = x
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
                // this.domScore.key = newValue
                break
        }
    }

    set games(x) {
        this.#winElem.games = x
    }

    reset(flag) {
        this.#winElem.reset(flag)
    }

    win() {
        return this.#winElem.win()
    }
})