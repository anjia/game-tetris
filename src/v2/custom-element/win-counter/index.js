import Base from '../js/CustomBase.js'

customElements.define('win-counter', class extends Base {

    // 私有属性
    #min = 0
    #max = 0;
    #win = 0;
    #container = null
    #tip;

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        // shadow root
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/win-counter/index.css'))

        // html
        this.#container = Base.create('ul')
        shadow.appendChild(this.#container)

        this.#tip = Base.create('div', { class: 'tip' })
        shadow.appendChild(this.#tip)

        // 初始化（通过数据改UI）, max=3
        this.max = parseInt(this.getAttribute('games')) || 3
    }

    reset(flag) {
        this.#tip.className = 'tip'
        if (flag) {
            this.#setWin(0)
        }
    }

    win() {
        this.#setWin(this.#win + 1)
        let isfinally = false
        if (this.#win === this.#max) {
            isfinally = true
            this.#tip.className = 'tip finally'
        } else {
            this.#tip.className = 'tip round'
        }
        return isfinally
    }

    #setWin(x) {
        if (x === this.#win || x < this.#min || x > this.#max) return
        this.#win = x
        for (let i = 0; i < this.#win; i++) {
            this.#container.children[i].className = 's'
        }
        for (let i = this.#win; i < this.#max; i++) {
            this.#container.children[i].className = ''
        }
    }

    set max(x) {
        if (x === this.#max || x < this.#min) return
        if (x > this.#max) {
            let innerHTML = ''
            for (let i = this.#max; i < x; i++) {
                innerHTML += '<li></li>'
            }
            this.#container.insertAdjacentHTML('beforeend', innerHTML)
            this.#max = x
        } else {
            for (let i = this.#max - 1; i >= x; i--) {
                this.#container.children[i].remove()
            }
            this.#max = x
            if (this.#win > this.#max) {
                this.#win = this.#max
                this.setAttribute('value', this.#win)
            }
        }
    }
})