import Base from '../../Base.js'
import ContextStrategy from '../ContextStrategy.js'

import '../../total-score/vs-score/index.js'
import '../../win-counter/index.js'

customElements.define('vs-context', class extends ContextStrategy {

    static get observedAttributes() {
        return ['people', 'games']
    }

    // Uncaught TypeError: Cannot write private member #winElem to an object whose class did not declare it
    // #winElem = null

    constructor() {
        super()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(`<game-contex> attributeChangedCallback() name=${name}, oldValue=${oldValue}, newValue=${newValue}`)
        // debugger
        switch (name) {
            case 'people':
                this.people = newValue
                break
            case 'games':
                this.games = newValue
                break
        }
    }

    set scoreSubject(x) {
        this.scoreElem.scoreSubject = x
    }

    set people(x) {
        // TODO. 先调用父的同名方法

    }

    set games(x) {
        // TODO. 先调用父的同名方法
        this.winElem.max = x
        this.winElem.games = x
    }

    createScoreElem() {
        return Base.create('vs-score')
    }

    createWinElem() {
        this.winElem = Base.create('win-counter')
        return this.winElem
    }

    reset(flag) {
        this.winElem.reset(flag)
    }

    win() {
        return this.winElem.win()
    }
})