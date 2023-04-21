import Base from '../js/CustomBase.js'
import Render from '../js/Render.js'

customElements.define('grid-panel', class extends Base {

    // 私有属性
    #rows = 20         // 行
    #columns = 10      // 列
    #data = null       // 二维数组，20*10
    #container = null  // DOM
    #status;           // 状态
    #shape = null      // 当前形状
    #timer;            // 降落的计时器
    #speed;            // 降落的速度
    #clearlines;       // 消除的行数
    #render;           // 负责 UI 渲染

    // 私有属性-事件相关
    #eventGameover = new CustomEvent('gameover', { composed: true })
    #eventNext = new Event('next')
    #eventClears = new CustomEvent('clear', {
        detail: {
            'lines': () => this.#clearlines
        }
    })

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(Base.createLink('./custom-element/grid-panel/index.css'))

        // html
        this.#container = Base.create('section', { 'class': 'grid' })
        let innerHTML = ''
        for (let i = 0; i < this.#rows * this.#columns; i++) {
            innerHTML += '<span></span>'
        }
        this.#container.innerHTML = innerHTML
        shadow.appendChild(this.#container)

        // 二维数组，申请空间
        this.#data = new Array(this.#rows)
        for (let i = 0; i < this.#rows; i++) {
            this.#data[i] = new Array(this.#columns)
        }

        // 初始化数据
        this.#render = new Render({
            rows: this.#rows,
            columns: this.#columns,
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

    get #isgameover() {
        return this.#status === 3
    }

    #init() {
        // grid data 全部填充 0
        for (let i = 0; i < this.#rows; i++) {
            for (let j = 0; j < this.#columns; j++) {
                this.#data[i][j] = 0
            }
        }
        // 其它实例数据
        this.#status = 0
    }

    reset() {
        this.#clearTimer()
        this.#render.reset()
        this.#init()
    }

    start(shape, speed) {
        if (this.#isgameover) return
        if (this.#ispausing) {
            this.#toFalling()
        } else {
            this.#shape = shape
            this.#shape.reset()
            this.#speed = speed

            // 若 shape 可以入场开始，则绘制+继续下落，否则 gameover
            if (this.#shape.start(this.#render)) {
                this.#shape.draw(this.#render)
                this.#startTimer()
            } else {
                this.#gameover()
            }
        }
        this.#status = 1
    }

    continue() {
        if (this.#ispausing) {
            this.#status = 1
            this.#toFalling()
        }
    }

    pause() {
        if (this.#isplaying) {
            this.#status = 2
            this.#clearTimer()
        }
    }

    left() {
        if (!this.#ispreparing) {
            this.#shape.left(this.#render)
            if (this.#ispausing) {
                this.#toFalling()
            }
        }
    }

    right() {
        if (!this.#ispreparing) {
            this.#shape.right(this.#render)
            if (this.#ispausing) {
                this.#toFalling()
            }
        }
    }

    down() {
        if (!this.#ispreparing) {
            this.#shape.down(this.#render)
            if (this.#ispausing) {
                this.#toFalling()
            }
        }
    }

    rotate() {
        if (!this.#ispreparing) {
            this.#shape.rotate(this.#render)
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
        // 1. 若 shape 能继续走，则继续下落
        if (this.#shape.fall(this.#render)) {
            this.#startTimer()
        } else {

            // 2. 否则就定位在此处，合并 shape
            const { result, fullRows } = this.#shape.merge(this.#render)

            // 2.1 若合并成功，则判断是否有满行
            if (result) {

                if (fullRows.length) {
                    this.#render.blinkRows(fullRows)  // 统一闪，耗时 0.6s

                    // 通知父容器有消行得分
                    this.#clearlines = fullRows.length
                    this.dispatchEvent(this.#eventClears)

                    // 动画结束后，重新赋值
                    setTimeout(() => {
                        this.#render.clearFullRows(fullRows)  // 统一清除
                        this.#next()
                    }, 600)

                } else {
                    this.#next()
                }

            } else {
                // 2.2 合并失败，则说明 shape 没画全，gameover
                this.#gameover()
            }
        }
    }

    #gameover() {
        this.#status = 3
        this.dispatchEvent(this.#eventGameover)  // 通知父容器 gameover
    }

    #next() {
        this.dispatchEvent(this.#eventNext)  // 通知父容器开始下一个
    }
})