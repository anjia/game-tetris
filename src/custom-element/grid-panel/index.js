import { createLink } from '../js/utility.js'



customElements.define('grid-panel', class extends HTMLElement {

    // private fields
    #data = null       // 二维数组，20*10
    #container = null  // DOM
    #status;           // 状态
    #timer;            // 降落的计时器
    #speed;            // 降落的速度

    constructor() {
        super()

        // 实例属性
        this.rows = 20
        this.columns = 10
        this.shape = null   // 当前形状

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(createLink('./custom-element/grid-panel/index.css'))

        // html
        this.#container = document.createElement('section')
        this.#container.setAttribute('class', 'grid')
        let innerHTML = ''
        for (let i = 0; i < this.rows * this.columns; i++) {
            innerHTML += '<span></span>'
        }
        this.#container.innerHTML = innerHTML
        shadow.appendChild(this.#container)

        // 二维数组，申请空间
        this.#data = new Array(this.rows)
        for (let i = 0; i < this.rows; i++) {
            this.#data[i] = new Array(this.columns)
        }

        // 初始化数据
        this.#init()
    }

    #init() {
        // grid data 全部填充 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.#data[i][j] = 0
            }
        }
        // 其它实例数据
        this.#status = 0
    }

    reset() {
        this.#init()
        this.#clearTimer()
        this.#resetScreen()
    }

    #clearTimer() {
        clearTimeout(this.#timer)  // this.#timer 依然有值，只是不触发了而已
    }

    #resetScreen() {
        this.#startResetScreen(this.rows - 1, -1, 1)
    }
    #startResetScreen(row, add, mode) {
        if (add === 1 && row === this.rows) {
            return
        }

        this.#updateRow(row, mode)

        setTimeout(() => {
            let nextRow = row + add
            if (add === -1 && nextRow < 0) {
                this.#startResetScreen(0, 1, 0)
            } else {
                this.#startResetScreen(nextRow, add, mode)
            }
        }, 30)
    }
    #updateRow(row, mode) {
        const start = row * this.columns
        for (let j = 0; j < this.columns; j++) {
            this.#updateCell(start + j, mode)
        }
    }
    #updateCell(i, mode) {
        const flag = ['', 'light', 'blink']
        this.#container.children[i].className = flag[mode]
    }

    get ispreparing() {
        return this.#status === 0
    }
    get isplaying() {
        return this.#status === 1
    }
    get ispausing() {
        return this.#status === 2
    }

    start(shape, speed) {
        if (this.isplaying) {
            return
        } else if (this.ispreparing) {
            this.shape = shape
            this.shape.panel = {
                rows: this.rows,
                columns: this.columns,
                data: this.#data,
                container: this.#container
            }
            this.#speed = speed
            this.#startNext()
        } else if (this.ispausing) {
            this.#falling()
        }
        this.#status = 1
    }

    pause() {
        if (this.isplaying) {
            this.#status = 2
            this.#clearTimer()
        }
    }

    #startNext() {
        console.log('grid-panel start(), this.shape=', this.shape)

        // 若 shape 可以入场，则绘制+继续下落
        if (this.shape.entered) {
            this.shape.draw()
            this.#continueFalling()
        } else {
            this.gameover()  // 否则，gameover
        }
    }

    #falling() {
        const next = this.shape.down()  // 向下走一格
        // 若 shape 能继续走，则更新UI+继续下落
        if (next.length) {
            this.shape.to(next)
            this.#continueFalling()
        } else {
            // 否则就定位在此处，若 shape 能被画全则落定
            if (this.shape.included) {
                // 固定形状时，返回它消除的行数
                const clearRows = this.shape.fixed()
                // TODO. 告诉父容器有消行得分，父容器更新行数+分数+下一个
            } else {
                this.gameover()  // 否则，gameover
            }
        }
    }

    gameover() {
        // TODO. 向父容器发送事件 'gameover'
        this.reset()
    }

    #continueFalling() {
        this.#timer = setTimeout(() => {
            this.#falling()
        }, this.#speed)
    }


    left() {

    }
    right() {

    }
    down() {

    }
    rotate() {

    }
})