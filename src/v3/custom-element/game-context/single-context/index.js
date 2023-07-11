import ContextStrategy from '../ContextStrategy.js'
import Base from '../../Base.js'

import '../../total-score/single-score/index.js'

customElements.define('single-context', class extends ContextStrategy {

    constructor() {
        super()
    }

    createScoreElem() {
        return Base.create('single-score')
    }
})