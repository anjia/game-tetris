class Render {

    // 私有变量
    #rows = 20;
    #columns = 10;
    #container;
    #data;
    #highest;  // 楼盖的最高层

    constructor(options) {
        this.#rows = options.rows;
        this.#columns = options.columns;
        this.#container = options.container;
        this.#data = options.data;
        this.#highest = this.#rows - 1
    }

    reset() {
        this.#highest = this.#rows - 1
        this.#startResetScreen(this.#rows - 1, -1, 1)
    }

    #startResetScreen(row, dy, mode) {
        if (dy === 1 && row === this.#rows) {
            return
        }

        this.#renderRow(row, mode)

        setTimeout(() => {
            let nextRow = row + dy
            if (dy === -1 && nextRow < 0) {
                this.#startResetScreen(0, 1, 0)
            } else {
                this.#startResetScreen(nextRow, dy, mode)
            }
        }, 30)
    }

    draw(points) {
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#renderCell(i, 1)
            }
        }
    }

    merge(points) {
        for (let p of points) {
            this.#data[p[0]][p[1]] = 1
        }
    }

    calculateFullRows(points) {
        // 更新的行
        let updateRows = new Set()
        for (let p of points) {
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
            while (j < this.#columns && this.isFilled(row, j)) j++
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

    clearFullRows(fullRows) {
        const from = this.#highest
        const to = fullRows[fullRows.length - 1]

        // 清除数据
        for (let row of fullRows) {
            for (let i = row; i >= this.#highest; i--) {
                const srcI = i - 1
                for (let j = 0; j < this.#columns; j++) {
                    this.#data[i][j] = ((srcI >= 0 && srcI >= this.#highest) ? this.#data[srcI][j] : 0)
                }
            }
            this.#highest++
        }
        // 更新 UI
        for (let i = from; i <= to; i++) {
            const start = i * this.#columns
            for (let j = 0; j < this.#columns; j++) {
                this.#renderCell(start + j, this.#data[i][j])
            }
        }
    }

    blinkRows(fullRows) {
        for (let row of fullRows) {
            this.#renderRow(row, 2)
        }
    }

    #renderRow(row, mode) {
        const start = row * this.#columns
        for (let j = 0; j < this.#columns; j++) {
            this.#renderCell(start + j, mode)
        }
    }

    renderPoints(points, mode) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#renderCell(i, mode)
            }
        }
    }

    #renderCell(i, mode) {
        const flag = ['', 'light', 'blink']
        this.#container.children[i].className = flag[mode]
    }

    isFilled(i, j) {
        return i >= 0 && i < this.#rows && j >= 0 && j < this.#columns && this.#data[i][j] === 1
    }

    isFloor(i) {
        return i === this.#rows
    }

    isUnderFloor(i) {
        return i >= this.#rows
    }

    isOutWall(j) {
        return j < 0 || j >= this.#columns
    }
}

export default Render