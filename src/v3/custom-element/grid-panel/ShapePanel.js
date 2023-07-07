export default class ShapePanel {

    // 私有变量
    #rows = 20;
    #cols = 10;
    #cellList;

    constructor(options) {
        this.#rows = options.rows;
        this.#cols = options.cols;
        this.#cellList = options.cellList
    }

    draw(points, type, level) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#cols + p[1]
                this.#cellList[i].draw(type, level)
            }
        }
    }

    merge(points) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#cols + p[1]
                this.#cellList[i].merge()
            }
        }
    }

    reset(points) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#cols + p[1]
                this.#cellList[i].reset()
            }
        }
    }

    isFilled(i, j) {
        return i >= 0 && i < this.#rows && j >= 0 && j < this.#cols && this.#cellList[i * this.#cols + j].value
    }

    isFloor(i) {
        return i === this.#rows
    }

    isUnderFloor(i) {
        return i >= this.#rows
    }

    isOutWall(j) {
        return j < 0 || j >= this.#cols
    }
}