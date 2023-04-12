import all from '../../core/shape/all.js'

customElements.define('next-shape', class extends HTMLElement {

    static get observedAttributes() {
        return ['name']
    }

    constructor() {
        super()

        // 实例数据
        this.name = this.getAttribute('name')
        this.container = null

        // 处理数据：所有的形状
        let arr = []
        for (let i = 0; i < 8; i++) {
            arr.push([])
        }
        for (let shape of all) {
            const matrix = shape.matrix
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] === 1) {
                        arr[i * 4 + j].push(shape.name)
                    }
                }
            }
        }

        // 构造 shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', './custom-element/style/grid.css')
        shadow.appendChild(link)

        const style = document.createElement('style')
        style.textContent = `
.grid {
    grid-template-rows: repeat(2, var(--size));
    grid-template-columns: repeat(4, var(--size));
    justify-content: center;
}

.grid>span {
    opacity: 0.1;
}

.shape-O .O,
.shape-I .I,
.shape-T .T,
.shape-J .J,
.shape-L .L,
.shape-S .S,
.shape-Z .Z {
    opacity: 1;
}`
        shadow.appendChild(style)

        this.container = document.createElement('section')
        this.container.setAttribute('class', `grid shape-${this.name}`)
        let innerHTML = ''
        for (let item of arr) {
            innerHTML += '<span class="' + item.join(' ') + '"></span>'
        }
        this.container.innerHTML = innerHTML
        shadow.appendChild(this.container)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name' && newValue && this.name !== newValue) {
            this.name = newValue
            this.container.className = 'grid shape-' + this.name
            // this.container.classList[1] = 'shape-' + this.name
        }
    }
})