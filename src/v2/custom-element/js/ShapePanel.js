class ShapePanel {

    // 私有变量
    #rows = 20;
    #columns = 10;
    #cellList;

    constructor(options) {
        this.#rows = options.rows;
        this.#columns = options.columns;
        this.#cellList = options.cellList
    }

    #get(i, j) {
        return this.#cellList[i * this.#columns + j].value
    }

    draw(points, type, level) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#cellList[i].draw(type, level)
            }
        }
    }

    dark(points) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#cellList[i].dark()
            }
        }
    }

    isFilled(i, j) {
        return i >= 0 && i < this.#rows && j >= 0 && j < this.#columns && this.#get(i, j) === true
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

export default ShapePanel