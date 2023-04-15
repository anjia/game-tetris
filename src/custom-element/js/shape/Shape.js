class Shape {

    // 私有属性
    #init = null   // 初始位置

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

    constructor(points) {
        this.#init = points

        // 实例属性
        this.points = points    // 四个点

        // shape 画板的相关信息
        this.setted = false
        this.rows;
        this.columns;
        this.data;
        this.container;
        this.maxRow;
    }

    set panel(x) {
        if (this.setted) return
        this.setted = true
        this.rows = x.rows
        this.columns = x.columns
        this.data = x.data
        this.container = x.container
        this.maxRow = this.rows - 1
    }

    get entered() {
        let result = true
        for (let p of this.points) {
            if (p[0] === 0 && this.data[p[0]][p[1]] === 1) {
                result = false
                break
            }
        }
        return result
    }

    get included() {
        let result = true
        for (let p of this.points) {
            if (p[0] < 0) {
                result = false
                break
            }
        }
        return result
    }

    fixed() {
        this.draw()

        // 更新 this.data，同时记录更新了哪几行
        let updateRows = new Set()
        for (let p of this.points) {
            if (p[0] >= 0) {
                this.data[p[0]][p[1]] = 1
                updateRows.add(p[0])
                if (p[0] < this.maxRow) {
                    this.maxRow = p[0]
                }
            }
        }

        // 判断是否有满行
        let fullRows = []
        for (let row of updateRows) {
            let j = 0
            while (j < this.columns && this.#isCellFilled(row, j)) j++
            // 满行的
            if (j === this.columns) {
                fullRows.push(row)
                this.#clearFullRows(row)
                this.#blinkRow(row)
            }
        }

        // 返回它消除的行数
        return fullRows.length
    }

    down() {
        let next = []
        for (let p of this.points) {
            let nextI = p[0] + 1
            let nextJ = p[1]

            // 降落到底了
            if (nextI === this.rows) {
                break
            } else if (this.#isCellFilled(nextI, nextJ)) {
                // 被卡住了，不能再落了
                break
            }
            next.push([nextI, nextJ])
        }
        return next.length === 4 ? next : []
    }



    #blinkRow(row) {
        const start = row * this.columns
        for (let j = 0; j < this.columns; j++) {
            this.#updateCell(start + j, 2)
        }
    }

    #isCellFilled(i, j) {
        return i >= 0 && i < this.rows && j >= 0 && j < this.columns && this.data[i][j] === 1
    }
    #clearFullRows(fullRows) {
        // 原地排序，从小-大
        fullRows.sort((a, b) => {
            if (a > b) return 1
            else if (a < b) return -1
            return 0
        })
        // 从小到大，依次消除
        for (let row of fullRows) {
            for (let i = row; i >= this.maxRow; i--) {
                const srcI = i - 1
                for (let j = 0; j < this.columns; j++) {
                    this.data[i][j] = ((srcI >= 0 && srcI >= this.maxRow) ? this.data[srcI][j] : 0)
                }
            }
            this.maxRow++
        }
    }




    draw() {
        for (let p of this.points) {
            if (p[0] >= 0) {
                const i = p[0] * this.columns + p[1]
                this.#updateCell(i, 1)
            }
        }
    }
    to(next) {
        // 在 this.current 中但不在 next 中的，置灰
        this.#updatePoints(this.constructor.subtract(this.points, next), 0)

        // 在 next 中但不在 this.current 中的，置亮
        this.#updatePoints(this.constructor.subtract(next, this.points), 1)

        this.points = next

    }



    #updatePoints(points, mode) {
        if (!points.length) return
        for (let p of points) {
            if (p[0] >= 0) {
                const i = p[0] * this.columns + p[1]
                this.#updateCell(i, mode)
            }
        }
    }
    #updateCell(i, mode) {
        const flag = ['', 'light', 'blink']
        this.container.children[i].className = flag[mode]
    }

    reset() {
        this.points = this.#init
    }
    left() {

    }
    right() {

    }
    rotate() {

    }
}

export default Shape