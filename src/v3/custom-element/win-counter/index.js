import Base from '../js/CustomBase.js'

customElements.define('win-counter', class extends Base {

    // 私有属性
    #dataMin = 0
    #dataMax = 0;
    #dataWin = 0;
    #container = null
    #tip;

    constructor() {
        super()

        // shadow root
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/win-counter/index.css'))

        // html
        this.#container = Base.create('ul')
        shadow.appendChild(this.#container)

        this.#tip = Base.create('div', { class: 'tip' })
        shadow.appendChild(this.#tip)
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 初始化（通过数据改UI）, max=3
        this.max = parseInt(this.getAttribute('games')) || 3
    }

    set max(x) {
        if (x === this.#dataMax || x < this.#dataMin) return
        if (x > this.#dataMax) {
            let innerHTML = ''
            for (let i = this.#dataMax; i < x; i++) {
                innerHTML += '<li></li>'
            }
            this.#container.insertAdjacentHTML('beforeend', innerHTML)
            this.#dataMax = x
        } else {
            for (let i = this.#dataMax - 1; i >= x; i--) {
                this.#container.children[i].remove()
            }
            this.#dataMax = x
            if (this.#dataWin > this.#dataMax) {
                this.#dataWin = this.#dataMax
                this.setAttribute('value', this.#dataWin)
            }
        }
    }

    set #win(x) {
        if (x === this.#dataWin || x < this.#dataMin || x > this.#dataMax) return
        this.#dataWin = x
        for (let i = 0; i < this.#dataWin; i++) {
            this.#container.children[i].className = 's'
        }
        for (let i = this.#dataWin; i < this.#dataMax; i++) {
            this.#container.children[i].className = ''
        }
    }

    reset(flag) {
        this.#tip.className = 'tip'
        if (flag) {
            this.#win = 0
        }
    }

    win() {
        this.#win = this.#dataWin + 1
        let isfinally = false
        if (this.#dataWin === this.#dataMax) {
            isfinally = true
            this.#tip.className = 'tip finally'
        } else {
            this.#tip.className = 'tip round'
        }
        return isfinally
    }
})