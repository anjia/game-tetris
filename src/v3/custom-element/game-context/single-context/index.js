import ContextStrategy from '../ContextStrategy.js'

class SingleContext extends ContextStrategy {

    constructor() {
        super()
    }
}

customElements.define('single-context', SingleContext)