import Base from '../js/CustomBase.js'
import Render from '../js/Render.js'

customElements.define('grid-panel', class extends Base {

    // 私有属性
    #data = null       // 二维数组，20*10
    #container = null  // DOM
    #status;           // 状态
    #timer;            // 降落的计时器
    #speed;            // 降落的速度
    #highest;          // 楼盖的最高层
    #render;

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
        shadow.appendChild(Base.createLink('./custom-element/grid-panel/index.css'))

        // html
        this.#container = Base.create('section', { 'class': 'grid' })
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
        this.#render = new Render({
            rows: this.rows,
            columns: this.columns,
            data: this.#data,
            container: this.#container
        })
        this.#init()
    }

    get #ispreparing() {
        return this.#status === 0
    }

    get #isplaying() {
        return this.#status === 1
    }

    get #ispausing() {
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
        this.#highest = this.rows - 1
    }

    reset() {
        this.#clearTimer()
        this.#render.resetScreen()
        this.#init()
    }

    start(shape, speed) {
        if (this.#ispausing) {
            this.#toFalling()
        } else {
            this.shape = shape
            this.shape.reset()
            this.shape.render = this.#render
            this.#speed = speed

            // 若 shape 可以入场开始，则继续下落，否则 gameover
            if (this.shape.start()) {
                this.#startTimer()
            } else {
                this.#gameover()
            }
        }
        this.#status = 1
    }

    pause() {
        if (this.#isplaying) {
            this.#status = 2
            this.#clearTimer()
        }
    }

    left() {
        if (!this.#ispreparing) {
            this.shape.left()
            if (this.#ispausing) {
                this.#toFalling()
            }
        }
    }

    right() {
        if (!this.#ispreparing) {
            this.shape.right()
            if (this.#ispausing) {
                this.#toFalling()
            }
        }
    }

    down() {
        if (!this.#ispreparing) {
            this.shape.down()
            if (this.#ispausing) {
                this.#toFalling()
            }
        }
    }

    rotate() {
        if (!this.#ispreparing) {
            this.shape.rotate()
            if (this.#ispausing) {
                this.#toFalling()
            }
        }
    }


    /**
     * 私有方法
     */
    #startTimer() {
        this.#timer = setTimeout(() => {
            this.#toFalling()
        }, this.#speed)
    }

    #clearTimer() {
        clearTimeout(this.#timer)  // this.#timer 依然有值，只是不触发了而已
    }

    #toFalling() {
        // 若 shape 能继续走，则继续下落，否则就定位在此处
        if (this.shape.fall()) {
            this.#startTimer()
        } else if (this.shape.merged()) {
            // 若 shape 能被成功合并，则判断是否有满行
            const fullRows = this.#calculateFullRows()
            if (fullRows.length) {

                this.#render.blinkRows(fullRows)  // 统一闪，耗时 0.6s

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

    #calculateFullRows() {
        // 更新的行
        let updateRows = new Set()
        for (let p of this.shape.points) {
            if (p[0] >= 0) {
                updateRows.add(p[0])
                if (p[0] < this.#highest) {
                    this.#highest = p[0]
                }
            }
        }
        // 判断是否有满行
        let fullRows = []
        for (let row of updateRows) {
            let j = 0
            while (j < this.columns && this.#render.isCellFilled(row, j)) j++
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

    #gameover() {
        this.dispatchEvent(this.#eventGameover)
    }

    #clearFullRows(fullRows) {
        const from = this.#highest
        const to = fullRows[fullRows.length - 1]

        // 清除数据
        for (let row of fullRows) {
            for (let i = row; i >= this.#highest; i--) {
                const srcI = i - 1
                for (let j = 0; j < this.columns; j++) {
                    this.#data[i][j] = ((srcI >= 0 && srcI >= this.#highest) ? this.#data[srcI][j] : 0)
                }
            }
            this.#highest++
        }
        // 更新 UI
        for (let i = from; i <= to; i++) {
            const start = i * this.columns
            for (let j = 0; j < this.columns; j++) {
                this.#render.renderCell(start + j, this.#data[i][j])
            }
        }
    }
})