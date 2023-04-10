customElements.define('game-panel', class extends HTMLElement {
    constructor() {
        super()

        let shadow = this.attachShadow({ mode: 'open' })

        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', './custom-element/grid.css')
        shadow.appendChild(link)

        const style = document.createElement('style')
        style.textContent = `
.grid {
    grid-template-rows: repeat(20, var(--size));
    grid-template-columns: repeat(10, var(--size));
    padding: 3px;
}`
        shadow.appendChild(style)

        const wrap = document.createElement('section')
        wrap.setAttribute('class', 'grid')
        let innerHTML = ''
        for (let i = 0; i < 200; i++) {
            innerHTML += '<span></span>'
        }
        wrap.innerHTML = innerHTML
        shadow.appendChild(wrap)
    }
})