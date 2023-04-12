customElements.define('clear-lines', class extends HTMLElement {

    static get observedAttributes() {
        return ['value']
    }

    constructor() {
        super()

        // 实例属性
        this.domLines = null
        this.dataLines;

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        const text = document.createTextNode('LINE')
        shadow.appendChild(text)
        this.domLines = document.createElement('div')
        this.value = this.getAttribute('value')
        shadow.appendChild(this.domLines)
    }

    set value(x) {
        x = parseInt(x) || 0
        if (x === this.dataLines) return
        this.dataLines = x
        this.domLines.innerText = String(x).padStart(3, '0')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === null) {
            newValue = 0
        }
        switch (name) {
            case 'value':
                this.value = newValue
                break
        }
    }
})