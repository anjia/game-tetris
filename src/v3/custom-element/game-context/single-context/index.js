import ContextStrategy from '../ContextStrategy.js'
import Base from '../../js/CustomBase.js'

import '../../total-score/single-score/index.js'

class SingleContext extends ContextStrategy {

    constructor() {
        super()

        const shadow = this.shadowRoot

        // html
        this.scoreElem = Base.create('single-score')
        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.scoreElem]))
        this.container.appendChild(Base.create('div', { 'class': 'flex' }, [this.clearElem, this.nextElem]))
        this.container.appendChild(Base.create('div', { 'class': 'box' }, [this.panelElem]))
        shadow.appendChild(this.container)

        this.init()
    }
}

customElements.define('single-context', SingleContext)