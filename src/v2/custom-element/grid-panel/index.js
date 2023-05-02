import '../grid-cell/index.js'

import Base from '../js/CustomBase.js'
import ShapePanel from '../js/ShapePanel.js'

class Panel extends Base {

    // 状态
    static #PREPARING = 0
    static #PLAYING = 1
    static #PAUSING = 2
    static #GAMEOVER = 3

    // 私有属性
    #status = Panel.#PREPARING  // 状态
    #shape = null      // 当前形状
    #timer;            // 降落的计时器
    #speed;            // 降落的速度
    #clearlines;       // 消除的行数

    #rows = 20
    #columns = 10
    #cellList = []
    #highest;        // 楼盖的最高层
    #shapePanel;

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
        for (let i = 0; i < this.#rows * this.#columns; i++) {
            this.#cellList.push(Base.create('grid-cell'))
        }
        shadow.appendChild(Base.create('section', { 'class': 'grid' }, this.#cellList))

        // 初始化数据（TODO.应该是依赖注入）
        this.#shapePanel = new ShapePanel({
            rows: this.#rows,
            columns: this.#columns,
            cellList: this.#cellList
        })
    }

    reset() {
        this.#status = Panel.#PREPARING
        this.#clearTimer()
        for (let cell of this.#cellList) {
            cell.dark()
        }
        this.#highest = this.#rows - 1
        this.#startResetScreen(this.#rows - 1, -1, true)
    }

    start(shape, speed, level) {
        switch (this.#status) {
            case Panel.#PREPARING:
                this.#status = Panel.#PLAYING
            case Panel.#PLAYING:
                this.#shape = shape
                this.#shape.reset()
                this.#shape.level = level
                this.#speed = speed

                // 若 shape 可以入场开始，则绘制+继续下落，否则 gameover
                if (this.#shape.start(this.#shapePanel)) {
                    this.#shape.draw(this.#shapePanel)
                    this.#startTimer()
                } else {
                    this.#gameover()
                }

                break
            case Panel.#PAUSING:
                this.continue()
                break
        }
    }

    continue() {
        if (this.#status === Panel.#PAUSING) {
            this.#status = Panel.#PLAYING
            this.#toFalling()
        }
    }

    pause() {
        if (this.#status === Panel.#PLAYING) {
            this.#status = Panel.#PAUSING
            this.#clearTimer()
        }
    }

    left() {
        if (this.#status === Panel.#PLAYING) {
            this.#shape.left(this.#shapePanel)
        }
    }

    right() {
        if (this.#status === Panel.#PLAYING) {
            this.#shape.right(this.#shapePanel)
        }
    }

    down() {
        if (this.#status === Panel.#PLAYING) {
            this.#shape.down(this.#shapePanel)
        }
    }

    rotate() {
        if (this.#status === Panel.#PLAYING) {
            this.#shape.rotate(this.#shapePanel)
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
        if (this.#shape.fall(this.#shapePanel)) {
            this.#startTimer()
        } else {

            // 2. 否则就定位在此处，合并 shape
            // 2.1 若合并成功，则判断是否有满行
            if (this.#shape.merge()) {

                this.#shape.draw(this.#shapePanel)

                // 计算是否有满行
                let fullRows = this.#calculateFullRows(this.#shape.points)

                if (fullRows.length) {
                    // 统一闪，耗时 0.6s
                    for (let row of fullRows) {
                        const start = row * this.#columns
                        for (let j = 0; j < this.#columns; j++) {
                            this.#cellList[start + j].blink()
                        }
                    }

                    // 通知父容器有消行得分
                    this.#clearlines = fullRows.length
                    this.dispatchEvent(this.#eventClears)

                    // 动画结束后，重新赋值
                    setTimeout(() => {
                        this.#clearFullRows(fullRows)  // 统一清除
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

    #startResetScreen(row, dy, mode) {
        if (dy === 1 && row === this.#rows) {
            return
        }

        const start = row * this.#columns
        for (let j = 0; j < this.#columns; j++) {
            // TODO. 可优化
            if (mode) {
                this.#cellList[i].light(start + j)
            } else {
                this.#cellList[i].dark(start + j)
            }
        }

        setTimeout(() => {
            let nextRow = row + dy
            if (dy === -1 && nextRow < 0) {
                this.#startResetScreen(0, 1, false)
            } else {
                this.#startResetScreen(nextRow, dy, mode)
            }
        }, 30)
    }

    #calculateFullRows(points) {
        // 更新的行
        let updatedRows = new Set()
        for (let p of points) {
            if (p[0] >= 0) {
                updatedRows.add(p[0])
                if (p[0] < this.#highest) {
                    this.#highest = p[0]
                }
            }
        }
        // 判断是否有满行
        let fullRows = []
        for (let row of updatedRows) {
            let j = 0
            while (j < this.#columns && this.#cellList[row * this.#columns + j].value === true) j++
            if (j === this.#columns) {
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


    #clearFullRows(fullRows) {
        // 清除数据、更新UI
        for (let row of fullRows) {
            for (let i = row; i >= this.#highest; i--) {
                const srcI = i - 1
                const srcStart = srcI * this.#columns
                const toStart = i * this.#columns
                for (let j = 0; j < this.#columns; j++) {
                    if (srcI >= 0 && srcI >= this.#highest) {
                        this.#cellList[toStart + j].copy(this.#cellList[srcStart + j])
                    } else {
                        this.#cellList[toStart + j].dark()
                    }
                }
            }
            this.#highest++
        }
    }

    #gameover() {
        this.#status = Panel.#GAMEOVER
        this.dispatchEvent(this.#eventGameover)  // 通知父容器 gameover
    }

    #next() {
        this.dispatchEvent(this.#eventNext)  // 通知父容器开始下一个
    }
}

customElements.define('grid-panel', Panel)