import Render from './Render.js'
import Model from './Model.js'

class Tetirs {
    // 一次性消 1-2-3-4 行，每行单价 100-150-200-250
    static SCORE = [0, 100, 300, 600, 1000]
    static LEVEL = [0, 2000, 4000, 8000, +Infinity]
    static INTERVAL = [0, 800, 700, 600, 500]    // 降落的间隔（速度）


    constructor(option) {
        // 接收参数
        this.rows = option.rows
        this.columns = option.columns

        // 数据层
        this.model = new Model({
            rows: this.rows,
            columns: this.columns
        })

        this.status;    // 状态
        this.current;   // 当前形状
        this.timer;     // 降落的计时器
        this.theLevel;      // 本轮级别
        this.theScore;      // 本轮得分
        this.theClearRows;  // 本轮消除行数
        this.next = this.model.next  // 下一个形状
        this.maxScore = parseInt(window.localStorage.getItem('max') || 0)  // 最高分

        // UI 渲染
        this.render = new Render({
            rows: this.rows,
            columns: this.columns,
            next: this.next.name,
            max: this.maxScore
        })

        // 初始化数据
        this.init()
    }
    init() {
        this.status = 0
        this.current = null
        this.#clearTimer()
        this.theLevel = 1
        this.theScore = 0
        this.theClearRows = 0
    }

    reset() {
        this.#clearScreen()
        this.init()
        this.model.reset()
        this.render.reset()
        this.#updateNext()
    }

    get ispreparing() {
        return this.status === 0
    }
    get isplaying() {
        return this.status === 1
    }
    get ispausing() {
        return this.status === 2
    }

    start() {
        this.render.start()

        if (this.isplaying) {
            this.status = 2
            this.#clearTimer()
        } else {
            if (this.ispreparing) {
                this.#startNext()
            } else if (this.ispausing) {
                this.#falling()
            }
            this.status = 1
        }
    }
    horizontal(dir) {
        if (!this.ispreparing) {
            const { msg, next } = this.model.getHorizontalPos(this.current, dir)
            if (msg === 'success') {
                this.#renderNext(next)
            }
            if (this.ispausing) {
                this.start()
            }
        }
    }
    down() {
        if (!this.ispreparing) {
            const { msg, next } = this.model.getDownPos(this.current)
            if (msg === 'success') {
                this.#renderNext(next)
            }
            if (this.ispausing) {
                this.start()
            }
        }
    }
    rotate() {
        if (!this.ispreparing) {
            const { msg, next } = this.model.getRotatePos(this.current)
            if (msg === 'success') {
                this.#renderNext(next)
            }
            if (this.ispausing) {
                this.start()
            }
        }
    }

    /**
     * private methods
     */
    #updateTheInfo(to) {
        this.theClearRows = to.clears
        this.render.clearRows = this.theClearRows

        this.theScore = to.score
        this.render.score = this.theScore

        if (to.level !== this.theLevel) {
            this.theLevel = to.level
            this.render.level = this.theLevel
        }
        if (to.score > this.maxScore) {
            this.maxScore = to.score
            window.localStorage.setItem('max', this.maxScore)
            this.render.max = this.maxScore
        }
    }
    #updateNext() {
        const x = this.model.next
        if (x.name !== this.next.name) {
            this.next = x
            this.render.next = this.next.name
        }
    }
    #clearTimer() {
        clearTimeout(this.timer)  // this.timer 依然有值，只是不触发了而已
    }
    #clearScreen() {
        this.#startClearScreen(this.rows - 1, -1, 1)
    }
    #startClearScreen(row, add, mode) {
        if (add === 1 && row === this.rows) {
            return
        }

        this.#updateRow(row, mode)

        setTimeout(() => {
            let nextRow = row + add
            if (add === -1 && nextRow < 0) {
                this.#startClearScreen(0, 1, 0)
            } else {
                this.#startClearScreen(nextRow, add, mode)
            }
        }, 30)
    }

    #startNext() {
        this.current = this.next.points
        this.#updateNext()

        // 判断起始位置，若有空间则绘制+下落，否则结束游戏
        if (this.model.canStart(this.current)) {
            this.#updatePoints(this.current, 1)
            this.#continueFalling()
        } else {
            this.reset()  // gameover
        }
    }

    #falling() {
        // 若可以继续降落，则更新 UI
        const { msg, next, maxRow, fullRows, data } = this.model.canFall(this.current)
        switch (msg) {
            case 'continue':
                this.#renderNext(next)
                this.#continueFalling()
                break
            case 'done':
                // 清空满行的
                if (fullRows.length) {
                    // 统一闪，耗时 0.6s
                    for (let row of fullRows) {
                        this.#updateRow(row, 2)
                    }

                    // 重新计算新数据
                    const clears = this.theClearRows + fullRows.length
                    const score = this.theScore + this.constructor.SCORE[fullRows.length]
                    let level = this.theLevel
                    if (score >= this.constructor.LEVEL[level]) {
                        level++
                    }

                    // 动画结束后，重新赋值
                    setTimeout(() => {
                        this.render.updateGrid(data, maxRow)
                        this.#updateTheInfo({ score, level, clears })
                        this.#startNext()
                    }, 600)

                } else {
                    this.#startNext()
                }
                break
            case 'gameover':
                this.reset()
                break
        }
    }

    #continueFalling() {
        this.timer = setTimeout(() => {
            this.#falling()
        }, this.constructor.INTERVAL[this.theLevel])
    }

    #renderNext(to) {
        // this.current -> to
        let toDarkPoints = this.model.subtract(this.current, to) // 在 this.current 中，但不在 to 中
        let tolightPoints = this.model.subtract(to, this.current) // 在 to 中，但不在 this.current

        this.#updatePoints(toDarkPoints, 0)
        this.#updatePoints(tolightPoints, 1)
        this.current = to
    }
    #updatePoints(points, mode) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.columns + p[1]
                this.render.updateCell(i, mode)
            }
        }
    }
    #updateRow(row, mode) {
        const start = row * this.columns
        for (let j = 0; j < this.columns; j++) {
            this.render.updateCell(start + j, mode)
        }
    }
}

export default Tetirs