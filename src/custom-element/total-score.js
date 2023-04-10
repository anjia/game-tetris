customElements.define('total-score', class extends HTMLElement {
    constructor() {
        super()

        // 接收参数
        const type = this.getAttribute('type')

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // html
        const text = document.createTextNode('SCORE')
        shadow.appendChild(text)
        if (type === '2') {
            const total = document.createElement('div')
            total.innerText = '000000'
            shadow.appendChild(total)
            const dist = document.createElement('div')
            dist.innerText = '000000'
            shadow.appendChild(dist)
        } else {
            const max = document.createElement('div')
            max.innerText = '最高分 000000'
            const total = document.createElement('div')
            total.innerText = '当前分 000000'
            shadow.appendChild(max)
            shadow.appendChild(total)
        }
    }
})