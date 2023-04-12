customElements.define('op-handler', class extends HTMLElement {
    constructor() {
        super()
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `<link rel="stylesheet" href="./custom-element/op-handler/index.css">
<div class="area">
    <button id="btn-rotate">旋转</button>
    <button id="btn-right">右移</button>
    <button id="btn-left">左移</button>
    <button id="btn-down">直接掉落</button>
</div>`
    }
})