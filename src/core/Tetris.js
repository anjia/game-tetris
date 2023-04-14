class Tetirs {

    /**
     * private methods
     */
    // { score, clears }
    #updateTheInfo(to) {
        // 当前分
        this.theScore = to.score
        this.view.score = this.theScore
        // 最高分
        if (to.score > this.maxScore) {
            this.maxScore = to.score
            window.localStorage.setItem('max', this.maxScore)
            this.view.max = this.maxScore
        }
        // 消除行
        this.theClearRows = to.clears
        this.view.clearRows = this.theClearRows
        // 级别
        if (this.theClearRows >= this.constructor.LEVELLINES[this.theLevel] && (this.theLevel + 1 < this.constructor.LEVELLINES.length)) {
            this.theLevel++
            this.view.level = this.theLevel
        }
    }
    #updateNext() {
        const x = this.model.next
        if (x.name !== this.next.name) {
            this.next = x
            this.view.next = this.next.name
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

                    // 动画结束后，重新赋值
                    setTimeout(() => {
                        this.view.updateGrid(data, maxRow)
                        this.#updateTheInfo({ score, clears })
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
                this.view.updateCell(i, mode)
            }
        }
    }
    #updateRow(row, mode) {
        const start = row * this.columns
        for (let j = 0; j < this.columns; j++) {
            this.view.updateCell(start + j, mode)
        }
    }
}

export default Tetirs