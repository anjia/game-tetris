import Base from '../../Base.js'
import ContextStrategy from '../ContextStrategy.js'

import '../../total-score/single-score/index.js'

customElements.define('single-context', class extends ContextStrategy {

    constructor() {
        super()
    }

    createScoreElem() {
        return Base.create('single-score')
    }
})