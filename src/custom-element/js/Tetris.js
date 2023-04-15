import Shape from './Shape.js'

class Tetris extends Shape {
    // 静态属性
    static matrix;  // 形状的 next 矩阵

    // 私有属性
    #rows;         // 画板的信息，来自 <grid-panel>
    #columns;
    #data;
    #container;

    constructor(points) {
        super(points)
        this.setted = false   // 画板的信息是否初始化
    }

    set panel(x) {
        if (this.setted) return
        this.setted = true
        this.#rows = x.rows
        this.#columns = x.columns
        this.#data = x.data
        this.#container = x.container
    }

    start() {
        let result = true
        for (let p of this.points) {
            if (p[0] === 0 && this.#data[p[0]][p[1]] === 1) {
                result = false
                break
            }
        }
        if (result) {
            this.#draw()
        }
        return result
    }

    fall() {
        let result = false
        let next = []
        for (let p of this.points) {
            let nextI = p[0] + 1
            let nextJ = p[1]

            // 降落到底了
            if (nextI === this.#rows) {
                break
            } else if (this.#isCellFilled(nextI, nextJ)) {
                // 被卡住了，不能再落了
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result = true
            this.#to(next)
        }
        return result
    }

    down() {
        let result = []
        let cur = this.points
        while (true) {
            let next = []
            for (let p of cur) {
                let nextI = p[0] + 1
                let nextJ = p[1]
                if (nextI >= this.#rows || this.#isCellFilled(nextI, nextJ)) {
                    break
                }
                next.push([nextI, nextJ])
            }
            if (next.length === 4) {
                cur = next
                result = next
            } else {
                break
            }
        }
        if (result.length) {
            this.#to(result)
        }
        return result
    }

    left() {
        return this.#horizon(-1)
    }

    right() {
        return this.#horizon(1)
    }

    rotate() {
        let result = []
        const { n, origin } = this.constructor.getShapeDetail(this.points)
        const factor = this.constructor.rotateMatrix[n]
        let next = []
        for (let p of this.points) {
            const dist = (p[0] - origin[0]) * n + (p[1] - origin[1])
            let nextI = p[0] + factor[dist][0]
            let nextJ = p[1] + factor[dist][1]

            if (nextI >= this.rows || nextJ < 0 || nextJ >= this.columns || this.#isCellFilled(nextI, nextJ)) {
                break
            } else {
                next.push([nextI, nextJ])
            }
        }
        if (next.length === 4) {
            this.#to(next)
            result = next
        }
        return result
    }

    merged() {
        let result = true
        for (let p of this.points) {
            if (p[0] < 0) {
                result = false
                break
            } else {
                this.#data[p[0]][p[1]] = 1  // merge data
            }
        }
        if (result) {
            this.#draw()  // merge ui
        }
        return result
    }

    // 私有方法
    #horizon(dx) {
        let result = []
        let next = []
        for (let p of this.points) {
            let nextI = p[0]
            let nextJ = p[1] + dx

            // 若左右到边界了 或左右被卡住了，则左右位置不动
            if (nextJ < 0 || nextJ >= this.#columns || this.#isCellFilled(nextI, nextJ)) {
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result = next
            this.#to(next)
        }
        return result
    }

    #to(next) {
        // 在 this.current 中但不在 next 中的，置灰
        this.#updateCells(this.constructor.subtract(this.points, next), 0)
        // 在 next 中但不在 this.current 中的，置亮
        this.#updateCells(this.constructor.subtract(next, this.points), 1)
        this.points = next
    }

    #draw() {
        for (let p of this.points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#updateCell(i, 1)
            }
        }
    }

    #updateCells(points, mode) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#updateCell(i, mode)
            }
        }
    }

    #updateCell(i, mode) {
        const flag = ['', 'light', 'blink']
        this.#container.children[i].className = flag[mode]
    }

    #isCellFilled(i, j) {
        return i >= 0 && i < this.#rows && j >= 0 && j < this.#columns && this.#data[i][j] === 1
    }
}

export default Tetris