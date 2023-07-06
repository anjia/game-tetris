import ContextStrategy from '../ContextStrategy.js'
import Base from '../../js/CustomBase.js'

import '../../total-score/single-score/index.js'

class SingleContext extends ContextStrategy {

    constructor() {
        super()
    }

    createScoreElem() {
        this.scoreElem = Base.create('single-score')
    }
}

customElements.define('single-context', SingleContext)