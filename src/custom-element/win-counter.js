customElements.define('win-counter', class extends HTMLElement {

    static get observedAttributes() {
        return ['value', 'max']
    }

    constructor() {
        super()

        // 实例属性
        this.min = 0
        this.max = 0
        this.value = 0
        this.container = null

        // shadow root
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        const style = document.createElement('style')
        style.textContent = `
ul {
    display: flex;
    justify-content: center;
    gap: var(--gap);
    padding: 5px 0;
    list-style: none;
    margin: 0;
}

ul>li {
    width: var(--win-size);
    height: var(--win-size);
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0.2;
}

ul>li.s {
    opacity: 1;
}
`
        shadow.appendChild(style)

        // html
        this.container = document.createElement('ul')
        shadow.appendChild(this.container)

        // 初始化
        this.#updateMax(3)
    }


    attributeChangedCallback(name, oldValue, newValue) {
        // console.log('attributeChangedCallback:', name, oldValue, newValue)
        if (newValue === null) {
            newValue = 0
        }
        switch (name) {
            case 'value':
                this.#updateValue(newValue)
                break
            case 'max':
                this.#updateMax(newValue)
                break
        }
    }

    #updateValue(x) {
        if (x === this.value || x < this.min || x > this.max) return
        console.log('值变了, value', x)
        this.value = x
        for (let i = 0; i < this.value; i++) {
            this.container.children[i].className = 's'
        }
        for (let i = this.value; i < this.max; i++) {
            this.container.children[i].className = ''
        }
    }
    #updateMax(x) {
        if (x === this.max || x < this.min) return
        console.log('值变了, max', x)
        if (x > this.max) {
            let innerHTML = ''
            for (let i = this.max; i < x; i++) {
                innerHTML += '<li></li>'
            }
            this.container.insertAdjacentHTML('beforeend', innerHTML)
            this.max = x
        } else {
            for (let i = this.max - 1; i >= x; i--) {
                this.container.children[i].remove()
            }
            this.max = x
            if (this.value > this.max) {
                this.value = this.max
                this.setAttribute('value', this.value)
            }
        }
    }
})