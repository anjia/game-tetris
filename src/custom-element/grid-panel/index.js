import { createLink } from '../js/utility.js'

customElements.define('grid-panel', class extends HTMLElement {

    // 私有属性
    #data = null       // 二维数组，20*10
    #container = null  // DOM
    #status;           // 状态
    #timer;            // 降落的计时器
    #speed;            // 降落的速度
    #maxRow;           // 楼盖的最高层

    // 私有属性-事件相关
    #eventClearsDetail = {
        'lines': undefined  // 消的行数
    }
    #eventGameover = new Event('gameover')
    #eventNext = new Event('next')
    #eventClears = new CustomEvent('clear', {
        detail: this.#eventClearsDetail
    })

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

    get ispreparing() {
        return this.#status === 0
    }

    get isplaying() {
        return this.#status === 1
    }

    get ispausing() {
        return this.#status === 2
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
        this.#maxRow = this.rows - 1
    }

    reset() {
        this.#clearTimer()
        this.#resetScreen()
        this.#init()
    }

    start(shape, speed) {
        if (this.ispausing) {
            this.#falling()
        } else {
            this.shape = shape
            this.shape.reset()
            this.shape.panel = {
                rows: this.rows,
                columns: this.columns,
                data: this.#data,
                container: this.#container
            }
            this.#speed = speed
            this.#startNext()

        }
        this.#status = 1
    }

    pause() {
        if (this.isplaying) {
            this.#status = 2
            this.#clearTimer()
        }
    }

    left() {
        if (!this.ispreparing) {
            this.shape.left()
            if (this.ispausing) {
                this.#falling()
            }
        }
    }

    right() {
        if (!this.ispreparing) {
            this.shape.right()
            if (this.ispausing) {
                this.#falling()
            }
        }
    }

    down() {
        if (!this.ispreparing) {
            this.shape.down()
            if (this.ispausing) {
                this.#falling()
            }
        }
    }

    rotate() {
        if (!this.ispreparing) {
            this.shape.rotate()
            if (this.ispausing) {
                this.#falling()
            }
        }
    }


    /**
     * 私有方法
     */
    #startNext() {
        // 若 shape 可以入场开始，则继续下落，否则 gameover
        if (this.shape.start()) {
            this.#continueFalling()
        } else {
            this.#gameover()
        }
    }

    #gameover() {
        this.dispatchEvent(this.#eventGameover)
    }

    #falling() {
        // 若 shape 能继续走，则继续下落，否则就定位在此处
        if (this.shape.fall()) {
            this.#continueFalling()
        } else if (this.shape.merged()) {
            // 若 shape 能被成功合并，则判断是否有满行
            const fullRows = this.#getFullRows()
            if (fullRows.length) {

                this.#blinkFullRows(fullRows)  // 统一闪，耗时 0.6s

                // 通知父容器有消行得分
                this.#eventClearsDetail.lines = fullRows.length
                this.dispatchEvent(this.#eventClears)

                // 动画结束后，重新赋值
                setTimeout(() => {
                    this.#clearFullRows(fullRows)        // 统一清除
                    this.dispatchEvent(this.#eventNext)  // 通知父容器开始下一个
                }, 600)
            } else {
                this.dispatchEvent(this.#eventNext)
            }
        } else {
            this.#gameover()  // 否则，gameover
        }
    }

    #clearFullRows(fullRows) {
        const from = this.#maxRow
        const to = fullRows[fullRows.length - 1]

        // 清除数据
        for (let row of fullRows) {
            for (let i = row; i >= this.#maxRow; i--) {
                const srcI = i - 1
                for (let j = 0; j < this.columns; j++) {
                    this.#data[i][j] = ((srcI >= 0 && srcI >= this.#maxRow) ? this.#data[srcI][j] : 0)
                }
            }
            this.#maxRow++
        }
        // 清除UI
        for (let i = from; i <= to; i++) {
            const start = i * this.columns
            for (let j = 0; j < this.columns; j++) {
                this.#updateCell(start + j, this.#data[i][j])
            }
        }
    }

    #continueFalling() {
        this.#timer = setTimeout(() => {
            this.#falling()
        }, this.#speed)
    }

    #getFullRows() {
        // 更新的行
        let updateRows = new Set()
        for (let p of this.shape.points) {
            if (p[0] >= 0) {
                updateRows.add(p[0])
                if (p[0] < this.#maxRow) {
                    this.#maxRow = p[0]
                }
            }
        }
        // 判断是否有满行
        let fullRows = []
        for (let row of updateRows) {
            let j = 0
            while (j < this.columns && this.#isCellFilled(row, j)) j++
            if (j === this.columns) {
                fullRows.push(row)
            }
        }
        // 原地排序，从小-大
        fullRows.sort((a, b) => {
            if (a > b) return 1
            else if (a < b) return -1
            return 0
        })
        return fullRows
    }



    #blinkFullRows(fullRows) {
        for (let row of fullRows) {
            this.#updateRow(row, 2)
        }
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

    #isCellFilled(i, j) {
        return i >= 0 && i < this.rows && j >= 0 && j < this.columns && this.#data[i][j] === 1
    }
})