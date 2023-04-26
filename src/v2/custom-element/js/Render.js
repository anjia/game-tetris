import CSSOM from './CSSOM.js'

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
        this.#startResetScreen(this.#rows - 1, -1, 'light')
    }

    #startResetScreen(row, dy, mode) {
        if (dy === 1 && row === this.#rows) {
            return
        }

        this.#renderRow(row, mode)

        setTimeout(() => {
            let nextRow = row + dy
            if (dy === -1 && nextRow < 0) {
                this.#startResetScreen(0, 1, 'dark')
            } else {
                this.#startResetScreen(nextRow, dy, mode)
            }
        }, 30)
    }

    draw(points, type, level) {
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#renderCell(i, 'draw', type, level)
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
        // 清除数据、更新UI
        for (let row of fullRows) {
            for (let i = row; i >= this.#highest; i--) {
                const srcI = i - 1
                const srcStart = srcI * this.#columns
                const toStart = i * this.#columns
                for (let j = 0; j < this.#columns; j++) {
                    if (srcI >= 0 && srcI >= this.#highest) {
                        this.#data[i][j] = this.#data[srcI][j]
                        this.#container.children[toStart + j].className = this.#container.children[srcStart + j].className
                    } else {
                        this.#data[i][j] = 0
                        this.#container.children[toStart + j].className = ''
                    }
                }
            }
            this.#highest++
        }
    }

    blinkRows(fullRows) {
        for (let row of fullRows) {
            this.#renderRow(row, 'blink')
        }
    }

    #renderRow(row, mode) {
        const start = row * this.#columns
        for (let j = 0; j < this.#columns; j++) {
            this.#renderCell(start + j, mode)
        }
    }

    renderPoints(points, mode, type, level) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#renderCell(i, mode, type, level)
            }
        }
    }

    #renderCell(i, mode, type, level) {
        const obj = this.#container.children[i]
        switch (mode) {
            case 'dark':
                CSSOM.setClass(obj, '')
                break
            case 'light':
                CSSOM.setClass(obj, 's')
                break
            case 'blink':
                CSSOM.addClass(obj, 'blink')
                break;
            case 'draw':
                CSSOM.addClass(obj, 's')
                if (type) {
                    CSSOM.addClass(obj, type)
                }
                if (level) {
                    CSSOM.addClass(obj, 'l' + level)
                }
                break
        }
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