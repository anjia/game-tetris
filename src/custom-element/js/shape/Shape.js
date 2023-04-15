class Shape {
    // 静态属性
    static matrix;  // 形状的 next 矩阵

    // 静态方法（私有的，如何调？）
    static subtract(arr1, arr2) {
        // arr1 - arr2
        let result = []
        for (let p1 of arr1) {
            let exist = false
            for (let p2 of arr2) {
                if (p1[0] === p2[0] && p1[1] === p2[1]) {
                    exist = true
                    break
                }
            }
            if (!exist) result.push(p1)
        }
        return result
    }

    // 私有属性
    #init = null   // 初始位置
    #rows;         // 画板的信息，来自 <grid-panel>
    #columns;
    #data;
    #container;

    constructor(points) {
        this.#init = points

        // 实例属性
        this.points = points  // 四个点
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

    reset() {
        this.points = this.#init
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

    }

    left() {

    }

    right() {

    }

    rotate() {

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
    #draw() {
        for (let p of this.points) {
            if (p[0] >= 0) {
                const i = p[0] * this.#columns + p[1]
                this.#updateCell(i, 1)
            }
        }
    }
    #to(next) {
        // 在 this.current 中但不在 next 中的，置灰
        this.#updateCells(this.constructor.subtract(this.points, next), 0)
        // 在 next 中但不在 this.current 中的，置亮
        this.#updateCells(this.constructor.subtract(next, this.points), 1)
        this.points = next
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

export default Shape