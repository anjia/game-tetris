import Base from '../../js/CustomBase.js'
import ContextStrategy from '../ContextStrategy.js'

import '../../win-counter/index.js'

customElements.define('vs-context', class extends ContextStrategy {

    static get observedAttributes() {
        return ['people', 'games', 'key']
    }

    #key;
    #domWin = null

    constructor() {
        super()
    }

    set people(x) {
        // TODO. 先调用父的同名方法
        this.#domWin = Base.create('win-counter')
        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.#domWin]))
    }

    set games(x) {
        // TODO. 先调用父的同名方法
        this.#domWin.max = x
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

    set games(x) {
        this.#domWin.games = x
    }

    reset(flag) {
        this.#domWin.reset(flag)
    }

    win() {
        return this.#domWin.win()
    }
})