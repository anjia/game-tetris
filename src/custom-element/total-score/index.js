import { createLink } from '../utility.js'

customElements.define('total-score', class extends HTMLElement {

    static MAX = 999999

    static get observedAttributes() {
        return ['score', 'vs']
    }
    static #show(x) {
        return String(x).padStart(6, '0')
    }

    constructor() {
        super()

        // 实例数据
        this.type = this.getAttribute('type') || '2'
        this.domScore = document.createElement('div')
        this.dataScore;

        this.domDiff = null
        this.dataDiff;
        this.dataVS;

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // css
        shadow.appendChild(createLink('./custom-element/total-score/index.css'))

        // html
        const text = document.createTextNode('SCORE')
        shadow.appendChild(text)
        if (this.type === '2') {
            this.score = this.getAttribute('score')
            shadow.appendChild(this.domScore)

            this.domDiff = document.createElement('div')
            this.vs = this.getAttribute('vs') || this.score
            shadow.appendChild(this.domDiff)
        } else {
            const max = document.createElement('div')
            max.innerText = '最高分 000000'
            const total = document.createElement('div')
            total.innerText = '当前分 000000'
            shadow.appendChild(max)
            shadow.appendChild(total)
        }
    }

    get score() {
        return this.dataScore
    }
    get vs() {
        return this.dataVS
    }

    set score(x) {
        x = parseInt(x) || 0
        if (x === this.dataScore) return
        if (x > this.constructor.MAX) {
            x = this.constructor.MAX
            this.setAttribute('score', x)
        }
        this.dataScore = x
        this.domScore.innerText = this.constructor.#show(this.dataScore)
    }
    set vs(x) {
        x = parseInt(x) || 0
        if (this.type !== '2' || x === this.dataVS) return
        this.dataVS = x
        this.#updateDiff()
    }

    #updateDiff() {
        const dist = this.dataScore - this.dataVS
        if (dist === this.dataDiff) return
        if (dist >= 0) {
            this.domDiff.className = 'diff'
        } else {
            this.domDiff.className = 'diff less'
        }
        this.dataDiff = dist
        this.domDiff.innerText = this.constructor.#show(Math.abs(dist))
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'score':
                this.score = newValue
                this.#updateDiff()
                break
            case 'vs':
                this.vs = newValue
                break
        }
    }
})