customElements.define('clear-lines', class extends HTMLElement {
    constructor() {
        super()
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = 'LINE<div>000</div>'
    }
})