class Render {

    // 私有变量
    #rows;
    #columns;
    #container;
    #data;

    constructor(options) {
        this.#rows = options.rows;
        this.#columns = options.columns;
        this.#container = options.container;
        this.#data = options.data;
    }

    draw(points) {
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.renderCell(i, 1)
            }
        }
    }

    resetScreen() {
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

    blinkRows(fullRows) {
        for (let row of fullRows) {
            this.#renderRow(row, 2)
        }
    }

    #renderRow(row, mode) {
        const start = row * this.#columns
        for (let j = 0; j < this.#columns; j++) {
            this.renderCell(start + j, mode)
        }
    }

    renderCells(points, mode) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.renderCell(i, mode)
            }
        }
    }

    renderCell(i, mode) {
        const flag = ['', 'light', 'blink']
        this.#container.children[i].className = flag[mode]
    }

    isCellFilled(i, j) {
        return i >= 0 && i < this.#rows && j >= 0 && j < this.#columns && this.#data[i][j] === 1
    }

    fill(i, j) {
        if (i >= 0 && i < this.#rows && j >= 0 && j < this.#columns) {
            this.#data[i][j] = 1
        }
    }

    isFloor(i) {
        return i === this.#rows
    }

    isUnderFloor(i) {
        return i >= this.#rows
    }

    isOutWall(i) {
        return i < 0 || i >= this.#columns
    }
}

export default Render